import { Assets } from "./AssetLoader";

class AudioManagerSingleton {
  private static instance: AudioManagerSingleton;
  private bgm: HTMLAudioElement | null = null;
  private sfxCache: Map<string, HTMLAudioElement[]> = new Map();
  private _bgmEnabled = true;
  private _sfxEnabled = true;
  private _volume = 0.5;
  private _sfxVolume = 0.3;
  private initialized = false;
  private fadeInterval: ReturnType<typeof setInterval> | null = null;

  private constructor() {}

  static getInstance(): AudioManagerSingleton {
    if (!AudioManagerSingleton.instance) {
      AudioManagerSingleton.instance = new AudioManagerSingleton();
    }
    return AudioManagerSingleton.instance;
  }

  get bgmEnabled() {
    return this._bgmEnabled;
  }

  get sfxEnabled() {
    return this._sfxEnabled;
  }

  get volume() {
    return this._volume;
  }

  init() {
    if (this.initialized || typeof window === "undefined") return;
    this.initialized = true;

    this.bgm = new Audio(Assets.bgm.main);
    this.bgm.loop = true;
    this.bgm.volume = this._bgmEnabled ? this._volume : 0;
    this.bgm.preload = "auto";

    Object.entries(Assets.sfx).forEach(([key, src]) => {
      const pool: HTMLAudioElement[] = [];
      for (let i = 0; i < 3; i++) {
        const audio = new Audio(src);
        audio.volume = this._sfxVolume;
        audio.preload = "auto";
        pool.push(audio);
      }
      this.sfxCache.set(key, pool);
    });
  }

  async startBGM() {
    if (!this.bgm || !this._bgmEnabled || typeof window === "undefined") return;

    try {
      if (this.bgm.paused) {
        this.bgm.currentTime = 0;
        await this.bgm.play();
      }
      this.fadeIn(1200);
    } catch {
      // Autoplay blocked — will retry on the next interaction.
    }
  }

  private fadeIn(durationMs: number) {
    if (!this.bgm) return;
    this.clearFade();
    const target = this._bgmEnabled ? this._volume : 0;
    const step = target / (durationMs / 16);
    this.bgm.volume = 0;
    this.fadeInterval = setInterval(() => {
      if (!this.bgm) return;
      const next = Math.min(this.bgm.volume + step, target);
      this.bgm.volume = next;
      if (next >= target) this.clearFade();
    }, 16);
  }

  fadeOut(durationMs: number = 1000): Promise<void> {
    return new Promise((resolve) => {
      if (!this.bgm) { resolve(); return; }
      this.clearFade();
      const start = this.bgm.volume;
      const step = start / (durationMs / 16);
      this.fadeInterval = setInterval(() => {
        if (!this.bgm) { resolve(); return; }
        const next = Math.max(this.bgm.volume - step, 0);
        this.bgm.volume = next;
        if (next <= 0) {
          this.clearFade();
          resolve();
        }
      }, 16);
    });
  }

  private clearFade() {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
  }

  playSFX(name: string) {
    if (!this._sfxEnabled || typeof window === "undefined") return;
    const pool = this.sfxCache.get(name);
    if (!pool) return;

    const available = pool.find((a) => a.paused || a.ended) ?? pool[0];
    available.currentTime = 0;
    available.volume = this._sfxVolume;
    available.play().catch(() => {});
  }

  setBgmEnabled(enabled: boolean) {
    this._bgmEnabled = enabled;

    if (!this.bgm) return;
    if (!enabled) {
      this.bgm.pause();
      this.bgm.volume = 0;
      return;
    }

    if (this.bgm.paused) {
      this.bgm.volume = this._volume;
      this.bgm.play().catch(() => {});
    } else {
      this.bgm.volume = this._volume;
    }
  }

  setSfxEnabled(enabled: boolean) {
    this._sfxEnabled = enabled;
  }

  setVolume(v: number) {
    this._volume = Math.max(0, Math.min(1, v));
    if (this.bgm && this._bgmEnabled) {
      this.bgm.volume = this._volume;
    }
  }

  destroy() {
    this.clearFade();
    if (this.bgm) {
      this.bgm.pause();
      this.bgm.src = "";
      this.bgm = null;
    }
    this.sfxCache.forEach((pool) => pool.forEach((a) => { a.pause(); a.src = ""; }));
    this.sfxCache.clear();
    this.initialized = false;
  }
}

export const AudioManager = AudioManagerSingleton.getInstance();
