import * as audios from "./audios.js";
import Character from "./character.js";
import { Game, config } from "./game.js";

type Rect = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export default class Laser {
  releaseCountDown: number = config.RELEASE_COUNT_DOWN;
  loading: boolean = true;

  constructor(readonly y: number, public x: number, public width: number) {}

  shape(game: Game) {
    return {
      height: game.laserHeight,
      width: this.width,

      x: this.x,
      y: this.y,
    };
  }

  collision(game: Game, rect: Rect): boolean {
    const shape = this.shape(game);
    const TOLERANT = config.TOLERANT;

    return (
      shape.x + shape.width > rect.x - rect.width * TOLERANT &&
      shape.x - shape.width <= rect.x + rect.width * TOLERANT &&
      shape.y + shape.height * TOLERANT > rect.y - rect.height * TOLERANT &&
      shape.y - shape.height * TOLERANT <= rect.y + rect.height * TOLERANT
    );
  }

  update(game: Game) {
    if (this.loading) return;

    const laserSpeed = config.GAME_SPEED * config.LASER_A;

    this.width = Math.min(game.viewWidth, this.width + laserSpeed);

    if (this.releaseCountDown-- > 0) return;

    if (this.width == game.viewWidth) {
      this.x -= laserSpeed;
    }

    if (this.x <= 0) {
      game.laser = null;
    }
  }
}

export async function generateLaser(game: Game, character: Character) {
  game.laser = new Laser(character.y, game.viewWidth, 0);
  try {
    await audios.warnAlarm();
    game.laser.loading = false;
  } catch (e) {
    alert("FAILED");
    game.laser = null;
  }
}
