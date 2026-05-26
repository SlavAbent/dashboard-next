let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
  }

  return audioCtx;
}

export function playCompletionSound(): void {
  try {
    const ctx = getAudioContext();
    const notes = [880, 1100, 1320];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.value = freq;

      const start = ctx.currentTime + i * 0.18;
      gain.gain.setValueAtTime(0.25, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

      osc.start(start);
      osc.stop(start + 0.4);
    });
  } catch (e) {
    console.warn('Audio playback failed', e);
  }
}
