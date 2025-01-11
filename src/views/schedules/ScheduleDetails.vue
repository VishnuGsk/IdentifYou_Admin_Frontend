<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter()
// Use route params if needed to fetch specific data (for example, by ID)
const route = useRoute();
const loading = ref(true)
const programDetails = ref({
  id: '',
  scheduleTitle: '',
  participantCount: '',
  endTiming: '',
  startTiming: '',
  endDate: '',
  status: '',
  days: [] as string[],
  userID: '',
  venueValue: '',
  gender: '',
  participants: [] as string[],
  expertise: '',
  experience: '',
  rating: 0,
  currentMentees: 0,
  totalMentees: 0,
  skills: [] as string[]
});
const goBack = () => {
  router.push({ name: 'schedules' })
  
}
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
            return `${day}/${month}/${year}`;
          };
const fetchScheduleDetails = async (scheduleId: string, programId: string) => {
  try {

    loading.value = true;
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/schedule/${scheduleId}/${programId}`);
    console.log('Response from API call:', response);
    
    // Extract and transform data from API response
    console.log("Resposne for particular Schedule", response)
    const data = response.data.data;
    programDetails.value = {
      id: data.programID ?? '',
      scheduleTitle: data.scheduleTitle ?? '',
      participantCount: data.participants?.length.toString() ?? '0',
      venueValue: data.venue ?? '',
      endTiming: data.endTime ?? '',
      startTiming: data.startTime ?? '',
      endDate: formatDate(data.endDate)  ?? '',
      status: data.status === 'SCHEDULE#ACTIVE' ? 'Active' : 'Inactive',
      date : formatDate(data.date) ?? '',
      mode: data.mode.toLowerCase() ?? '',
      description: data.description,
      userID: data.userID ?? '',
      durationUnit: data.durationUnit ?? '',
      gender: '', // Gender is not in the current data structure, default to empty
      participants: Array.isArray(data.participants) ? data.participants : [],
      expertise: '', // Expertise is not in the current data structure, default to empty
      experience: '', // Experience is not in the current data structure, default to empty
      rating: 0, // Rating is not in the current data structure, default to 0
      currentMentees: 0, // Current mentees are not in the current data structure, default to 0
      totalMentees: 0, // Total mentees are not in the current data structure, default to 0
      skills: [], // Skills are not in the current data structure, default to empty
    };

  } catch (error) {
    console.error('Error fetching Prgram details:', error);
  } finally {
    loading.value = false;
  }
};

// Setup the event listener in onMounted lifecycle hook
onMounted(() => {
  console.log('Inside schedule: ', route.params.scheduleId); 
  console.log('Inside schedule: ', route.params.programId);
  if (route.params.scheduleId && route.params.programId) {
    fetchScheduleDetails(route.params.scheduleId as string, route.params.programId as string)

  console.log('schedule Data :', programDetails)
  }
   


  

});

</script>

<template>

  <v-container fluid class="pa-6">
    <v-btn
      color="primary"
      variant="text"
      prepend-icon="mdi-arrow-left"
      @click="goBack"
      class="mb-4"
    >
      Back to All Schedules
    </v-btn>
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="glass-card">
          <v-card-text class="text-center">
            <!-- Display Program Details if available -->
            <v-avatar size="120" color="primary" class="mb-4">
              <span class="text-h4 text-white">{{ programDetails.scheduleTitle?.charAt(0) || '?' }}</span>
            </v-avatar>
            <h2 class="text-h5 mb-2">{{ programDetails?.scheduleTitle || 'N/A' }}</h2>
            <p class="text-subtitle-1 text-medium-emphasis">{{ programDetails?.mode || 'N/A' }}</p>
            <v-chip
              :color="programDetails?.status === 'Active' ? 'success' : 'error'"
              class="mt-2"
            >
              {{ programDetails?.status || 'N/A' }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card class="glass-card mb-4">
          <v-card-title>Details</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <div class="mb-4">
                  <div class="text-subtitle-2 text-medium-emphasis">Participant Count</div>
                  <div>{{ programDetails?.participantCount || 'N/A' }}</div>
                </div>
                <div class="mb-4">
                  <div class="text-subtitle-2 text-medium-emphasis">Venue</div>
                  <div>{{ programDetails?.venue || 'N/A' }} {{ programDetails?.venueValue || '' }}</div>
                </div>
                <div class="mb-4">
                  <div class="text-subtitle-2 text-medium-emphasis">Start Timing</div>
                  <div>{{ programDetails?.startTiming || 'N/A' }}</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="mb-4">
                  <div class="text-subtitle-2 text-medium-emphasis"></div>
                  <!-- <div>{{ programDetails?.startTiming || 'N/A' }}</div> -->
                </div>
                <div class="mb-4">
                  <div class="text-subtitle-2 text-medium-emphasis">Date</div>
                  <div>{{ programDetails?.date || 'N/A' }}</div>
                </div>
                
                <div class="mb-4">
                  <div class="text-subtitle-2 text-medium-emphasis">End Timing</div>
                  <div>{{ programDetails?.endTiming || 'N/A' }}</div>
                </div>
                
           
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="glass-card">
          <v-card-title>Description</v-card-title>
          <v-card-text>
            {{ programDetails.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
}
</style>
