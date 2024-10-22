import uploadsConfig from '../../../uploadsConfig'

import styles from './MainSliderCard.module.css'

function MainSliderCard({ ...props }) {
	return (
		<div className={styles.main_slide_card}>
			<img src={`${uploadsConfig}${props.images[0]}`} alt='' />
		</div>
	)
}

export default MainSliderCard
