export const strict = false;
const Cookie = process.client ? require('js-cookie') : undefined;
const cookieParser = process.server ? require('cookieparser') : undefined;

/**
 * **Index Store**
 *
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
const stateData = {
  token: null,
};

export const mutations = {
  token (state, payload) {
    state.token = payload;
  },
};

export const getters = {
  token (state) {
    return state.token;
  },
};

export const actions = {
  /**
   * Called when nuxt ssr initialized
   *
   * @param commit
   * @param dispatch
   * @param req
   */
  nuxtServerInit ({ commit, dispatch }, { req }) {
    let token = null;
    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie);
      try {
        token = parsed.token;
      } catch (err) {
        dispatch('logout');
      }
    }
    if (token) {
      commit('token', token);
    } else {
      dispatch('logout');
    }
  },
  /**
   * Login process
   *
   * @param commit
   * @param email
   * @param password
   */
  async login ({ commit }, { email, password }) {
    try {
      const response = await this.$axios.$post('/auth/local', {
        identifier: email,
        password,
      });

      commit('token', response.jwt);
      Cookie.set('token', response.jwt);
      commit('user/profile', response.user);
      return {
        success: true,
      };
    } catch (error) {
      if (!this.$axios.isCancel(error)) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    }
  },
  /**
   * Logout from base app
   *
   * @param state
   * @param commit
   */
  logout ({ state, commit }) {
    try {
      if (process.client) {
        Cookie.remove('token');
        commit('token', null);
      }
      commit('user/profile', null);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  },
};

export const state = () => ({ ...stateData });
