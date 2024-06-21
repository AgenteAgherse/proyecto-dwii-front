<script setup lang="ts">
import { ref } from "vue";
import axios from 'axios';
import { onMounted } from "vue";
import { router } from "@/router";

var participantes = ref();
var persona = ref();
var actas = ref();


var actaNueva = ref(false);
var verActa = ref(false)
var descripcionActa = ref("");

var id: any;
var compromiso_id: any = 0;
const compromiso = ref({
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

const nuevaActa = ref({
    'pertenece': compromiso_id,
    'titulo': '',
    'fecha': '',
    'hora': '',
    'lugar_emision': '',
    'descripcion': ''
});


onMounted(() => {
    id = localStorage.getItem('id');
    if (id === '' || id === undefined) {
        router.push('/login');
    }

    compromiso_id = router.currentRoute.value.params.id;
    if (compromiso_id === '' || compromiso_id === undefined) {
        router.push('/');
    }

    axios({
    method: 'get',
    url: `http://localhost/proyecto-dwii/Controller/CompromisoController.php?specific=${compromiso_id}`,
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': id
    }
    }).then(response => {
        compromiso.value = response.data;
    }).catch(error => {
        console.error(error);
    });

    axios({
    method: 'get',
    url: `http://localhost/proyecto-dwii/Controller/ParticipanteController.php?compromiso=${compromiso_id}`,
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': id
    }
    }).then(response => {
        participantes.value = response.data;
    }).catch(error => {
        console.error(error);
    });
    
    axios({
    method: 'get',
    url: `http://localhost/proyecto-dwii/Controller/ActaController.php?compromiso=${compromiso_id}`,
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': id
    }
    }).then(response => {
        actas.value = response.data;
    }).catch(error => {
        console.error(error);
    });
});

async function eliminarParticipacion(participante: number) {
    await axios({
        method: 'get',
        url: `http://localhost/proyecto-dwii/Controller/ParticipanteController.php?eliminar_compromiso=true&compromiso=${compromiso_id}&participante=${participante}`,
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

function mostrarModal() {
    actaNueva.value = !actaNueva.value;
}


async function generarActa() {
    nuevaActa.value.pertenece = compromiso_id
    await axios({
        method: 'post',
        url: `http://localhost/proyecto-dwii/Controller/ActaController.php`,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': id
        },
        data: nuevaActa.value
    })
    .then((res) => {
        alert('Acta subida con éxito');
        location.reload();
    })
}

function mostrarInformacion(descripcion: string) {
    verActa.value = true;
    descripcionActa.value = descripcion;
}
</script>


<template>
    <!-- Detalles del Compromiso -->
    <v-row class="mb-5">
        <v-col cols="12"> 
            <v-card elevation="25">
                <h2 class="text-center">Detalles del Compromiso</h2>
                <v-table>
                    <thead class="text-center">
                        <tr>
                            <th class="text-center"></th>
                            <th class="text-center">Descripción</th>
                        </tr>     </thead>
                    <tbody class="text-center">
                        <tr>
                            <td><strong>Título</strong></td>
                            <td>{{ compromiso.titulo }}</td>
                        </tr>
                        <tr>
                            <td><strong>Días</strong></td>
                            <td>{{ compromiso.fecha_inicio }} / {{ compromiso.fecha_fin }}</td>
                        </tr>
                        <tr>
                            <td><strong>Horario</strong></td>
                            <td>{{ compromiso.hora_inicio }} / {{ compromiso.hora_fin }}</td>
                        </tr>
                        <tr>
                            <td><strong>Lugar</strong></td>
                            <td>{{ compromiso.modalidad }} - {{ compromiso.lugar }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12"> 
            <v-card elevation="25">
                <h2 class="text-center">Listado de Participantes</h2>
                <v-table>
                    <thead class="text-center">
                        <tr>
                            <th class="text-center">Nombre</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in participantes" :key="item.name">
                            <td class="text-center">{{ item.participante }}</td>
                            <v-col class="d-flex justify-center">
                                <td><v-btn size="large" rounded="pill" color="error" class="rounded-pill" type="submit" flat @click="eliminarParticipacion(item.identificacion)">Eliminar</v-btn></td>
                            </v-col>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-col>
    </v-row>

    <!-- Generación y Listado de Actas -->
    <v-row>
        <v-col cols="12"> 
            <v-card elevation="25">
                
                <h2 class="text-center">Listado de Actas</h2>
                <v-table>
                    <thead class="text-center">
                        <tr>
                            <th class="text-center"><strong>Asunto</strong></th>
                            <th class="text-center"><strong>Lugar</strong></th>
                            <th class="text-center"><strong>Emisión</strong></th>
                            <th class="text-center"><strong>Acciones</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in actas" :key="item.name">
                            <td class="text-center">{{ item.titulo }}</td>
                            <td class="text-center">{{ item.lugar_emision }}</td>
                            <td class="text-center">{{ item.fecha }} {{ item.hora }}</td>
                            <v-col cols="11">
                                <v-btn size="large" color="primary" block type="submit" @click="mostrarInformacion(item.descripcion)">Ver Información</v-btn>
                            </v-col>
                        </tr>
                    </tbody>
                </v-table>


                <v-col cols="12">
                    <v-btn size="large" rounded="pill" color="primary" class="rounded-pill" block type="submit" @click="mostrarModal">Generar Acta</v-btn>
                </v-col>
            </v-card> 
        </v-col>
    </v-row>



    
    <v-dialog v-model="actaNueva" max-width="500px">
      <v-card>
        <v-card-title class="headline">Generar Compromiso</v-card-title>
  
        <v-row class="d-flex justify-center align-center">
            <v-col cols="11">
                <v-label class="font-weight-medium mb-1">Asunto</v-label>
                <v-text-field variant="outlined" class="border-borderColor" type="text" hide-details color="primary" v-model="nuevaActa.titulo" required></v-text-field>
            </v-col>
            <v-col cols="11">
                <v-label class="font-weight-medium mb-1">Descripción de Acta</v-label>
                <v-textarea clearable placeholder="Ingrese texto de descripción de acta." v-model="nuevaActa.descripcion"></v-textarea>
            </v-col>
            <v-col cols="11">
                <v-label class="font-weight-medium mb-1">Fecha de Emisión</v-label>
                <v-text-field variant="outlined" class="border-borderColor" type="date" hide-details color="primary" :min="compromiso.fecha_inicio" :max="compromiso.fecha_fin" v-model="nuevaActa.fecha" required></v-text-field>
            </v-col>
            <v-col cols="11">
                <v-label class="font-weight-medium mb-1">Hora de Emisión</v-label>
                <v-text-field variant="outlined" class="border-borderColor" type="time" hide-details color="primary" v-model="nuevaActa.hora" required></v-text-field>
            </v-col>
            <v-col cols="11">
                <v-label class="font-weight-medium mb-1">Lugar de Emisión</v-label>
                <v-text-field variant="outlined" class="border-borderColor" type="text" hide-details color="primary" v-model="nuevaActa.lugar_emision" required></v-text-field>
            </v-col>
            <v-col cols="11">
                <v-btn size="large" rounded="pill" color="primary" class="rounded-pill" block type="submit" @click="generarActa">Generar Acta</v-btn>
            </v-col>
        </v-row>
        <v-card-actions>
            
          <v-spacer></v-spacer>
          <v-btn color="outlined" text @click="mostrarModal">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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