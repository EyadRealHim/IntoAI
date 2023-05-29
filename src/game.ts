import Character from "./character";
import Wrench from "./wrench";
import * as audios from "./audios.js";
import Laser from "./laser";

export const config = {
  GAP_SIZE: 0.44,
  GAME_SPEED: 4,

  CHARACTER_WAVING_TIME: 60, // Every n number of progress. the robot gonna complete full sin wave
  CHARACTER_WAVE_CAPACITY: 3, // 6

  WRENCH_GENERATE_TIME: 60, // Every n number of frames. generate an wrench
  BIRD_ANIMATION_SPEED: 8,

  CROW_SOUND_INTERVAL: 600, // 60*10
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
  #isOnStartState: boolean = true;
  public pause: boolean = false;

  public viewHeight!: number;
  public viewWidth!: number;

  public wrenchHeight!: number;
  public wrenchWidth!: number;

  public characterHeight!: number;
  public characterWidth!: number;

  public warnHeight!: number;
  public warnWidth!: number;

  public pulleySize!: number;
  public fontSize!: number;

  public wrenchs: Wrench[];

  public gameover: boolean = false;
  public points: number = 0;

  public laserHeight!: number;

  public laser: null | Laser = null;

  public laserSummonCounter: number = 0;
  public animationCounter: number = 0;
  public progressCounter: number = 0;

  public onPoint: Function = () => {};

  constructor(viewWidth: number, viewHeight: number) {
    this.resize(viewHeight, viewWidth);

    this.wrenchs = [];
  }

  resize(viewWidth: number, viewHeight: number) {
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

  update(character: Character) {
    if (this.isOnStartState) {
      return this.updateAnimation();
    }

    if (this.gameover || this.pause) return;

    this.wrenchs = this.wrenchs.filter(
      (wrench) => wrench.x + this.wrenchWidth > 0
    );

    if (!this.vaildate(character)) {
      this.gameover = true;
      this.doPause();
      audios.crow();

      return;
    }

    this.updateState();
  }

  updateState() {
    if (this.pause) return;

    this.progressCounter += config.GAME_SPEED;
    this.updateAnimation();

    for (let wrench of this.wrenchs) {
      wrench.x -= config.GAME_SPEED;
    }

    if (this.laser) this.laser.update(this);
    else this.laserSummonCounter += 1;
  }

  updateAnimation() {
    this.animationCounter += 1;
  }

  vaildate(character: Character): boolean {
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

      if (wrench.active) return false;
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
