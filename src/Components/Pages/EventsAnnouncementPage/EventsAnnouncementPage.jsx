import { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from 'react-router-dom'

import { events } from '../../../../data'
import CurrentEvent from '../../Blocks/CurrentEvent/CurrentEvent'
import EventsItem from '../../Blocks/EventsItem/EventsItem'
import EventsItemExp from '../../Blocks/EventsItemExp/EventsItemExp'
import PageHeader from '../../Blocks/PageHeader/PageHeader'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

import styles from './EventsAnnouncementPage.module.css'

function EventsAnnouncementPage({ children, ...props }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const eventsRef = useRef(null)

	// Извлекаем параметр "page" из строки запроса
	const page = parseInt(searchParams.get('page')) || 1

	const itemsPerPage = 9

	const pageCount = Math.ceil(events.length / itemsPerPage)

	const safePage = Math.min(page, pageCount)

	const [currentPage, setCurrentPage] = useState(safePage - 1)

	const displayEvents = events.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage
	)

	// Если запрашиваемая страница меньше 1 или больше pageCount, возвращаем NotFoundPage
	if (safePage < 1 || safePage > pageCount) {
		return <NotFoundPage />
	}

	const handlePageClick = ({ selected }) => {
		setSearchParams({ page: selected + 1 })
		if (eventsRef.current) {
			eventsRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	useEffect(() => {
		setCurrentPage(safePage - 1)
	}, [safePage])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' })
	}, [])

	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					<PageHeader title='Анонсы событий' />

					<CurrentEvent />

					<div ref={eventsRef} className={styles.filter}>
						<p>2024</p>

						<div className={styles.line}></div>

						<div className={styles.selects_wrapper}>
							<select name='' id=''>
								<option value='' defaultValue>
									Город
								</option>
								<option value=''>Архыз</option>
								<option value=''>Теберда</option>
								<option value=''>Домбай</option>
								<option value=''>Черкесск</option>
								<option value=''>Пятигорск</option>
							</select>
							<select name='' id=''>
								<option value='' defaultValue>
									Месяц
								</option>
								<option value=''>Январь</option>
								<option value=''>Февраль</option>
								<option value=''>Март</option>
								<option value=''>Апрель</option>
								<option value=''>Май</option>
								<option value=''>Июнь</option>
								<option value=''>Июль</option>
								<option value=''>Август</option>
								<option value=''>Сентябрь</option>
								<option value=''>Октябрь</option>
								<option value=''>Ноябрь</option>
								<option value=''>Декабрь</option>
							</select>
						</div>
					</div>

					<div className={styles.announce_wrapper}>
						{displayEvents.map((item, index) => (
							<EventsItemExp key={index} {...item} />
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
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default EventsAnnouncementPage
