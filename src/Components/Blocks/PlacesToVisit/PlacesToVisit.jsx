import { useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { mainSliderImgs, visitSlides } from '../../../../data'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import MainSliderCard from '../MainSliderCard/MainSliderCard'
import VisitSlide from '../VisitSlide/VisitSlide'

import styles from './PlacesToVisit.module.css'

function PlacesToVisit({ children, ...props }) {
	const [swiper, setSwiper] = useState()
	const [activeIndex, setActiveIndex] = useState(0)

	return (
		<section>
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
						{visitSlides.map((item, index) => (
							<SwiperSlide key={index}>
								<div className={styles.visit_slide__wrapper}>
									<VisitSlide {...item} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</WidthBlock>
			</CenterBlock>
		</section>
	)
}

export default PlacesToVisit
