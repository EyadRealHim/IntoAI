export function KeyInterval(
  keys: string[],
  callback: () => void,
  speed: number = 16
) {
  var interval: null | number = null;
  document.addEventListener("keydown", (e) => {
    if (keys.includes(e.key) && interval === null)
      interval = setInterval(callback, speed);
  });

  document.addEventListener("keyup", (e) => {
    if (keys.includes(e.key) && interval !== null) {
      clearInterval(interval);
      interval = null;
    }
  });
}

export function TouchInterval(
  test: (y: number) => boolean,
  callback: () => void,
  speed: number = 16
) {
  var interval: null | number = null;
  var identifier: number | undefined = 0;
  document.addEventListener("touchstart", (e) => {
    if (test(e.changedTouches[0]?.clientY ?? 0) && interval === null)
      interval = setInterval(callback, speed);
    identifier = e.changedTouches[0]?.identifier;
  });

  document.addEventListener("touchend", (e) => {
    if (e.changedTouches[0]?.identifier == identifier && interval) {
      clearInterval(interval);
      identifier = undefined;
      interval = null;
    }
  });
}
