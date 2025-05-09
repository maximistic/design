document.addEventListener('DOMContentLoaded', function () {
  const cursor = document.querySelector('.custom-cursor');
  let cursorVisible = false;

  // Custom cursor behavior
  document.addEventListener('mousemove', function (e) {
    if (!cursorVisible) {
      cursorVisible = true;
      cursor.style.opacity = 1;
    }

    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
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

  // Smooth scrolling setup
  const lenis = new Lenis({ smooth: true, lerp: 0.1 });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // GSAP animations
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

  gsap.timeline({
    scrollTrigger: {
      trigger: ".page1",
      start: "top 70%",
      end: "top top",
      toggleActions: "play none none reverse"
    }
  })
  .to(".studio-name", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
  })
  .to(".tagline", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.6")
  .to(".tagline-2", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.6")
  .to(".scroll-prompt", {
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  }, "-=0.5");
  
  // Parallax effect on scroll
  gsap.to(".hero-content", {
    yPercent: -10,
    ease: "none",
    scrollTrigger: {
      trigger: ".page1",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
  
  // Fade out hero section on scroll exit
  ScrollTrigger.create({
    trigger: ".page1",
    start: "top top",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      const opacity = 1 - self.progress;
      gsap.set(".hero-content", { opacity });
      gsap.set(".scroll-prompt", { opacity });
    }
  });
  
  // Hide .designer-label on scroll
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

  // Setup horizontal scrolling gallery
  window.addEventListener('load', () => {
    const gallery = document.querySelector('.gallery');
    const items = gsap.utils.toArray('.item');

    // Calculate dimensions
    const cardWidth = items[0].offsetWidth;
    const gap = 80; // Match the CSS gap value
    const totalCards = items.length;
    const scrollDistance = (cardWidth + gap) * (totalCards - 1);
    const initialOffset = (window.innerWidth - cardWidth) / 2;

    // Set initial position
    gsap.set(gallery, { x: initialOffset });

    // Create the horizontal scroll animation
    gsap.to(gallery, {
      x: () => -scrollDistance + initialOffset,
      ease: 'none',
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top top',
        end: () => `+=${scrollDistance + 200}`, // Add some extra scroll distance
        pin: true,
        scrub: true,
        anticipatePin: 1,
      },
    });

    // Update title visibility and background color based on card position
    ScrollTrigger.create({
      trigger: '.services-section',
      start: 'top top',
      end: () => `+=${scrollDistance + 200}`,
      scrub: true,
      onUpdate: (self) => {
        const centerX = window.innerWidth / 2;
        let closest, minDist = Infinity;

        // Find the closest card to center
        items.forEach((item) => {
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

        // Highlight the closest card
        if (closest) {
          const bgColor = closest.dataset.bg;
          document.body.style.backgroundColor = bgColor;

          const title = closest.querySelector('.title');
          title.style.opacity = 1;
          title.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      },
    });
  });
});