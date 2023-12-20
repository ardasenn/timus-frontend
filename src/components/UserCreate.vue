<template>
    <v-container>
        <v-form ref="form" v-model="valid">
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model="name" label="Name" outlined></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="email" label="Email" outlined required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="password" label="Password" outlined required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="repassword" label="RePassword" outlined required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <h3>ROLE</h3>
                    <v-select v-model="role" :items="roles" label="Role" required></v-select>
                </v-col>

            </v-row>
            <v-snackbar v-model="notification.show" :color="notification.color">
                {{ notification.message }}
                <v-btn text @click="notification.show = false">Close</v-btn>
            </v-snackbar>
            <v-btn @click="create" color="blue">Create User</v-btn>
        </v-form>
    </v-container>
</template>
  
<script>
import api from '@/services/api';

export default {
    data() {
        return {
            valid: false,
            name: "",
            role: "",
            roles: ["ADMIN", "EDITOR"],
            email: "",
            password: null,
            repassword: null,
            notification: {
                show: false,
                message: '',
                color: '',
            },
        };
    },
    methods: {
        showNotification(message, color = 'error') {
            this.notification.show = true;
            this.notification.message = message;
            this.notification.color = color;
        },
        create() {
            if (this.password !== this.repassword) {
                this.showNotification(`Passwords must be match`)
                return;
            }
            const data = {
                name: this.name,
                password: this.password,
                role: this.role,
                email: this.email,
            }

            api.post(`/user`, data).then(res => {
                this.showNotification(res.data, "succes")
                setTimeout(() => {
                    this.$router.push('/user');
                }, 3000)

            }).catch((err) => {
                this.showNotification(`Create failed : ${err.response.data.message}`)
                console.log(err.response.data.message)
            })
        },
    },
};
</script>

<style scoped>
.custom-datepicker {
    width: 100%;
    max-width: 300px;
}
</style>