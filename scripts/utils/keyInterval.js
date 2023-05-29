export function KeyInterval(keys, callback, speed = 16) {
    var interval = null;
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
export function TouchInterval(test, callback, speed = 16) {
    var interval = null;
    var identifier = 0;
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
