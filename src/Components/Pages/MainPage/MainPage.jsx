import HeaderAbs from '../../Blocks/HeaderAbs/HeaderAbs'
import MainBanner from '../../Blocks/MainBanner/MainBanner'
import PlacesToVisit from '../../Blocks/PlacesToVisit/PlacesToVisit'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './MainPage.module.css'

function MainPage({ children, ...props }) {
	return (
		<>
			<HeaderAbs />
			<MainBanner />
			<section>
				<PlacesToVisit />
			</section>
		</>
	)
}

export default MainPage
