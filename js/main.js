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
  }, "-=0.6");
  
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

  window.addEventListener('load', () => {
    const gallery = document.querySelector('.gallery');
    const items = gsap.utils.toArray('.item');
  
    const cardWidth = items[0].offsetWidth;
    const gap = 80;
    const totalCards = items.length;
    const scrollDistance = (cardWidth + gap) * (totalCards - 1);
    const initialOffset = (window.innerWidth - cardWidth) / 2;
    const scrollExtra = 2000;
  
    gsap.set(gallery, { x: initialOffset });
  
    gsap.to(gallery, {
      x: () => -scrollDistance + initialOffset,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top top',
        end: () => `+=${scrollDistance + scrollExtra}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
      },
    });
  
    // Track currently active item
    let currentClosest = null;
  
    ScrollTrigger.create({
      trigger: '.services-section',
      start: 'top top',
      end: () => `+=${scrollDistance + scrollExtra}`,
      scrub: true,
      onUpdate: () => {
        const centerX = window.innerWidth / 2;
        let closestItem = null;
        let closestDist = Infinity;
  
        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.left + rect.width / 2;
          const dist = Math.abs(centerX - itemCenter);
  
          if (dist < closestDist) {
            closestDist = dist;
            closestItem = item;
          }
        });
  
        // Only update if the closest item actually changed
        if (closestItem !== currentClosest) {
          currentClosest = closestItem;
          const bgColor = closestItem.dataset.bg;
  
          document.body.style.backgroundColor = bgColor;
  
          items.forEach((item) => {
            const title = item.querySelector('.title');
            if (item === closestItem) {
              // Show instantly
              title.style.opacity = '1';
              title.style.transform = 'translate(-50%, -50%) scale(1)';
            } else {
              // Hide instantly
              title.style.opacity = '0';
              title.style.transform = 'translate(-50%, -50%) scale(0.9)';
            }
          });
        }
      },
    });
  });
  
});