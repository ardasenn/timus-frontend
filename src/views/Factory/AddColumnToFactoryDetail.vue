<template>
    <v-container>
        <v-form ref="form" v-model="valid">
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model="name" label="Name" outlined></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <h3>Data Type</h3>
                    <v-select v-model="datatype" :items="types" label="DataType" required></v-select>
                </v-col>

            </v-row>
            <v-snackbar v-model="notification.show" :color="notification.color">
                {{ notification.message }}
                <v-btn text @click="notification.show = false">Close</v-btn>
            </v-snackbar>
            <v-btn @click="add" color="blue">Add Column to Factory Detail </v-btn>
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
            datatype: "",
            types: ["integer", "bigint", "decimal", "numeric", "real", "double precision",
                "character varying", "character", "text", "timestamp", "date", "time",
                "interval", "boolean", "integer[]", "text[]", "json", "jsonb", "uuid", "hstore"],

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
        add() {

            const data = {
                name: this.name,
                dataType: this.datatype
            }
            console.log("🚀 ~ file: AddColumnToFactoryDetail.vue:56 ~ add ~ data:", data)

            api.post(`/factory-detail/insert`, data).then(res => {
                this.showNotification(res.data, "succes")
                setTimeout(() => {
                    this.$router.push('/factory');
                }, 3000)

            }).catch((err) => {
                if (err.response.status === 401) {
                    store.setAuthenticate(false);
                    this.$router.push('/');
                }
                this.showNotification(`Add failed : ${err.response.data.message}`)
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