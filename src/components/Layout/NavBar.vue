<script setup lang="ts">
import { ref } from 'vue';

const counter = ref<number>(0)

function increment() {
    counter.value++
}
</script>
<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="logo">SUGOI</div>

    <!-- Menú desktop -->
    <ul class="nav-links">
      <li v-for="item in menuItems" :key="item.label">
        <a :href="item.link">{{ item.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface MenuItem {
  label: string;
  link: string;
}

export default defineComponent({
  name: 'Navbar',
  setup() {
    const menuItems: MenuItem[] = [
      { label: 'Home', link: '#' },
      { label: 'About', link: '#' },
      { label: 'Services', link: '#' },
      { label: 'Contact', link: '#' },
    ];

    return { menuItems };
  },
});
</script>

<style scoped>
/* Navbar pegado arriba */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000000;
  padding: 15px 60px;
  font-family: 'Arial Black', sans-serif;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.7);
  z-index: 1000;
  color: white;
}

/* Logo estilo manga */
.logo {
  font-size: 2.5rem;
  font-weight: bold;
  cursor: pointer;
  color: #ffffff;
  text-shadow:
    2px 2px 0 #ff0000,
    -2px 2px 0 #ff0000,
    2px -2px 0 #ff0000,
    -2px -2px 0 #ff0000;
  transition: transform 0.3s, text-shadow 0.3s;
}

.logo:hover {
  transform: scale(1.1) rotate(-2deg);
  text-shadow:
    0 0 10px #ff1a1a,
    0 0 20px #ff3b3b,
    0 0 30px #ff0000;
}

/* Links estilo manga */
.nav-links {
  list-style: none;
  display: flex;
  gap: 40px;
}

.nav-links li a {
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
  padding: 6px 16px;
  border: 2px solid transparent;
  border-radius: 6px;
  position: relative;
  transition: all 0.3s ease-in-out;
  font-family: 'Arial Black', sans-serif;
}

/* Hover estilo manga: outline rojo + sombra tipo tinta */
.nav-links li a:hover {
  color: #ff0000;
  border: 2px solid #ff0000;
  text-shadow: 0 0 5px #ff0000, 0 0 10px #ff6666;
  transform: scale(1.05);
  background-color: none;
}

/* Subrayado tipo manga (efecto línea de acción) */
.nav-links li a::after {
  content: '';
  position: absolute;
  width: 0%;
  height: 3px;
  bottom: -6px;
  left: 0;
  background-color: #ff0000;
  border-radius: 2px;
  transition: width 0.3s ease-in-out;
}

.nav-links li a:hover::after {
  width: 100%;
}
</style>
