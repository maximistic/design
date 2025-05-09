document.addEventListener('DOMContentLoaded', function () {
  const cursor = document.querySelector('.custom-cursor');
  let cursorVisible = false;

  document.addEventListener('mousemove', function (e) {
    if (!cursorVisible) {
      cursorVisible = true;
      cursor.style.opacity = 1;
    }

    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    const elementMouseIsOver = document.elementFromPoint(e.clientX, e.clientY);
    if (elementMouseIsOver) {
      const computedStyle = window.getComputedStyle(elementMouseIsOver);
      const bgColor = computedStyle.backgroundColor;

      if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        const rgb = bgColor.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        }
      }
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.relatedTarget === null) {
      cursorVisible = false;
      cursor.style.opacity = 0;
    }
  });

  const interactiveElements = document.querySelectorAll('a, button, img, h1, h2, h3, p, .item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });

  const lenis = new Lenis({ smooth: true, lerp: 0.1 });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: '.video-section',
    start: 'bottom bottom',
    end: 'bottom top',
    onEnter: () => {
      gsap.to('.progress', { autoAlpha: 0, duration: 0.5 });
      gsap.to('.scroll-ui', { autoAlpha: 0, duration: 0.5 });
    },
    onLeaveBack: () => {
      gsap.to('.progress', { autoAlpha: 1, duration: 0.5 });
      gsap.to('.scroll-ui', { autoAlpha: 1, duration: 0.5 });
    }
  });

  gsap.from(".page1", {
    scrollTrigger: {
      trigger: ".page1",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power2.out"
  });

  ScrollTrigger.create({
    trigger: '.page1',
    start: 'top bottom',
    end: 'top top',
    onEnter: () => {
      gsap.to('.designer-label, .designer-subtext', { autoAlpha: 0, duration: 0.5 });
    },
    onLeaveBack: () => {
      gsap.to('.designer-label, .designer-subtext', { autoAlpha: 1, duration: 0.5 });
    }
  });

  window.addEventListener('load', () => {
    const gallery = document.querySelector('.gallery');
    const items = gsap.utils.toArray('.item');

    const cardWidth = items[0].offsetWidth;
    const gap = 80;
    const totalCards = items.length;
    const scrollDistance = (cardWidth + gap) * (totalCards - 1);
    const initialOffset = (window.innerWidth - cardWidth) / 2;

    gsap.set(gallery, { x: initialOffset });

    gsap.to(gallery, {
      x: () => -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
      },
    });

    ScrollTrigger.create({
      trigger: '.services-section',
      start: 'top top',
      end: () => `+=${scrollDistance}`,
      scrub: true,
      onUpdate: (self) => {
        const centerX = window.innerWidth / 2;
        let closest, minDist = Infinity;

        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.left + rect.width / 2;
          const dist = Math.abs(centerX - itemCenter);
          const title = item.querySelector('.title');

          title.style.opacity = 0;
          title.style.transform = 'translate(-50%, -50%) scale(0.9)';

          if (dist < minDist) {
            minDist = dist;
            closest = item;
          }
        });

        if (closest) {
          const bgColor = closest.dataset.bg;
          document.body.style.backgroundColor = bgColor;

          const t = closest.querySelector('.title');
          t.style.opacity = 1;
          t.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      },
    });
  });
});
