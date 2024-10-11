import { useEffect } from 'react'

import EventsBlock from '../../Blocks/EventsBlock/EventsBlock'
import Feedback from '../../Blocks/Feedback/Feedback'
import Footer from '../../Blocks/Footer/Footer'
import HeaderAbs from '../../Blocks/HeaderAbs/HeaderAbs'
import MainBanner from '../../Blocks/MainBanner/MainBanner'
import NewsBlock from '../../Blocks/NewsBlock/NewsBlock'
import OurProjectsBlock from '../../Blocks/OurProjectsBlock/OurProjectsBlock'
import PlacesToVisit from '../../Blocks/PlacesToVisit/PlacesToVisit'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './MainPage.module.css'

function MainPage({ children, ...props }) {
	
	useEffect(() => {
		window.scrollTo({ top: '0', behavior: 'instant' })
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
