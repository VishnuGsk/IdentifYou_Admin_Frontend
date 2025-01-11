<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentRoute = ref(router.currentRoute.value.path)

const navItems = [
  { title: 'Mentor Management', icon: 'mdi-account-tie', path: '/mentors' },
  { title: 'Mentee Management', icon: 'mdi-account-school', path: '/mentees' },
  { title: 'Program Management', icon: 'mdi-book-education', path: '/programs' },
  { title: 'Schedule Management', icon: 'mdi-book-education', path: '/schedules' },
]
</script>

<template>
  <div class="pa-4">
    <div class="text-center mb-6">
      <h1 class="text-h5 font-weight-bold primary--text">Identifyou</h1>
      <div class="text-subtitle-2 text-medium-emphasis">Admin Panel</div>
    </div>

    <v-list nav>
      <v-list-item
        v-for="item in navItems"
        :key="item.path"
        :to="{ path: item.path }"
        class="mb-2"
        rounded="lg"
        active-class="v-list-item--active"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>


<style scoped>
.v-list-item--active {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.2));
}
</style>