<script setup lang="ts">
import { account } from "~/lib/appwrite";

const loadingStore = useLoadingStore();
const authStore = useAuthStore();

const router = useRouter();

onMounted(async () => {
  if (authStore.isAuth) return;

  loadingStore.set(true);
  try {
    const response = await account.get();
    if (response) {
      authStore.set({
        ...response,
      });
    }
  } catch (error) {
    await router.push("/login");
  } finally {
    loadingStore.set(false);
  }
});
</script>

<template>
  <LayoutLoader v-if="loadingStore.isLoading" />
  <section v-else :class="{ grid: authStore.isAuth }" style="min-height: 100vh">
    <LayoutSidebar v-if="authStore.isAuth" />
    <div>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
}
</style>
