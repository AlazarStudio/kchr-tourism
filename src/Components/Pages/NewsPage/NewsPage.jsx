import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from 'react-router-dom'

import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
// import { news } from '../../../../data'
import NewsItem from '../../Blocks/NewsItem/NewsItem'
import PageHeader from '../../Blocks/PageHeader/PageHeader'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

import styles from './NewsPage.module.css'

const fetchNews = async () => {
	try {
		const response = await axios.get(`${serverConfig}/news`, {
			headers: { Authorization: `Bearer ${getToken}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function NewsPage({ children, ...props }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const newsRef = useRef(null)
	const [news, setNews] = useState([])

	// Используем хуки до всех проверок
	useEffect(() => {
		const getNews = async () => {
			const news = await fetchNews()
			setNews(news)
		}
		getNews()
	}, [])

	// Извлекаем параметр "page" из строки запроса
	const page = parseInt(searchParams.get('page')) || 1

	const itemsPerPage = 9

	const pageCount = Math.ceil(news.length / itemsPerPage)

	const safePage = Math.min(page, pageCount)

	const [currentPage, setCurrentPage] = useState(safePage - 1)

	// Это проверка на то, что хук работает корректно
	const displayNews = news.slice(
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

	// Дополнительные хуки
	useEffect(() => {
		// Обновляем currentPage при изменении параметра страницы
		setCurrentPage(safePage - 1)
	}, [safePage])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' })
	}, [])

	// Проверка на корректный рендер страницы после всех хуков
	if (safePage < 1 || safePage > pageCount) {
		return <NotFoundPage />
	}

	return (
		<main ref={newsRef} className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<PageHeader title='новости' />
					<div className={styles.news_wrapper}>
						{displayNews.map((item, index) => (
							<NewsItem key={index} {...item} />
						))}
					</div>

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
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default NewsPage
