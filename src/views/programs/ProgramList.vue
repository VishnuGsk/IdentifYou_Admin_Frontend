<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';

const router = useRouter()
const search = ref('')

const headers = [
  { title: 'Name', key: 'programName', align: 'start', sortable: true },
  { title: 'Description', key: 'description', align: 'start', sortable: true },
  { title: 'Duration', key: 'durationValue', align: 'start', sortable: true },
  {title: 'Start Date', key: 'startDate', align: 'start', sortable: true },
  { title: 'End Date', key: 'endDate', align: 'start', sortable: true },
  { title: 'Benifit', key: 'benefits', align: 'start', sortable: true },
  { title: 'Status', key: 'status', align: 'start', sortable: true },
  // { title: 'Days', key: 'actions', align: 'days', sortable: false },
]

const programs = ref([])

const fetchPrograms = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/programs`);
            // Transform data to include full name
            programs.value = response.data.data.map((program: any) => ({
              ...program,
            programName: program.programName, // Combine firstName and lastName
              status: program.status === 'ACTIVE' ? 'Active' : 'Inactive', // Normalize status
            }));
          } catch (error) {
            console.error('Error fetching mentors:', error);
          }
        };
        onMounted(() => {
          fetchPrograms()
        })
const viewDetails = (id: number) => {
  router.push({ name: 'program-details', params: { id } })
}
</script>

<template>
  <div class="program-list">
    <v-container fluid class="pa-6">
      <v-card class="glass-card">
        <v-card-title class="d-flex justify-space-between align-center pa-6">
          <span class="text-h5">Programs</span>
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            density="comfortable"
            class="max-width-200"
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="programs"
          :search="search"
          hover
          class="program-table"
        >
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="item.status === 'Active' ? 'success' : 'error'"
              size="small"
            >
              {{ item.status }}
            </v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn
              icon
              variant="text"
              size="small"
              color="primary"
              @click="viewDetails(item.id)"
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>


<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.max-width-200 {
  max-width: 200px;
}
</style>