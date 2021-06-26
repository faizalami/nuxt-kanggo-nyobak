<template>
  <div>
    <div class="mb-4">
      <t-button v-if="logged_in" class="ml-auto" @click="openFormModal('create')">Add Product</t-button>
    </div>
    <t-card>
      <div class="flex mb-2">
        <div class="flex-auto ml-auto">
          <t-input
            v-model="search"
            classes="float-right w-full sm:w-auto"
            placeholder="Search"
          />
        </div>
      </div>
      <data-table
        :data="data"
        :headers="headers"
        :page="1"
        :total-items="data.length"
      >
        <template #column(actions)="{ row }">
          <t-button
            class="inline-block"
            :disabled="!logged_in"
            :variant="logged_in ? 'primary-small' : 'secondary-small'"
            @click="openFormModal('edit', row)"
          >
            <pencil-icon />
          </t-button>
          <t-button
            class="inline-block"
            :disabled="!logged_in"
            :variant="logged_in ? 'error-small' : 'secondary-small'"
            @click="deleteItem(row.id)"
          >
            <trash-icon />
          </t-button>
        </template>
      </data-table>
    </t-card>
    <form-modal :mode="form_mode" :selected-data="selected_data" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FormModal from '~/components/page/categories/FormModal';

/**
 * **Product Categories page**
 *
 * @author Faizal Amiruddin
 */
export default {
  name: 'Categories',
  components: {
    FormModal,
  },
  data () {
    return {
      headers: [
        {
          value: 'name',
          text: 'Name',
        },
        {
          value: 'description',
          text: 'Description',
        },
        {
          value: 'actions',
          text: 'Actions',
        },
      ],
      search: null,
      form_mode: 'create',
      selected_data: null,
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
      data: 'categories/data',
    }),
  },
  created () {
    this.setPageTitle('Categories');
  },
  async mounted () {
    await this.getAll();
  },
  methods: {
    ...mapActions({
      setPageTitle: 'setPageTitle',
      getAll: 'categories/getAll',
      setSearch: 'categories/setSearch',
      deleteItem: 'categories/delete',
    }),
    openFormModal (mode, data) {
      this.form_mode = mode;
      if (mode === 'edit') {
        this.selected_data = data;
      }
      this.$modal.show('form-category-modal');
    },
  },
};
</script>

<style scoped>

</style>
