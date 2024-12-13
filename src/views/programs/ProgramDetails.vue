<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'


onMounted(() => {
  // In a real application, fetch mentor details using route.params.id
  console.log('Mentor ID:', route.params.id)
})
</script>

<template>
  <v-container fluid class="pa-6">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="glass-card">
          <v-card-text class="text-center">
            <v-avatar size="120" color="primary" class="mb-4">
              <span class="text-h4 text-white">{{ mentor.name.charAt(0) }}</span>
            </v-avatar>
            <h2 class="text-h5 mb-2">{{ mentor.name }}</h2>
            <p class="text-subtitle-1 text-medium-emphasis">{{ mentor.expertise }}</p>
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
                  <div class="text-subtitle-2 text-medium-emphasis">Experience</div>
                  <div>{{ mentor.experience }}</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="mb-4">
                  <div class="text-subtitle-2 text-medium-emphasis">Rating</div>
                  <div class="d-flex align-center">
                    {{ mentor.rating }}
                    <v-rating
                      :model-value="mentor.rating"
                      color="amber"
                      density="compact"
                      half-increments
                      readonly
                      class="ms-2"
                    ></v-rating>
                  </div>
                </div>
                <div>
                  <div class="text-subtitle-2 text-medium-emphasis">Mentees</div>
                  <div>Current: {{ mentor.currentMentees }} / Total: {{ mentor.totalMentees }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="glass-card">
          <v-card-title>Skills</v-card-title>
          <v-card-text>
            <v-chip
              v-for="skill in mentor.skills"
              :key="skill"
              class="me-2 mb-2"
              color="primary"
              variant="outlined"
            >
              {{ skill }}
            </v-chip>
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