import styles from './MainSliderCard.module.css'

function MainSliderCard({ ...props }) {
	return (
		<div className={styles.main_slide_card}>
			<img src={props.img} alt='' />
		</div>
	)
}

export default MainSliderCard
