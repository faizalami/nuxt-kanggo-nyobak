export const strict = false;
const Cookie = process.client ? require('js-cookie') : undefined;
const cookieParser = process.server ? require('cookieparser') : undefined;

/**
 * **Index Store**
 *
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
const stateData = {
  logged_in: false,
  page_title: null,
};

export const mutations = {
  logged_in (state, payload) {
    state.logged_in = payload;
  },
  page_title (state, payload) {
    state.page_title = payload;
  },
};

export const getters = {
  logged_in (state) {
    return state.logged_in;
  },
  page_title (state) {
    return state.page_title;
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
    try {
      if (req.headers.cookie) {
        const parsed = cookieParser.parse(req.headers.cookie);
        if (parsed.token) {
          commit('logged_in', true);
        } else {
          dispatch('logout');
        }
      }
    } catch (error) {
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

      commit('logged_in', true);
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
        commit('logged_in', false);
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
  /**
   * Set page header title.
   *
   * @param commit
   * @param {String} title - Page title.
   */
  setPageTitle ({ commit }, title) {
    commit('page_title', title);
  },
};

export const state = () => ({ ...stateData });
