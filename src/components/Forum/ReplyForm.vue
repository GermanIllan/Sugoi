<script setup lang="ts">
import { ref } from 'vue'
import { useForumStore } from '@/stores/forum'

const props = defineProps<{
  topicId: string
}>()

const forumStore = useForumStore()

const author = ref('')
const content = ref('')
const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!author.value || !content.value) return

  isSubmitting.value = true
  try {
    await forumStore.addReply({
      topicId: props.topicId,
      author: author.value,
      content: content.value
    })
    author.value = ''
    content.value = ''
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="reply-form">
    <h3 class="form-title">Responder al tema</h3>
    
    <div class="form-group">
      <label for="reply-author">Tu Apodo</label>
      <input 
        id="reply-author" 
        v-model="author" 
        type="text" 
        placeholder="Tu nombre..." 
        class="form-input"
        required
      >
    </div>

    <div class="form-group">
      <label for="reply-content">Tu Respuesta</label>
      <textarea 
        id="reply-content" 
        v-model="content" 
        rows="3" 
        placeholder="Escribe lo que piensas..." 
        class="form-input"
        required
      ></textarea>
    </div>

    <button type="submit" :disabled="isSubmitting" class="button-primary">
      {{ isSubmitting ? 'Enviando...' : 'Enviar Respuesta' }}
    </button>
  </form>
</template>

<style scoped>
.form-title {
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-lg);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-family: var(--font-heading);
  text-transform: uppercase;
  font-size: var(--font-size-xs);
}

.form-input {
  width: 100%;
  background-color: #F5F5F5;
  border: var(--border-thin);
  padding: var(--spacing-sm);
  font-family: var(--font-body);
  font-size: var(--font-size-md);
  transition: transform 0.1s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
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
