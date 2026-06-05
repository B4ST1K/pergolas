// ─── BEFORE/AFTER SLIDER ───
  document.querySelectorAll('[data-ba]').forEach(card => {
    const wrap = card.querySelector('.ba-slider-wrap');
    const afterImg = card.querySelector('.after-img');
    const divider = card.querySelector('.ba-divider');
    const handle = card.querySelector('.ba-handle');
    let dragging = false;

    function setPosition(pct) {
      pct = Math.max(5, Math.min(95, pct));
      afterImg.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      divider.style.left = pct + '%';
      handle.style.left = pct + '%';
    }

    function getPercent(clientX) {
      const rect = wrap.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    wrap.addEventListener('mousedown', e => { dragging = true; setPosition(getPercent(e.clientX)); });
    window.addEventListener('mousemove', e => { if (dragging) setPosition(getPercent(e.clientX)); });
    window.addEventListener('mouseup', () => dragging = false);

    wrap.addEventListener('touchstart', e => { dragging = true; setPosition(getPercent(e.touches[0].clientX)); }, {passive: true});
    window.addEventListener('touchmove', e => { if (dragging) setPosition(getPercent(e.touches[0].clientX)); }, {passive: true});
    window.addEventListener('touchend', () => dragging = false);
  });

  // ─── SCROLL REVEAL ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ─── NAV BACKGROUND ON SCROLL ───
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.style.background = 'rgba(14,14,14,0.97)';
      nav.style.borderBottomColor = 'rgba(184,151,58,0.2)';
    } else {
      nav.style.background = '';
      nav.style.borderBottomColor = '';
    }
  });