import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from 'react-router-dom'

// import { events } from '../../../../data'
import getToken from '../../../getToken'
import { API } from '../../../serverConfig'
import CurrentEvent from '../../Blocks/CurrentEvent/CurrentEvent'
import EventsItem from '../../Blocks/EventsItem/EventsItem'
import EventsItemExp from '../../Blocks/EventsItemExp/EventsItemExp'
import PageHeader from '../../Blocks/PageHeader/PageHeader'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

import styles from './EventsAnnouncementPage.module.css'

const parseTotalFromContentRange = headerValue => {
	if (!headerValue) return 0
	const parts = headerValue.split('/')
	return Number(parts[1]) || 0
}

const fetchEvents = async ({ page, perPage, filter, sort = ['date', 'DESC'] }) => {
	try {
		const rangeStart = (page - 1) * perPage
		const rangeEnd = rangeStart + perPage - 1

		const response = await axios.get(`${API}/events`, {
			params: {
				range: JSON.stringify([rangeStart, rangeEnd]),
				sort: JSON.stringify(sort),
				filter: JSON.stringify(filter || {})
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

function EventsAnnouncementPage({ children, ...props }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const [selectedCity, setSelectedCity] = useState('')
	const [selectedMonth, setSelectedMonth] = useState('')

	const eventsRef = useRef(null)

	const [events, setEvents] = useState([])
	const [pageCount, setPageCount] = useState(1)
	const [currentEvent, setCurrentEvent] = useState(null)

	// Извлекаем параметр "page" из строки запроса
	const page = Math.max(parseInt(searchParams.get('page')) || 1, 1)

	const itemsPerPage = 9

	const currentYear = new Date().getFullYear()

	useEffect(() => {
		const getCurrentEvent = async () => {
			const { items } = await fetchEvents({
				page: 1,
				perPage: 1,
				filter: { isCurrent: true },
				sort: ['date', 'DESC']
			})
			setCurrentEvent(items[0] || null)
		}

		getCurrentEvent()
	}, [])

	useEffect(() => {
		const filter = {
			isCurrent: false,
			...(selectedCity ? { city: selectedCity } : {}),
			...(selectedMonth ? { month: selectedMonth } : {})
		}

		const getEvents = async () => {
			const { items, total } = await fetchEvents({
				page,
				perPage: itemsPerPage,
				filter
			})
			setEvents(items)
			const totalPages = Math.max(1, Math.ceil(total / itemsPerPage))
			setPageCount(totalPages)

			if (total > 0 && page > totalPages) {
				setSearchParams({ page: totalPages })
			}
		}

		getEvents()
	}, [
		page,
		itemsPerPage,
		selectedCity,
		selectedMonth,
		setSearchParams
	])

	const currentPage = Math.min(page, pageCount) - 1

	const handlePageClick = ({ selected }) => {
		setSearchParams({ page: selected + 1 })
		if (eventsRef.current) {
			eventsRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const handleCityChange = event => {
		setSelectedCity(event.target.value)
		setSearchParams({ page: 1 })
	}

	const handleMonthChange = event => {
		setSelectedMonth(event.target.value)
		setSearchParams({ page: 1 })
	}

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' })
	}, [])

	// Если запрашиваемая страница меньше 1 или больше pageCount, возвращаем NotFoundPage
	// if (safePage < 1 || safePage > pageCount) {
	// 	return <NotFoundPage />
	// }

	return (
		<main className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<PageHeader title='Анонсы событий' />

					{currentEvent ? <CurrentEvent {...currentEvent} /> : null}

					<div ref={eventsRef} className={styles.filter}>
						<p>{currentYear}</p>

						<div className={styles.line}></div>

						<div className={styles.selects_wrapper}>
							<select
								name='city'
								id='city'
								value={selectedCity}
								onChange={handleCityChange}
							>
								<option value=''>Город</option>
								<option value='Архыз'>Архыз</option>
								<option value='Домбай'>Домбай</option>
								<option value='Казань'>Казань</option>
								<option value='Карачаевск'>Карачаевск</option>
								<option value='Кисловодск'>Кисловодск</option>
								<option value='Краснодар'>Краснодар</option>
								<option value='Малокарачаевский район'>Малокарачаевский район</option>
								<option value='Минеральные воды'>Минеральные воды</option>
								<option value='Москва'>Москва</option>
								<option value='Пятигорск'>Пятигорск</option>
								<option value='Санкт-Петербург'>Санкт-Петербург</option>
								<option value='Софийская поляна'>Софийская поляна</option>
								<option value='Сочи'>Сочи</option>
								<option value='Ставрополь'>Ставрополь</option>
								<option value='Теберда (нижняя)'>Теберда (нижняя)</option>
								<option value='Теберда (верхняя)'>Теберда (верхняя)</option>
								<option value='Новая теберда'>Новая теберда</option>
								<option value='Черкесск'>Черкесск</option>
							</select>
							<select
								name='month'
								id='month'
								value={selectedMonth}
								onChange={handleMonthChange}
							>
								<option value=''>Месяц</option>
								<option value='1'>Январь</option>
								<option value='2'>Февраль</option>
								<option value='3'>Март</option>
								<option value='4'>Апрель</option>
								<option value='5'>Май</option>
								<option value='6'>Июнь</option>
								<option value='7'>Июль</option>
								<option value='8'>Август</option>
								<option value='9'>Сентябрь</option>
								<option value='10'>Октябрь</option>
								<option value='11'>Ноябрь</option>
								<option value='12'>Декабрь</option>
							</select>
						</div>
					</div>

					{events.length !== 0 ? (
						<>
							<div className={styles.announce_wrapper}>
								{events.map((item, index) => (
									<EventsItemExp key={index} {...item} />
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
						</>
					) : (
						<>
							<p className={styles.events_none}>
								Нет анонсов соответствущих фильтрам.
							</p>
						</>
					)}
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default EventsAnnouncementPage
