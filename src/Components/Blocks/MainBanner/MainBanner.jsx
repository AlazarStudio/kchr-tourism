import axios from 'axios'
import { useEffect, useState } from 'react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { mainSliderImgs } from '../../../../data'
import getToken from '../../../getToken'
import { API, UPLOAD } from '../../../serverConfig'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import MainSliderCard from '../MainSliderCard/MainSliderCard'
import StoryViewer from '../StoryViewer/StoryViewer'

import styles from './MainBanner.module.css'

const fetchStories = async () => {
	try {
		const response = await axios.get(`${API}/stories`, {
			headers: { Authorization: `Bearer ${getToken()}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function MainBanner({ children, ...props }) {
	const [swiper, setSwiper] = useState()
	const [activeIndex, setActiveIndex] = useState(0)

	const [stories, setStories] = useState([])
	const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false)
	const [selectedStory, setSelectedStory] = useState([])

	useEffect(() => {
		const getNews = async () => {
			const news = await fetchStories()
			setStories(news)
		}
		getNews()
	}, [])

	const handleStoryClick = story => {
		setSelectedStory(story.images.map(img => ({ url: `${UPLOAD}${img}` })))
		setIsStoryViewerOpen(true)
	}

	const closeStoryViewer = () => {
		setIsStoryViewerOpen(false)
		setSelectedStory([])
	}

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
							768: {
								slidesPerView: 3
							},
							1299: {
								slidesPerView: 4
							}
						}}
						direction='horizontal'
						loop={true}
						autoplay={{
							delay: 4000,
							disableOnInteraction: false
						}}
						onSwiper={setSwiper}
						onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
						modules={[Autoplay]}
					>
						{stories.map((img, index) => (
							<SwiperSlide key={index}>
								<div
									style={{ cursor: 'pointer' }}
									onClick={() => handleStoryClick(img)}
								>
									<MainSliderCard {...img} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</WidthBlock>

			{isStoryViewerOpen && (
				<StoryViewer stories={selectedStory} onClose={closeStoryViewer} />
			)}
		</CenterBlock>
	)
}

export default MainBanner
