<script setup lang="ts">
import { ref } from "vue";
import axios from 'axios';
import { onMounted } from "vue";
import { router } from "@/router";

var compromisos = ref();
var acta = ref(0);
var titulo = ref('');
var verActa = ref(false);
var id: any;
var descripcionActa = ref('');
const routeBuscarTodas = 'http://localhost/proyecto-dwii/Controller/ActaController.php?actas_hechas=true';
const routeBuscarActa = 'http://localhost/proyecto-dwii/Controller/ActaController.php?buscar_acta=';
const routeBuscarActaTitulo = 'http://localhost/proyecto-dwii/Controller/ActaController.php?buscar_titulo=';

onMounted(() => {
    
    id = localStorage.getItem('id');
    if (id === '' || id === undefined) {
        router.push('/login');
    }

    buscarActa();
    
});


function mostrarInformacion(descripcion: string) {
    verActa.value = true;
    descripcionActa.value = descripcion;
}

async function buscarActa() {
    if (acta.value <= 0 || acta.value === null) {
        await axios({
            method: 'get',
            url: routeBuscarTodas,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Authorization': id
            }
            }).then(response => {
                compromisos.value = response.data;
                console.log(compromisos.value)
            }).catch(error => {
                console.error(error);
            });
    }
    else {
        console.log(routeBuscarActa + acta.value);
        await axios({
            method: 'get',
            url: routeBuscarActa + acta.value,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Authorization': id
            }
            }).then(response => {
                compromisos.value = response.data;
                console.log(compromisos.value)
            }).catch(error => {
                console.error(error);
            });
    }
}

async function buscarPorTitulo() {
    acta.value = 0;
    if (titulo.value === null || titulo.value === undefined || titulo.value.length === 0) {
        await axios({
            method: 'get',
            url: routeBuscarTodas,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Authorization': id
            }
            }).then(response => {
                compromisos.value = response.data;
                console.log(compromisos.value)
            }).catch(error => {
                console.error(error);
            });
    }
    else {
        await axios({
            method: 'get',
            url: routeBuscarActaTitulo + titulo.value,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Authorization': id
            }
            }).then(response => {
                compromisos.value = response.data;
                console.log(compromisos.value)
            }).catch(error => {
                console.error(error);
            });
    }
}
</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-card elevation="20">
                <h2 class="mt-2 ms-5">Buscar Actas</h2>
                <v-col cols="12">
                    <v-label class="font-weight-medium mb-1">Buscar Acta por ID</v-label>
                    <v-text-field variant="outlined" class="border-borderColor" type="number" hide-details color="primary" v-model="acta" :min="0" placeholder="Ingrese el id del acta a buscar" @input="buscarActa"></v-text-field>
                </v-col>
                <v-col class="mt-2" cols="12">
                    <v-label class="font-weight-medium mb-1">Buscar por título</v-label>
                    <v-text-field variant="outlined" class="border-borderColor" type="text" hide-details color="primary" v-model="titulo" placeholder="Ingrese el título del acta" @input="buscarPorTitulo"></v-text-field>
                </v-col>
            </v-card>
        </v-col>
        
        <v-col cols="12"> 
            <v-card elevation="0">
                <h2 class="text-center">Actas Generadas</h2>
                <v-table>
                    <thead class="text-center">
                        <tr>
                            <th class="text-center">Código Acta</th>
                            <th class="text-center">Compromiso</th>
                            <th class="text-center">Título</th>
                            <th class="text-center">Emisión</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in compromisos" :key="item.name">
                            <td class="text-center">{{ item.idacta }}</td>
                            <td class="text-center">{{ item.compromiso }}</td>
                            <td class="text-center">{{ item.titulo }}</td>
                            <td class="text-center">{{ item.fecha }}  {{ item.hora }}</td>
                            <td class="d-flex justify-center"><v-btn size="large" rounded="pill" color="primary" class="rounded-pill" type="submit" flat @click="mostrarInformacion(item.descripcion)">Ver Acta</v-btn></td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-col>
    </v-row>



    <v-dialog v-model="verActa" max-width="500px">
      <v-card>
        <v-card-title class="headline">Información del Acta</v-card-title>

        <v-col cols="11">
            <v-label class="font-weight-medium mb-1">Información</v-label>
            <v-textarea placeholder="Ingrese texto de descripción de acta." v-model="descripcionActa" readonly></v-textarea>
        </v-col>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="outlined" text @click="verActa = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>