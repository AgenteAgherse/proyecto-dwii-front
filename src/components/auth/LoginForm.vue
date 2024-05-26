<script setup lang="ts">
import { ref } from 'vue';
import { router } from '@/router/index';
import axios from 'axios';

const id = localStorage.getItem('id');
if (id !== undefined && id !== null) {
    router.push('/')
}

const credentials = ref({
    'user': '',
    'password': '',
})
const credentialsErrorMessage = ref('');
const credentialsError = ref(false);

async function ingresar() {
    await axios.get(`http://localhost/proyecto-dwii/Controller/UserController.php?user=${credentials.value.user}&password=${credentials.value.password}`)
    .then(res => {
        if (res.data.length === 0) {
            credentialsError.value = true;
            credentialsErrorMessage.value = "Error en las credenciales";
            return;
        }
        console.log(res.data);
        localStorage.setItem('id', res.data);
        router.push('/');
        credentialsError.value = false;
    })
    .catch(error => {
        credentialsError.value = true;
        credentialsErrorMessage.value = "Error en las credenciales";
    });
}
</script>

<template>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface text-h3 px-5 py-3 position-relative text-grey-100">Inicio de Sesión</span>
        </div>
    </div>
    <div>
        <v-row class="mb-3">
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Usuario</v-label>
                <v-text-field variant="outlined" class="pwdInput" hide-details color="primary" placeholder="Ingrese usuario" v-model="credentials.user"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Contraseña</v-label>
                <v-text-field variant="outlined" class="border-borderColor" type="password" placeholder="Ingrese contraseña" hide-details
                    color="primary" v-model="credentials.password"></v-text-field>
            </v-col>
            <v-col cols="12" class="text-center">
                <v-label class="font-weight-medium mb-1"><strong>{{ credentialsErrorMessage }}</strong></v-label>
            </v-col>
            <v-col cols="12 " class="py-0">
                <div class="d-flex flex-wrap align-center w-100 ">
                    <div class="ml-sm-auto">
                        <RouterLink to=""
                            class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
                            Olvidaste tu Contraseña?</RouterLink>
                    </div>
                </div>
            </v-col>
            <v-col cols="12">
                <v-btn size="large" rounded="pill" color="primary" class="rounded-pill" block type="submit" @click="ingresar" flat>Ingresar</v-btn>
            </v-col>
        </v-row>
    </div>
</template>
