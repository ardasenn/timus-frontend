// Utilities
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(usr) {
      this.user = usr;
    },
  },
});
