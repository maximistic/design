document.addEventListener('DOMContentLoaded', () => {
  // === Smooth scrolling ===
  const lenis = new Lenis({ smooth: true, lerp: 0.1 });

  lenis.on('scroll', ScrollTrigger.update);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // === GSAP plugin ===
  gsap.registerPlugin(ScrollTrigger);

  // === Hide scroll UI in video section ===
  ScrollTrigger.create({
    trigger: '.video-section',
    start: 'bottom bottom',
    end: 'bottom top',
    onEnter: () => gsap.to(['.progress', '.scroll-ui'], { autoAlpha: 0, duration: 0.5 }),
    onLeaveBack: () => gsap.to(['.progress', '.scroll-ui'], { autoAlpha: 1, duration: 0.5 })
  });

  // === Hero section entrance ===
  gsap.timeline({
    scrollTrigger: {
      trigger: '.page1',
      start: 'top 70%',
      end: 'top top',
      toggleActions: 'play none none reverse'
    }
  })
  .to('.studio-name', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out'
  })
  .to('.tagline', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.6')
  .to('.tagline-2', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.6')
  .to('.scroll-prompt', {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.6');

  // === Hero parallax and opacity fade ===
  ScrollTrigger.create({
    trigger: '.page1',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: self => {
      const progress = self.progress;
      gsap.set('.hero-content', {
        yPercent: -10 * progress,
        opacity: 1 - progress
      });
      gsap.set('.scroll-prompt', {
        opacity: 1 - progress
      });
    }
  });

  // === Designer label fade on reveal ===
  gsap.utils.toArray('.reveal-trigger').forEach(triggerEl => {
    const scopedLabels = triggerEl.querySelectorAll('.designer-label, .designer-subtext');

    ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top bottom',
      end: 'top top',
      onEnter: () => gsap.to(scopedLabels, { autoAlpha: 0, duration: 0.5 }),
      onLeaveBack: () => gsap.to(scopedLabels, { autoAlpha: 1, duration: 0.5 })
    });
  });
});
