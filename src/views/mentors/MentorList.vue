<script setup lang="ts">
        import { ref, onMounted } from 'vue'
        import { useRouter } from 'vue-router'
        import axios from 'axios'
        const router = useRouter()
        const search = ref('')
        const mentors = ref([])
        
        const headers = [
          { title: 'Full Name', key: 'fullName', align: 'start', sortable: true },
          { title: 'Email', key: 'email', align: 'start', sortable: true },
          { title: 'Phone', key: 'phoneNumber', align: 'start', sortable: true },
          { title: 'Status', key: 'status', align: 'start', sortable: true },
          { title: 'Actions', key: 'actions', align: 'end', sortable: false },
        ];

        const fetchMentors = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/mentors`);
            // Transform data to include full name
            mentors.value = response.data.data.map((mentor: any) => ({
              ...mentor,
              fullName: `${mentor.firstName} ${mentor.lastName}`, // Combine firstName and lastName
              status: mentor.status === 'ACTIVE' ? 'Active' : 'Inactive', // Normalize status
            }));
          } catch (error) {
            console.error('Error fetching mentors:', error);
          }
        };
        onMounted(() => {
          fetchMentors()
        })
        const viewDetails = (id: string) => {
          router.push({ name: 'mentor-details', params: { id } })
        }
</script>

<template>
  <div class="mentor-list">
    <v-container fluid class="pa-6">
      <v-card class="glass-card">
        <v-card-title class="d-flex justify-space-between align-center pa-6">
          <span class="text-h5">Mentors</span>
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
          :items="mentors"
          :search="search"
          hover
          class="mentor-table"
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
              @click="viewDetails(item.userID)"
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