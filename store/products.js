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
  /**
   * Create new item.
   *
   * @param context
   * @param {FormData} payload - Product form data.
   * @returns {Promise<{success: boolean, error}|{data: any, success: boolean}|{success: boolean}>}
   */
  async create (context, payload) {
    try {
      const { status, data } = await this.$axios.post('/products', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
   * @param {Number} id - Product ID.
   * @param {FormData} payload - Update payload.
   * @returns {Promise<{success: boolean, error}|{data: any, success: boolean}|{success: boolean}>}
   */
  async update (context, { id, payload }) {
    try {
      const { status, data } = await this.$axios.put(`/products/${id}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
   * Delete item.
   *
   * @param dispatch
   * @param {Number} id - Product ID.
   * @returns {Promise<{success: boolean, message: string}|{success: boolean, message: *}>}
   */
  async delete ({ dispatch }, id) {
    try {
      const { status, data } = await this.$axios.delete(`/products/${id}`);
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
