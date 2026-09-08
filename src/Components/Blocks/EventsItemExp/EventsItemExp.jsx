import { Link } from 'react-router-dom'

import { formatEventPeriod, formatEventWeekdays } from '../../../formatEventDates'
import { UPLOAD } from '../../../serverConfig'
import CoverImage from '../CoverImage/CoverImage'

import styles from './EventsItemExp.module.css'

function EventsItemExp({ children, ...props }) {
	return (
		<Link
			to={`/events-announcement/${props.id}`}
			className={styles.events_wrapper}
		>
			<CoverImage src={`${UPLOAD}${props.images[0]}`} />
			<p className={styles.event_date}>
				{formatEventPeriod(props.date, props.dateEnd)}
			</p>
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
					<p style={{ textTransform: 'uppercase' }}>
						{formatEventWeekdays(props.date, props.dateEnd)}
					</p>
				</div>
			</div>
		</Link>
	)
}

export default EventsItemExp
