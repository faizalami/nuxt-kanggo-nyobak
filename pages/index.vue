<template>
  <div>
    <div class="flex mb-2">
      <div class="flex-auto">
        <t-button v-if="logged_in" @click="openFormModal('create')">
          Add Product
        </t-button>
      </div>
      <div class="flex-auto">
        <t-input
          v-model="search"
          classes="ml-auto w-full sm:w-auto"
          placeholder="Search"
        />
      </div>
    </div>

    <div class="container grid grid-cols-5 gap-2">
      <t-card
        v-for="(item, index) in data"
        :key="index"
        :header="item.name"
      >
        <img
          :alt="item.picture.name"
          class="mx-auto"
          :src="`${$config.BASE_URL}${item.picture.formats.thumbnail.url}`"
        />

        <div v-if="logged_in" class="block text-center mt-2">
          <t-button
            class="inline-block"
            variant="primary-small"
            @click="openFormModal('edit', item)"
          >
            <pencil-icon />
          </t-button>
          <t-button
            class="inline-block"
            variant="error-small"
            @click="deleteItem(item.id)"
          >
            <trash-icon />
          </t-button>
        </div>

        <template #footer>
          <p>{{ item.description }}</p>
        </template>
      </t-card>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 mt-2">
      <div class="flex items-center">
        Showing {{ limit_start }} to {{ limit_end }}
        of {{ total }} items.
      </div>
      <div>
        <t-pagination
          :per-page="15"
          :total-items="total"
          :value="page"
          @change="setPage"
        />
      </div>
    </div>
    <form-modal :mode="form_mode" :selected-data="selected_data" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FormModal from '~/components/page/products/FormModal';

/**
 * **Products page**
 *
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
  name: 'Products',
  components: {
    FormModal,
  },
  data () {
    return {
      form_mode: 'create',
      selected_data: null,
      search: null,
    };
  },
  watch: {
    async search (newSearch, oldSearch) {
      if (newSearch !== oldSearch) {
        await this.setSearch(newSearch);
      }
    },
  },
  computed: {
    ...mapGetters({
      logged_in: 'logged_in',
      data: 'products/data',
      page: 'products/page',
      total: 'products/total',
    }),
    // Current page data limit start from.
    limit_start () {
      return (this.page - 1) * 15 + 1;
    },
    // Current page data limit end at.
    limit_end () {
      const end = this.page * 15;
      return end > this.total ? this.total : end;
    },
  },
  created () {
    this.setPageTitle('Products');
  },
  async mounted () {
    await this.getAll();
  },
  methods: {
    ...mapActions({
      setPageTitle: 'setPageTitle',
      getAll: 'products/getAll',
      setSearch: 'products/setSearch',
      setPage: 'products/setPage',
      deleteItem: 'products/delete',
    }),
    openFormModal (mode, data) {
      this.form_mode = mode;
      if (mode === 'edit') {
        this.selected_data = data;
      }
      this.$modal.show('form-product-modal');
    },
  },
};
</script>

<style scoped>

</style>
