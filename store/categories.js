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
      const response = await this.$axios.$get('/categories');

      commit('data', response);
    } catch (error) {
      if (!this.$axios.isCancel(error)) {
        throw error.response ? error.response : error;
      }
    }
  },
  /**
   * Create new item.
   *
   * @param context
   * @param {String} name - Category name.
   * @param {String} description - Description.
   * @returns {Promise<{success: boolean, error}|{data: any, success: boolean}|{success: boolean}>}
   */
  async create (context, { name, description }) {
    try {
      const { status, data } = await this.$axios.post('/categories', {
        name,
        description,
      });
      return {
        success: status === 200,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  /**
   * Update an item.
   *
   * @param context
   * @param {Number} id - Category ID.
   * @param {Object} payload - Update payload.
   * @param {String} payload.name - Category name.
   * @param {String} payload.description - Description.
   * @returns {Promise<{success: boolean, error}|{data: any, success: boolean}|{success: boolean}>}
   */
  async update (context, { id, payload }) {
    try {
      const { status, data } = await this.$axios.put(`/categories/${id}`, payload);
      return {
        success: status === 200,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
  /**
   * Delete item.
   *
   * @param dispatch
   * @param {Number} id - Category ID.
   * @returns {Promise<{success: boolean, message: string}|{success: boolean, message: *}>}
   */
  async delete ({ dispatch }, id) {
    try {
      const { status, data } = await this.$axios.delete(`/categories/${id}`);
      await dispatch('getAll');

      return {
        success: status === 200,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },
};

export const state = () => ({ ...stateData });
