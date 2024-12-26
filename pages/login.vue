<script setup lang="ts">
import { account } from "~/lib/appwrite";
import { v4 as uuid } from "uuid";

useHead({
  title: "Login | CRM System",
});

const email = ref();
const password = ref();
const name = ref();

const loadingStore = useLoadingStore();
const authStore = useAuthStore();

const router = useRouter();

const login = async () => {
  loadingStore.set(true);
  try {
    await account.createEmailPasswordSession(email.value, password.value);
    const response = await account.get();

    if (response) {
      authStore.set({
        email: response.email,
        name: response.name,
        status: response.status,
      });
    }

    email.value = "";
    password.value = "";
    name.value = "";

    await router.push("/");
  } catch (error) {
    console.log(error);
  } finally {
    loadingStore.set(false);
  }
};

const register = async () => {
  loadingStore.set(true);
  try {
    await account.create(uuid(), email.value, password.value, name.value);
    await login();
  } catch (error) {
    console.log(error);
  } finally {
    loadingStore.set(false);
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>

      <form>
        <UiInput
          v-model="email"
          placeholder="Email"
          type="email"
          class="mb-3"
        />
        <UiInput
          v-model="password"
          placeholder="Password"
          type="password"
          class="mb-3"
        />
        <UiInput v-model="name" placeholder="Name" class="mb-3" />

        <div class="flex items-center justify-center gap-5">
          <UiButton type="button" @click="login">Login</UiButton>
          <UiButton type="button" @click="register">Register</UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
