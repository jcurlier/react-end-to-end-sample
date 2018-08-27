/* eslint-disable no-undef */

describe('Sanity', () => {
  describe('Null', () => {
    set('value', () => null);
    it('works with null', () => {
      expect(value).toBeNull();
      expect(value).toBeDefined();
      expect(value).not.toBeUndefined();
      expect(value).not.toBeTruthy();
      expect(value).toBeFalsy();
    });
  });

  describe('Zero', () => {
    set('value', () => 0);
    it('works with zero', () => {
      expect(value).not.toBeNull();
      expect(value).toBeDefined();
      expect(value).not.toBeUndefined();
      expect(value).not.toBeTruthy();
      expect(value).toBeFalsy();
    });
  });

  describe('Integers', () => {
    set('value', () => 2 + 3);
    it('adds integers', () => {
      expect(value).toBeGreaterThan(4);
      expect(value).toBeGreaterThanOrEqual(4.5);
      expect(value).toBeLessThan(6);
      expect(value).toBeLessThanOrEqual(5.5);
      // toBe and toEqual are equivalent for numbers
      expect(value).toBe(5);
      expect(value).toEqual(5);
    });
  });

  describe('Floats', () => {
    set('value', () => 0.1 + 0.2);
    it('adds floating point numbers', () => {
      // expect(value).toBe(0.3); This won't work because of rounding error
      expect(value).toBeCloseTo(0.3); // This works.
    });
  });

  describe('Strings', () => {
    it('matches against regular expressions', () => {
      expect('team').not.toMatch(/I/);
      expect('Christoph').toMatch(/stop/);
    });
  });

  describe('Arrays', () => {
    set('value', () => [
      'diapers',
      'kleenex',
      'trash bags',
      'paper towels',
      'beer',
    ]);
    it('tests the shopping list has beer on it', () => {
      expect(value).toContain('beer');
    });
  });

  describe('Promises', () => {
    it('resolves as promised', async () => {
      // make sure that assertions in a callback actually got called
      expect.assertions(1);
      await expect(Promise.resolve('woof')).resolves.toEqual('woof');
    });
    it('rejects as promised', async () => {
      // make sure that assertions in a callback actually got called
      expect.assertions(1);
      await expect(Promise.reject(new Error('caw'))).rejects.toEqual(new Error('caw'));
    });
  });

  describe('Exceptions', () => {
    action('compileAndroidCode', () => {
      throw new Error('you are using the wrong JDK');
    });
    it('throws as expected', () => {
      expect(compileAndroidCode).toThrow();
      expect(compileAndroidCode).toThrow(Error);
      // You can also use the exact error message or a regexp
      expect(compileAndroidCode).toThrow('you are using the wrong JDK');
      expect(compileAndroidCode).toThrow(/JDK/);
    });
  });
});
