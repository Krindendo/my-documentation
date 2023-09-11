export function remToPx(remValue: string | number) {
  let rootFontSize =
    typeof window === "undefined"
      ? 16
      : parseFloat(window.getComputedStyle(document.documentElement).fontSize)

  if (typeof remValue === "number") {
    return remValue * rootFontSize
  }
  return parseFloat(remValue) * rootFontSize
}
