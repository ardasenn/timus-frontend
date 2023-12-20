<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="text-h6">Signup</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signup">
              <v-text-field v-model="name" label="Name" required></v-text-field>
              <v-text-field v-model="email" label="Email" required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
              <v-text-field v-model="repassword" label="RePassword" type="password" required></v-text-field>
              <v-btn type="submit" color="primary">Signup</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <h4>If you have an account, please</h4>
            <v-btn @click="goToLogin" text>Login</v-btn>
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
import { useAppStore } from "@/store/app"
const store = useAppStore();
export default {
  data() {
    return {
      email: '',
      password: '',
      repassword: '',
      name: "",
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
    signup() {
      if (this.password !== this.repassword) {
        this.showNotification(`Passwords must be match`)
        return;
      }

      const userData = {
        email: this.email,
        password: this.password,
        name: this.name,
        role: "EDITOR"
      };

      api.post(`/user`, userData).then(res => {
        this.showNotification(res.data, "succes")
        setTimeout(() => {
          this.$router.push('/');
        }, 3000)

      }).catch((err) => {
        if (err.response.status === 401) {
          store.setAuthenticate(false);
          this.$router.push('/');
        }
        this.showNotification(`Create failed : ${err.response.data.message}`)
        console.log(err.response.data.message)
      })
    },
    goToLogin() {
      this.$router.push('/');
    },
  },
};
</script>
