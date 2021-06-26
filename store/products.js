/**
 * **Products Store**
 *
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
const stateData = {
  data: [],
  detail: null,
};

export const mutations = {
  data (state, payload) {
    state.data = payload;
  },
  detail (state, payload) {
    state.detail = payload;
  },
};

export const getters = {
  data (state) {
    return state.data;
  },
  detail (state) {
    return state.detail;
  },
};

export const actions = {
  /**
   * Get all data with pagination, filter, and sorting.
   *
   * @param state
   * @param commit
   * @param dispatch
   * @returns {Promise<void>}
   */
  async getAll ({ state, commit, dispatch }) {
    try {
      const response = await this.$axios.$get('/products');

      commit('data', response);
    } catch (error) {
      throw error.response ? error.response : error;
    }
  },
};

export const state = () => ({ ...stateData });
