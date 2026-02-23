<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Footer Top Section -->
      <div class="footer-top">
        <!-- Brand Section -->
        <div class="footer-brand">
          <h3 class="footer-logo">SUGOI すごい</h3>
          <p class="footer-tagline">Tu destino definitivo para anime, manga y cultura japonesa</p>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h4 class="footer-title">Enlaces Rápidos</h4>
          <ul class="footer-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/anime">Anime</a></li>
            <li><a href="/manga">Manga</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        <!-- Categories -->
        <div class="footer-section">
          <h4 class="footer-title">Categorías</h4>
          <ul class="footer-links">
            <li><a href="/action">Acción</a></li>
            <li><a href="/romance">Romance</a></li>
            <li><a href="/shonen">Shōnen</a></li>
            <li><a href="/seinen">Seinen</a></li>
          </ul>
        </div>

        <!-- Social -->
        <div class="footer-section">
          <h4 class="footer-title">Síguenos</h4>
          <div class="footer-social">
            <a href="#" class="social-button" aria-label="Twitter">𝕏</a>
            <a href="#" class="social-button" aria-label="Instagram">IG</a>
            <a href="#" class="social-button" aria-label="Discord">DC</a>
            <a href="#" class="social-button" aria-label="YouTube">YT</a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p class="footer-copyright">
          © {{ currentYear }} SUGOI. Todos los derechos reservados.
        </p>
        <div class="footer-legal">
          <a href="/privacy">Privacidad</a>
          <span class="separator">•</span>
          <a href="/terms">Términos</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-black-carbon);
  color: var(--color-white-snow);
  border-top: var(--border-thick);
  margin-top: auto;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-xxl) var(--spacing-lg);
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xxl);
}

.footer-brand {
  max-width: 300px;
}

.footer-logo {
  font-family: var(--font-heading);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-black);
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.footer-tagline {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-accent-gris-azulado);
}

.footer-title {
  font-family: var(--font-heading);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  margin-bottom: var(--spacing-md);
  letter-spacing: 1px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: var(--spacing-sm);
}

.footer-links a {
  color: var(--color-white-snow);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color 0.15s ease, transform 0.15s ease;
  display: inline-block;
}

.footer-links a:hover {
  color: var(--color-primary);
  transform: translateX(4px);
}

.footer-social {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--color-white-snow);
  color: var(--color-black-carbon);
  border: var(--border-thin);
  box-shadow: var(--shadow-offset-sm);
  text-decoration: none;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
  transition: all 0.15s ease-out;
}

.social-button:hover {
  background-color: var(--color-primary);
  color: var(--color-white-snow);
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--color-primary);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-lg);
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  font-size: var(--font-size-sm);
}

.footer-copyright {
  color: var(--color-accent-gris-azulado);
  margin: 0;
}

.footer-legal {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.footer-legal a {
  color: var(--color-white-snow);
  text-decoration: none;
  transition: color 0.15s ease;
}

.footer-legal a:hover {
  color: var(--color-primary);
}

.separator {
  color: var(--color-accent-gris-azulado);
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .footer-top {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }

  .footer-brand {
    max-width: 100%;
  }
}
</style>
