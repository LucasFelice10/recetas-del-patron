// ============================================
// 1. CURSOR PERSONALIZADO (Solo en Desktop)
// ============================================
const hasFineCursor = window.matchMedia("(pointer: fine)").matches;

if (hasFineCursor) {
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  const body = document.body;
  const interactiveSelectors = ['a', 'button', '.recipe-card', '.recipe-video', '.btn', '.burger', '.whatsapp-float', '.contact-action'];

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

  const animateCursor = () => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateCursor);
  };

animateCursor();

  const setHoverState = (enter) => {
    body.classList.toggle('interactive-hover', enter);
  };

  interactiveSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.addEventListener('mouseenter', () => setHoverState(true));
      element.addEventListener('mouseleave', () => setHoverState(false));
    });
  });
}

// ============================================
// 2. SCROLL REVEAL CON INTERSECTION OBSERVER
// ============================================
const revealElements = document.querySelectorAll('.reveal');
const observerOptions = {
  threshold: 0.18,
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.style.transitionDelay = `${index * 80}ms`;
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((element) => revealObserver.observe(element));

// ============================================
// 3. MENÚ MÓVIL FULL-SCREEN OVERLAY
// ============================================
const burgerButton = document.querySelector('.burger');
const menuCloseBtn = document.querySelector('.menu-close');
const navLinks = document.querySelector('.nav-links');
const navAnchors = navLinks.querySelectorAll('a');

function openMenu() {
  navLinks.classList.add('visible');
  burgerButton.classList.add('open');
  menuCloseBtn.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('visible');
  burgerButton.classList.remove('open');
  menuCloseBtn.style.display = 'none';
  document.body.style.overflow = '';
}

burgerButton.addEventListener('click', () => {
  if (navLinks.classList.contains('visible')) {
    closeMenu();
  } else {
    openMenu();
  }
});

menuCloseBtn.addEventListener('click', closeMenu);

// Cierra el menú al hacer clic en un enlace con scroll suave automático
navAnchors.forEach((anchor) => {
  anchor.addEventListener('click', () => {
    closeMenu();
  });
});

// Cierra el menú si se redimensiona la ventana a desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 820) {
    closeMenu();
    navLinks.style.display = '';
  }
});

// ============================================
// 4. FORMULARIO DE CONTACTO
// ============================================
const contactForm = document.getElementById('contactForm');
const mailBtn = document.getElementById('mailBtn');
const whatsappBtn = document.getElementById('whatsappBtn');
const phoneNumber = '5491135736153';

const getFormValues = () => {
  const formData = new FormData(contactForm);
  return {
    name: formData.get('name')?.toString().trim() || '',
    email: formData.get('email')?.toString().trim() || '',
    message: formData.get('message')?.toString().trim() || '',
  };
};

const validateForm = ({ name, email, message }) => {
  return name.length > 1 && email.includes('@') && message.length > 5;
};

const disableActions = (state) => {
  [mailBtn, whatsappBtn].forEach((button) => {
    button.disabled = state;
    button.style.opacity = state ? '0.65' : '1';
  });
};

mailBtn.addEventListener('click', () => {
  const values = getFormValues();
  if (!validateForm(values)) {
    alert('Por favor completa todos los campos con información válida.');
    return;
  }

  disableActions(true);
  const textoMensaje = `Nombre: ${values.name}\nEmail: ${values.email}\nMensaje: ${values.message}`;
  const message = encodeURIComponent(textoMensaje);
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=recetasdelpatron@lfcreator.com&su=${encodeURIComponent("Contacto desde la Web")}&body=${message}`, "_blank");
  setTimeout(() => disableActions(false), 500);
});

whatsappBtn.addEventListener("click", () => {
  const values = getFormValues();
  if (!validateForm(values)) {
    alert("Por favor completa todos los campos con información válida.");
    return;
  }

  disableActions(true);
  const textoMensaje = `Nombre: ${values.name}\nEmail: ${values.email}\nMensaje: ${values.message}`;
  const message = encodeURIComponent(textoMensaje);
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  setTimeout(() => disableActions(false), 600);
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

const burgerButton = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const topbar = document.querySelector('.topbar');

burgerButton.addEventListener('click', () => {
  const expanded = burgerButton.getAttribute('aria-expanded') === 'true';
  burgerButton.setAttribute('aria-expanded', String(!expanded));
  topbar.classList.toggle('nav-open');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 820) {
    topbar.classList.remove('nav-open');
    navLinks.style.display = '';
  }
});

