import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from 'react-router-dom'

import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import BSItem from '../../Blocks/BSItem/BSItem'
import CalculatorBlock from '../../Blocks/CalculatorBlock/CalculatorBlock'
import FeedbackBS from '../../Blocks/FeedbackBS/FeedbackBS'
import PageHeader from '../../Blocks/PageHeader/PageHeader'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './BusinessSupportPage.module.css'

Modal.setAppElement('#root')

const fetchNews = async () => {
	try {
		const response = await axios.get(`${serverConfig}/business-support`, {
			headers: { Authorization: `Bearer ${getToken()}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function BusinessSupportPage({ children, ...props }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const newsRef = useRef(null)
	const [type, setType] = useState('tourism')
	const [calculatorVisible, setCalculatorVisible] = useState(false)
	const [news, setNews] = useState([])

	const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

	useEffect(() => {
		const getNews = async () => {
			const news = await fetchNews()
			setNews(news)
		}
		getNews()
	}, [])

	// const items = type === 1 ? bs : type === 2 ? bs2 : bs3

	// Извлекаем параметр "page" из строки запроса
	const page = parseInt(searchParams.get('page')) || 1

	const itemsPerPage = 9

	const filteredNews = news.filter(item => item.type === type)

	const pageCount = Math.ceil(filteredNews.length / itemsPerPage)

	const safePage = Math.min(page, pageCount)

	const [currentPage, setCurrentPage] = useState(safePage - 1)

	const displayNews = filteredNews.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage
	)

	const handlePageClick = ({ selected }) => {
		setSearchParams({ page: selected + 1 })
		setCurrentPage(selected) // Обновляем состояние currentPage
		if (newsRef.current) {
			newsRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	useEffect(() => {
		// Обновляем currentPage при изменении параметра страницы
		setCurrentPage(safePage - 1)
	}, [safePage])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' })
	}, [])

	// if (safePage < 1 || safePage > pageCount) {
	// 	return <NotFoundPage />
	// }

	return (
		<main ref={newsRef} className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<PageHeader title='Поддержка бизнеса' />

					<div className={styles.switch_buttons}>
						<button
							className={type == 'tourism' ? styles.activeButton : null}
							onClick={() => {
								setType('tourism')
							}}
						>
							для туризма
						</button>
						<button
							className={type == 'hoteliers' ? styles.activeButton : null}
							onClick={() => {
								setType('hoteliers')
								setCurrentPage(0)
								setSearchParams({ page: 1 })
							}}
						>
							для отельеров
						</button>
						<button
							className={type == 'grants' ? styles.activeButton : null}
							onClick={() => {
								setType('grants')
								setCurrentPage(0)
								setSearchParams({ page: 1 }) // Обновляем параметр страницы
							}}
						>
							гранты
						</button>
					</div>

					<div className={styles.calcButton}>
					{type === 'hoteliers' && (
							<button
								onClick={() => {
									setCalculatorVisible(prev => !prev)
								}}
							>
								{calculatorVisible
									? 'Мероприятия'
									: 'Калькулятор стоимости услуг'}
							</button>
					)}
						<button onClick={() => setIsFeedbackOpen(true)}>
							Оставить заявку
						</button>
					</div>

					{/* <div className={styles.calcButton}>
					</div> */}

					{type === 'hoteliers' ? (
						<>
							{calculatorVisible ? (
								<CalculatorBlock />
							) : (
								<>
									{displayNews.length === 0 ? (
										<p className={styles.not_found}>Нет статей</p>
									) : (
										<>
											<div className={styles.news_wrapper}>
												{displayNews.map((item, index) => (
													<BSItem key={index} type:type {...item} />
												))}
											</div>

											<ReactPaginate
												previousLabel={
													<p
														style={{
															display: 'flex',
															alignItems: 'center',
															gap: '5px'
														}}
													>
														<img
															style={{ transform: 'rotate(180deg)' }}
															src='/images/next_paginate.png'
															alt=''
														/>
														Предыдущий
													</p>
												}
												nextLabel={
													<p
														style={{
															display: 'flex',
															alignItems: 'center',
															gap: '5px'
														}}
													>
														Следующий{' '}
														<img src='/images/next_paginate.png' alt='' />
													</p>
												}
												breakLabel={'...'}
												pageCount={pageCount}
												forcePage={currentPage} // Используем currentPage без -1
												marginPagesDisplayed={2}
												pageRangeDisplayed={3}
												onPageChange={handlePageClick}
												containerClassName={styles.pagination}
												pageClassName={styles.page}
												previousClassName={styles.next_prev}
												nextClassName={styles.next_prev}
												activeClassName={styles.active}
											/>
										</>
									)}
								</>
							)}
							{/* )} */}
						</>
					) : (
						<>
							{displayNews.length === 0 ? (
								<p className={styles.not_found}>Нет статей</p>
							) : (
								<>
									<div className={styles.news_wrapper}>
										{displayNews.map((item, index) => (
											<BSItem key={index} type:type {...item} />
										))}
									</div>

									<ReactPaginate
										previousLabel={
											<p
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '5px'
												}}
											>
												<img
													style={{ transform: 'rotate(180deg)' }}
													src='/images/next_paginate.png'
													alt=''
												/>
												Предыдущий
											</p>
										}
										nextLabel={
											<p
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '5px'
												}}
											>
												Следующий <img src='/images/next_paginate.png' alt='' />
											</p>
										}
										breakLabel={'...'}
										pageCount={pageCount}
										forcePage={currentPage} // Используем currentPage без -1
										marginPagesDisplayed={2}
										pageRangeDisplayed={3}
										onPageChange={handlePageClick}
										containerClassName={styles.pagination}
										pageClassName={styles.page}
										previousClassName={styles.next_prev}
										nextClassName={styles.next_prev}
										activeClassName={styles.active}
									/>
								</>
							)}
						</>
					)}
				</WidthBlock>
			</CenterBlock>
			<Modal
				isOpen={isFeedbackOpen}
				onRequestClose={() => setIsFeedbackOpen(false)} // закрытие по Esc/оверлею/крестику
				contentLabel='Оставить заявку'
				className={styles.modalContent} // стили содержимого
				overlayClassName={styles.modalOverlay} // стили подложки
				closeTimeoutMS={150} // плавное закрытие (по желанию)
				shouldCloseOnOverlayClick={true}
			>
				<button
					type='button'
					aria-label='Закрыть модальное окно'
					className={styles.modalClose}
					onClick={() => setIsFeedbackOpen(false)}
				>
					×
				</button>

				<FeedbackBS />
			</Modal>
		</main>
	)
}

export default BusinessSupportPage
