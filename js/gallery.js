document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');
  const items = gsap.utils.toArray('.item');

  if (!gallery || items.length === 0) return;

  const GAP = 80;
  const SCROLL_EXTRA = 2000;
  const EDGE_VISUAL_OFFSET = 300;

  const cardWidth = items[0].getBoundingClientRect().width;
  const totalCards = items.length;

  const initialOffset = (window.innerWidth - cardWidth) / 2 + GAP;
  const scrollDistance = (cardWidth + GAP) * (totalCards - 1);

  // Apply visual offset by shifting the whole gallery at start
  gsap.set(gallery, { x: initialOffset + EDGE_VISUAL_OFFSET });

  // Horizontal scroll animation
  gsap.to(gallery, {
    x: () => -scrollDistance + initialOffset - EDGE_VISUAL_OFFSET,
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: '.services-section',
      start: 'top top',
      end: () => `+=${scrollDistance + SCROLL_EXTRA + EDGE_VISUAL_OFFSET * 2}`,
      pin: true,
      scrub: 0.2,
      anticipatePin: 1,
    },
  });

  // === Center Detection & Highlight Logic ===
  let currentClosest = null;
  const trackTriggerRange = scrollDistance + SCROLL_EXTRA + EDGE_VISUAL_OFFSET * 2;

  ScrollTrigger.create({
    trigger: '.services-section',
    start: 'top top',
    end: () => `+=${trackTriggerRange}`,
    scrub: 0.2,
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

      // Update only when closest changes
      if (closestItem && closestItem !== currentClosest) {
        currentClosest = closestItem;

        document.body.style.backgroundColor = closestItem.dataset.bg || '#ffffff';

        items.forEach(item => {
          const title = item.querySelector('.title');
          if (!title) return;

          title.classList.toggle('active-title', item === closestItem);
          title.classList.toggle('inactive-title', item !== closestItem);
        });
      }
    },
  });
});
