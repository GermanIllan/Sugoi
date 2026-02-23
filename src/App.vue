<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style>
@import './assets/base.css';
@import './assets/main.css';

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
