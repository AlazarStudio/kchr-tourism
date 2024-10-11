import { useState } from 'react'
import { Link } from 'react-router-dom'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { news } from '../../../../data'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import NewsItem from '../NewsItem/NewsItem'

import styles from './NewsBlock.module.css'

function NewsBlock({ children, ...props }) {
	const [swiper, setSwiper] = useState()
	const [activeIndex, setActiveIndex] = useState(0)
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
						{news.map((item, index) => (
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
