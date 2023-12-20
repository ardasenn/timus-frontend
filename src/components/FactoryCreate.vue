<template>
    <v-container>
        <v-form ref="form" v-model="valid">
            <v-row>
                <v-col cols="12" md="6">
                    <h3>Subscription</h3>
                    <v-date-picker v-model="subscription" label="Subscription" outlined class="custom-datepicker"
                        required></v-date-picker>
                </v-col>
                <v-col cols="12" md="6">
                    <h3>End of Subscription</h3>
                    <v-date-picker v-model="endofsubscription" outlined label="End of Subscription"
                        class="custom-datepicker" required></v-date-picker>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="name" label="Name" outlined></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="employeecount" label="Employee Count" outlined required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-checkbox v-model="isfree" label="Is Free" required></v-checkbox>
                </v-col>

            </v-row>
            <v-snackbar v-model="notification.show" :color="notification.color">
                {{ notification.message }}
                <v-btn text @click="notification.show = false">Close</v-btn>
            </v-snackbar>
            <v-btn @click="create" color="blue">Add Factory</v-btn>
        </v-form>
    </v-container>
</template>
  
<script>
import api from '@/services/api';
import { useAppStore } from "@/store/app"
const store = useAppStore();

export default {
    data() {
        return {
            valid: false,
            name: "",
            employeecount: 0,
            isfree: false,
            subscription: null,
            endofsubscription: null,
            notification: {
                show: false,
                message: '',
                color: '',
            },
        };
    },
    methods: {
        formatDate(date) {
            const formattedDate = new Date(date);
            return formattedDate.toISOString(); // 'YYYY-MM-DDTHH:mm:ss.SSSZ' formatına dönüştürülecek
        },
        showNotification(message, color = 'error') {
            this.notification.show = true;
            this.notification.message = message;
            this.notification.color = color;
        },
        create() {
            const data = {
                name: this.name,
                employeeCount: +this.employeecount,
                isFree: this.isfree,
                subscription: this.formatDate(this.subscription),
                endOfSubscription: this.formatDate(this.endofsubscription)
            }
            console.log(data, "data")
            api.post("/factory", data).then(res => {
                this.showNotification(res.data, "succes")
                setTimeout(() => {
                    this.$router.push('/factory');
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
    },
};
</script>
  
<style scoped>
.custom-datepicker {
    width: 100%;
    max-width: 300px;
}
</style>
  