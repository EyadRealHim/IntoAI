import { Game, config } from "./game.js";

export type characterState = "FlyingForward" | "FlyingUp" | "FlyingDown";

export default class Character {
  state: characterState = "FlyingForward";
  sinWave: number = 0;

  constructor(public y: number) {}

  shape(game: Game) {
    const y =
      this.y +
      Math.sin(game.progressCounter / config.CHARACTER_WAVING_TIME) *
        config.CHARACTER_WAVE_CAPACITY;

    return {
      height: game.characterWidth,
      width: game.characterHeight,

      x: game.characterWidth * 2,
      y: Math.max(
        Math.min(y, game.viewHeight - game.characterHeight),
        game.characterHeight
      ),
    };
  }

  up(game: Game) {
    if (!game.gameover && !game.pause && !game.isOnStartState)
      this.y -= config.GAME_SPEED / 2;
  }
  down(game: Game) {
    if (!game.gameover && !game.pause && !game.isOnStartState)
      this.y += config.GAME_SPEED / 2;
  }
}
