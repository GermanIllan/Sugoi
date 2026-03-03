<script setup lang="ts">
/**
 * Vista de Términos de Servicio
 * Diseño Neo-Brutalismo Editorial Japonés
 */
</script>

<template>
  <div class="legal-view">
    <header class="legal-header">
      <div class="container">
        <h1 class="legal-title">TÉRMINOS DE SERVICIO <span class="jp-text">利用規約</span></h1>
        <div class="disclaimer-banner">
          <p><strong>AVISO LEGAL:</strong> Esta plataforma es un proyecto con fines inicialmente <strong>EDUCATIVOS</strong>. No existe relación comercial real.</p>
        </div>
      </div>
    </header>

    <main class="legal-content container">
      <section class="legal-section">
        <h2 class="section-title">1. ACEPTACIÓN DE TÉRMINOS</h2>
        <p>Al acceder a SUGOI, el usuario acepta que esta es una aplicación en desarrollo dentro de un entorno de aprendizaje. El uso de la misma es para fines recreativos y educativos.</p>
      </section>

      <section class="legal-section">
        <h2 class="section-title">2. PROPIEDAD INTELECTUAL</h2>
        <p>Todo el contenido visual relacionado con obras de anime y manga pertenece a sus respectivos autores y editoriales. SUGOI utiliza este material bajo el concepto de <strong>Fair Use</strong> educativo.</p>
        <ul class="legal-list">
          <li>Imágenes y descripciones: Propiedad de sus creadores originales.</li>
          <li>Interfaz y Código: Propiedad de los desarrolladores del proyecto.</li>
          <li>Avatares generados: Propiedad del usuario basada en modelos de IA.</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2 class="section-title">3. RESPONSABILIDAD DEL USUARIO</h2>
        <p>El usuario se compromete a:</p>
        <ul class="legal-list">
          <li>No utilizar la plataforma para fines ilícitos.</li>
          <li>Respetar la comunidad en las secciones de foro y recomendaciones.</li>
          <li>Entender que las funciones de tracking son para gestión personal de contenidos.</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2 class="section-title">4. LIMITACIÓN DE RESPONSABILIDAD</h2>
        <p>SUGOI no se hace responsable de la pérdida de datos en caso de reinicio de la base de datos local o cambios estructurales en el código del curso.</p>
      </section>

      <section class="legal-section">
        <h2 class="section-title">5. MODIFICACIONES</h2>
        <p>Dado que es un proyecto en constante evolución académica, estos términos pueden ser modificados en cualquier momento para reflejar nuevos aprendizajes o requisitos del curso.</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.legal-view {
  min-height: 100vh;
  padding-bottom: var(--spacing-xxl);
  background-color: var(--color-white-snow);
}

.legal-header {
  padding: var(--spacing-xxl) 0;
  background-color: var(--color-black-carbon);
  color: var(--color-white-snow);
  margin-bottom: var(--spacing-xl);
  border-bottom: var(--border-thick-primary);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.legal-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1;
  margin-bottom: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.jp-text {
  font-size: 0.4em;
  color: var(--color-primary);
  letter-spacing: 4px;
}

.disclaimer-banner {
  background-color: var(--color-primary);
  color: var(--color-white-snow);
  padding: var(--spacing-md);
  border: var(--border-thick);
  box-shadow: 8px 8px 0 var(--color-black-carbon);
  font-family: var(--font-body);
  margin-top: var(--spacing-md);
}

.legal-content {
  background-color: var(--color-white-snow);
}

.legal-section {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  border: var(--border-thick);
  background-color: white;
  box-shadow: 8px 8px 0 var(--color-black-carbon);
}

.section-title {
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  color: var(--color-black-carbon);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-xs);
  border-bottom: var(--border-thin);
  text-transform: uppercase;
}

.legal-list {
  margin-top: var(--spacing-md);
  padding-left: var(--spacing-lg);
}

.legal-list li {
  margin-bottom: var(--spacing-xs);
  position: relative;
}

.legal-list li::before {
  content: "■";
  color: var(--color-primary);
  position: absolute;
  left: -20px;
  font-size: 0.8em;
}

p {
  line-height: var(--line-height-relaxed);
  color: var(--color-black-carbon);
}

@media (max-width: 768px) {
  .legal-header {
    padding: var(--spacing-xl) 0;
  }
  
  .legal-section {
    box-shadow: 4px 4px 0 var(--color-black-carbon);
  }
}
</style>
