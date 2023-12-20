// Utilities
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    setUser(usr) {
      this.user = usr;
    },
    setAuthenticate(val) {
      this.isAuthenticated = val;
      localStorage.setItem("isAuthenticated", val);
    },
  },
});
