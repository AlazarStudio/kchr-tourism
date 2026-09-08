import { useState } from 'react'

import { UPLOAD } from '../../../serverConfig'

import styles from './Gallery.module.css'

// Раскладка «justified rows»: каждая картинка сохраняет своё соотношение сторон,
// ряд растягивается на всю ширину контейнера через flex-grow/flex-basis от --r
function Gallery({ images, onSelect }) {
	const [ratios, setRatios] = useState({})

	const handleLoad = (index, e) => {
		const { naturalWidth, naturalHeight } = e.currentTarget
		if (!naturalWidth || !naturalHeight) return
		setRatios(prev => ({ ...prev, [index]: naturalWidth / naturalHeight }))
	}

	return (
		<div className={styles.gallery}>
			{images.map((img, index) => (
				<div
					key={index}
					className={styles.item}
					style={ratios[index] ? { '--r': ratios[index] } : undefined}
				>
					<img
						src={`${UPLOAD}${img}`}
						alt=''
						onLoad={e => handleLoad(index, e)}
						onClick={() => onSelect(img)}
					/>
				</div>
			))}
		</div>
	)
}

export default Gallery
