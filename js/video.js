document.addEventListener('DOMContentLoaded', () => {
  const loading = document.getElementById('loading');
  const progressBar = document.getElementById('progressBar');

  let hasScrolled = false;

  const videoTag = document.querySelector('#scrolly-video video source');
  const videoSrc = videoTag ? videoTag.getAttribute('src') : '';

  const scrolly = new ScrollyVideo({
    scrollyVideoContainer: "scrolly-video",
    src: videoSrc,
    transitionSpeed: 2.2,
    frameThreshold: 0.05,
    cover: true,
    onReady: () => {
      loading.style.opacity = '0';
      setTimeout(() => loading.style.display = 'none', 500);
    }
  });

  function updateUI() {
    const videoSection = document.querySelector('.video-section');
    const rect = videoSection.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / (videoSection.offsetHeight - window.innerHeight)));
    progressBar.style.width = `${progress * 100}%`;
  }

  window.addEventListener('scroll', () => {
    const videoSection = document.querySelector('.video-section');
    const ui = document.querySelector('.scroll-ui');

    const rect = videoSection.getBoundingClientRect();
    const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;

    if (ui) {
      ui.style.opacity = isInView ? '0.8' : '0';
      ui.style.pointerEvents = isInView ? 'auto' : 'none';
    }

    updateUI();
  }, { passive: true });
});
