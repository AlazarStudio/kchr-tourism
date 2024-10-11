import { useState } from 'react'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { events, visitSlides } from '../../../../data'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import EventsItem from '../EventsItem/EventsItem'
import VisitSlide from '../VisitSlide/VisitSlide'

import styles from './EventsBlock.module.css'

function EventsBlock({ children, ...props }) {
	const [swiper, setSwiper] = useState()
	const [activeIndex, setActiveIndex] = useState(0)
	return (
		<section className={styles.places_section}>
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
			<CenterBlock minHeight='750px' background='/images/events_bolck_img.png'>
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
						{events.map((item, index) => (
							<SwiperSlide key={index}>
								<EventsItem {...item} />
							</SwiperSlide>
						))}
					</Swiper>
				</WidthBlock>
			</CenterBlock>
		</section>
	)
}

export default EventsBlock
