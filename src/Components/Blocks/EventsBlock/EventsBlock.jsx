import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { events, visitSlides } from '../../../../data'
import getToken from '../../../getToken'
import { API } from '../../../serverConfig'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import EventsItem from '../EventsItem/EventsItem'
import EventsItemExp from '../EventsItemExp/EventsItemExp'
import VisitSlide from '../VisitSlide/VisitSlide'

import styles from './EventsBlock.module.css'

const fetchNews = async () => {
	try {
		const response = await axios.get(`${API}/events`, {
			headers: { Authorization: `Bearer ${getToken()}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}
function EventsBlock({ children, ...props }) {
	const [swiper, setSwiper] = useState()
	const [activeIndex, setActiveIndex] = useState(0)
	const [news, setNews] = useState([])

	useEffect(() => {
		const getNews = async () => {
			const news = await fetchNews()
			setNews(news)
		}
		getNews()
	}, [])

	return (
		<>
			<CenterBlock>
				<WidthBlock>
					<header className={styles.events_header}>
						<div className={styles.events_header__item}>
							<img src='/images/left_pic.png' alt='' />
							<div className={styles.events_header__text}>
								<p>Анонсы событий</p>
								<p>
									В Карачаево-Черкессии регулярно проходят различные
									мероприятия, не пропустите самые интересные из них
								</p>
							</div>
						</div>
						<Link to='/events-announcement'>Все события</Link>
					</header>
				</WidthBlock>
			</CenterBlock>
			<CenterBlock background='/images/events_bolck_img.png'>
				<WidthBlock>
					<Swiper
						className={styles.sliderBox}
						spaceBetween={40}
						slidesPerView={3}
						breakpoints={{
							0: {
								slidesPerView: 1
							},

							1299: {
								slidesPerView: 3
							}
						}}
						direction='horizontal'
						loop={true}
						onSwiper={setSwiper}
						onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
					>
						{news.slice(-6).map((item, index) => (
							<SwiperSlide key={index}>
								<EventsItemExp {...item} />
							</SwiperSlide>
						))}
					</Swiper>
				</WidthBlock>
			</CenterBlock>
		</>
	)
}

export default EventsBlock
