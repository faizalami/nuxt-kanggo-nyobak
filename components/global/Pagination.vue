<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 mt-2">
    <div class="flex items-center">
      Showing {{ limit_start }} to {{ limit_end }}
      of {{ totalItems }} items.
    </div>
    <div>
      <t-pagination
        :per-page="perPage"
        :total-items="totalItems"
        :value="page"
        @change="setPage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // Total items (all data length).
    totalItems: {
      type: Number,
      default: 0,
    },
    // Page to display.
    page: {
      type: Number,
      default: 1,
    },
    // items per page
    perPage: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    // Current page data limit start from.
    limit_start () {
      return (this.page - 1) * this.perPage + 1;
    },
    // Current page data limit end at.
    limit_end () {
      const end = this.page * this.perPage;
      return end > this.totalItems ? this.totalItems : end;
    },
  },
  methods: {
    /**
     * Page change event.
     *
     * @param {Number} $event - The current page number.
     */
    setPage ($event) {
      /**
       * Emit to update current page number.
       *
       * @param {Number} $event - The current page number.
       */
      this.$emit('page-changed', $event);
    },
  },
};
</script>

<style scoped>

</style>
