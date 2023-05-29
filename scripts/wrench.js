import { config } from "./game.js";
import random from "./utils/random.js";
export var WrenchDirection;
(function (WrenchDirection) {
    WrenchDirection[WrenchDirection["DOWN"] = 0] = "DOWN";
    WrenchDirection[WrenchDirection["UP"] = 1] = "UP";
})(WrenchDirection || (WrenchDirection = {}));
export default class Wrench {
    x;
    y;
    direction;
    active = false;
    taken = false;
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }
    collision(game, rect) {
        const shape = this.shape(game);
        const TOLERANT = config.TOLERANT;
        return (shape.x + shape.width * TOLERANT > rect.x - rect.width * TOLERANT &&
            shape.x - shape.width * TOLERANT <= rect.x + rect.width * TOLERANT &&
            shape.y + shape.height * TOLERANT > rect.y - rect.height * TOLERANT &&
            shape.y - shape.height * TOLERANT <= rect.y + rect.height * TOLERANT);
    }
    canBeTaken(game, rect) {
        if (this.taken)
            return false;
        const shape = this.shape(game);
        this.taken =
            Math.abs(shape.x - rect.x) <= Math.abs(shape.width - rect.width) / 2;
        return this.taken;
    }
    shape(game) {
        return {
            height: game.wrenchHeight,
            width: game.wrenchWidth,
            rotation: this.direction == WrenchDirection.UP ? 0 : Math.PI,
            x: this.x,
            y: this.y,
        };
    }
}
export function generateWrench(game) {
    const halfHeight = game.wrenchHeight / 2;
    const DownY = random(0.1, 0.4);
    const UpY = Math.abs(DownY + config.GAP_SIZE);
    const x = game.viewWidth + game.wrenchWidth;
    game.wrenchs.push(new Wrench(x, DownY * game.viewHeight - halfHeight, WrenchDirection.DOWN), new Wrench(x, UpY * game.viewHeight + halfHeight, WrenchDirection.UP));
}
