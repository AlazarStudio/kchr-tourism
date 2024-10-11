import { Link } from 'react-router-dom'

import styles from './NewsItem.module.css'

function NewsItem({ children, ...props }) {
	return (
		<Link to={`/news/${props.id}`} className={styles.news_card__item}>
			<img src={props.img[0]} alt='' />
			<div className={styles.news_cart__text}>
				<p>{props.date}</p>
				<p>{props.title}</p>
			</div>
		</Link>
	)
}

export default NewsItem
