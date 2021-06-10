const stateData = {
  profile: null,
};

export const mutations = {
  profile (state, payload) {
    state.profile = payload;
  },
};

export const getters = {
  profile (state) {
    return state.profile;
  },
};

export const actions = {
  /**
   * Get profile data from logged in user.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async getProfile ({ commit }) {
    try {
      const response = await this.$axios.$get('/users/me');

      commit('profile', response);
    } catch (error) {
      if (!this.$axios.isCancel(error)) {
        commit('logout', { root: true });
        throw error.response ? error.response : error;
      }
    }
  },
};

export const state = () => ({ ...stateData });
