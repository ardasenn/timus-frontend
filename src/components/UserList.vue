<template>
    <v-card flat title="Users">
        <template v-slot:text>
            <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
                hide-details></v-text-field>
        </template>
        <v-data-table :headers="headers" :items="users" :search="search">
            <template v-slot:item.id="{ item }">
                <v-row justify="center">
                    <v-btn @click="editUser(item)" color="blue">Edit</v-btn>
                    <v-btn @click="deleteUser(item)" color="red">Delete</v-btn>
                </v-row>
            </template>
        </v-data-table>
        <v-snackbar v-model="notification.show" :color="notification.color">
            {{ notification.message }}
            <v-btn text @click="notification.show = false">Close</v-btn>
        </v-snackbar>
    </v-card>
</template>
  
<script>
import api from "@/services/api";
import { useAppStore } from "@/store/app"
const store = useAppStore();
export default {
    data() {
        return {
            search: '',
            headers: [
                { align: 'start', key: 'name', sortable: false, title: 'Name' },
                { key: 'role', title: 'Role' },
                { key: 'email', title: 'Email' },
                { key: "id", title: "Operations" },
            ],
            users: [],
            notification: {
                show: false,
                message: '',
                color: '',
            },
        };
    },
    methods: {
        editUser(item) {
            this.$router.push({
                name: 'UserUpdate',
                params: { id: item.id },
            });
        },
        deleteUser(item) {
            api.delete(`/User/${item.id}`).then(res => {
                this.showNotification(res.data, "succes")
                setTimeout(() => {
                    this.$router.push('/User');
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
        showNotification(message, color = 'error') {
            this.notification.show = true;
            this.notification.message = message;
            this.notification.color = color;
        },
    },
    created() {
        api.get('/user')
            .then(response => {
                this.users = response.data.map(usr => ({ id: usr._id, name: usr._source.name, email: usr._source.email, role: usr._source.role }))
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
  