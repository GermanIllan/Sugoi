<script setup lang="ts">
import { ref } from 'vue'
import { useForumStore } from '@/stores/forum'

const emit = defineEmits(['created'])
const forumStore = useForumStore()

const title = ref('')
const author = ref('')
const content = ref('')
const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!title.value || !author.value || !content.value) return

  isSubmitting.value = true
  try {
    await forumStore.createTopic({
      title: title.value,
      author: author.value,
      content: content.value
    })
    title.value = ''
    author.value = ''
    content.value = ''
    emit('created')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="forum-form">
    <h2 class="form-title">Crear Nuevo Tema</h2>
    
    <div class="form-group">
      <label for="title">Título del Tema</label>
      <input 
        id="title" 
        v-model="title" 
        type="text" 
        placeholder="¿De qué quieres hablar?" 
        class="form-input"
        required
      >
    </div>
    
    <div class="form-group">
      <label for="author">Tu Apodo</label>
      <input 
        id="author" 
        v-model="author" 
        type="text" 
        placeholder="Escribe tu nombre..." 
        class="form-input"
        required
      >
    </div>

    <div class="form-group">
      <label for="content">Mensaje</label>
      <textarea 
        id="content" 
        v-model="content" 
        rows="5" 
        placeholder="Escribe el contenido del tema..." 
        class="form-input"
        required
      ></textarea>
    </div>

    <button type="submit" :disabled="isSubmitting" class="button-primary">
      {{ isSubmitting ? 'Publicando...' : 'Publicar Tema' }}
    </button>
  </form>
</template>

<style scoped>
.form-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-lg);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-family: var(--font-heading);
  text-transform: uppercase;
  font-size: var(--font-size-sm);
}

.form-input {
  width: 100%;
  background-color: var(--color-white-snow);
  border: var(--border-thin);
  padding: var(--spacing-md);
  font-family: var(--font-body);
  font-size: var(--font-size-md);
  transition: transform 0.1s ease;
}

.form-input:focus {
  outline: none;
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-offset-sm);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>
