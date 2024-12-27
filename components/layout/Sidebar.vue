<script setup lang="ts">
import { account } from "~/lib/appwrite";

const loadingStore = useLoadingStore();
const authStore = useAuthStore();

const router = useRouter();

const logout = async () => {
  loadingStore.set(true);
  await account.deleteSession("current");
  authStore.clear();
  await router.push("/login");
  loadingStore.set(false);
};
</script>

<template>
  <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
    <NuxtLink to="/" class="mb-10 block">
      <NuxtImg src="/logo.svg" width="100px" class="mx-auto" />
    </NuxtLink>
    <button
      class="absolute top-2 right-3 transition-colors hover:text-[#a252c8]"
      @click="logout"
    >
      <Icon name="line-md:logout" size="22px" />
    </button>

    <LayoutMenu />
  </aside>
</template>

<style scoped></style>
