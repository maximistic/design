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
});
