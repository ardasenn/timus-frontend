<template>
    <v-card flat title="Details">
        <template v-slot:text>
            <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
                hide-details></v-text-field>
        </template>
        <v-data-table :headers="headers" :items="details" :search="search">
            <template v-slot:item.id="{ item }">
                <v-row justify="center">
                    <v-btn @click="editDetails(item)" color="blue">Edit</v-btn>
                    <v-btn @click="deleteDetails(item)" color="red">Delete</v-btn>
                </v-row>
            </template>
        </v-data-table>
    </v-card>
    <v-snackbar v-model="notification.show" :color="notification.color">
        {{ notification.message }}
        <v-btn text @click="notification.show = false">Close</v-btn>
    </v-snackbar>
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
                { align: 'start', key: 'department', sortable: false, title: 'Department' },
                { key: 'kw', title: 'KW' },
                { key: 'price', title: 'Price' },
                { key: 'isdiscount', title: 'Is Discount' },
                { key: "id", title: "Operations" },
            ],
            details: [],
            notification: {
                show: false,
                message: '',
                color: '',
            },
        };
    },
    methods: {
        editDetails(item) {
            this.$router.push({
                name: 'FactoryDetailUpdate',
                params: { id: item.id },
            });
        },
        deleteDetails(item) {
            api.delete(`/factory-detail/${+item.id}`).then(res => {
                this.showNotification(res.status === 200 ? "deleted" : "failed", "succes")
                setTimeout(() => {
                    this.$router.push('/factory');
                }, 3000)
            }).catch((err) => {
                if (err.response.status === 401) {
                    store.setAuthenticate(false);
                    this.$router.push('/');
                }
                this.showNotification(`delete failed : ${err}`)
            })
        },
        showNotification(message, color = 'error') {
            this.notification.show = true;
            this.notification.message = message;
            this.notification.color = color;
        },
    },
    created() {
        api.get(`/factory-detail`)
            .then(response => {
                this.details = response.data;
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
  