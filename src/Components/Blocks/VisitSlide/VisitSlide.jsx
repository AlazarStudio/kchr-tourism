import { Link } from 'react-router-dom'

import { UPLOAD } from '../../../serverConfig'

import styles from './VisitSlide.module.css'

function VisitSlide({ children, ...props }) {
	return (
		<div className={styles.visit_wrapper}>
			<div className={styles.text_wrapper}>
				<p>{props.title}</p>
				<Link to={`/places-to-visit/${props.id}`}>
					<img style={{ cursor: 'pointer' }} src='/images/arrow.png' alt='' />
				</Link>
			</div>
			<div className={styles.image_wrapper}>
				<img src={`${UPLOAD}${props.images[0]}`} alt='' />
			</div>
		</div>
	)
}

export default VisitSlide
