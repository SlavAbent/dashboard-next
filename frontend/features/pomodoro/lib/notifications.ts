export function blinkTitle(originalTitle: string): void {
  let count = 0;

  const interval = setInterval(() => {
    document.title = count % 2 === 0 ? 'Done! Rest & chill' : originalTitle;
    count++;

    if (count > 8) {
      clearInterval(interval);
      document.title = originalTitle;
    }
  }, 500);
}
