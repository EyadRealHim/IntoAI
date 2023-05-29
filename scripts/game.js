import * as audios from "./audios.js";
export const config = {
    GAP_SIZE: 0.44,
    GAME_SPEED: 4,
    CHARACTER_WAVING_TIME: 60,
    CHARACTER_WAVE_CAPACITY: 3,
    WRENCH_GENERATE_TIME: 60,
    BIRD_ANIMATION_SPEED: 8,
    CROW_SOUND_INTERVAL: 600,
    LASER_INTERVAL: 60 * 5,
    SCROE_PER_WRENCH: 0.5,
    SHOW_HIT_BOX: false,
    RELEASE_COUNT_DOWN: 100,
    MAX_GAMEOVER_DISPLAY_GROWTH: 1.3,
    EVERY_PASS: 10,
    TOLERANT: 0.44,
    LASER_A: 8,
};
export class Game {
    #isOnStartState = true;
    pause = false;
    viewHeight;
    viewWidth;
    wrenchHeight;
    wrenchWidth;
    characterHeight;
    characterWidth;
    warnHeight;
    warnWidth;
    pulleySize;
    fontSize;
    wrenchs;
    gameover = false;
    points = 0;
    laserHeight;
    laser = null;
    laserSummonCounter = 0;
    animationCounter = 0;
    progressCounter = 0;
    onPoint = () => { };
    constructor(viewWidth, viewHeight) {
        this.resize(viewHeight, viewWidth);
        this.wrenchs = [];
    }
    resize(viewWidth, viewHeight) {
        // ALOT OF MAGIC NUMBERS !!!
        this.viewHeight = viewHeight;
        this.viewWidth = viewWidth;
        this.pulleySize = Math.min(this.viewWidth, this.viewHeight) / 15;
        this.wrenchHeight = this.viewHeight * 0.8;
        this.wrenchWidth = this.wrenchHeight / 3.5;
        this.characterHeight = this.viewHeight / 11;
        this.characterWidth = this.characterHeight;
        this.laserHeight = this.characterHeight * 0.8;
        this.warnHeight = this.characterHeight;
        this.warnWidth = this.warnHeight;
        this.fontSize = this.pulleySize * 0.7;
    }
    update(character) {
        if (this.isOnStartState) {
            return this.updateAnimation();
        }
        if (this.gameover || this.pause)
            return;
        this.wrenchs = this.wrenchs.filter((wrench) => wrench.x + this.wrenchWidth > 0);
        if (!this.vaildate(character)) {
            this.gameover = true;
            this.doPause();
            audios.crow();
            return;
        }
        this.updateState();
    }
    updateState() {
        if (this.pause)
            return;
        this.progressCounter += config.GAME_SPEED;
        this.updateAnimation();
        for (let wrench of this.wrenchs) {
            wrench.x -= config.GAME_SPEED;
        }
        if (this.laser)
            this.laser.update(this);
        else
            this.laserSummonCounter += 1;
    }
    updateAnimation() {
        this.animationCounter += 1;
    }
    vaildate(character) {
        const chShape = character.shape(this);
        if (this.laser && this.laser.collision(this, chShape)) {
            return false;
        }
        for (const wrench of this.wrenchs) {
            wrench.active = wrench.collision(this, chShape);
            if (wrench.canBeTaken(this, chShape)) {
                this.points += config.SCROE_PER_WRENCH;
                if (Math.floor(this.points) == this.points) {
                    audios.point();
                    this.onPoint();
                }
            }
            if (wrench.active)
                return false;
        }
        return true;
    }
    doUnpause() {
        audios.unpause();
        this.pause = false;
    }
    doPause() {
        audios.pause();
        this.pause = true;
    }
    start() {
        if (this.isOnStartState) {
            this.#isOnStartState = false;
        }
    }
    get isOnStartState() {
        return this.#isOnStartState;
    }
}
