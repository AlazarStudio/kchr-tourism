import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { events, projects } from '../../../../data'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './EventsDetail.module.css'

function EventsDetail({ children, ...props }) {
	const { id } = useParams()
	console.log(id)

	const article = events.find(link => link.id == id)
	console.log(article)

	useEffect(() => {
		window.scrollTo({ top: '0', behavior: 'instant' })
	}, [])

	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					<p className={styles.article_title}>{article.title}</p>
					<div className={styles.article_info} style={{ textTransform: 'uppercase' }}>
						<p>{article.date}</p>
						<p>{article.day}</p>
						<p>{article.location}</p>
					</div>

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

export default EventsDetail
