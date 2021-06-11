<template>
  <div>
    <t-button v-if="logged_in" class="ml-auto">Add Product</t-button>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

/**
 * **Products page**
 *
 * @author Faizal Amiruddin
 */
export default {
  name: 'Products',
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
  },
};
</script>

<style scoped>

</style>
