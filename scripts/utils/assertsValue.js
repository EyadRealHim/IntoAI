export default function assertsValue(arg, message = "Assertion failed") {
    if (arg === null || arg === undefined) {
        throw new Error(message);
    }
    return arg;
}
