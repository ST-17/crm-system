<script setup lang="ts">
import { account } from "~/lib/appwrite";

const loadingStore = useLoadingStore();
const authStore = useAuthStore();

const router = useRouter();

const isDarkMode = ref<boolean>();

const logout = async () => {
  loadingStore.set(true);
  await account.deleteSession("current");
  authStore.clear();
  await router.push("/login");
  loadingStore.set(false);
};

const toggleMode = () => {
  isDarkMode.value = !isDarkMode.value;

  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  }
};

onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark');
})
</script>

<template>
  <aside class="px-5 py-8 h-full relative w-full bg-sidebar">
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
    <div class="flex items-center justify-center mt-8">
      <UToggle
        on-icon="i-heroicons-moon-20-solid"
        off-icon="i-heroicons-sun-20-solid"
        size="2xl"
        :model-value="isDarkMode"
        color="violet"
        @click="toggleMode"
      />
    </div>
  </aside>
</template>

<style scoped></style>
