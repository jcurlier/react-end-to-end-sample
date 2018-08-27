import axios from 'axios';

const requestCreator = (options) => {
  const instance = axios.create(options);

  instance.cache = {};

  instance.withAuth = (token) => {
    if (token === undefined) {
      return instance;
    }
    instance.defaults.headers.Authorization = token;
    return instance;
  };

  instance.bustCache = () => {
    instance.bustCache = true;
    return instance;
  };

  instance.interceptors.request.use(cacheBustInterceptor(instance));

  return instance;
};

const cacheBustInterceptor = (instance) => (config) => {
  if (instance.bustCache === true) {
    const params = config.params || {};
    params.cacheBust = Date.now();
    config.params = params;
  }

  return config;
};

export default requestCreator;
