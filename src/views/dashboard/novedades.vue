<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { router } from '@/router';
import { useRoute } from 'vue-router';

var id: any;
const actas = ref([])
var verActa = ref(false);
var descripcionActa = ref("");

onMounted(() => {
    const route = useRoute();
    const idCompromiso = route.params.id;

    id = localStorage.getItem('id');
    if (id === '' || id === undefined || idCompromiso === undefined || idCompromiso === null) {
        router.push('/login');
    }

    axios({
        method: 'GET',
        url: `http://localhost/proyecto-dwii/Controller/ActaController.php?compromiso=${idCompromiso}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': id
        }
    })
    .then((res) => {
        console.log(res.data);
        actas.value = res.data;
    })

});

function mostrarInformacion(descripcion: string) {
    verActa.value = true;
    descripcionActa.value = descripcion;
}
</script>

<template>
    <h1 class="text-center mb-5">Alertas del Compromiso.</h1>
    

    <v-row>
        <v-col cols="12"> 
            <v-card elevation="25">                
                <v-table>
                    <thead class="text-center">
                        <tr>
                            <th class="text-center"><strong>Asunto</strong></th>
                            <th class="text-center"><strong>Emisión</strong></th>
                            <th class="text-center"><strong>Acciones</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in actas" :key="item.name">
                            <td class="text-center">{{ item.titulo }}</td>
                            <td class="text-center">{{ item.fecha }} {{ item.hora }}</td>
                            <v-col cols="11">
                                <v-btn size="large" color="primary" block type="submit" @click="mostrarInformacion(item.descripcion)">Ver Información</v-btn>
                            </v-col>
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