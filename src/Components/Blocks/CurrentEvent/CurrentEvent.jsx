import { Link, useNavigate } from 'react-router-dom'

import uploadsConfig from '../../../uploadsConfig'

import styles from './CurrentEvent.module.css'

function CurrentEvent({ ...props }) {
	const navigate = useNavigate()

	return (
		<div
			// to={`/events-announcement/${props.id}`}
			className={styles.current_event__wrapper}
		>
			<img src={`${uploadsConfig}${props.images[0]}`} alt='' />
			<div className={styles.current_event__text}>
				<p className={styles.current_title}>ТЕКУЩЕЕ СОБЫТИЕ</p>
				<p className={styles.title}>{props.title}</p>
				<div
					className={styles.text}
					dangerouslySetInnerHTML={{ __html: props.text }}
				/>
			</div>
			<button onClick={() => navigate(`/events-announcement/${props.id}`)}>
				Подробнее
			</button>
		</div>
	)
}

export default CurrentEvent
