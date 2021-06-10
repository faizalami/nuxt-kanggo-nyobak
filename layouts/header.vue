<template>
  <header class="flex justify-end items-center py-4 px-6 mb-8 bg-blue-500 shadow-xl min-h-10">
    <div v-if="login" class="flex items-center">
      <t-dropdown>
        <template #trigger="{
          mousedownHandler,
          focusHandler,
          blurHandler,
          keydownHandler
        }">
          <t-button
            variant="navbar"
            @blur="blurHandler"
            @focus="focusHandler"
            @keydown="keydownHandler"
            @mousedown="mousedownHandler"
          >
            <span class="inline text-sm mr-2">Username</span>
            <img
              alt="Avatar"
              class="inline h-8 w-8 rounded-full object-cover bg-gray-200"
              height="100"
              src="~/assets/images/people.png"
              width="100"
            />
          </t-button>
        </template>

        <div>
          <t-button class="w-full block text-center rounded-b-none" href="/profile" variant="link">
            Profile
          </t-button>
          <hr />
          <t-button class="w-full rounded-t-none" variant="link">
            Logout
          </t-button>
        </div>
      </t-dropdown>
    </div>
    <div v-else class="flex items-center">
      <t-dropdown>
        <template #trigger="{
          mousedownHandler,
          focusHandler,
          blurHandler,
          keydownHandler
        }">
          <t-button
            variant="navbar"
            @blur="blurHandler"
            @focus="focusHandler"
            @keydown="keydownHandler"
            @mousedown="mousedownHandler"
          >
            Login
          </t-button>
        </template>

        <div class="p-4">
          <t-input
            id="email"
            v-model="form.email"
            class="w-full"
            name="email"
            placeholder="Email"
          />
          <t-input
            id="password"
            v-model="form.password"
            class="w-full mt-2"
            name="password"
            placeholder="Password"
            type="password"
          />
          <t-button class="w-full mt-2">
            Login
          </t-button>
        </div>
      </t-dropdown>
    </div>
  </header>
</template>

<script>
/**
 * **Header Layout**
 *
 * @author Faizal Amiruddin <f.a.faizal.amiruddin@gmail.com>
 */
export default {
  name: 'Header',
  data () {
    return {
      login: false,
      form: {
        email: null,
        password: null,
      },
    };
  },
};
</script>

<style lang="postcss" scoped>
</style>
