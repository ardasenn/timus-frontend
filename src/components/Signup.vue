<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card>
                    <v-card-title class="text-h6">Sign Up</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="signup">
                            <v-text-field v-model="name" label="Name" required></v-text-field>
                            <v-text-field v-model="email" label="Email" required></v-text-field>
                            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
                            <v-btn type="submit" color="primary">Sign Up</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
        };
    },
    methods: {
        signup() {
            // Implement signup logic here
            console.log('Sign Up clicked');
        },
    },
};
</script>
  
<style scoped>
/* Add your custom styles here */
</style>
  