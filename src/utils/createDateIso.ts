export function createUtcDateForIso(dateString: string): number {
  const offset = new Date().getTimezoneOffset()
  const myDate = Date.parse(dateString) - offset * 60 * 1000
  return myDate
}
