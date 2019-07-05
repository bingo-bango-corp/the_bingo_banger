import Vue from 'vue';

export const ticker = new Vue();

export default class Tick {
  private tickIntervalId: number | undefined;
  private ticking: boolean;
  private frequency: number;

  constructor(frequency: number, start?: boolean) {
    this.frequency = frequency;
    if (start) {
      this.setupInterval(frequency);
      this.ticking = true;
    } else {
      this.ticking = false;
    }
  }

  get isTicking(): boolean {
    return this.ticking;
  }

  public start(): void {
    this.setupInterval(this.frequency);
  }

  public stop(): void {
    this.clearInterval();
  }

  private setupInterval(frequency: number): void {
    this.clearInterval();
    this.tickIntervalId = setInterval(() => {
      ticker.$emit('tick');
    }, frequency);
    this.ticking = true;
  }

  private clearInterval(): void {
    clearInterval(this.tickIntervalId);
    this.ticking = false;
  }
}
