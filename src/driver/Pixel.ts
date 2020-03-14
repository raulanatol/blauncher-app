export class Pixel {
  position: number;
  color: string;

  constructor(position: number, color: string) {
    this.position = position;
    this.color = color;
  }

  get ref(): string {
    return `${this.position.toString().padStart(2, '0')}${this.color}`;
  }
}
