import { Game, config } from "./game.js";
import random from "./utils/random.js";

export enum WrenchDirection {
  DOWN,
  UP,
}

type Rect = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export default class Wrench {
  public active: boolean = false;
  public taken: boolean = false;

  constructor(
    public x: number,
    readonly y: number,
    readonly direction: WrenchDirection
  ) {}

  collision(game: Game, rect: Rect): boolean {
    const shape = this.shape(game);
    const TOLERANT = config.TOLERANT;

    return (
      shape.x + shape.width * TOLERANT > rect.x - rect.width * TOLERANT &&
      shape.x - shape.width * TOLERANT <= rect.x + rect.width * TOLERANT &&
      shape.y + shape.height * TOLERANT > rect.y - rect.height * TOLERANT &&
      shape.y - shape.height * TOLERANT <= rect.y + rect.height * TOLERANT
    );
  }

  canBeTaken(game: Game, rect: Rect): boolean {
    if (this.taken) return false;

    const shape = this.shape(game);
    this.taken =
      Math.abs(shape.x - rect.x) <= Math.abs(shape.width - rect.width) / 2;

    return this.taken;
  }

  shape(game: Game) {
    return {
      height: game.wrenchHeight,
      width: game.wrenchWidth,
      rotation: this.direction == WrenchDirection.UP ? 0 : Math.PI,

      x: this.x,
      y: this.y,
    };
  }
}

export function generateWrench(game: Game) {
  const halfHeight = game.wrenchHeight / 2;

  const DownY = random(0.1, 0.4);
  const UpY = Math.abs(DownY + config.GAP_SIZE);

  const x = game.viewWidth + game.wrenchWidth;

  game.wrenchs.push(
    new Wrench(x, DownY * game.viewHeight - halfHeight, WrenchDirection.DOWN),
    new Wrench(x, UpY * game.viewHeight + halfHeight, WrenchDirection.UP)
  );
}
