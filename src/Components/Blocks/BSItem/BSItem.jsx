import { Link } from 'react-router-dom'

import uploadsConfig from '../../../uploadsConfig'

import styles from './BSItem.module.css'

function BSItem({ children, ...props }) {
	const formatDate = dateString => {
		const options = {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		}

		return new Date(dateString).toLocaleString('ru-RU', options)
	}

	return (
		<Link
			to={`/business-support/${props.id}`}
			state={props.type}
			className={styles.news_card__item}
		>
			<img src={`${uploadsConfig}${props.images[0]}`} alt='' />
			<div className={styles.news_cart__text}>
				<p>{formatDate(props.date)}</p>
				<p>{props.title}</p>
			</div>
		</Link>
	)
}

export default BSItem
