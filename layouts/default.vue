<template>
  <div class="flex min-h-screen">
    <sidebar-layout />

    <div id="wrapper">
      <div class="flex-grow">
        <header-layout />

        <main id="content-wrapper" class="min-h-full h-auto">
          <div class="mx-5 md:mx-20">
            <h1 class="text-xl font-bold mb-4">{{ page_title }}</h1>
            <nuxt />
          </div>
        </main>
      </div>

      <footer class="flex-shrink-0 py-1 mt-4 bg-white">
        <div class="my-auto">
          <div class="text-sm text-center my-auto">
            Copyright © {{ new Date().getFullYear() }} - Faizal Amiruddin
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '~/layouts/header';
import Sidebar from '~/layouts/sidebar';

/**
 * **Default Layout**
 *
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
  name: 'Default',
  components: {
    'header-layout': Header,
    'sidebar-layout': Sidebar,
  },
  computed: {
    ...mapGetters({
      page_title: 'page_title',
    }),
  },
};
</script>

<style lang="postcss" scoped>
/* Wrappers */
#wrapper {
  @apply flex flex-col overflow-hidden w-full;
  @apply text-gray-600 bg-gray-200;
}
#content-wrapper {
  @apply flex-1 overflow-x-hidden;
}
</style>
