<template>
    <v-container>
        <FactoryList v-if="showFactoryList" />
        <FactoryCreate v-if="!showFactoryList" />
    </v-container>
    <v-btn @click="toggleComponents" color="blue">
        {{ showFactoryList ? 'Create' : 'Back' }}
    </v-btn>
</template>
  
<script setup>
import FactoryList from "@/components/FactoryList.vue";
import FactoryCreate from "@/components/FactoryCreate.vue";
import { ref } from "vue";

const showFactoryList = ref(true);

const toggleComponents = () => {
    showFactoryList.value = !showFactoryList.value;
};

</script>
  