export default function isObject(o: unknown): boolean {
  return (
    o !== undefined &&
    o !== null &&
    typeof o !== "function" &&
    !Array.isArray(o) &&
    typeof o === "object"
  );
}
