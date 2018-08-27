# Loopback Tests

Tests are created using the [`jest`](https://facebook.github.io/jest/docs/en/getting-started.html) framework built by Facebook.

Benefits of `jest` include:

* Easy setup
* Instance feedback
* Snapshot testing

The Loopback Jest module adds a number of helpers for writing tests as well as an entire test suite to get you started with your Loopback application.

## Structure

The `test` directory is broken up with the following structure:

### `helpers`

The `test/helpers` directory contains helper functions which can be imported in your specific test files. These helpers create users of many different flavors: regular, admin, authenticated, etc. They also provide useful database helpers to clear out any records before each test is run.

### `unit`

The `test/unit` directory is where unit tests are contained. Unit tests should be self-contained and very, very fast to run.

### `e2e`

The `test/e2e` directory is where end-to-end tests are contained. End-to-end tests include full application level tests for testing entire API endpoints and all possible side effects from hitting a single endpoint.

End-to-end tests are often larger and require more setup time as an entire application is usually started for each test. This makes end-to-end tests much slower than unit tests. However, they are extremely useful given the complexity of applications and the amount of branch conditions when a single API endpoint is hit.

The folder structure of the e2e tests should follow the structure of your routes on the API. For example, if you have a `User` model and it has a `create` endpoint which is `POST /api/users`, then there should exist a file at `test/e2e/api/users/create.spec.js` which contains the tests for the `User#create` endpoint.

## Jest Plugins

The `loopback-jest` module includes a number of `jest-plugins`, namely:

* [`jest-plugin-context`](https://www.npmjs.com/package/jest-plugin-context)
* [`jest-plugin-set`](https://www.npmjs.com/package/jest-plugin-set)
* [`jest-plugin-action`](https://www.npmjs.com/package/jest-plugin-action)
* [`jest-plugin-fs`](https://www.npmjs.com/package/jest-plugin-fs)

### Context

The `jest-plugin-context` plugin adds a global `context` function. This function exactly matches what [`describe`](https://facebook.github.io/jest/docs/en/api.html#describename-fn) does, but provides a way to separate the functions/objects you are _describing_ and the scenarios that you are _setting up_.

Here's an example:

```js
describe('User', () => {
  describe('#name', () => {
    set('firstName', () => 'Harry');
    set('lastName', () => 'Potter');
    set('user', () => new User({firstName, lastName}));

    context('with blank first name', () => {
      set('firstName', () => null);

      it('should return only the last name', () => {
        expect(user.name).toEqual('Potter');
      });
    });

    context('with blank last name', () => {
      set('lastName', () => null);

      it('should return only the first name', () => {
        expect(user.name).toEqual('Harry');
      });
    });
  });
});
```

The convention used here is to use `describe` to talk about classes, methods, and objects. We use `context` to split up the tests into different scenarios, usually starting with `with ...`.

More information can be found in the [README](https://github.com/negativetwelve/jest-plugins/tree/master/packages/jest-plugin-context).

### Set

The `jest-plugin-set` plugin adds a global `set` function that lazily evaluates variables used within tests. This is advantageous because it provides a declarative way of structuring our tests.

Variables are not evaluated until they are called - this idea is borrowed from `let` in [RSpec](http://www.betterspecs.org/#let).

Here's an example:

```js
describe('User', () => {
  describe('.update', () => {
    set('user', () => new User({firstName: 'Mary', lastName: 'Lamb'}));

    context('with valid firstName and lastName', () => {
      set('firstName', () => 'Test');
      set('lastName', () => 'User');

      beforeEach(() => user.update({firstName, lastName}));

      it('should set firstName', () => {
        expect(user.firstName).toEqual('Test');
      });

      it('should compute name', () => {
        expect(user.name).toEqual('Test User');
      });
    });

    context('with invalid firstName', () => {
      set('firstName', () => null);
      set('lastName', () => null);

      beforeEach(() => user.update({firstName, lastName}));

      it('should not override the original firstName', () => {
        expect(user.firstName).toEqual('Mary');
      });
    });
  });
});
```

Here are some advantages:

1. We can declare firstName and lastName as variables that we can then reference in our `beforeEach` blocks.
2. We can break up the large `beforeEach` blocks into several distinct `set` blocks.
3. We can easily `set` defaults in outer scopes (which may or may not be used within a particular test saving performance) and then overriding the values in nested blocks.

More information can be found in the [README](https://github.com/negativetwelve/jest-plugins/tree/master/packages/jest-plugin-set).

### Action

The `jest-plugin-action` plugin adds a global `action` function. This function acts in the exact same way `set` does (lazy evaluation), but declares functions instead of constants.

Here's an example:

```js
describe('action', () => {
  set('a', () => 1);
  set('b', () => 2);
  action('add', () => a + b);
  action('multiply', () => a * b);
  action('divide', () => {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    } else {
      return a / b;
    }
  });

  describe('add', () => {
    it('should not throw an error', () => {
      expect(add).not.toThrow();
    });
  });

  describe('multiply', () => {
    it('should not throw an error', () => {
      expect(multiply).not.toThrow();
    });
  });

  describe('division', () => {
    context('with b < 0', () => {
      set('b', () => -42);

      it('should not throw an error', () => {
        expect(divide).not.toThrow();
      });
    });

    context('with b = 0', () => {
      set('b', () => 0);

      it('should throw an error', () => {
        expect(divide).toThrow('Cannot divide by zero');
      });
    });

    context('with b > 0', () => {
      set('b', () => 100);

      it('should not throw an error', () => {
        expect(divide).not.toThrow();
      });
    });
  });
});
```

More information can be found in the [README](https://github.com/negativetwelve/jest-plugins/tree/master/packages/jest-plugin-action).

### Filesystem

The `jest-plugin-fs` plugin adds a global `fs` function that allows us to easily mock, unmock, and read files from the filesystem.

It does not contain functionality for a normal filesystem library. You should use something like `fs-extra` to actually interact with the filesystem.

Here's an example that showcases how to `mock`, `unmock`, and `read` files from the filesystem:

```js
// Libraries
import fsExtra from 'fs-extra';
import path from 'path';

describe('fs', () => {
  beforeEach(() => fs.mock());
  afterEach(() => fs.restore());

  context('with new file', () => {
    set('filename', () => 'some/path/to/file.txt');
    beforeEach(() => fsExtra.outputFileSync(filename, 'test-content'));

    it('should create the new file', () => {
      expect(fsExtra.readFileSync(filename, 'utf8')).toEqual('test-content');
    });
  });

  context('with nested directories', () => {
    set('filesystem', () => ({
      test: {
        directory: {
          nested: {
            file: 'hello there',
          },
        },
      },
    }));

    beforeEach(() => fs.mock(filesystem));

    it('should create nested directories', () => {
      expect(
        fsExtra.readFileSync('/test/directory/nested/file', 'utf8'),
      ).toEqual('hello there');
    });
  });

  describe('#files', () => {
    context('with empty filesystem', () => {
      beforeEach(() => fs.mock());

      it('should return an empty object', () => {
        expect(fs.files()).toEqual({});
      });
    });

    context('with files', () => {
      beforeEach(() => fs.mock({test: 'content', hello: 'goodbye'}));

      it('should return the files', () => {
        expect(fs.files()).toEqual({'/test': 'content', '/hello': 'goodbye'});
      });
    });

    context('with nested files', () => {
      beforeEach(() => fs.mock({
        test: {
          nested: {
            file: 'hi',
          },
        },
      }));

      it('should return the full path', () => {
        expect(fs.files()).toEqual({'/test/nested/file': 'hi'});
      });
    });
  });

  describe('#unmock', () => {
    context('with unmocked file', () => {
      set('filename', () => path.join(FIXTURES, 'test.txt'));

      beforeEach(() => fs.unmock([filename]));

      it('should exist in the virtual filesystem', () => {
        expect(fsExtra.readFileSync(filename, 'utf8')).toEqual('this is a test\n');
      });
    });
  });
});
```

More information can be found in the [README](https://github.com/negativetwelve/jest-plugins/tree/master/packages/jest-plugin-fs).
