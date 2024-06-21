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

var update = ref({
    'identificacion': 0,
    'usuario': '',
    'nueva_contra': '',
    'confirmar': '',
});

const credentialsErrorMessage = ref('');
const credentialsError = ref(false);
const cambiarContra = ref(false);

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

async function actualizarContra() { 
    const body = {
            'identificacion': update.value.identificacion,
            'usuario': update.value.usuario,
            'nueva_contra': update.value.nueva_contra
        };
        console.log(body);

    if (update.value.nueva_contra !== update.value.confirmar) {
        alert('Las contraseñas no son iguales.');
        return;
    }

    await axios({
        method: 'POST',
        url: `http://localhost/proyecto-dwii/Controller/UserController.php?cambio_contra=true`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: body,
    })
    .then((res) => {
        alert('Cambios Realizados con Éxito');
        cambiarContra.value = false;
        location.reload();
    })
    .catch((error) => {
        alert('Los datos de usuario e identificación no concuerdan');
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
                        <v-btn class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium" @click="cambiarContra = true">Olvidaste tu Contraseña?</v-btn>
                    </div>
                </div>
            </v-col>
            <v-col cols="12">
                <v-btn size="large" rounded="pill" color="primary" class="rounded-pill" block type="submit" @click="ingresar" flat>Ingresar</v-btn>
            </v-col>
        </v-row>
    </div>


    <v-dialog v-model="cambiarContra" max-width="500px">
      <v-card>
        <v-card-title class="headline">Información del Acta</v-card-title>

        <v-col cols="11">
            <v-label class="font-weight-medium mb-1">Ingrese Identificación</v-label>
            <v-text-field type="number" name="identificacion" v-model="update.identificacion" placeholder="Ingrese identificación"></v-text-field>
        </v-col>
        <v-col cols="11">
            <v-label class="font-weight-medium mb-1">Ingrese Usuario</v-label>
            <v-text-field type="text" name="user" v-model="update.usuario" placeholder="Ingrese usuario"></v-text-field>
        </v-col>
        <v-col cols="11">
            <v-label class="font-weight-medium mb-1">Ingrese Nueva Contraseña</v-label>
            <v-text-field type="password" name="password" v-model="update.nueva_contra" placeholder="Ingrese contraseña"></v-text-field>
        </v-col>
        <v-col cols="11">
            <v-label class="font-weight-medium mb-1">Confirmar Nueva Contraseña</v-label>
            <v-text-field type="password" name="password-confirm" v-model="update.confirmar" placeholder="Ingrese contraseña"></v-text-field>
        </v-col>

        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="primary" @click="actualizarContra">Cambiar Contraseña</v-btn>
            <v-btn color="outlined" text @click="cambiarContra = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
