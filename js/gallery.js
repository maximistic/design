document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const gallery = document.querySelector('.gallery');
    const items = gsap.utils.toArray('.item');

    if (!gallery || items.length === 0) return;

    // === Constants ===
    const GAP = 80;
    const SCROLL_EXTRA = 2000;
    const cardWidth = items[0].offsetWidth;
    const totalCards = items.length;
    const scrollDistance = (cardWidth + GAP) * (totalCards - 1);
    const initialOffset = (window.innerWidth - cardWidth) / 2 + GAP;

    // === Center gallery at start ===
    gsap.set(gallery, { x: initialOffset });

    // === Horizontal scroll animation ===
    gsap.to(gallery, {
      x: () => -scrollDistance + initialOffset,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.services-section',
        start: 'top top',
        end: () => `+=${scrollDistance + SCROLL_EXTRA}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
      },
    });

    // === Track and highlight centered item ===
    let currentClosest = null;

    ScrollTrigger.create({
      trigger: '.services-section',
      start: 'top top',
      end: () => `+=${scrollDistance + SCROLL_EXTRA}`,
      scrub: true,
      onUpdate: () => {
        const centerX = window.innerWidth / 2;
        let closestItem = null;
        let closestDist = Infinity;

        for (const item of items) {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.left + rect.width / 2;
          const dist = Math.abs(centerX - itemCenter);

          if (dist < closestDist) {
            closestDist = dist;
            closestItem = item;
          }
        }

        if (closestItem && closestItem !== currentClosest) {
          currentClosest = closestItem;

          // === Background color based on item ===
          const bgColor = closestItem.dataset.bg || '#ffffff';
          document.body.style.backgroundColor = bgColor;

          // === Toggle visibility/animation of .title elements ===
          items.forEach(item => {
            const title = item.querySelector('.title');
            if (!title) return;

            if (item === closestItem) {
              title.classList.add('active-title');
              title.classList.remove('inactive-title');
            } else {
              title.classList.remove('active-title');
              title.classList.add('inactive-title');
            }
          });
        }
      },
    });
  });
});
