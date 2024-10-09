import styles from './EventsItem.module.css'

function EventsItem({ children, ...props }) {
	return (
		<div className={styles.events_wrapper}>
			<img src={props.img} alt='' />
			<p className={styles.event_date}>{props.date}</p>
			<p style={{ textTransform: 'uppercase' }} className={styles.event_title}>
				{props.title}
			</p>
		</div>
	)
}

export default EventsItem
