interface ILoading {
  isLoading: boolean;
}

const defaultValue: ILoading = {
  isLoading: true,
};

export const useLoadingStore = defineStore("loading", {
  state: () => defaultValue,
  actions: {
    set(data: boolean) {
      this.$patch({ isLoading: data });
    },
  },
});
