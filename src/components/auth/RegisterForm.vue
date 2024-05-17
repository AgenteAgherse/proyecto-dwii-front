<script setup lang="ts">
import { ref } from 'vue';
import { router } from '@/router/index';
import axios from 'axios';

const id = localStorage.getItem('id');
if (id !== undefined && id !== null) {
    router.push('/')
}


const checkbox = ref(false);
const user = ref({
    'identificacion': '',
    'nombre': '',
    'apellido': '',
    'tipo_identificacion': '',
    'profesion': '',
});
const usernameErrorMessage = ref('');
const usernameError = ref(false);
const userInfoErrorMessage = ref('');
const userInfoError = ref(false);

const credentials = ref({
    identificacion: '',
    user: '',
    password: '',
});

function verificarUsuario() {
    const username = credentials.value.user
    axios.get(`http://localhost/proyecto-dwii/Controller/UserController.php?findUser=${username}`).then((res) => {
        usernameError.value = res.data
        if (usernameError.value) {
            usernameErrorMessage.value = "Usuario creado anteriormente";
        }
        else {
            usernameErrorMessage.value = "";
        }
    });
}

function verificarIdentificacion() {
    const id = user.value.identificacion
    if (id.length > 0) {
        axios.get(`http://localhost/proyecto-dwii/Controller/PersonasController.php?findId=${id}`).then((res) => {
            userInfoErrorMessage.value = '';
            userInfoError.value = false;
            if(res.data.length > 0) {
                userInfoErrorMessage.value = 'Identificación registrada con anterioridad.';
                userInfoError.value = true;
            }


            console.log(userInfoErrorMessage.value)
        });
    }
    
}

async function registrarUsuario() {
    if (usernameError.value || userInfoError.value) {
        alert('No se puede hacer registro de los datos. Verifique los errorres.');
    }
    else {
        axios.post(`http://localhost/proyecto-dwii/Controller/PersonasController.php`, user.value).then((res) => {
            console.log(res);
            credentials.value.identificacion = user.value.identificacion;
            alert('Persona creada con éxito');
            axios.post(`http://localhost/proyecto-dwii/Controller/UserController.php`, credentials.value).then((res) => {
                console.log(res);
                alert('Usuario creado con éxito');
                router.push('/');
            });
        });
        
    }
}






</script>
<template> 
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface text-h3 px-5 py-3 position-relative text-grey-100">Registro de Usuario</span>
        </div>
    </div>
    <v-row class="d-flex  mb-3">
        <v-col cols="12">
            <v-label class="font-weight-medium mb-1">Nombre</v-label>
            <v-text-field variant="outlined" hide-details color="primary" v-model="user.nombre"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-1">Apellido</v-label>
            <v-text-field variant="outlined" hide-details color="primary" v-model="user.apellido"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-1">Tipo de Identificación</v-label>
            <v-select variant="outlined" hide-details color="primary" :items="['C.C.', 'C.E.', 'T.I.']" v-model="user.tipo_identificacion"/>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-1">Número Identificación</v-label>
            <v-text-field variant="outlined" hide-details color="primary" v-model="user.identificacion" @input="verificarIdentificacion"/>
            <v-label>{{ userInfoErrorMessage }}</v-label>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-1">Profesión</v-label>
            <v-text-field variant="outlined" type="text" hide-details color="primary" v-model="user.profesion"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-divider :thickness="4" color="info"/>
            <strong class="mt-2">Credenciales</strong>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-1">Usuario</v-label>
            <v-text-field variant="outlined" type="text"  hide-details color="primary" placeholder="Ingrese usuario" v-model="credentials.user" @input="verificarUsuario"></v-text-field>
            <v-label>{{ usernameErrorMessage }}</v-label>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-medium mb-1">Contraseña</v-label>
            <v-text-field variant="outlined" type="password"  hide-details color="primary" placeholder="Ingrese contraseña" v-model="credentials.password"></v-text-field>
        </v-col>
        <v-col cols="12" >
            <v-btn color="primary" rounded="pill" size="large" block flat @click="registrarUsuario">Registrarse</v-btn>
        </v-col>
    </v-row>
</template>
