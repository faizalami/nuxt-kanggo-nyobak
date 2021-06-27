<template>
  <div>
    <div
      class="w-full overflow-x-auto overflow-y-hidden"
    >
      <t-table
        :data="data"
        :headers="headers"
        variant="thin"
      >
        <template #thead="props">
          <thead :class="props.theadClass">
            <tr :class="props.trClass">
              <th
                v-for="(item, index) in props.data"
                :key="index"
                :class="{
                  [props.thClass]: true,
                  'w-1': item.narrow,
                }"
              >
                <t-button
                  :class="item.sortable === false ? 'cursor-default' : ''"
                  :disabled="item.sortable === false"
                  variant="table-header"
                  @click="setSort(item.value, item)"
                >
                  <div class="flex items-center justify-center">
                    <div class="flex-1 text-left">{{ item.text }}</div>
                    <div v-if="item.sortable !== false" class="flex-1">
                      <sort-icon v-if="!item.sort" class="ml-auto" />
                      <sort-asc-icon v-else-if="item.sort === 'asc'" class="ml-auto" />
                      <sort-desc-icon v-else-if="item.sort === 'desc'" class="ml-auto" />
                    </div>
                  </div>
                </t-button>
              </th>
            </tr>
          </thead>
        </template>

        <template #row="props">
          <tr :class="props.trClass">
            <td
              v-for="(content, index) in headers"
              :key="index"
              :class="{
                [props.tdClass]: true,
              }"
            >
              <!-- Slot **column(columnName)** - Used for custom rendering column value -->
              <slot
                v-bind="{
                  ...props,
                  column: props.row[content.value],
                  header: content,
                }"
                :name="`column(${content.value})`"
              >
                {{ props.row[content.value] }}
              </slot>
            </td>
          </tr>
        </template>

        <template v-if="!data.length" #tbody="props">
          <tbody :class="props.tbodyClass">
            <tr :class="[props.trClass, 'text-center']">
              <td :class="props.tdClass" :colspan="headers.length">
                No Data...
              </td>
            </tr>
          </tbody>
        </template>
      </t-table>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 mt-2">
      <div class="flex items-center">
        Showing {{ limit_start }} to {{ limit_end }}
        of {{ totalItems }} items.
      </div>
      <div>
        <t-pagination
          :per-page="10"
          :total-items="totalItems"
          :value="page"
          @change="setPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * **Data Table Component**
 *
 * This component is used for display a table including
 * the pagination and sorting functionality.
 *
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
  name: 'DataTable',
  props: {
    // Data to display.
    data: {
      type: Array,
      default: () => [],
    },
    /**
     * Table Headers
     *
     * Each item can contains:<br/>
     * {<br/>
     *   value: 'name',<br/>
     *   text: 'Name',<br/>
     *   sort: 'asc' or 'desc' or null',<br/>
     *   sortable: true or false or undefined,<br/>
     * }
     */
    headers: {
      type: Array,
      default: () => [],
    },
    // Total items (all data length).
    totalItems: {
      type: Number,
      default: 0,
    },
    // Page to display.
    page: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    /**
     * The sorting queue.
     * It contains the data keys.
     */
    order_priority: [],
  }),
  computed: {
    // Current page data limit start from.
    limit_start () {
      return (this.page - 1) * 10 + 1;
    },
    // Current page data limit end at.
    limit_end () {
      const end = this.page * 10;
      return end > this.totalItems ? this.totalItems : end;
    },
  },
  methods: {
    /**
     * Set sorting direction (asc or desc) and
     * insert the data key to order_priority.
     *
     * @param {String} key - The data key in table header.
     * @param {Object} header - The header object of selected column.
     */
    setSort (key, header) {
      const headers = [...this.headers];
      const sortType = [null, 'asc', 'desc'];
      if (header.sortable !== false) {
        const sortOrder = sortType.indexOf(header.sort);
        const sortField = {
          ...header,
          sort: sortOrder < 2 ? sortType[sortOrder + 1] : sortType[0],
        };
        const index = this.headers.findIndex(item => item.value === key);
        if (index >= 0) {
          headers.splice(index, 1, sortField);

          /**
           * Emit to synchronize table header.
           *
           * @param {Array} headers - New table header.
           */
          this.$emit('update:headers', headers);
          /**
           * Emit to execute sort function.
           *
           * @param {Array} headers - New table header.
           */
          this.$emit('sort', headers);
        }
      }
    },
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

<style scoped></style>
