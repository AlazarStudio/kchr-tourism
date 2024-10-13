import { Link } from 'react-router-dom'
import styles from './EventsItem.module.css'

function EventsItem({ children, ...props }) {
	return (
		<Link to={`/events-announcement/${props.id}`} className={styles.events_wrapper}>
			<img src={props.img[0]} alt='' />
			<p className={styles.event_date}>{props.date}</p>
			<p style={{ textTransform: 'uppercase' }} className={styles.event_title}>
				{props.title}
			</p>
		</Link>
	)
}

export default EventsItem
