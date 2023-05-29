const AUDIOS_DIR = "./../assets/audios/";
export const Notification = new Audio(AUDIOS_DIR + "notification.mp3");
export const WarnAlarm = new Audio(AUDIOS_DIR + "warnAlarm.mp3");
export const Flapping = new Audio(AUDIOS_DIR + "flapping.mp3");
export const Point = new Audio(AUDIOS_DIR + "point.mp3");
export const Crow = new Audio(AUDIOS_DIR + "crow.mp3");
WarnAlarm.volume = 0.05;
Flapping.volume = 0.1;
Point.volume = 0.01;
Notification.volume = 1;
const audios = [Notification, Flapping, WarnAlarm, Crow, Point];
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    audios.forEach((audio) => (audio.muted = true));
}
export function pause() {
    for (let audio of audios) {
        if (audio.currentTime !== 0 && audio.currentTime !== audio.duration) {
            audio.pause();
        }
    }
}
export function unpause() {
    for (let audio of audios) {
        if (audio.currentTime !== 0 && audio.currentTime !== audio.duration) {
            audio.play();
        }
    }
}
export function play(audio) {
    return new Promise(async (resolve) => {
        audio.onended = () => resolve();
        try {
            audio.currentTime = 0;
            await audio.play();
        }
        catch (e) {
            alert(e.message);
            resolve();
        }
    });
}
export function flap() {
    return play(Flapping);
}
export function crow() {
    return play(Crow);
}
export function warnAlarm() {
    return play(WarnAlarm);
}
export function point() {
    return play(Point);
}
export function notification() {
    return play(Notification);
}
