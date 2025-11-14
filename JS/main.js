// Inicializar efecto Vanta.js para el header
VANTA.BIRDS({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: 0x013220,
    color1: 0xea580c,
    color2: 0xea580c,
    birdSize: 1,
    wingSpan: 25.00,
    speedLimit: 4.00,
    separation: 20.00,
    alignment: 20.00,
    cohesion: 20.00,
    quantity: 3.00
});

// Animaciones de scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Abrir modal
function openModal(videoId) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&origin=${window.location.origin}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoFrame');
    iframe.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.querySelector('.close').onclick = closeModal;
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) closeModal();
}

// Filtrar videos
function filterVideos(category) {
    const videos = document.querySelectorAll('.video-thumbnail');
    videos.forEach(video => {
        if (category === 'all' || video.dataset.category === category) {
            video.style.display = 'block';
        } else {
            video.style.display = 'none';
        }
    });
}

// === CONTACTO SIMPLE: SIN VENTANAS BLANCAS ===
function contactMe() {
    const email = 'stevenrojasrivera182@gmail.com';
    const subject = 'Consulta sobre tu trabajo visual';
    const body = 'Hola Steven,\n\nMe interesa tu trabajo. ¿Podemos hablar?\n\nGracias.';
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // ABRIR EN PESTAÑA ACTUAL (SIN NUEVA VENTANA)
    window.location.href = mailto;

    // SI NO ABRE EN 300MS → TOAST
    setTimeout(() => {
        if (document.hasFocus()) {
            showEmailToast(email);
        }
    }, 300);
}

// Toast bonito (lógica simple)
function showEmailToast(email) {
    if (document.getElementById('email-toast')) return;
    const toast = document.createElement('div');
    toast.id = 'email-toast';
    toast.className = 'email-toast';
    toast.innerHTML = `
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
        </svg>
        <span>No se pudo abrir el correo.<br><strong>${email}</strong> copiado al portapapeles.</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(toast);
    navigator.clipboard.writeText(email);
}

// Animación fadeIn
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);