<template>
  <t-modal
    :header="`${mode === 'create' ? 'Add New' : 'Edit'} Category`"
    name="form-category-modal"
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
import { mapActions } from 'vuex';

/**
 * **Categories Form Modal**
 *
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
  name: 'CategoryFormModal',
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
      },
    };
  },
  methods: {
    ...mapActions({
      create: 'categories/create',
      update: 'categories/update',
      getAll: 'categories/getAll',
    }),
    resetForm () {
      Object.keys(this.form).forEach(key => {
        this.form[key] = null;
      });
    },
    loadData () {
      if (this.mode === 'edit') {
        Object.keys(this.form).forEach(key => {
          this.form[key] = this.selectedData[key];
        });
      }
    },
    async submit () {
      if (['create', 'edit'].includes(this.mode)) {
        const response = this.mode === 'create'
          ? await this.create(this.form)
          : await this.update({ id: this.selectedData.id, payload: this.form });
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

<style scoped>

</style>
