<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from "./components/Layout/NavBar.vue";
import Footer from "./components/Layout/Footer.vue";
</script>

<template>
  <NavBar />
  <main class="container">
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped >
.container {
  min-height: calc(100vh - 160px);
}
</style>

