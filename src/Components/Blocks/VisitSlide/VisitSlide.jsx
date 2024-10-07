import styles from './VisitSlide.module.css'

function VisitSlide({ children, ...props }) {
	return (
		<div className={styles.visit_wrapper}>
			<div className={styles.text_wrapper}>
				<p>{props.title}</p>
				<img src='/images/arrow.png' alt='' />
			</div>
			<div className={styles.image_wrapper}><img src={props.img} alt="" /></div>
		</div>
	)
}

export default VisitSlide
