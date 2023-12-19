<template>
    <v-card flat title="Factories">
        <template v-slot:text>
            <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
                hide-details></v-text-field>
        </template>
        <v-data-table :headers="headers" :items="factories" :search="search">
            <template v-slot:item.id="{ item }">
                <v-row justify="center">
                    <v-btn @click="showDetails(item)" color="green">Details</v-btn>
                    <v-btn @click="editFactory(item)" color="blue">Edit</v-btn>
                    <v-btn @click="deleteFactory(item)" color="red">Delete</v-btn>
                </v-row>
            </template>
        </v-data-table>
    </v-card>
</template>
  
<script>
import api from "../services/api";

export default {
    data() {
        return {
            search: '',
            headers: [
                { align: 'start', key: 'name', sortable: false, title: 'Name' },
                { key: 'employeecount', title: 'Employee Count' },
                { key: 'isfree', title: 'Is Free' },
                { key: 'subscription', title: 'Subscription' },
                { key: 'endofsubscription', title: 'End of Subscription' },
                { key: "id", title: "Operations" },
            ],
            factories: [],
        };
    },
    methods: {
        showDetails(item) {
            // Detayları gösterme işlemi
            console.log("Show details for factory with ID:", item.id);
        },
        editFactory(item) {
            // Güncelleme işlemi
            console.log("Edit factory with ID:", item.id);
        },
        deleteFactory(item) {
            // Silme işlemi
            console.log("Delete factory with ID:", item.id);
        },
    },
    created() {
        // API'den veri çekme işlemi
        api.get('/factory')
            .then(response => {
                this.factories = response.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    },
};
</script>
  
<style scoped>
/* Your component-specific styles here */
</style>
  