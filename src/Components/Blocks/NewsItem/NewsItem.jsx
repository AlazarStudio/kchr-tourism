import { Link } from 'react-router-dom'

import { UPLOAD } from '../../../serverConfig'
import CoverImage from '../CoverImage/CoverImage'

import styles from './NewsItem.module.css'

function NewsItem({ children, ...props }) {
	const formatDate = dateString => {
		const options = {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
			// hour: '2-digit',
			// minute: '2-digit'
		}

		return new Date(dateString).toLocaleString('ru-RU', options)
	}

	return (
		<Link to={`/news/${props.id}`} className={styles.news_card__item}>
			<CoverImage
				src={`${UPLOAD}${props.images[0]}`}
				className={styles.news_cover}
			/>
			<div className={styles.news_cart__text}>
				<p>{formatDate(props.date)}</p>
				<p>{props.title}</p>
			</div>
		</Link>
	)
}

export default NewsItem
