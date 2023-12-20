<template>
    <v-container>
        <FactoryDetailList v-if="showFactoryList" />
        <FactoryDetailCreate v-if="!showFactoryList" />
    </v-container>
    <v-btn @click="toggleComponents" color="blue">
        {{ showFactoryList ? 'Create' : 'Back' }}
    </v-btn>
</template>
  
<script setup>
import FactoryDetailList from "@/components/FactoryDetailList.vue";
import FactoryDetailCreate from "@/components/FactoryDetailCreate.vue";
import { ref } from "vue";

const showFactoryList = ref(true);

const toggleComponents = () => {
    showFactoryList.value = !showFactoryList.value;
};
</script>
  