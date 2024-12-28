<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import SideNav from './components/SideNav.vue'
import { Eventbus } from './plugins/eventBus';
const theme = useTheme()
const drawer = ref(true)
</script>

<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      permanent
      class="glass-nav"
    >
      <SideNav />
    </v-navigation-drawer>

    <v-main class="main-content">
      <div class="gradient-bg">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.gradient-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #e6f3ff 0%, #ffffff 100%);
}

.glass-nav {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  z-index: 100;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.main-content {
  padding-left: 256px; // Width of the navigation drawer
  transition: padding-left 0.3s ease;
  width: 100%;
  min-height: 100vh;
}

.v-main {
  flex: 1 1 auto;
}
</style>