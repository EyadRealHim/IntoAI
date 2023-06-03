import { Game, config } from "./game.js";
import assertsValue from "./utils/assertsValue.js";
import * as draw from "./draw.js";
import { generateWrench } from "./wrench.js";
import Character from "./character.js";
import Sprite from "./utils/sprite.js";
import loadImage from "./utils/loadImage.js";
import * as audios from "./audios.js";
import { generateLaser } from "./laser.js";

import initController from "./controller.js";

const canvas = assertsValue(
  document.getElementById("gameCanvas") as HTMLCanvasElement,
  "gameCanvas is not found."
);
const context = assertsValue(canvas.getContext("2d"));

const game = new Game(canvas.width, canvas.height);
const character = new Character(innerHeight / 2);

const birdSprite = new Sprite(
  Array(9)
    .fill(0)
    .map((_, i) => loadImage("./assets/bird/n" + (i + 1) + ".png"))
);

let growthOfGameOverDisplay = 0;

function main() {
  initController(canvas, game, character);
  initDraw();
}

function frame() {
  draw.background(context, game);
  for (let wrench of game.wrenchs) {
    draw.wrench(context, game, wrench);
  }

  draw.character(context, game, character, birdSprite);
  if (game.laser) {
    if (game.laser.loading) draw.displayWarn(context, game, game.laser);
    draw.laser(context, game, game.laser);
  }

  if (!game.isOnStartState) draw.displayScore(context, game);
  if (game.gameover) {
    growthOfGameOverDisplay += (300 - growthOfGameOverDisplay) * 0.05;
    draw.gameover(context, game, growthOfGameOverDisplay / 300);
  }
}

function update() {
  if (game.gameover || game.pause) return;

  const absolute = (e: number) => e * config.GAME_SPEED;

  if (
    game.progressCounter % absolute(config.WRENCH_GENERATE_TIME) ==
    config.GAME_SPEED
  ) {
    generateWrench(game);
  }

  if (game.animationCounter % config.BIRD_ANIMATION_SPEED == 0) {
    birdSprite.next();

    if (birdSprite.index == 4) audios.flap();
  }

  if (
    !game.laser &&
    game.laserSummonCounter % config.LASER_INTERVAL ==
      config.LASER_INTERVAL - config.GAME_SPEED
  ) {
    game.laserSummonCounter += 1;
    generateLaser(game, character);
  }

  if (game.animationCounter % config.CROW_SOUND_INTERVAL == 0) {
    try {
      audios.crow();
    } catch (e) {}
  }

  game.update(character);
}

function initDraw() {
  const timeoutFunction = requestAnimationFrame;

  const loop = () => {
    update();
    frame();

    timeoutFunction(loop);
  };

  timeoutFunction(loop);
}

main();
