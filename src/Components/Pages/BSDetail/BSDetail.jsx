import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { bs, bs2, bs3 } from '../../../../data'
import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import uploadsConfig from '../../../uploadsConfig'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './BSDetail.module.css'

function BSDetail({ children, ...props }) {
	const { id } = useParams()
	const [news, setNews] = useState({})

	// const article = news.find(link => link.id === id)
	// console.log(article)

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await axios.get(
					`${serverConfig}/business-support/${parseInt(id)}`,
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
		fetchNews()
	}, [id])

	useEffect(() => {
		window.scrollTo({ top: '0', behavior: 'instant' })
	}, [])

	return (
		<main className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<p className={styles.article_title}>{news.title}</p>

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

export default BSDetail
