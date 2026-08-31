import {
  SITE,
  SOCIAL_LINKS,
  CONTACT_INFO,
  TEAM,
  INTERVIEWS,
  BROADCASTS,
  QUICK_STATS,
  GROWTH_STATS,
} from "./data.js";

// ------------------------------------------------------------------
// Utilidades
// ------------------------------------------------------------------
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function formatFechaLarga(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatFechaCorta(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Iconos en línea (trazo simple, consistentes con el resto del sitio).
const icon = (name, size = 18) => {
  const paths = {
    menu: '<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    "play-circle":
      '<circle cx="12" cy="12" r="10"/><path d="M10 8.5v7l6-3.5-6-3.5Z"/>',
    "file-down":
      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M12 12v6"/><path d="m9 15 3 3 3-3"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    instagram:
      '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    youtube:
      '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33Z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>',
    "arrow-up-right": '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${
    paths[name] || ""
  }</svg>`;
};

// ------------------------------------------------------------------
// Header: sticky background + menú mobile
// ------------------------------------------------------------------
function initHeader() {
  const header = $(".site-header");
  const toggle = $(".site-header__toggle");
  const mobileNav = $("#mobile-nav");

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeMenu = () => {
    mobileNav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = icon("menu", 24);
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.innerHTML = icon(isOpen ? "x" : "menu", 24);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  $$("#mobile-nav a").forEach((a) => a.addEventListener("click", closeMenu));
}

// ------------------------------------------------------------------
// Reveal on scroll — único mecanismo de animación de aparición
// ------------------------------------------------------------------
function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window) || items.length === 0) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

// ------------------------------------------------------------------
// Render: Quiénes somos — estadísticas rápidas
// ------------------------------------------------------------------
function renderQuickStats() {
  const el = $("#quick-stats");
  if (!el) return;
  el.innerHTML = QUICK_STATS.map(
    (s) => `
      <li>
        <span class="about__stat-value">${s.sufijo}${s.valor}</span>
        <span class="about__stat-label">${s.label}</span>
      </li>`
  ).join("");
}

// ------------------------------------------------------------------
// Render: Equipo
// ------------------------------------------------------------------
function renderTeam() {
  const el = $("#team-grid");
  if (!el) return;
  el.innerHTML = TEAM.map(
    (m) => `
      <article class="team__card card reveal">
        <div class="team__photo-wrap">
          <div class="team__photo" role="img" aria-label="Fotografía de ${m.nombre}"></div>
        </div>
        <div class="team__info">
          <h3>${m.nombre}</h3>
          <p class="team__role">${m.rol}</p>
          <p class="team__desc">${m.descripcion}</p>
          ${
            m.instagram
              ? `<a href="${m.instagram}" class="team__social" aria-label="Instagram de ${m.nombre}">${icon(
                  "instagram",
                  16
                )}</a>`
              : ""
          }
        </div>
      </article>`
  ).join("");
}

// ------------------------------------------------------------------
// Render: Entrevistas
// ------------------------------------------------------------------
function renderInterviews() {
  const el = $("#interviews-grid");
  if (!el) return;
  el.innerHTML = INTERVIEWS.map(
    (e) => `
      <article class="interview-card card reveal">
        <div class="interview-card__media">
          <div class="interview-card__image" role="img" aria-label="Entrevista a ${e.entrevistado}"></div>
          <span class="interview-card__number">#${e.numero}</span>
        </div>
        <div class="interview-card__body">
          <h3>${e.entrevistado}</h3>
          <p class="interview-card__meta">Entrevista #${e.numero} · ${formatFechaLarga(e.fecha)}</p>
          <p>${e.descripcion}</p>
          ${
            e.youtubeUrl
              ? `<a href="${e.youtubeUrl}" class="btn btn-outline" target="_blank" rel="noreferrer">${icon(
                  "play-circle"
                )}Ver entrevista</a>`
              : `<span class="interview-card__pending">Próximamente en YouTube</span>`
          }
        </div>
      </article>`
  ).join("");
}

// ------------------------------------------------------------------
// Render: Transmisiones
// ------------------------------------------------------------------
function renderBroadcasts() {
  const el = $("#broadcasts-list");
  if (!el) return;
  el.innerHTML = BROADCASTS.map(
    (b) => `
      <article class="broadcast-row card reveal">
        <div class="broadcast-row__thumb">
          <div class="broadcast-row__image" role="img" aria-label="${b.equipos}"></div>
        </div>
        <div class="broadcast-row__info">
          <p class="eyebrow">${b.competencia}</p>
          <h3>${b.equipos}</h3>
          <p class="broadcast-row__meta">${formatFechaCorta(b.fecha)} · ${b.plataforma} · Resultado: ${b.resultado}</p>
        </div>
        ${
          b.url
            ? `<a href="${b.url}" class="btn btn-outline" target="_blank" rel="noreferrer">${icon(
                "play-circle"
              )}Ver transmisión</a>`
            : `<span class="interview-card__pending">Próximamente</span>`
        }
      </article>`
  ).join("");
}

// ------------------------------------------------------------------
// Render: Prensa — link del dossier
// ------------------------------------------------------------------
function renderDossierLink() {
  const el = $("#dossier-link");
  if (el) el.setAttribute("href", SITE.dossierPdf);
}

// ------------------------------------------------------------------
// Render: Números — contador animado
// ------------------------------------------------------------------
function renderNumbers() {
  const el = $("#numbers-grid");
  if (!el) return;
  el.innerHTML = GROWTH_STATS.map(
    (s) => `
      <li>
        <span class="numbers__value" data-value="${s.valor}" data-sufijo="${s.sufijo}">0</span>
        <span class="numbers__label">${s.label}</span>
      </li>`
  ).join("");

  const counters = $$(".numbers__value", el);
  if (!("IntersectionObserver" in window)) {
    counters.forEach((c) => (c.textContent = `${Number(c.dataset.value).toLocaleString("es-AR")}${c.dataset.sufijo}`));
    return;
  }

  const animate = (node) => {
    const target = Number(node.dataset.value);
    const sufijo = node.dataset.sufijo;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      node.textContent = `${Math.round(target * eased).toLocaleString("es-AR")}${sufijo}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => observer.observe(c));
}

// ------------------------------------------------------------------
// Render: Redes sociales
// ------------------------------------------------------------------
function renderSocial() {
  const grid = $("#social-grid");
  const footerList = $("#footer-social");

  if (grid) {
    grid.innerHTML = SOCIAL_LINKS.map(
      (s) => `
        <a href="${s.url}" target="_blank" rel="noreferrer" class="social__card card reveal">
          <span class="social__icon">${
            s.id === "instagram" || s.id === "youtube" ? icon(s.id, 22) : s.nombre.slice(0, 2).toUpperCase()
          }</span>
          <span class="social__name">${s.nombre}</span>
          <span class="social__user">${s.usuario}</span>
          <span class="social__arrow">${icon("arrow-up-right")}</span>
        </a>`
    ).join("");
  }

  if (footerList) {
    footerList.innerHTML = SOCIAL_LINKS.map(
      (s) => `<li><a href="${s.url}" target="_blank" rel="noreferrer">${s.nombre}</a></li>`
    ).join("");
  }
}

// ------------------------------------------------------------------
// Render: Contacto — motivos, emails
// ------------------------------------------------------------------
function renderContact() {
  const reasonsList = $("#contact-reasons");
  const motivoSelect = $("#motivo");
  const emailPrensa = $("#email-prensa");
  const emailGeneral = $("#email-general");

  if (reasonsList) {
    reasonsList.innerHTML = CONTACT_INFO.motivos.map((m) => `<li>${m.label}</li>`).join("");
  }
  if (motivoSelect) {
    motivoSelect.innerHTML = CONTACT_INFO.motivos
      .map((m) => `<option value="${m.value}">${m.label}</option>`)
      .join("");
  }
  if (emailPrensa) {
    emailPrensa.href = `mailto:${CONTACT_INFO.emailPrensa}`;
    emailPrensa.textContent = CONTACT_INFO.emailPrensa;
  }
  if (emailGeneral) {
    emailGeneral.href = `mailto:${CONTACT_INFO.emailGeneral}`;
    emailGeneral.textContent = CONTACT_INFO.emailGeneral;
  }
}

// ------------------------------------------------------------------
// Formulario de contacto con validación
// ------------------------------------------------------------------
function initContactForm() {
  const form = $("#contact-form");
  if (!form) return;
  const successMsg = $("#contact-success");

  const fields = {
    nombre: { el: $("#nombre"), error: $("#error-nombre"), validate: (v) => v.trim().length > 0 || "Ingresá tu nombre." },
    apellido: { el: $("#apellido"), error: $("#error-apellido"), validate: (v) => v.trim().length > 0 || "Ingresá tu apellido." },
    email: {
      el: $("#email"),
      error: $("#error-email"),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Ingresá un email válido.",
    },
    mensaje: {
      el: $("#mensaje"),
      error: $("#error-mensaje"),
      validate: (v) => v.trim().length >= 10 || "Contanos un poco más (mínimo 10 caracteres).",
    },
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;

    Object.values(fields).forEach(({ el, error, validate }) => {
      const result = validate(el.value);
      if (result === true) {
        error.textContent = "";
        el.removeAttribute("aria-invalid");
      } else {
        error.textContent = result;
        el.setAttribute("aria-invalid", "true");
        isValid = false;
      }
    });

    if (!isValid) {
      successMsg.hidden = true;
      return;
    }

    // ------------------------------------------------------------
    // No hay backend conectado todavía. Cuando se defina un servicio
    // (Formspree, EmailJS, Supabase, etc.) completar CONTACT_INFO.formEndpoint
    // en js/data.js. Ver README.md.
    // ------------------------------------------------------------
    if (CONTACT_INFO.formEndpoint) {
      try {
        const data = Object.fromEntries(new FormData(form).entries());
        await fetch(CONTACT_INFO.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch {
        // El envío falló pero igual confirmamos la validación local al usuario.
      }
    }

    successMsg.hidden = false;
    form.reset();
  });
}

// ------------------------------------------------------------------
// Textos de marca repetidos (nombre, slogan, año)
// ------------------------------------------------------------------
function renderBrandText() {
  $$("[data-site-nombre]").forEach((el) => (el.textContent = SITE.nombre));
  $$("[data-site-slogan]").forEach((el) => (el.textContent = SITE.slogan));
  $$("[data-site-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
}

// ------------------------------------------------------------------
// Init
// ------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderBrandText();
  renderQuickStats();
  renderTeam();
  renderInterviews();
  renderBroadcasts();
  renderDossierLink();
  renderNumbers();
  renderSocial();
  renderContact();
  initHeader();
  initContactForm();
  initReveal();
});
