import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { events, projects } from '../../../../data'
import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import uploadsConfig from '../../../uploadsConfig'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './EventsDetail.module.css'

function EventsDetail({ children, ...props }) {
	const { id } = useParams()
	// console.log(id)

	const [news, setNews] = useState({})

	// const article = news.find(link => link.id === id)
	// console.log(article)

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await axios.get(
					`${serverConfig}/events/${parseInt(id)}`,
					{
						headers: { Authorization: `Bearer ${getToken}` }
					}
				)
				// console.log(response.data)
				setNews(response.data)
			} catch (error) {
				console.error('Error fetching news:', error)
			}
		}
		fetchEvent()
	}, [id])

	useEffect(() => {
		window.scrollTo({ top: '0', behavior: 'instant' })
	}, [])

	return (
		<main className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<p className={styles.article_title}>{news.title}</p>
					{/* <div className={styles.article_info} style={{ textTransform: 'uppercase' }}>
						<p>{article.date}</p>
						<p>{article.day}</p>
						<p>{article.location}</p>
					</div> */}

					<div
						dangerouslySetInnerHTML={{ __html: news.text }}
						className={styles.article_text}
					/>

					<div className={styles.article_images}>
						{news.images &&
							Array.isArray(news.images) &&
							news.images.map((img, index) => (
								<img key={index} src={`${uploadsConfig}${img}`} alt='' />
							))}
					</div>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default EventsDetail
