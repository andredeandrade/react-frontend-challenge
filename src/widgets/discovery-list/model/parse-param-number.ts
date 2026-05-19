export function parseParamNumber(value: string | null): number | undefined {
  if (!value) return undefined;

  const parsedValue = Number(value);
  if (!Number.isFinite(parsedValue)) return undefined;

  return parsedValue;
}