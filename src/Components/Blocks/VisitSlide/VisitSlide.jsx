import styles from './VisitSlide.module.css'

function VisitSlide({ children, ...props }) {
	return (
		<div className={styles.visit_wrapper}>
			<div className={styles.text_wrapper}>
				<p>{props.title}</p>
				<img style={{ cursor: 'pointer' }} src='/images/arrow.png' alt='' />
			</div>
			<div className={styles.image_wrapper}>
				<img src={props.images} alt='' />
			</div>
		</div>
	)
}

export default VisitSlide
