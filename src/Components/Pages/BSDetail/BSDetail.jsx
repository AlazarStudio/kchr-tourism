import axios from 'axios'
import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useParams } from 'react-router-dom'

import getToken from '../../../getToken'
import { API, UPLOAD } from '../../../serverConfig'
import DocumentItem from '../../Blocks/DocumentItem/DocumentItem'
import Gallery from '../../Blocks/Gallery/Gallery'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './BSDetail.module.css'

Modal.setAppElement('#root')

function BSDetail({ children, ...props }) {
	const { id } = useParams()
	const [news, setNews] = useState({})
	const [selectedImage, setSelectedImage] = useState(null)

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await axios.get(
					`${API}/business-support/${parseInt(id)}`,
					{
						headers: { Authorization: `Bearer ${getToken()}` }
					}
				)
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
					{Array.isArray(news.images) && news.images.length > 0 && (
						<Gallery images={news.images} onSelect={openModal} />
					)}

					{news.type === 'tourism' &&
						news.documents &&
						Array.isArray(news.documents) &&
						news.documents.length > 0 && (
							<div className={styles.document_section}>
								<p className={styles.document_title}>Документы</p>
								<div className={styles.document_list}>
									{news.documents.map((doc, index) => (
										<DocumentItem
											key={index}
											src={doc}
											title={doc
												.split('/')
												.pop()
												.split('.')
												.slice(0, -1)
												.join('.')}
											// title={doc.split('/').pop()}
											// title={news.title ? `${news.title} — ${doc.split('/').pop()}` : doc.split('/').pop()}
										/>
									))}
								</div>
							</div>
						)}

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

export default BSDetail
