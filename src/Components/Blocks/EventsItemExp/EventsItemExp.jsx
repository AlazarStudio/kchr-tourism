import { Link } from 'react-router-dom'
import styles from './EventsItemExp.module.css'

function EventsItemExp({ children, ...props }) {
	return (
		<Link to={`/events-announcement/${props.id}`} className={styles.events_wrapper}>
			<img src={props.img[0]} alt='' />
			<p className={styles.event_date}>{props.date}</p>
			<p style={{ textTransform: 'uppercase' }} className={styles.event_title}>
				{props.title}
			</p>
			<div className={styles.event_exp}>
				<div className={styles.ev_item}>
					<img src='/images/ev_loc.png' alt='' />
					<p style={{ textTransform: 'uppercase' }}>{props.location}</p>
				</div>
				<div className={styles.ev_item}>
					<img src='/images/calendar.png' alt='' />
					<p style={{ textTransform: 'uppercase' }}>{props.day}</p>
				</div>
			</div>
		</Link>
	)
}

export default EventsItemExp
