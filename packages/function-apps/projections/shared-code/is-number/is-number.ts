export default function isNumber(n: unknown): boolean {
  const numberN = Number(n);

  return (
    n !== null &&
    typeof n !== "string" &&
    typeof n !== "boolean" &&
    !Array.isArray(n) &&
    !Number.isNaN(numberN)
  );
}
