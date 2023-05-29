import { config } from "./game.js";
import loadImage from "./utils/loadImage.js";
const ImagesPath = "./../assets/";
const BACKGROUND_IMAGE = loadImage(ImagesPath + "background.png");
const IDLER_PULLEY_IMAGE = loadImage(ImagesPath + "idlerPulley.png");
const BLET_IMAGE = loadImage(ImagesPath + "belt.png");
const WRENCH_IMAGE = loadImage(ImagesPath + "wrench.png");
const LASER_IMAGE = loadImage(ImagesPath + "laser.png");
const WARN_IMAGE = loadImage(ImagesPath + "warn.png");
const GAMEOVER_IMAGE = loadImage(ImagesPath + "gameover.png");
export function background(context, game) {
    drawImage(context, BACKGROUND_IMAGE, {
        height: game.viewHeight,
        width: game.viewWidth,
        y: 0,
        x: 0,
    });
}
export function gameover(context, game, size) {
    const ratio = GAMEOVER_IMAGE.height / GAMEOVER_IMAGE.width;
    const height = game.viewHeight * size * config.MAX_GAMEOVER_DISPLAY_GROWTH;
    const width = game.viewWidth * size * config.MAX_GAMEOVER_DISPLAY_GROWTH;
    const _size = Math.min(width, height) * ratio;
    drawImage(context, GAMEOVER_IMAGE, {
        width: _size,
        height: _size,
        x: game.viewWidth / 2,
        y: game.viewHeight / 2,
        center: true,
    });
}
export function laser(context, game, laser) {
    const shape = laser.shape(game);
    const position = {
        y: shape.y - shape.height / 2,
        x: shape.x,
        height: shape.height,
        width: -shape.width,
    };
    drawImage(context, LASER_IMAGE, position);
    if (config.SHOW_HIT_BOX)
        context.strokeRect(position.x, position.y, position.width, position.height);
}
export function character(context, game, character, sprite) {
    const shape = character.shape(game);
    drawImage(context, sprite.current, {
        ...shape,
        center: true,
    });
    if (config.SHOW_HIT_BOX) {
        context.strokeStyle = "black";
        context.strokeRect(shape.x - shape.width / 2, shape.y - shape.width / 2, shape.width, shape.height);
    }
}
export function wrench(context, game, wrench) {
    const shape = wrench.shape(game);
    drawImage(context, WRENCH_IMAGE, {
        ...shape,
        center: true,
    });
    if (config.SHOW_HIT_BOX) {
        context.strokeStyle = wrench.active ? "red" : "black";
        context.strokeRect(shape.x - shape.width / 2, shape.y - shape.height / 2, shape.width, shape.height);
    }
}
export function conveyorBelt(context, game) {
    const pulleySize = game.pulleySize;
    const pulleryY = game.viewHeight - pulleySize / 2;
    const beltHeight = pulleySize / 4;
    const beltWidth = pulleySize;
    const pulleyMargin = 10;
    for (let x = -beltWidth; x <= game.viewWidth; x += beltWidth) {
        drawImage(context, BLET_IMAGE, {
            height: beltHeight,
            width: beltWidth,
            y: pulleryY - pulleySize / 2 - beltHeight / 2,
            x: x + (game.progressCounter % beltWidth),
        });
    }
    const rotation = -(game.progressCounter / Math.PI) * 180;
    for (let x = 0; x <= game.viewWidth + pulleySize; x += pulleySize + pulleyMargin) {
        drawImage(context, IDLER_PULLEY_IMAGE, {
            height: pulleySize,
            width: pulleySize,
            rotation,
            y: pulleryY,
            x,
            center: true,
        });
    }
}
export function displayScore(context, game) {
    context.font = game.fontSize + "px 'Inter', sans-serif";
    context.strokeStyle = "#222";
    context.fillStyle = "white";
    context.lineWidth = game.fontSize / 4;
    const text = game.points.toString();
    const width = context.measureText(text).width;
    const x = (game.viewWidth - width) / 2;
    const y = game.fontSize * 1.5;
    context.strokeText(text, x, y);
    context.fillText(text, x, y);
    context.lineWidth = 1;
}
export function displayWarn(context, game, laser) {
    const shape = laser.shape(game);
    drawImage(context, WARN_IMAGE, {
        height: game.warnHeight,
        width: game.warnWidth,
        x: game.viewWidth - game.warnWidth,
        y: shape.y,
        center: true,
    });
}
export function drawImage(context, image, shape) {
    if (!image.isLoaded)
        return;
    context.save();
    context.translate(shape.x, shape.y);
    context.rotate(shape.rotation || 0);
    context.drawImage(image, shape.center ? -shape.width / 2 : 0, shape.center ? -shape.height / 2 : 0, shape.width, shape.height);
    context.restore();
}
