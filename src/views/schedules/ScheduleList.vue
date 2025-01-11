<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';


const router = useRouter()
const search = ref('')
const statuses = ref(["All", "Active", "Inactive"]);
const selectedStatus = ref("All");
const headers = [
  { title: 'Name', key: 'scheduleTitle', align: 'start', sortable: true },
  { title: 'Description', key: 'description', align: 'start', sortable: true },
  { title: 'Date', key: 'date', align: 'start', sortable: true },
  {title: 'Start Time', key: 'startTime', align: 'start', sortable: true },
  { title: 'End Time', key: 'endTime', align: 'start', sortable: true },
  { title: 'Mode', key: 'mode', align: 'start', sortable: true },
  { title: 'Status', key: 'status', align: 'start', sortable: true },
   { title: 'Action', key: 'actions', align: 'days', sortable: false },
]

const schedules = ref([])
const filteredSchedules = computed(() => {
      if (selectedStatus.value === "All") return schedules.value;
      return schedules.value.filter(
        (schedule) => schedule.status === selectedStatus.value
      );
    });
const fetchSchedules = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/schedules`);
            console.log('Schedules -- > ', response);
            // Transform data to include full name
            schedules.value = response.data.data.map((schedule : any) => {
              // Format the start date to dd/mm/yyyy
              const formattedStartDate = schedule.date
                ? formatDate(schedule.date)
                : null; // H
               

              return {
                ...schedule,
                date: formattedStartDate, // Use the formatted date
                scheduleTitle: schedule.scheduleTitle, // Retain schedule name
                status: schedule.status === 'SCHEDULE#ACTIVE' ? 'Active' : 'Inactive', // Normalize status,
                mode: schedule.mode.toLowerCase()
              };
            });
          } catch (error) {
            console.error('Error fetching mentors:', error);
          }
        };
        const formatDate = (dateString : any) => {
            if (!dateString || dateString.length !== 8) return 'Invalid Date'; // Ensure proper length
            // Extract year, month, and day
            const year = dateString.substring(0, 4);
            const month = dateString.substring(4, 6);
            const day = dateString.substring(6, 8);

            // Validate if it's a valid date
            const date = new Date(`${year}-${month}-${day}`);
            if (isNaN(date)) return 'Invalid Date'; // Check if date is valid

            // Return in dd/mm/yyyy format
            console.log('Formated Time :', `${day}/${month}/${year}`);
            return `${day}/${month}/${year}`;
          };
        onMounted(() => {
          fetchSchedules()
          
          
        })
const viewDetails = ( scheduleId: string, programId: string) => {
  console.log('This is hte Schedule Id : ', scheduleId);
  
   
  router.push({ name: 'schedule-details', params: { scheduleId, programId }})
}
</script>

<template>
  <div class="schedule-list">
    
    <v-container fluid class="pa-6">
      <v-card class="glass-card">
        
        <v-card-title class="d-flex justify-space-between align-center pa-6">
          <span class="text-h5">Schedules</span>
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
        <div class="d-flex align-center">
          <!-- Status Filter -->
          <v-chip-group
            v-model="selectedStatus"
            class="status-chip-group"
            column
          >
            <v-chip
              v-for="status in statuses"
              :key="status"
              :value="status"
              class="ma-2"
              :color="selectedStatus === status ? 'primary' : 'default'"
              text-color="white"
              outlined
              pill
            >
              {{ status }}
            </v-chip>
          </v-chip-group>
        </div>
        <v-data-table
          :headers="headers"
          :items="filteredSchedules"
          :search="search"
          hover
          class="schedule-table"
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
              @click="viewDetails( item.scheduleID, item.programID)"
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
.status-chip-group {
  display: flex;
  gap: 8px;
}

</style>