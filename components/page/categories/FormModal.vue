<template>
  <t-modal
    header="Add New Category"
    name="form-category-modal"
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

export default {
  name: 'CategoryFormModal',
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
      getAll: 'categories/getAll',
    }),
    resetForm () {
      Object.keys(this.form).forEach(key => {
        this.form[key] = null;
      });
    },
    async submit () {
      const response = await this.create(this.form);
      if (response.success) {
        this.closeModal();
        await this.getAll();
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
