window.history.scrollRestoration = 'manual';
window.onload = function() { window.scrollTo(0,0); };

const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
const body = document.body;
const interactiveSelectors = ['a', 'button', '.recipe-card', '.recipe-video', '.btn', '.burger', '.whatsapp-float', '.contact-action'];

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

if (window.matchMedia("(pointer: fine)").matches) {
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
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuButton = document.getElementById('close-menu-btn');
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

const openMobileMenu = () => {
  mobileMenu.classList.add('active');
  document.body.style.overflow = 'hidden';
  burgerButton.setAttribute('aria-expanded', 'true');
};

const closeMobileMenu = () => {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
  burgerButton.setAttribute('aria-expanded', 'false');
};

if (burgerButton) {
  burgerButton.addEventListener('click', openMobileMenu);
}

if (closeMenuButton) {
  closeMenuButton.addEventListener('click', closeMobileMenu);
}

mobileMenuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();
      closeMobileMenu();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      closeMobileMenu();
    }
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 820) {
    closeMobileMenu();
  }
});
