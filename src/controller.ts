import Character from "./character.js";
import { Game, config } from "./game.js";
import { pullFact } from "./aiFacts.js";
import assertsValue from "./utils/assertsValue.js";
import { KeyInterval, TouchInterval } from "./utils/keyInterval.js";
import sleep from "./utils/sleep.js";
import * as audios from "./audios.js";

const enterGameButton = assertsValue(
  document.getElementById("enter-game")
) as HTMLButtonElement;

const aboutGameButton = assertsValue(
  document.getElementById("about-game")
) as HTMLButtonElement;

const aboutDiv = assertsValue(
  document.getElementById("about")
) as HTMLDivElement;
const homeDiv = assertsValue(document.getElementById("home")) as HTMLDivElement;
const infoDiv = assertsValue(document.getElementById("info")) as HTMLDivElement;

export default function initController(
  canvas: HTMLCanvasElement,
  game: Game,
  character: Character
) {
  window.addEventListener("resize", () => {
    resize(canvas, game);
  });

  window.addEventListener("focus", game.doUnpause);
  window.addEventListener("blur", game.doPause);

  document.addEventListener("keydown", (e) => {
    if (e.key == "q") {
      game.pause ? game.doUnpause() : game.doPause();
    }
    if (e.key == "Enter") {
      if (game.gameover) window.location.reload();
      else startGame(game);

      aboutDiv.className = "display-out";
    }
  });

  enterGameButton.addEventListener("click", function () {
    startGame(game);
  });

  aboutGameButton.addEventListener("click", function () {
    aboutDiv.style.display = "block";
    aboutDiv.className = "display-in";
  });

  document.addEventListener("click", (event) => {
    if (
      !aboutDiv.contains(event.target as Node) &&
      event.target != aboutGameButton
    ) {
      aboutDiv.className = "display-out";
    }
  });

  KeyInterval(["w", "ArrowUp"], () => {
    character.up(game);
  });

  KeyInterval(["s", "ArrowDown"], () => {
    character.down(game);
  });

  TouchInterval(
    (y) => y < innerHeight / 2,
    function () {
      character.up(game);
    }
  );

  TouchInterval(
    (y) => y > innerHeight / 2,
    function () {
      character.down(game);
    }
  );

  game.onPoint = async function () {
    if (game.points % config.EVERY_PASS == 0) {
      const fact = pullFact();

      if (!fact) return;

      showInfo(fact);
      audios.notification();
      await sleep(1e3 + 7e3);
      let wasPaused = game.pause;
      while (game.pause) {
        await sleep(1e3);
      }
      if (wasPaused) {
        await sleep(4e3);
      }
      hideInfo();
    }
  };

  resize(canvas, game);

  window.focus();
}

function resize(canvas: HTMLCanvasElement, game: Game) {
  canvas.height = innerHeight;
  canvas.width = innerWidth;

  game.resize(canvas.width, canvas.height);
}

function startGame(game: Game) {
  homeDiv.style.display = "none";

  game.start();
}

export function showInfo(content: string) {
  const contentDiv = assertsValue(
    infoDiv.querySelector("#content")
  ) as HTMLDivElement;

  contentDiv.textContent = content;

  if (!infoDiv.classList.contains("fade-in")) {
    infoDiv.classList.add("fade-in");
  }
  infoDiv.classList.remove("fade-out");
}

export function hideInfo() {
  infoDiv.classList.remove("fade-in");
  infoDiv.classList.add("fade-out");
}
