import axios from 'axios'
import { useEffect, useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { mainSliderImgs, visitSlides } from '../../../../data'
import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import MainSliderCard from '../MainSliderCard/MainSliderCard'
import VisitSlide from '../VisitSlide/VisitSlide'

import styles from './PlacesToVisit.module.css'

const fetchNews = async () => {
	try {
		const response = await axios.get(`${serverConfig}/visit`, {
			headers: { Authorization: `Bearer ${getToken}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function PlacesToVisit({ children, ...props }) {
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

	const sortedNews = [...news].sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	)


	return (
			<CenterBlock>
				<WidthBlock>
					<p className={styles.visit_title}>
						Что посетить в Карачаево-Черкесии?
					</p>
					<Swiper
						className={styles.sliderBox}
						spaceBetween={20}
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
						{sortedNews.map((item, index) => (
							<SwiperSlide key={index}>
								<div className={styles.visit_slide__wrapper}>
									<VisitSlide {...item} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</WidthBlock>
			</CenterBlock>
	)
}

export default PlacesToVisit
