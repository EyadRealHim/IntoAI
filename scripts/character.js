import { config } from "./game.js";
export default class Character {
    y;
    state = "FlyingForward";
    sinWave = 0;
    constructor(y) {
        this.y = y;
    }
    shape(game) {
        const y = this.y +
            Math.sin(game.progressCounter / config.CHARACTER_WAVING_TIME) *
                config.CHARACTER_WAVE_CAPACITY;
        return {
            height: game.characterWidth,
            width: game.characterHeight,
            x: game.characterWidth * 2,
            y: Math.max(Math.min(y, game.viewHeight - game.characterHeight), game.characterHeight),
        };
    }
    up(game) {
        if (!game.gameover && !game.pause && !game.isOnStartState)
            this.y -= config.GAME_SPEED / 2;
    }
    down(game) {
        if (!game.gameover && !game.pause && !game.isOnStartState)
            this.y += config.GAME_SPEED / 2;
    }
}
