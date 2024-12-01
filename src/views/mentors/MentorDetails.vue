<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';
const route = useRoute()
const router = useRouter()

const mentor = ref({
  id: '',
  name: '',
  email: '',
  college: '',
  age: '',
  status: '',
  signUpStatus : '',
  race: '',
  interests: [] as string[],
  address: '',
  educationLevel: '',
  gender: '',
  proofDocumentURL: [] as string[]
})

const loading = ref(true)

const fetchMentorDetails = async (id: string) => {
  try {
    console.log('Test')
    loading.value = true;
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/mentors/${id}`);
    
    // Extract and transform data from API response
    const data = response.data.data[0];
    mentor.value = {
      id: data.userID,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      college: data.college, 
      educationLevel: data.educationLevel,// Assuming college represents expertise
      age: `${new Date().getFullYear() - new Date(data.dob).getFullYear()} years`, // Calculate experience from DOB
      status: data.status === 'ACTIVE' ? 'Active' : 'Inactive',
      race: data.race, // Placeholder if bio isn't part of API data
      interests: data.interests || [],
      address: `${data.addressStreet},\n ${data.city}, \n${data.country}, ${data.zipcode} `, // Placeholder, replace with API data if available
      gender: data.gender, 
      proofDocumentURL: data.proofDocumentURL,
      signUpStatus: data.signupVerification === 'APPROVED' ? 'Approved' : data.signupVerification 
    }

  } catch (error) {
    console.error('Error fetching mentor details:', error);
  } finally {
    loading.value = false;
  }
};

const updateStatus = async(newStatus: string, id: string) => {
  // Simulating an API update
  console.log('Triggerd with ', newStatus);
  mentor.value.status = newStatus
  let requestBody = {
    "id": id,
    "status" : newStatus
  }
  const response = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/mentors`, requestBody);
  console.log('Inside update singup status', response);
}
const updateSignUpStatus = async (newStatus: string, id: string) => {
  // Simulating an API update
  console.log('Triggerd with ', newStatus,id);
  mentor.value.signUpStatus = newStatus
  let requestBody = {
    "id": id,
    "status" : newStatus
  }
  const response = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/mentorSignup`, requestBody);
  console.log('Inside update singup status', response);
}

const goBack = () => {
  router.push({ name: 'mentors' })
}

onMounted(() => {
  if (route.params.id) {
    fetchMentorDetails(route.params.id as string)
  }
})
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
      Back to Mentors
    </v-btn>

    <v-row v-if="!loading">
      <v-col cols="12" md="4">
        <v-card class="glass-card">
          <v-card-text class="text-center">
            <v-avatar size="120" color="primary" class="mb-4">
              <span class="text-h4 text-white">{{ mentor.name.charAt(0) }}</span>
            </v-avatar>
            <h2 class="text-h5 mb-2">{{ mentor.name }}</h2>
            <p class="text-subtitle-1 text-medium-emphasis">{{ mentor.educationLevel }}</p>
            <p class="text-subtitle-1 text-medium-emphasis">{{ mentor.college }}</p>

            <v-chip
              :color="mentor.status === 'Active' ? 'success' : 'error'"
              class="mt-2"
            >
              {{ mentor.status }}
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
                  <div class="text-subtitle-2 text-medium-emphasis">Email</div>
                  <div>{{ mentor.email }}</div>
                </div>
                <div class="mb-4">
                  <div class="text-subtitle-2 text-medium-emphasis">Age</div>
                  <div>{{ mentor.age }}</div>
                </div>  
                <div class="mb-4">
                  <div class="text-subtitle-2 text-medium-emphasis">Race</div>
                  <div>{{ mentor.race }}</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="mb-4">
                  <div class="text-subtitle-2 text-medium-emphasis">Address</div>
                  <div class="d-flex align-center">
                    {{ mentor.address }}
                  </div>
                </div>
                <div>
                  <div class="text-subtitle-2 text-medium-emphasis">Gender</div>
                  <div>{{ mentor.gender }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="glass-card mb-4">
          <v-card-title>Update Status</v-card-title>
          <v-card-text>
            <v-select
              v-model="mentor.status"
              :items="['Active', 'Inactive']"
              label="Status"
              @update:modelValue="(newStatus) => updateStatus(newStatus, mentor.id)"
            ></v-select>
          </v-card-text>
        </v-card>
        <v-card class="glass-card mb-4">
          <v-card-title>Signup Approval</v-card-title>
          <v-card-text>
            <v-select
              v-model="mentor.signUpStatus"
              :items="['Approve', 'Reject']"
              label="Signup Approval Status"
            @update:modelValue="(newStatus) => updateSignUpStatus(newStatus, mentor.id)"
            ></v-select>
          </v-card-text>
        </v-card>
        <v-card class="glass-card" MB-4>
          <v-card-title>Skills</v-card-title>
          <v-card-text>
            <v-chip
              v-for="skill in mentor.interests"
              :key="skill"
              class="me-2 mb-2"
              color="primary"
              variant="outlined"
            >
              {{ skill }}
            </v-chip>
          </v-card-text>
        </v-card>
        <v-card class="glass-card">
          <v-card-title>Proof Document Urls</v-card-title>
          <v-card-text>
            <v-chip
              v-for="doc in mentor.proofDocumentURL"
              :key="doc"
              class="me-2 mb-2"
              color="primary"
     
            >
              {{ doc }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
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