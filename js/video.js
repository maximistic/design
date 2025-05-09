document.addEventListener('DOMContentLoaded', () => {
    const loading = document.getElementById('loading');
    const progressBar = document.getElementById('progressBar');
  
    let hasScrolled = false;
  
    const scrolly = new ScrollyVideo({
      scrollyVideoContainer: "scrolly-video",
      src: "assets/car.mp4",
      transitionSpeed: 1.2,
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
      if (!hasScrolled && window.scrollY > 10) {
        hasScrolled = true;
        const ui = document.querySelector('.scroll-ui');
        if (ui) ui.style.display = 'none';
      }
      updateUI();
    }, { passive: true });
  });
  