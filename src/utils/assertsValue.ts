export default function assertsValue<T>(
  arg: T | null | undefined,
  message: string = "Assertion failed"
): T {
  if (arg === null || arg === undefined) {
    throw new Error(message);
  }

  return arg;
}
