const MONTHS = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря'
]
const WEEKDAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

const toDate = value => (value ? new Date(value) : null)
const sameDay = (a, b) =>
	a.getFullYear() === b.getFullYear() &&
	a.getMonth() === b.getMonth() &&
	a.getDate() === b.getDate()

// Период события: «12 сентября 2026», «12 — 15 сентября 2026»,
// «30 сентября — 2 октября 2026», «30 декабря 2026 — 2 января 2027»
export function formatEventPeriod(date, dateEnd) {
	const start = toDate(date)
	if (!start) return ''
	const end = toDate(dateEnd)
	const full = d => `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
	if (!end || end <= start || sameDay(start, end)) return full(start)
	if (start.getFullYear() !== end.getFullYear())
		return `${full(start)} — ${full(end)}`
	if (start.getMonth() !== end.getMonth())
		return `${start.getDate()} ${MONTHS[start.getMonth()]} — ${full(end)}`
	return `${start.getDate()} — ${full(end)}`
}

// Дни недели: «пт» или «пт — вс»
export function formatEventWeekdays(date, dateEnd) {
	const start = toDate(date)
	if (!start) return ''
	const end = toDate(dateEnd)
	const first = WEEKDAYS[start.getDay()]
	if (!end || end <= start || sameDay(start, end)) return first
	return `${first} — ${WEEKDAYS[end.getDay()]}`
}
