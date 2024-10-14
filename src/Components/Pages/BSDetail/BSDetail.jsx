import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { bs, bs2, bs3 } from '../../../../data'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './BSDetail.module.css'

function BSDetail({ children, ...props }) {
	const { id } = useParams()
	const location = useLocation()
	// console.log(id)

	const type = location.state || ''
	const items = type === 1 ? bs : type === 2 ? bs2 : bs3

	const article = items.find(link => link.id === id)
	// console.log(article)

	useEffect(() => {
		window.scrollTo({ top: '0', behavior: 'instant' })
	}, [])

	return (
		<main className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<p className={styles.article_title}>{article.title}</p>

					<div
						dangerouslySetInnerHTML={{ __html: article.text }}
						className={styles.article_text}
					/>

					<div className={styles.article_images}>
						{article.img.map((img, index) => (
							<img key={index} src={img} alt='' />
						))}
					</div>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default BSDetail
