<template>
    <v-container>
        <v-form ref="form" v-model="valid">
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model="department" label="Department" outlined></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="kw" label="Kw" outlined required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="price" label="Price" outlined required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-checkbox v-model="isdiscount" label="Is Discount" required></v-checkbox>
                </v-col>
                <v-col cols="12" md="6">
                    <h3>Factory</h3>
                    <v-select v-model="factoryId" :items="factoryOptions" label="Factory" required></v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <h3>Date End</h3>
                    <v-date-picker v-model="daterange" label="daterange" outlined class="custom-datepicker"
                        required></v-date-picker>
                </v-col>
            </v-row>
            <v-snackbar v-model="notification.show" :color="notification.color">
                {{ notification.message }}
                <v-btn text @click="notification.show = false">Close</v-btn>
            </v-snackbar>
            <v-btn @click="update" color="blue">Update Detail</v-btn>
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
            daterange: null,
            isdiscount: 0,
            price: 0,
            kw: "",
            department: "",
            factoryId: "",
            factoryOptions: [],
            notification: {
                show: false,
                message: '',
                color: '',
            },
        };
    },
    created() {
        api.get(`/factory`).then(res => {
            this.factoryOptions = res.data.map(factory => { return { props: { subtitle: factory.name }, title: factory.id } });

        }).catch((err) => {
            if (err.response.status === 401) {
                store.setAuthenticate(false);
                this.$router.push('/');
            }
            this.showNotification(`Get failed : ${err.response.data.message}`)
            console.log(err.response.data.message)
        })
        const id = this.$route.params.id;
        api.get(`/factory-detail/${id}`).then(res => {
            const data = res.data[0]

            this.isdiscount = data.isdiscount
            this.price = +data.price
            this.kw = +data.kw
            this.department = data.department
            this.factoryId = data.factoryid
        }).catch(err => {
            if (err.response.status === 401) {
                store.setAuthenticate(false);
                this.$router.push('/');
            }
            this.showNotification(`Data failed : ${err.response.data.message}`)
            console.log(err.response.data.message)
        })
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
        update() {
            const data = {
                kw: +this.kw,
                isDiscount: this.isdiscount,
                price: +this.price,
                dateRange: this.formatDate(this.daterange),
                department: this.department,
                factoryId: +this.factoryId
            }

            api.put(`/factory-detail/${this.$route.params.id}`, data).then(res => {
                this.showNotification(res.data, "succes")
                setTimeout(() => {
                    this.$router.push('/factory');
                }, 3000)

            }).catch((err) => {
                if (err.response.status === 401) {
                    store.setAuthenticate(false);
                    this.$router.push('/');
                }
                this.showNotification(`Update failed : ${err.response.data.message}`)
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