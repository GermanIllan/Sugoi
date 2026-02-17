<script setup lang="ts">
/**
 * Componente Footer
 * Sigue los principios de Neo-Brutalismo Editorial Japonés.
 */
</script>

<template>
  <footer class="footer">
    <!-- Sección Newsletter -->
    <section class="newsletter">
      <div class="newsletter-content">
        <h2 class="newsletter-title">Únete a la Comunidad SUGOI</h2>
        <p class="newsletter-description">Recibe las últimas noticias de anime y manga directamente en tu correo</p>
        <form class="newsletter-form" @submit.prevent>
          <input type="email" placeholder="Tu email" class="newsletter-input" required />
          <button type="submit" class="button-primary newsletter-button">SUSCRIBIRSE</button>
        </form>
      </div>
    </section>

    <!-- Sección Principal del Footer -->
    <div class="footer-main">
      <div class="container footer-grid">
        <!-- Columna Marca -->
        <div class="footer-brand">
          <div class="logo">
            <span class="logo-dot"></span>
            <span class="logo-text">SUGOI</span>
          </div>
          <p class="brand-description">
            Tu portal de Anime y Manga de referencia para fans de habla hispana.
          </p>
        </div>

        <!-- Columna Navegación -->
        <div class="footer-links">
          <h4 class="links-title">Navegación</h4>
          <ul class="links-list">
            <li><a href="#">Blog</a></li>
            <li><a href="#">Calificaciones</a></li>
            <li><a href="#">Videojuegos</a></li>
            <li><a href="#">Merchandising</a></li>
          </ul>
        </div>

        <!-- Columna Comunidad -->
        <div class="footer-links">
          <h4 class="links-title">Comunidad</h4>
          <ul class="links-list">
            <li><a href="#">Foro</a></li>
            <li><a href="#">Discord</a></li>
            <li><a href="#">Contribuir</a></li>
          </ul>
        </div>

        <!-- Columna Redes Sociales -->
        <div class="footer-socials">
          <h4 class="links-title">Síguenos</h4>
          <div class="social-icons">
            <a href="#" class="social-icon">X</a>
            <a href="#" class="social-icon">IG</a>
            <a href="#" class="social-icon">YT</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Barra Inferior -->
    <div class="footer-bottom">
      <div class="container bottom-content">
        <p class="copyright">© 2024 SUGOI — TODOS LOS DERECHOS RESERVADOS</p>
        <div class="legal-links">
          <a href="#">POLÍTICA DE PRIVACIDAD</a>
          <a href="#">TÉRMINOS DE SERVICIO</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-black-carbon);
  color: var(--color-white-snow);
  width: 100%;
  border-top: 4px solid var(--color-primary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

/* Newsletter Section */
.newsletter {
  padding: var(--spacing-xxl) var(--spacing-lg);
  text-align: center;
  border-bottom: var(--border-thin);
  border-color: rgba(255, 255, 255, 0.1);
}

.newsletter-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xs);
  color: var(--color-white-snow);
}

.newsletter-description {
  color: var(--color-accent-gris-azulado);
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-md);
}

.newsletter-form {
  display: flex;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
  gap: 0;
}

.newsletter-input {
  flex: 1;
  padding: var(--spacing-md);
  background: #262626;
  border: var(--border-thin);
  border-right: none;
  color: var(--color-white-snow);
  font-family: var(--font-body);
  outline: none;
}

.newsletter-input:focus {
  border-color: var(--color-primary);
}

.newsletter-button {
  box-shadow: none; /* In form, we might want a flatter look or keep the system shadow */
  border-left: none;
}

/* Footer Main */
.footer-main {
  padding: var(--spacing-xxl) 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: var(--spacing-xxl);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.logo-dot {
  width: 12px;
  height: 12px;
  background-color: var(--color-primary);
  border-radius: 50%;
}

.logo-text {
  font-family: var(--font-heading);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-black);
  font-style: italic;
}

.brand-description {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-accent-gris-azulado);
  max-width: 250px;
}

.links-title {
  font-size: var(--font-size-sm);
  color: var(--color-accent-gris-azulado);
  margin-bottom: var(--spacing-lg);
  letter-spacing: 1px;
}

.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links-list li {
  margin-bottom: var(--spacing-sm);
}

.links-list a {
  color: var(--color-white-snow);
  text-decoration: none;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  transition: color 0.2s ease;
}

.links-list a:hover {
  color: var(--color-primary);
}

.social-icons {
  display: flex;
  gap: var(--spacing-md);
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #262626;
  border: var(--border-thin);
  color: var(--color-white-snow);
  text-decoration: none;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
  transition: all 0.2s ease;
}

.social-icon:hover {
  background-color: var(--color-primary);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--color-white-snow);
}

/* Footer Bottom */
.footer-bottom {
  padding: var(--spacing-lg) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: var(--font-size-xs);
  color: var(--color-accent-gris-azulado);
  font-weight: var(--font-weight-bold);
}

.bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.legal-links {
  display: flex;
  gap: var(--spacing-lg);
}

.legal-links a {
  color: inherit;
  text-decoration: none;
}

.legal-links a:hover {
  color: var(--color-white-snow);
}

/* Responsividad */
@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
  }
}

@media (max-width: 768px) {
  .newsletter-form {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .newsletter-input {
    border-right: var(--border-thin);
  }

  .newsletter-button {
    border-left: var(--border-thick);
  }

  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .footer-brand, .footer-links, .footer-socials {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .brand-description {
    max-width: 100%;
  }

  .social-icons {
    justify-content: center;
  }

  .bottom-content {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
}
</style>
