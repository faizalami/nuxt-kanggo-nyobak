import qs from 'qs';

/**
 * **Products Store**
 *
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
const stateData = {
  data: [],
  detail: null,
  params: null,
  search: null,
  page: 1,
  total: 0,
};

export const mutations = {
  data (state, payload) {
    state.data = payload;
  },
  detail (state, payload) {
    state.detail = payload;
  },
  params (state, payload) {
    state.params = payload;
  },
  search (state, payload) {
    state.search = payload;
  },
  page (state, payload) {
    state.page = payload;
  },
  total (state, payload) {
    state.total = payload;
  },
};

export const getters = {
  data (state) {
    return state.data;
  },
  detail (state) {
    return state.detail;
  },
  page (state) {
    return state.page;
  },
  total (state) {
    return state.total;
  },
};

export const actions = {
  /**
   * Set search param.
   *
   * @param commit
   * @param dispatch
   * @param {String|Number} payload - Search payload.
   */
  async setSearch ({ commit, dispatch }, payload) {
    commit('search', payload);
    await dispatch('getAll');
  },
  /**
   * Set page param.
   *
   * @param commit
   * @param dispatch
   * @param payload
   * @returns {Promise<void>}
   */
  async setPage ({ commit, dispatch }, payload) {
    commit('page', payload);
    await dispatch('getAll');
  },
  /**
   * Build API URL parameters.
   *
   * @param state
   * @param commit
   */
  buildParams ({ state, commit }) {
    let params = { ...state.params };
    if (state.search && state.search !== '') {
      params = {
        ...params,
        _where: {
          _or: [
            { name_contains: state.search },
            { description_contains: state.search },
          ],
        },
      };
    }
    params = {
      ...params,
      _limit: 10,
      _start: (state.page - 1) * 10,
    };
    commit('params', params);
  },
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
      dispatch('buildParams');
      const response = await this.$axios.$get(`/categories?${qs.stringify(state.params)}`);

      commit('data', response);
      await dispatch('getTotal');
    } catch (error) {
      if (!this.$axios.isCancel(error)) {
        throw error.response ? error.response : error;
      }
    }
  },
  /**
   * Get total all data.
   *
   * @param commit
   * @returns {Promise<void>}
   */
  async getTotal ({ commit }) {
    try {
      const total = await this.$axios.$get('/categories/count');

      commit('total', total);
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
