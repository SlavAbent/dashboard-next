import confetti from 'canvas-confetti';

export function fireConfetti(): void {
  const defaults = {
    startVelocity: 20,
    spread: 360,
    ticks: 50,
    zIndex: 9999,
    colors: ['#e8ff6b', '#ffffff', '#aaaaaa'],
    scalar: 0.7,
  };

  function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  let elapsed = 0;
  const interval = setInterval(() => {
    elapsed += 200;
    if (elapsed >= 800) {
      clearInterval(interval);
      return;
    }

    confetti({
      ...defaults,
      particleCount: 30,
      origin: { x: random(0.3, 0.5), y: random(0.4, 0.6) },
    });
    confetti({
      ...defaults,
      particleCount: 30,
      origin: { x: random(0.5, 0.7), y: random(0.4, 0.6) },
    });
  }, 200);
}
