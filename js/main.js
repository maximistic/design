document.addEventListener('DOMContentLoaded', function() {
  // Custom cursor functionality
  const cursor = document.querySelector('.custom-cursor');
  let cursorVisible = false;
  
  // Show cursor when mouse moves
  document.addEventListener('mousemove', function(e) {
    if (!cursorVisible) {
      cursorVisible = true;
      cursor.style.opacity = 1;
    }
    
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Get element under the cursor
    const elementMouseIsOver = document.elementFromPoint(e.clientX, e.clientY);
    
    // Check background color to adapt cursor color
    if (elementMouseIsOver) {
      const computedStyle = window.getComputedStyle(elementMouseIsOver);
      const bgColor = computedStyle.backgroundColor;
      
      // For non-transparent backgrounds, check brightness
      if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        const rgb = bgColor.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
          // mix-blend-mode handles the inversion automatically
        }
      }
    }
  });
  
  // Hide cursor when mouse leaves window
  document.addEventListener('mouseout', function(e) {
    if (e.relatedTarget === null) {
      cursorVisible = false;
      cursor.style.opacity = 0;
    }
  });
  
  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, img, h1, h2, h3, p, .item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      cursor.classList.add('hovered');
    });
    
    el.addEventListener('mouseleave', function() {
      cursor.classList.remove('hovered');
    });
  });

  // Initialize Lenis for smooth scrolling
  const lenis = new Lenis({
    smooth: true,
    lerp: 0.1,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Register GSAP's ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  window.addEventListener('load', () => {
    const gallery = document.querySelector('.gallery');
    const items = gsap.utils.toArray('.item');

    const cardWidth = items[0].offsetWidth;
    const gap = 80;
    const totalCards = items.length;
    const scrollDistance = (cardWidth + gap) * (totalCards - 1);
    const initialOffset = (window.innerWidth - cardWidth) / 2;

    // 1) Position gallery off-screen to the right
    gsap.set(gallery, { x: initialOffset });

    // 2) PINNED HORIZONTAL SCROLL: Once fully in view
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

    // 3) HIGHLIGHT CENTER CARD + BODY BG + TITLE FADE-IN
    ScrollTrigger.create({
      trigger: '.services-section',
      start: 'top top',
      end: () => `+=${scrollDistance}`,
      scrub: true,
      onUpdate: (self) => {
        const centerX = window.innerWidth / 2;
        let closest, minDist = Infinity;

        items.forEach((item, index) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.left + rect.width / 2;
          const dist = Math.abs(centerX - itemCenter);
          const title = item.querySelector('.title');

          // Reset all titles
          title.style.opacity = 0;
          title.style.transform = 'translate(-50%, -50%) scale(0.9)';

          if (dist < minDist) {
            minDist = dist;
            closest = item;
          }
        });

        if (closest) {
          // Change background color
          const bgColor = closest.dataset.bg;
          document.body.style.backgroundColor = bgColor;

          // Highlight title
          const t = closest.querySelector('.title');
          t.style.opacity = 1;
          t.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      },
    });
  });
});