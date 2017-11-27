
export function pluralize(num, thing) {
  return num === 1 ? `${num} ${thing}` : `${num} ${thing}s`
}