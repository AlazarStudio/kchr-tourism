import { useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { mainSliderImgs } from '../../../../data'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import MainSliderCard from '../MainSliderCard/MainSliderCard'

import styles from './MainBanner.module.css'

function MainBanner({ children, ...props }) {
	const [swiper, setSwiper] = useState()
	const [activeIndex, setActiveIndex] = useState(0)

	return (
		<CenterBlock
			// minHeight='100vh'
			background='/images/main_back_img.png'
			backgroundColor='rgba(0,0,0,.3)'
			backgroundBlendMode='multiply'
			borderBottomRightRadius='35px'
			borderBottomLeftRadius='35px'
		>
			<WidthBlock>
				<div className={styles.main_wrapper}>
					<p className={styles.main_text}>путешествие по карачаево-черкесии</p>
					<Swiper
						className={styles.sliderBox}
						spaceBetween={20}
						slidesPerView={4}
						breakpoints={{
							0: {
								slidesPerView: 2
							},
							1299: {
								slidesPerView: 4
							}
						}}
						direction='horizontal'
						loop={true}
						autoplay={{
							delay: 5000,
							disableOnInteraction: false
						}}
						onSwiper={setSwiper}
						onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
					>
						{mainSliderImgs.map((img, index) => (
							<SwiperSlide key={index}>
								<MainSliderCard {...img} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</WidthBlock>
		</CenterBlock>
	)
}

export default MainBanner
