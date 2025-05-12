document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling setup
  const lenis = new Lenis({ smooth: true, lerp: 0.1 });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // GSAP plugin registration
  gsap.registerPlugin(ScrollTrigger);

  // Hide .progress and .scroll-ui in video section
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

  // Hero section entrance animation
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

  // Parallax scroll for hero content
  gsap.to(".hero-content", {
    yPercent: -10,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".page1",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Dynamic opacity for hero section
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

  // Fade out designer labels on reveal-trigger scroll
  gsap.utils.toArray('.reveal-trigger').forEach(triggerEl => {
    ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top bottom',
      end: 'top top',
      onEnter: () => {
        gsap.to('.designer-label, .designer-subtext', { autoAlpha: 0, duration: 0.5 });
      },
      onLeaveBack: () => {
        gsap.to('.designer-label, .designer-subtext', { autoAlpha: 1, duration: 0.5 });
      }
    });
  });
});
