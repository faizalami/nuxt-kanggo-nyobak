<template>
  <t-modal
    focus-on-open
    :header="`${mode === 'create' ? 'Add New' : 'Edit'} Product`"
    name="form-product-modal"
    @opened="loadData"
  >
    <div class="mb-2">
      <label>Name</label>
      <t-input
        id="name"
        v-model="form.name"
        class="w-full"
        name="name"
        placeholder="Enter Name"
      />
    </div>

    <div class="mb-2">
      <label>Description</label>
      <t-textarea
        id="description"
        v-model="form.description"
        class="w-full"
        name="description"
        placeholder="Enter Description"
      />
    </div>

    <div class="mb-2">
      <label>Price</label>
      <t-input
        id="price"
        v-model="form.price"
        class="w-full"
        name="price"
        placeholder="Enter Price"
      />
    </div>

    <div class="mb-2">
      <label>Stock</label>
      <t-input
        id="stock"
        v-model="form.stock"
        class="w-full"
        name="stock"
        placeholder="Enter Stock"
      />
    </div>

    <div class="mb-2">
      <label>Category</label>
      <t-select
        id="category"
        v-model="form.category"
        class="w-full"
        name="category"
        :options="category_options"
        placeholder="Enter Category"
        text-attribute="name"
        value-attribute="id"
      />
    </div>

    <div class="mb-2">
      <label>Picture</label>
      <input id="picture" ref="picture" class="upload" name="picture" type="file" />
    </div>

    <template #footer>
      <div class="flex justify-between">
        <t-button type="button" @click="closeModal">
          Cancel
        </t-button>
        <t-button type="button" @click="submit">
          Save
        </t-button>
      </div>
    </template>
  </t-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

/**
 * **Product Form Modal**
 *
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
  name: 'ProductFormModal',
  props: {
    mode: {
      type: String,
      default: 'create',
    },
    selectedData: {
      type: Object,
      default: null,
    },
  },
  data () {
    return {
      form: {
        name: null,
        description: null,
        price: null,
        stock: null,
        category: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      category_options: 'categories/options',
    }),
    payload () {
      const upload = this.$refs.picture;
      const form = new FormData();

      form.append('data', JSON.stringify(this.form));
      if (upload && upload.files.length) {
        const file = upload.files[0];
        form.append('files.picture', file, file.name);
      }

      return form;
    },
  },
  methods: {
    ...mapActions({
      create: 'products/create',
      update: 'products/update',
      getAll: 'products/getAll',
      getCategoryOptions: 'categories/getAllOptions',
    }),
    resetForm () {
      Object.keys(this.form).forEach(key => {
        this.form[key] = null;
      });
    },
    async loadData () {
      await this.getCategoryOptions();
      if (this.mode === 'edit' && this.selectedData) {
        Object.keys(this.form).forEach(key => {
          this.form[key] = this.selectedData[key];
        });
      }
    },
    async submit () {
      if (['create', 'edit'].includes(this.mode)) {
        const response = this.mode === 'create'
          ? await this.create(this.payload)
          : await this.update({ id: this.selectedData.id, payload: this.payload });
        if (response.success) {
          this.closeModal();
          await this.getAll();
        }
      }
    },
    closeModal () {
      this.resetForm();
      this.$modal.hide('form-category-modal');
    },
  },
};
</script>

<style scoped lang="postcss">
.upload {
  @apply w-full block w-full p-1;
  @apply transition duration-100 ease-in-out border rounded shadow-sm;
  @apply text-black placeholder-gray-400 bg-white border-gray-300 focus:border-blue-500;
}

.upload:focus {
  @apply ring-2 ring-blue-500 outline-none ring-opacity-50;
}

.upload:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
