import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from 'react-router-dom'

// import { events } from '../../../../data'
import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import CurrentEvent from '../../Blocks/CurrentEvent/CurrentEvent'
import EventsItem from '../../Blocks/EventsItem/EventsItem'
import EventsItemExp from '../../Blocks/EventsItemExp/EventsItemExp'
import PageHeader from '../../Blocks/PageHeader/PageHeader'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

import styles from './EventsAnnouncementPage.module.css'

const fetchEvents = async () => {
	try {
		const response = await axios.get(`${serverConfig}/events`, {
			headers: { Authorization: `Bearer ${getToken}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function EventsAnnouncementPage({ children, ...props }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const [selectedCity, setSelectedCity] = useState('')
	const [selectedMonth, setSelectedMonth] = useState('')

	const eventsRef = useRef(null)

	const [events, setEvents] = useState([])

	// Используем хуки до всех проверок
	useEffect(() => {
		const getEvents = async () => {
			const events = await fetchEvents()
			setEvents(events)
		}
		getEvents()
	}, [])

	// Извлекаем параметр "page" из строки запроса
	const page = parseInt(searchParams.get('page')) || 1

	const itemsPerPage = 9

	const sortedNews = [...events].sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	)

	const pageCount = Math.ceil(sortedNews.length / itemsPerPage)

	const safePage = Math.min(page, pageCount)

	const [currentPage, setCurrentPage] = useState(safePage - 1)

	const displayEvents = sortedNews
		.filter(item => item.isCurrent === false)
		.filter(item => (selectedCity ? item.city === selectedCity : true))
		.filter(item => {
			if (selectedMonth) {
				const eventMonth = new Date(item.date).getMonth() + 1
				const selectedMonthIndex = parseInt(selectedMonth)
				return eventMonth === selectedMonthIndex
			}
			return true
		})
		.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

	const handlePageClick = ({ selected }) => {
		setSearchParams({ page: selected + 1 })
		if (eventsRef.current) {
			eventsRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const handleCityChange = event => {
		setSelectedCity(event.target.value)
	}

	const handleMonthChange = event => {
		setSelectedMonth(event.target.value)
	}

	const currentEvent = events
		.filter(item => item.isCurrent === true)
		.sort((a, b) => new Date(b.date) - new Date(a.date))[0]

	const currentYear = new Date().getFullYear()

	useEffect(() => {
		setCurrentPage(safePage - 1)
	}, [safePage])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' })
	}, [])

	// Если запрашиваемая страница меньше 1 или больше pageCount, возвращаем NotFoundPage
	if (safePage < 1 || safePage > pageCount) {
		return <NotFoundPage />
	}

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
								<option value='Теберда'>Теберда</option>
								<option value='Домбай'>Домбай</option>
								<option value='Черкесск'>Черкесск</option>
								<option value='Пятигорск'>Пятигорск</option>
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

					{displayEvents.length !== 0 ? (
						<>
							<div className={styles.announce_wrapper}>
								{displayEvents.map((item, index) => (
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
