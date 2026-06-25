export const highLightElement = (selector: string) => {
  const element = document.querySelector(selector);
  if (!element) return;

  element.scrollIntoView({ behavior: 'smooth', block: 'center' });

  element.classList.add('search-highlight');

  setTimeout(() => {
    element.classList.remove('search-highlight');
  }, 3000);
};
