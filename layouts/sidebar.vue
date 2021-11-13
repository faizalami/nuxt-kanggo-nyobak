<template>
  <div
    class="sidebar"
  >
    <div class="py-4 px-6 bg-blue-500">
      <h1 class="text-2xl text-white font-bold h-10">Nyobak</h1>
    </div>

    <nav>
      <ul>
        <li>
          <div class="sidebar-heading">MENU</div>
        </li>
        <li>
          <nuxt-link to="/">
            <t-button variant="sidebar">
              <span class="mx-0 sm:mx-2">Products</span>
            </t-button>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/categories">
            <t-button variant="sidebar">
              <span class="mx-0 sm:mx-2">Categories</span>
            </t-button>
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
/**
 * **Sidebar Layout**
 *
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
  name: 'Sidebar',
};
</script>

<style lang="postcss" scoped>
/* Sidebar Container */
.sidebar {
  @apply flex flex-col z-30 bg-blue-900 overflow-y-auto text-center w-56 text-left text-sm;
}

/* Sidebar Heading */
.sidebar-heading {
  @apply text-white px-0 mt-4 mb-2 text-xs uppercase font-bold;
}
@screen sm {
  .sidebar-heading {
    @apply px-4;
  }
  .toggled .sidebar-heading {
    @apply px-0;
  }
}
</style>
