import Cookie from 'js-cookie';

/**
 * Set up axios config.
 *
 * Including:
 * - Token.
 * - Error handling.
 *
 * @param $axios
 * @param store
 */
export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    if (Cookie.get('token')) {
      config.headers = {
        Authentication: `Bearer ${Cookie.get('token')}`,
      };
    }
  });

  $axios.onError(error => {
    if (!$axios.isCancel(error)) {
      return Promise.reject(createError(error, store));
    }

    return Promise.reject(error);
  });
}

/**
 * Error message standardization for error handling.
 *
 * @param {Object} error - error object
 * @param {Object} store - Vuex store.
 * @returns {Object} - Processed error object.
 */
function createError (error, store) {
  const code = parseInt(error.response && error.response.status, 10);
  let message = 'Server error';

  switch (code) {
    case 400:
      error.response = {
        ...error.response,
        statusText: 'Bad request',
      };
      break;
    case 401:
      error.response = {
        ...error.response,
        statusText: 'Bad credentials',
      };
      // store.dispatch('logout');
      break;
    case 403:
      error.response = {
        ...error.response,
        statusText: 'Forbidden, You are not allowed to access this feature',
      };
      break;
    case 404:
      error.response = {
        ...error.response,
        statusText: 'Not found, URL is not recognized',
      };
      break;
    case 405:
      error.response = {
        ...error.response,
        statusText: 'Method not allowed',
      };
      break;
    case 500:
      error.response = {
        ...error.response,
        statusText: 'Server error',
      };
      break;
    default:
      if (error.message) {
        message = error.message.includes('timeout')
          ? 'Server timeout, check internet connection'
          : error.message;
      }

      error.response = {
        ...error.response,
        status: 500,
        statusText: message,
      };
  }

  return {
    ...error,
    message: error.response.statusText,
  };
}
