export const highLightElement = (selector: string) => {
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) return;

  element.scrollIntoView({ behavior: 'smooth', block: 'center' });

  element.classList.remove('search-highlight');
  void element.offsetWidth;
  element.classList.add('search-highlight');

  const handleAnimationEnd = () => {
    element.classList.remove('search-highlight');
    element.removeEventListener('animationend', handleAnimationEnd);
  };

  element.addEventListener('animationend', handleAnimationEnd);
};
