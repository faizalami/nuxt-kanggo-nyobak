<template>
  <div>
    <t-button v-if="logged_in" class="ml-auto" @click="openFormModal('create')">
      Add Product
    </t-button>
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
        <template #footer>
          <p>{{ item.description }}</p>
        </template>
      </t-card>
    </div>
    <form-modal :mode="form_mode" :selected-data="null" />
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
    };
  },
  computed: {
    ...mapGetters({
      logged_in: 'logged_in',
      data: 'products/data',
    }),
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
    }),
    openFormModal (mode) {
      this.form_mode = mode;
      // if (mode === 'edit') {
      //   this.selected_data = data;
      // }
      this.$modal.show('form-product-modal');
    },
  },
};
</script>

<style scoped>

</style>
