import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from 'react-router-dom'

import getToken from '../../../getToken'
import { API } from '../../../serverConfig'
// import { news } from '../../../../data'
import NewsItem from '../../Blocks/NewsItem/NewsItem'
import PageHeader from '../../Blocks/PageHeader/PageHeader'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

import styles from './NewsPage.module.css'

const parseTotalFromContentRange = headerValue => {
	if (!headerValue) return 0
	const parts = headerValue.split('/')
	return Number(parts[1]) || 0
}

const fetchNews = async ({ page, perPage, type }) => {
	try {
		const rangeStart = (page - 1) * perPage
		const rangeEnd = rangeStart + perPage - 1

		const response = await axios.get(`${API}/news`, {
			params: {
				range: JSON.stringify([rangeStart, rangeEnd]),
				sort: JSON.stringify(['date', 'DESC']),
				filter: JSON.stringify({ type })
			},
			headers: { Authorization: `Bearer ${getToken()}` }
		})

		return {
			items: response.data,
			total: parseTotalFromContentRange(response.headers['content-range'])
		}
	} catch (error) {
		console.error('Error fetching products:', error)
		return { items: [], total: 0 }
	}
}

function NewsPage({ children, ...props }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const newsRef = useRef(null)
	const [type, setType] = useState('news')
	const [news, setNews] = useState([])
	const [pageCount, setPageCount] = useState(1)

	useEffect(() => {
		const fetchTelegramNews = async () => {
			try {
				const response = await axios.get(`${API}/news/telegram`)
				// console.log('Данные из Telegram:', response.data)
			} catch (error) {
				console.error('Ошибка при получении данных из Telegram:', error.message)
			}
		}
		fetchTelegramNews()
	}, [])

	// Извлекаем параметр "page" из строки запроса
	const page = Math.max(parseInt(searchParams.get('page')) || 1, 1)

	const itemsPerPage = 9

	useEffect(() => {
		const getNews = async () => {
			const { items, total } = await fetchNews({
				page,
				perPage: itemsPerPage,
				type
			})
			setNews(items)
			const totalPages = Math.max(1, Math.ceil(total / itemsPerPage))
			setPageCount(totalPages)

			if (total > 0 && page > totalPages) {
				setSearchParams({ page: totalPages })
			}
		}

		getNews()
	}, [page, type, itemsPerPage, setSearchParams])

	const currentPage = Math.min(page, pageCount) - 1

	const handlePageClick = ({ selected }) => {
		setSearchParams({ page: selected + 1 })
		if (newsRef.current) {
			newsRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' })
	}, [])

	// Проверка на корректный рендер страницы после всех хуков
	// if (safePage < 1 || safePage > pageCount) {
	// 	return <NotFoundPage />
	// }

	return (
		<main ref={newsRef} className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<PageHeader title='ИНТЕРЕСНОЕ О РЕГИОНЕ' />
					<div className={styles.switch_buttons}>
						<button
							className={type == 'news' ? styles.activeButton : null}
							onClick={() => {
								setType('news')
								setSearchParams({ page: 1 })
							}}
						>
							новости
						</button>
						<button
							className={type == 'article' ? styles.activeButton : null}
							onClick={() => {
								setType('article')
								setSearchParams({ page: 1 }) // Обновляем параметр страницы
							}}
						>
							статьи
						</button>
					</div>

					<div className={styles.news_wrapper}>
						{news.map((item, index) => (
							<NewsItem key={index} {...item} />
						))}
					</div>

					{pageCount > 1 && (
						<ReactPaginate
							previousLabel={
								<p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
									<img
										style={{ transform: 'rotate(180deg)' }}
										src='/images/next_paginate.png'
										alt=''
									/>
									Предыдущий
								</p>
							}
							nextLabel={
								<p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
									Следующий <img src='/images/next_paginate.png' alt='' />
								</p>
							}
							breakLabel={'...'}
							pageCount={pageCount}
							forcePage={currentPage}
							marginPagesDisplayed={2}
							pageRangeDisplayed={3}
							onPageChange={handlePageClick}
							containerClassName={styles.pagination}
							pageClassName={styles.page}
							previousClassName={styles.next_prev}
							nextClassName={styles.next_prev}
							activeClassName={styles.active}
						/>
					)}
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default NewsPage
