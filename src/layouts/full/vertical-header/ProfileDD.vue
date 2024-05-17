<script setup lang="ts">
import { UserIcon, MailIcon, ListCheckIcon } from 'vue-tabler-icons';
import { router } from '@/router/index';

function deleteCredentials() {
    localStorage.removeItem('id');
    const data = localStorage.getItem('id');
    router.push('/login');
}
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn class="" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <img src="@/assets/images/profile/user-1.jpg" height="35" alt="user" />
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="xl" width="200" elevation="10" class="mt-2">
            <div class="pt-4 pb-4 px-5 text-center">
                <v-btn to="/login" color="primary" variant="outlined" class="rounded-pill" block @click="deleteCredentials">Logout</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>
