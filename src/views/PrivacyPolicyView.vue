<script setup lang="ts">
/**
 * Vista de Política de Privacidad
 * Diseño Neo-Brutalismo Editorial Japonés
 */
</script>

<template>
  <div class="legal-view">
    <header class="legal-header">
      <div class="container">
        <h1 class="legal-title">POLÍTICA DE PRIVACIDAD <span class="jp-text">プライバシーポリシー</span></h1>
        <div class="disclaimer-banner">
          <p><strong>IMPORTANTE:</strong> Esta página tiene inicialmente fines exclusivamente <strong>EDUCATIVOS</strong> por motivos de copyright.</p>
        </div>
      </div>
    </header>

    <main class="legal-content container">
      <section class="legal-section">
        <h2 class="section-title">1. INTRODUCCIÓN</h2>
        <p>En SUGOI, nos tomamos muy en serio la privacidad de nuestros usuarios. Este documento detalla cómo tratamos la información en este entorno educativo.</p>
      </section>

      <section class="legal-section">
        <h2 class="section-title">2. DATOS RECOPILADOS</h2>
        <p>Como proyecto educativo, los datos recopilados (como nombres de usuario y selecciones de tracking) se almacenan de forma local o en servidores de prueba con el único propósito de demostrar funcionalidades de desarrollo web.</p>
        <ul class="legal-list">
          <li>Información de perfil (nombre de usuario, email de prueba).</li>
          <li>Preferencias de contenido (Anime/Manga guardados).</li>
          <li>Avatares generados mediante IA.</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2 class="section-title">3. USO DE LA INFORMACIÓN</h2>
        <p>La información se utiliza exclusivamente para:</p>
        <ul class="legal-list">
          <li>Personalizar la experiencia del usuario dentro de la plataforma.</li>
          <li>Simular procesos de registro y seguimiento de contenidos.</li>
          <li>Mejorar las funcionalidades de la interfaz Neo-Brutalista.</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2 class="section-title">4. COOKIES</h2>
        <p>Utilizamos almacenamiento local (LocalStorage) para mantener la sesión del usuario y sus preferencias de diseño sin necesidad de servidores externos complejos, manteniendo la filosofía de prototipo educativo.</p>
      </section>

      <section class="legal-section">
        <h2 class="section-title">5. CONTACTO</h2>
        <p>Al ser un proyecto de curso, para cualquier duda sobre la implementación técnica o el diseño, puedes contactar a través del repositorio oficial del proyecto.</p>
      </section>
    </main>
    <img src="@/assets/images/gif/seriuscat.gif" alt="Serious Cat" class="seriuscat-gif">
  </div>
</template>

<style scoped>
.legal-view {
  position: relative;
  min-height: 100vh;
  padding-bottom: var(--spacing-xxl);
  background-color: var(--color-white-snow);
}

.seriuscat-gif {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 120px;
  height: auto;
  pointer-events: none;
  z-index: 10;
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

  .seriuscat-gif {
    width: 80px;
    bottom: 5px;
    right: 5px;
  }
}
</style>
