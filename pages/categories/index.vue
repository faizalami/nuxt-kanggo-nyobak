<template>
  <div>
    <t-table
      :data="data"
      :headers="headers"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

/**
 * **Product Categories page**
 *
 * @author Faizal Amiruddin
 */
export default {
  name: 'Categories',
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
      data: 'categories/data',
    }),
  },
  async mounted () {
    await this.getAll();
  },
  methods: {
    ...mapActions({
      getAll: 'categories/getAll',
    }),
  },
};
</script>

<style scoped>

</style>
