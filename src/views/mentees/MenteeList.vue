<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const search = ref('')

const headers = [
  { title: 'Name', key: 'name', align: 'start', sortable: true },
  { title: 'Interests', key: 'interests', align: 'start', sortable: true },
  { title: 'Progress', key: 'progress', align: 'start', sortable: true },
  { title: 'Status', key: 'status', align: 'start', sortable: true },
  { title: 'Actions', key: 'actions', align: 'end', sortable: false },
]

const mentees = ref([
  {
    id: 1,
    name: 'Alice Johnson',
    interests: 'Web Development',
    progress: '75%',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Bob Lee',
    interests: 'Data Science',
    progress: '50%',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Clara Adams',
    interests: 'Cybersecurity',
    progress: '90%',
    status: 'Active',
  },
])

const viewDetails = (id: number) => {
  router.push({ name: 'mentee-details', params: { id } })
}
</script>

<template>
  <div class="mentee-list">
    <v-container fluid class="pa-6">
      <v-card class="glass-card">
        <v-card-title class="d-flex justify-space-between align-center pa-6">
          <span class="text-h5">Mentees</span>
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
          :items="mentees"
          :search="search"
          hover
          class="mentee-table"
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