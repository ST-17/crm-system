export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.add('dark');
  }
});
