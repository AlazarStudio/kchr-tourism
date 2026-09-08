import { useState } from 'react'

import styles from './CoverImage.module.css'

// Вертикальный бокс 4:5 для обложек карточек: вертикальные афиши заполняют его,
// горизонтальные и квадратные показываются целиком на светлой подложке
function CoverImage({ src, alt = '', className = '' }) {
	const [landscape, setLandscape] = useState(false)

	return (
		<div className={`${styles.box} ${className}`}>
			<img
				src={src}
				alt={alt}
				loading='lazy'
				className={landscape ? styles.contain : styles.cover}
				onLoad={e => setLandscape(e.currentTarget.naturalWidth >= e.currentTarget.naturalHeight)}
			/>
		</div>
	)
}

export default CoverImage
