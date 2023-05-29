import * as audios from "./audios.js";
import { config } from "./game.js";
export default class Laser {
    y;
    x;
    width;
    releaseCountDown = config.RELEASE_COUNT_DOWN;
    loading = true;
    constructor(y, x, width) {
        this.y = y;
        this.x = x;
        this.width = width;
    }
    shape(game) {
        return {
            height: game.laserHeight,
            width: this.width,
            x: this.x,
            y: this.y,
        };
    }
    collision(game, rect) {
        const shape = this.shape(game);
        const TOLERANT = config.TOLERANT;
        return (shape.x + shape.width > rect.x - rect.width * TOLERANT &&
            shape.x - shape.width <= rect.x + rect.width * TOLERANT &&
            shape.y + shape.height * TOLERANT > rect.y - rect.height * TOLERANT &&
            shape.y - shape.height * TOLERANT <= rect.y + rect.height * TOLERANT);
    }
    update(game) {
        if (this.loading)
            return;
        const laserSpeed = config.GAME_SPEED * config.LASER_A;
        this.width = Math.min(game.viewWidth, this.width + laserSpeed);
        if (this.releaseCountDown-- > 0)
            return;
        if (this.width == game.viewWidth) {
            this.x -= laserSpeed;
        }
        if (this.x <= 0) {
            game.laser = null;
        }
    }
}
export async function generateLaser(game, character) {
    game.laser = new Laser(character.y, game.viewWidth, 0);
    try {
        await audios.warnAlarm();
        game.laser.loading = false;
    }
    catch (e) {
        alert("FAILED");
        game.laser = null;
    }
}
