<template>
  <div>
    <div class="mb-4">
      <t-button v-if="logged_in" class="ml-auto" @click="openFormModal">Add Product</t-button>
    </div>
    <t-table
      :data="data"
      :headers="headers"
    />
    <form-modal />
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
      ],
    };
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
    }),
    openFormModal () {
      this.$modal.show('form-category-modal');
    },
  },
};
</script>

<style scoped>

</style>
