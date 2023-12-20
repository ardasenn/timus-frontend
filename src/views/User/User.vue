<template>
    <v-container>
        <UserList v-if="showUserList" />
        <UserCreate v-if="!showUserList" />
    </v-container>
    <v-btn @click="toggleComponents" color="blue">
        {{ showUserList ? 'Create' : 'Back' }}
    </v-btn>
</template>
  
<script setup>
import UserList from "@/components/UserList.vue";
import UserCreate from "@/components/UserCreate.vue";
import { ref } from "vue";

const showUserList = ref(true);

const toggleComponents = () => {
    showUserList.value = !showUserList.value;
};
</script>
  