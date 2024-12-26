import type { ICard } from "~/types/kanban.types";

const defaultValue: { card: ICard | null; isOpen: boolean } = {
  card: null,
  isOpen: false,
};

export const useDealSlideStore = defineStore("deal-slide", {
  state: () => defaultValue,
  actions: {
    clear() {
      this.$patch(defaultValue);
    },
    set(card: ICard) {
      this.$state = { card, isOpen: true }
    },
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
});
