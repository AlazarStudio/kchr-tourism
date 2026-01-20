import axios from 'axios'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useParams } from 'react-router-dom'

import getToken from '../../../getToken'
import { API, UPLOAD } from '../../../serverConfig'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './VIsitDetail.module.css'

Modal.setAppElement('#root')

function VIsitDetail({ children, ...props }) {
	const { id } = useParams()
	const [news, setNews] = useState({})
	const [selectedImage, setSelectedImage] = useState(null)

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await axios.get(`${API}/visit/${parseInt(id)}`, {
					headers: { Authorization: `Bearer ${getToken()}` }
				})
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

	const openModal = img => {
		setSelectedImage(img)
	}

	const closeModal = () => {
		setSelectedImage(null)
	}

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
								<img
									key={index}
									src={`${UPLOAD}${img}`}
									alt=''
									className={styles.image_thumbnail}
									onClick={() => openModal(img)}
								/>
							))}
					</div>

					<Modal
						isOpen={!!selectedImage}
						onRequestClose={closeModal}
						contentLabel='Просмотр изображения'
						className={styles.modal_content}
						overlayClassName={styles.modal_overlay}
					>
						<img
							src={`${UPLOAD}${selectedImage}`}
							alt=''
							className={styles.modal_image}
						/>
						<button className={styles.close_button} onClick={closeModal}>
							x
						</button>
					</Modal>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default VIsitDetail
