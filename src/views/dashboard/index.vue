<script setup lang="ts">
import { ref } from "vue";
import axios from 'axios';
import { onMounted } from "vue";
import { router } from "@/router";

var compromisos = ref();
var persona = ref();
var compromisoNuevo = ref(false);
const id = localStorage.getItem('id');
const nuevo = ref({
    'fecha_inicio': '',
    'fecha_fin': '',
    'hora_inicio': '',
    'hora_fin': '',
    'titulo': '',
    'descripcion': '',
    'lugar': '',
    'modalidad': '',
    'capacidad': 0
});

onMounted(() => {
    // En caso que el usuario no tenga una id correctamente.
    const id = localStorage.getItem('id');
    if (id === '' || id === undefined) {
        router.push('/login');
    }
    

    axios({
    method: 'get',
    url: 'http://localhost/proyecto-dwii/Controller/CompromisoController.php',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': id
    }
    }).then(response => {
        console.log(response.data);
        compromisos.value = response.data;
    }).catch(error => {
        console.error(error);
    });
    
    axios({
        method: 'get',
        url: 'http://localhost/proyecto-dwii/Controller/PersonasController.php',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': id
        }
        }).then(response => {
            persona.value = response.data;
            
        }).catch(error => {
            console.error(error);
        });
    });

function mostrarModal() {
    compromisoNuevo.value = !compromisoNuevo.value;
}

async function generarCompromiso() {
    console.log(nuevo.value);
    await axios({
        method: 'post',
        url: 'http://localhost/proyecto-dwii/Controller/CompromisoController.php',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': id
        },
        data: nuevo.value,

        }).then(response => {
            location.reload();
            
        }).catch(error => {
            console.error(error);
    })
    .then((res) => {
        console.log('exito');
    })
    .catch((error) => {
        console.error(error);
    });
    
}

</script>

<template>
    <v-row class="mb-3">
        <h3>Mis Compromisos</h3>
    </v-row>

    
    <div v-for="compromiso in compromisos">
        <v-row>
            <v-col cols="12">
                <div>
                    <v-row justify="space-around">
                    <v-card elevation="0">
                        <v-card-text>
                        <div class="font-weight-bold ml-1 mb-2">{{ compromiso.titulo }}</div>
                        <v-timeline density="compact">
                            <v-timeline-item>
                            <div class="mb-4">
                                <div class="font-weight-normal">
                                <strong>{{ `Detalles: ${compromiso.descripcion}` }}</strong>
                                </div>
                                {{`Lugar: ${compromiso.lugar}`}}
                                <br>
                                {{ `Modalidad: ${compromiso.modalidad}` }}
                                <br>
                                {{ `Fecha: ${compromiso.fecha_inicio}/${compromiso.fecha_fin}` }}
                                <br>
                                {{ `Horario: ${compromiso.hora_inicio}-${compromiso.hora_fin}` }}
                            </div>
                            <v-col class="d-flex justify-center">
                                <v-btn size="large" rounded="pill" color="primary" class="rounded-pill" type="submit" flat @click="router.push(`/compromisos/${compromiso.idcompromiso}`)">Ver Detalles</v-btn>
                            </v-col>
                            </v-timeline-item>
                        </v-timeline>
                        </v-card-text>

                    </v-card>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </div>

    <v-row class="mt-2" justify="space-around">
        <v-col cols="12">
            <v-btn size="large" rounded="pill" color="primary" class="rounded-pill" block type="submit" flat @click="mostrarModal">Agregar Compromiso</v-btn>
        </v-col>
    </v-row>

    <v-dialog v-model="compromisoNuevo" max-width="500px">
      <v-card>
        <v-card-title class="headline">Generar Compromiso</v-card-title>
  
        <v-row class="d-flex justify-center align-center">
            <v-col cols="11">
                <v-label class="font-weight-medium mb-1">Titulo</v-label>
                <v-text-field variant="outlined" class="pwdInput" hide-details color="primary" placeholder="Ingrese título" v-model="nuevo.titulo" required></v-text-field>
            </v-col>
            <v-col cols="11">
                <v-label class="font-weight-medium mb-1">Descripción</v-label>
                <v-text-field variant="outlined" class="border-borderColor" type="text" placeholder="Ingrese descripción" hide-details v-model="nuevo.descripcion"
                    color="primary" required></v-text-field>
            </v-col>
            <v-col cols="11">
                <v-label class="font-weight-medium mb-1">Día de Inicio</v-label>
                <v-text-field variant="outlined" class="border-borderColor" type="date" hide-details v-model="nuevo.fecha_inicio"
                    color="primary" required></v-text-field>
            </v-col>
            <v-col cols="11">
                <v-label class="font-weight-medium mb-1">Día de Finalización</v-label>
                <v-text-field variant="outlined" class="border-borderColor" type="date" hide-details v-model="nuevo.fecha_fin"
                    color="primary" required></v-text-field>
            </v-col>
            <v-col cols="11">
                <v-label class="font-weight-medium mb-1">Hora de Inicio</v-label>
                <v-text-field variant="outlined" class="border-borderColor" type="time" hide-details v-model="nuevo.hora_inicio"
                    color="primary" required></v-text-field>
            </v-col>
            <v-col cols="11">
                <v-label class="font-weight-medium mb-1">Hora de Finalización</v-label>
                <v-text-field variant="outlined" class="border-borderColor" type="time" hide-details v-model="nuevo.hora_fin"
                    color="primary" required></v-text-field>
            </v-col>
            <v-col cols="11">
                <v-label class="font-weight-medium mb-1">Lugar</v-label>
                <v-text-field variant="outlined" class="border-borderColor" type="text" hide-details placeholder="Ingrese Lugar o link" v-model="nuevo.lugar"
                    color="primary" required></v-text-field>
            </v-col>
            <v-col cols="11">
                <v-label class="font-weight-medium mb-1">Modalidad</v-label>
                <v-select variant="outlined" hide-details color="primary" :items="['Presencial', 'Virtual']" v-model="nuevo.modalidad"/>
            </v-col>
            <v-col cols="11">
                <v-label class="font-weight-medium mb-1">Capacidad</v-label>
                <v-text-field variant="outlined" class="border-borderColor" type="number" hide-details placeholder="Ingrese Capacidad" min="0" v-model="nuevo.capacidad"
                    color="primary" required></v-text-field>
            </v-col>

            <v-col cols="11">
                <v-btn size="large" rounded="pill" color="primary" class="rounded-pill" block type="submit" @click="generarCompromiso">Generar Compromiso</v-btn>
            </v-col>
        </v-row>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="outlined" text @click="mostrarModal">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>