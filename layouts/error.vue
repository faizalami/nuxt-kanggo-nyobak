<template>
  <div class="page-error">
    <h1 class="error-code m-0">
      {{ error.statusCode }}
    </h1>
    <h2 class="text-3xl font-bold text-blue-900">
      Oooops!
    </h2>
    <h4 class="error-message">
      {{ error.statusText ? error.statusText : error.message }}
    </h4>
    <t-button v-if="!should_reload" to="/">
      Back to Home
    </t-button>
    <t-button v-else @click="reloadHome">
      Back to Home
    </t-button>

    <p class="mt-20">
      Copyright © {{ new Date().getFullYear() }} - Faizal Amiruddin
    </p>
  </div>
</template>

<script>
/**
 * **Error Page**
 *
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
  name: 'Error',
  layout: 'empty',
  props: {
    /**
     * **Error Object**
     *
     * Contains **error** object with attributes at least (example):
     * ```
     * {
     *   statusCode: 404,
     *   statusText: 'Not found, URL is not recognized'
     * }
     * ```
     * or
     * ```
     * {
     *   statusCode: 404,
     *   message: 'Not found, URL is not recognized'
     * }
     * ```
     */
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    /**
     * Detect if the page cannot be redirected.
     *
     * @returns {boolean} - Current route is located in home page or not.
     */
    should_reload () {
      const routeException = ['/'];
      return routeException.includes(this.$route.path);
    },
  },
  methods: {
    /**
     * Reload current page if the current route is located in home page.
     */
    reloadHome () {
      this.$router.go(0);
    },
  },
};
</script>

<style lang="postcss" scoped>
.page-error {
  @apply h-screen flex flex-col justify-center align-middle items-center;
}

.error-code {
  @apply text-blue-900;
  font-size: 15vw;
  line-height: 13vw;
}

.error-message {
  @apply text-xl font-bold mb-5 text-blue-600;
}
</style>
