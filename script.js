// ============================================================
// MultiBersaudaraSukses — Premium JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Sticky Header ----
  const header = document.querySelector('header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Hamburger Menu ----
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll Reveal ----
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, entry.target.dataset.delay || 0);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach((el, i) => {
      el.dataset.delay = (i % 4) * 80;
      observer.observe(el);
    });
  }

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('.count-up');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const step = target / (duration / 16);
          let current = 0;
          const update = () => {
            current += step;
            if (current < target) {
              el.textContent = Math.floor(current) + suffix;
              requestAnimationFrame(update);
            } else {
              el.textContent = target + suffix;
            }
          };
          requestAnimationFrame(update);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  }

  // ---- Contact Form ----
  const form = document.getElementById('contactForm');
  if (form) {
    const btn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const nama = document.getElementById('nama').value.trim();
      const email = document.getElementById('email').value.trim();
      const pesan = document.getElementById('pesan').value.trim();

      if (!nama || !email || !pesan) {
        showNotification('Harap isi semua field yang diperlukan.', 'error');
        return;
      }

      // Simulate send
      if (btn) {
        btn.textContent = 'Mengirim...';
        btn.disabled = true;
      }

      setTimeout(() => {
        showNotification(`Terima kasih ${nama}! Pesan Anda telah dikirim. Kami akan merespon ke ${email}.`, 'success');
        form.reset();
        if (btn) {
          btn.textContent = 'Kirim Pesan';
          btn.disabled = false;
        }
      }, 1200);
    });
  }

  // ---- Notification Toast ----
  function showNotification(message, type = 'success') {
    const existing = document.querySelector('.toast-notif');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notif';
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✓' : '!'}</span>
      <span>${message}</span>
    `;

    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      background: type === 'success' ? '#1a1a1a' : '#b01c35',
      color: 'white',
      padding: '16px 24px',
      borderRadius: '8px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      fontSize: '0.9rem',
      fontFamily: "'DM Sans', sans-serif",
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: '9999',
      transform: 'translateY(20px)',
      opacity: '0',
      transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
      maxWidth: '380px',
      lineHeight: '1.5',
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 5000);
  }

});
