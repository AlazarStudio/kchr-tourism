import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import NewsItem from '../NewsItem/NewsItem'

import styles from './NewsBlock.module.css'

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

function NewsBlock({ children, ...props }) {
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
		<section>
			<CenterBlock>
				<WidthBlock>
					<header className={styles.events_header}>
						<div className={styles.events_header__item}>
							<img src='/images/left_pic.png' alt='' />
							<div className={styles.events_header__text}>
								<p>нОВОСТИ</p>
							</div>
						</div>
						<Link to='/news'>Все новости</Link>
					</header>

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
						{news.slice(-4).map((item, index) => (
							<SwiperSlide key={index}>
								<NewsItem {...item} />
							</SwiperSlide>
						))}
					</Swiper>
				</WidthBlock>
			</CenterBlock>
		</section>
	)
}

export default NewsBlock
