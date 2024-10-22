import axios from 'axios'
import { useEffect } from 'react'

import serverConfig from '../../../serverConfig'
import EventsBlock from '../../Blocks/EventsBlock/EventsBlock'
import Feedback from '../../Blocks/Feedback/Feedback'
import Footer from '../../Blocks/Footer/Footer'
import HeaderAbs from '../../Blocks/HeaderAbs/HeaderAbs'
import MainBanner from '../../Blocks/MainBanner/MainBanner'
import NewsBlock from '../../Blocks/NewsBlock/NewsBlock'
import OurProjectsBlock from '../../Blocks/OurProjectsBlock/OurProjectsBlock'
import PlacesToVisit from '../../Blocks/PlacesToVisit/PlacesToVisit'

import styles from './MainPage.module.css'

function MainPage({ children, ...props }) {
	useEffect(() => {
		window.scrollTo({ top: '0', behavior: 'instant' })
	}, [])

	useEffect(() => {
		const fetchTelegramNews = async () => {
			try {
				const response = await axios.get(`${serverConfig}/stories/telegram`)
				// console.log('Данные из Telegram:', response.data)
			} catch (error) {
				console.error('Ошибка при получении данных из Telegram:', error.message)
			}
		}
		fetchTelegramNews()
	}, [])

	return (
		<>
			<HeaderAbs />

			<MainBanner />
			<PlacesToVisit />
			<EventsBlock />
			<OurProjectsBlock />
			<NewsBlock />
			<Feedback />

			<Footer />
		</>
	)
}

export default MainPage
