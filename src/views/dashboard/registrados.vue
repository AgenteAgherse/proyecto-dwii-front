<script setup lang="ts">
import { ref } from "vue";
import axios from 'axios';
import { onMounted } from "vue";
import { router } from "@/router";

var compromisos = ref();
var persona = ref();
var compromisoNuevo = ref(false);
var id: any;

onMounted(() => {
    
    id = localStorage.getItem('id');
    if (id === '' || id === undefined) {
        router.push('/login');
    }

    axios({
    method: 'get',
    url: `http://localhost/proyecto-dwii/Controller/PersonasController.php?inscrito=true`,
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
    
});


async function eliminarParticipacion(compromiso: number) {
    console.log(`${compromiso}`)
    await axios({
        method: 'get',
        url: `http://localhost/proyecto-dwii/Controller/ParticipanteController.php?eliminar_compromiso=true&compromiso=${compromiso}`,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': id
        }
    }).then((res) => {
        location.reload();
    })
    .catch((error) => {
        alert(`Error al momento de salir del evento. ${error}`);
    })
}

</script>

<template>
    <v-row>
        <v-col cols="12"> 
            <v-card elevation="0">
                <h2 class="text-center">Compromisos a Asistir</h2>
                <v-table>
                    <thead class="text-center">
                        <tr>
                            <th class="text-center">Compromiso</th>
                            <th class="text-center">Días</th>
                            <th class="text-center">Horario</th>
                            <th class="text-center">Lugar</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in compromisos" :key="item.name">
                            <td class="text-center">{{ item.titulo }}</td>
                            <td class="text-center">{{ item.fecha_inicio }} / {{ item.fecha_fin }}</td>
                            <td class="text-center">{{ item.hora_inicio }} / {{ item.hora_fin }}</td>
                            <td class="text-center">{{ item.lugar }}</td>
                            <td class="d-flex justify-center"><v-btn size="large" rounded="pill" color="error" class="rounded-pill" type="submit" flat @click="eliminarParticipacion(item.idcompromiso)">Salir</v-btn></td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-col>
    </v-row>
</template>