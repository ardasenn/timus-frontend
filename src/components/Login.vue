<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card>
                    <v-card-title class="text-h6">Login</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="login">
                            <v-text-field v-model="email" label="Email" required></v-text-field>
                            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                            <v-checkbox v-model="rememberMe" label="Remember me"></v-checkbox>
                            <v-btn type="submit" color="primary">Login</v-btn>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <h4>If you don't have an account, please</h4>
                        <v-btn @click="goToSignUp" text>Sign Up</v-btn>
                    </v-card-actions>
                    <v-snackbar v-model="notification.show" :color="notification.color">
                        {{ notification.message }}
                        <v-btn text @click="notification.show = false">Close</v-btn>
                    </v-snackbar>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import api from "../services/api";

export default {
    data() {
        return {
            email: '',
            password: '',
            rememberMe: false,
            notification: {
                show: false,
                message: '',
                color: '',
            },
        };
    },
    mounted() {
        const savedCredentials = localStorage.getItem('credentials');
        if (savedCredentials) {
            const { email, password } = JSON.parse(savedCredentials);
            this.email = email;
            this.password = password;
            this.rememberMe = true;
        }
    },
    methods: {
        showNotification(message, color = 'error') {
            this.notification.show = true;
            this.notification.message = message;
            this.notification.color = color;
        },
        login() {
            if (!this.email || !this.password) {
                this.showNotification('Email and password are required');
                return;
            }

            const userData = {
                email: this.email,
                password: this.password,
            };
            console.log("api", api)
            api.post("/auth", userData)
                .then(response => {
                    if (this.rememberMe) {
                        const credentials = JSON.stringify(userData);
                        localStorage.setItem('credentials', credentials);
                    }

                    console.log(response.data);
                })
                .catch(error => {
                    this.showNotification('Login failed. Please check your credentials.', 'error');
                    console.error(error);
                });
        },
        goToSignUp() {
            this.$router.push('/signup');
        },
    },
};
</script>
  
<style scoped>
/* Add your custom styles here */
</style>
  