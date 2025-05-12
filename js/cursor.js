document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.custom-cursor');
  let cursorVisible = false;

  const handleMouseMove = (e) => {
    if (!cursorVisible) {
      cursorVisible = true;
      cursor.style.opacity = '1';
    }
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  };
  const handleMouseOut = (e) => {
    if (e.relatedTarget === null) {
      cursorVisible = false;
      cursor.style.opacity = '0';
    }
  };
  const handleMouseEnter = () => cursor.classList.add('hovered');
  const handleMouseLeave = () => cursor.classList.remove('hovered');

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseout', handleMouseOut);

  const interactiveElements = document.querySelectorAll('a, button, img, h1, h2, h3, p, .item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
  });
});