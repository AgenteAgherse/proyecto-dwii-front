<script setup lang="ts">
import { ref } from "vue";
import axios from 'axios';
import { onMounted } from "vue";
import { router } from "@/router";

var compromisos = ref();
const id = localStorage.getItem('id');

onMounted(() => {
    if (id === '' || id === undefined) {
        router.push('/login');
    }
    axios({
    method: 'get',
    url: 'http://localhost/proyecto-dwii/Controller/CompromisoController.php?others',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': id
    }
    }).then(response => {
        compromisos.value = response.data;
    }).catch(error => {
        console.error(error);
        router.push('/login');
    });
    
});

async function participar(compromiso: number) {
    axios({
    method: 'post',
    url: 'http://localhost/proyecto-dwii/Controller/ParticipanteController.php',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': id
    },
    data: {
        "compromiso": compromiso,
    }
    }).then(response => {
        location.reload();
    }).catch(error => {
        console.error(error);
    });
}
</script>

<template>
    <v-row class="mb-3">
        <h3>Próximos Compromisos</h3>
    </v-row>

    
    <div v-for="compromiso in compromisos">
        <v-row class="mt-4">
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
                                    <strong>{{ `Organizador: ${compromiso.nombre_organizador}` }}</strong>
                                    <br>
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
                            </v-timeline-item>
                        </v-timeline>
                        </v-card-text>
                        <v-col cols="12">
                            <v-btn size="large" rounded="pill" color="success" class="rounded-pill" block type="submit" @click="participar(compromiso.idcompromiso)">Participar</v-btn>
                        </v-col>
                    </v-card>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </div>
</template>