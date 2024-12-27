const authStore = useAuthStore();

export default defineNuxtRouteMiddleware((to, from) => {
  if (authStore.isAuth === false) {
    return navigateTo("/login");
  }
});
