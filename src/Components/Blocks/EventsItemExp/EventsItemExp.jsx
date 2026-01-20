import { Link } from 'react-router-dom'

import { UPLOAD } from '../../../serverConfig'

import styles from './EventsItemExp.module.css'

function EventsItemExp({ children, ...props }) {
	const formatDate = dateString => {
		const options = {
			// day: '2-digit',
			// month: '2-digit',
			// year: 'numeric'
			weekday: 'long'
			// hour: '2-digit',
			// minute: '2-digit'
		}

		return new Date(dateString).toLocaleString('ru-RU', options)
	}

	const getDayMonth = dateString => {
		const options = {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}

		return new Date(dateString).toLocaleString('ru-RU', options)
	}

	const weekdayShortNames = {
		понедельник: 'пн',
		вторник: 'вт',
		среда: 'ср',
		четверг: 'чт',
		пятница: 'пт',
		суббота: 'сб',
		воскресенье: 'вс'
	}

	const formattedWeekday =
		weekdayShortNames[formatDate(props.date)] || formatDate(props.date)

	return (
		<Link
			to={`/events-announcement/${props.id}`}
			className={styles.events_wrapper}
		>
			<img src={`${UPLOAD}${props.images[0]}`} alt='' />
			<p className={styles.event_date}>{getDayMonth(props.date)}</p>
			<p style={{ textTransform: 'uppercase' }} className={styles.event_title}>
				{props.title}
			</p>
			<div className={styles.event_exp}>
				<div className={styles.ev_item}>
					<img src='/images/ev_loc.png' alt='' />
					<p style={{ textTransform: 'uppercase' }}>{props.city}</p>
				</div>
				<div className={styles.ev_item}>
					<img src='/images/calendar.png' alt='' />
					<p style={{ textTransform: 'uppercase' }}>{formattedWeekday}</p>
				</div>
			</div>
		</Link>
	)
}

export default EventsItemExp
