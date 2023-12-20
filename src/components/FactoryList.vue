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
import { useAppStore } from "@/store/app"
const store = useAppStore();
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
            this.$router.push({
                name: 'Details',
                params: { id: item.id },
            });
        },
        editFactory(item) {
            this.$router.push({
                name: 'FactoryUpdate',
                params: { id: item.id },
            });
        },
        deleteFactory(item) {
            api.delete(`/factory/${item.id}`).then(res => {
                this.showNotification(res.data, "succes")
                setTimeout(() => {
                    this.$router.push('/factory');
                }, 3000)
            }).catch((err) => {
                if (err.response.status === 401) {
                    store.setAuthenticate(false);
                    this.$router.push('/');
                }
                this.showNotification(`delete failed : ${err.response.data.message}`)
                console.log(err.response.data.message)
            })
        },
    },
    created() {
        api.get('/factory')
            .then(response => {
                this.factories = response.data;
            })
            .catch(error => {
                if (error.response.status === 401) {
                    store.setAuthenticate(false);
                    this.$router.push('/');
                }
                console.error('Error fetching data:', error);
            });
    },
};
</script>
  
<style scoped>
/* Your component-specific styles here */
</style>
  