<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from "./components/Layout/NavBar.vue";
import Footer from "./components/Layout/Footer.vue";
</script>

<template>
  <div class="app-shell">
    <NavBar />
    <main class="container">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style scoped >
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  min-height: 0;
}
</style>
