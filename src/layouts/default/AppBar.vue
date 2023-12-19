<template>
  <v-app-bar app color="primary">
    <!-- Sol taraftaki icon ve sayfa yönlendiricileri -->
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="ml-4">
      <v-icon>mdi-flash</v-icon> <!-- Kendi enerji ile ilgili ikonunuzu ekleyin -->
    </v-toolbar-title>
    <v-btn to="/users" text color="white">Users</v-btn>
    <v-btn to="/factory" text color="white">Factory</v-btn>
    <v-btn to="/factory-detail" text color="white">FactoryDetail</v-btn>

    <!-- Sağ taraftaki bilgi ve çark ikonu -->
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn>
      {{ userName }}
    </v-btn>
  </v-app-bar>
  <!-- Drawer içeriği -->
  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item to="/users">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/factory">
        <v-list-item-icon>
          <v-icon>mdi-factory</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Factory</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/factory-detail">
        <v-list-item-icon>
          <v-icon>mdi-factory</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>FactoryDetail</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { useAppStore } from "@/store/app"

const store = useAppStore();
export default {
  data() {
    return {
      drawer: false,
      userName: "",
    };
  },
  created() {
    const storedUserName = localStorage.getItem("userName")
    if (storedUserName) {
      this.userName = storedUserName;
    } else {
      this.userName = store.user._source.name
      localStorage.setItem("userName", store.user._source.name)
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  },
};
</script>
