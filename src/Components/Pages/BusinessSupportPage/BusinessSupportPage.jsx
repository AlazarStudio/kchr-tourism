import { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from 'react-router-dom'

import { bs, bs2, bs3, news } from '../../../../data'
import BSItem from '../../Blocks/BSItem/BSItem'
import NewsItem from '../../Blocks/NewsItem/NewsItem'
import PageHeader from '../../Blocks/PageHeader/PageHeader'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

import styles from './BusinessSupportPage.module.css'

function BusinessSupportPage({ children, ...props }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const newsRef = useRef(null)
	const [type, setType] = useState(1)

	const items = type === 1 ? bs : type === 2 ? bs2 : bs3

	// Извлекаем параметр "page" из строки запроса
	const page = parseInt(searchParams.get('page')) || 1

	const itemsPerPage = 9

	const pageCount = Math.ceil(news.length / itemsPerPage)

	const safePage = Math.min(page, pageCount)

	const [currentPage, setCurrentPage] = useState(safePage - 1)

	const displayNews = items.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage
	)

	if (safePage < 1 || safePage > pageCount) {
		return <NotFoundPage />
	}

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

	return (
		<main ref={newsRef}>
			<CenterBlock>
				<WidthBlock>
					<PageHeader title='Поддержка бизнеса' />

					<div className={styles.switch_buttons}>
						<button
							className={type === 1 ? styles.activeButton : null}
							onClick={() => {
								setType(1)
							}}
						>
							для туризма
						</button>
						<button
							className={type === 2 ? styles.activeButton : null}
							onClick={() => {
								setType(2)
								setCurrentPage(0)
								setSearchParams({ page: 1 })
							}}
						>
							для отельеров
						</button>
						<button
							className={type === 3 ? styles.activeButton : null}
							onClick={() => {
								setType(3)
								setCurrentPage(0)
								setSearchParams({ page: 1 }) // Обновляем параметр страницы
							}}
						>
							гранты
						</button>
					</div>

					<div className={styles.news_wrapper}>
						{displayNews.map((item, index) => (
							<BSItem key={index} type:type {...item} />
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

export default BusinessSupportPage