import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { news } from '../../../../data'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './NewsDetail.module.css'

function NewsDetail({ children, ...props }) {
	const { id } = useParams()
	// console.log(id)

	const article = news.find(link => link.id === id)
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

export default NewsDetail
