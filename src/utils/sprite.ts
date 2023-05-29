import { Img } from "./loadImage";

export default class Sprite {
  constructor(readonly images: Img[], public index: number = 0) {}

  next() {
    this.index = (this.index + 1) % this.images.length;
  }

  get current() {
    return this.images[this.index] as Img;
  }
}
