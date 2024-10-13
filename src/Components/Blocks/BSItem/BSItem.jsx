import { Link } from 'react-router-dom'

import styles from './BSItem.module.css'

function BSItem({ children, ...props }) {
	return (
		<Link to={`/business-support/${props.id}`} className={styles.news_card__item}>
			<img src={props.img[0]} alt='' />
			<div className={styles.news_cart__text}>
				<p>{props.date}</p>
				<p>{props.title}</p>
			</div>
		</Link>
	)
}

export default BSItem
