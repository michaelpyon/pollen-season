const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const FULL_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function formatShortDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`
}

export function formatDayName(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const target = new Date(d)
  target.setHours(0, 0, 0, 0)

  const diff = (target - today) / (1000 * 60 * 60 * 24)

  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  return DAYS[d.getDay()]
}

export function formatFullDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${FULL_DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`
}

export function formatHeaderDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

export function getCurrentMonth() {
  return new Date().getMonth() + 1
}
