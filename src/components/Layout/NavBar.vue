<script setup lang="ts">
import { ref } from 'vue';

const counter = ref<number>(0)

function increment() {
    counter.value++
}
</script>
<template>
  <h2>NavBar</h2>
  <p>Counter: {{ counter }}</p>
</template>
