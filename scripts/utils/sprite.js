export default class Sprite {
    images;
    index;
    constructor(images, index = 0) {
        this.images = images;
        this.index = index;
    }
    next() {
        this.index = (this.index + 1) % this.images.length;
    }
    get current() {
        return this.images[this.index];
    }
}
