import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './NotFoundPage.module.css'

function NotFoundPage({ children, ...props }) {
	return (
		<main>
			<CenterBlock>
				<WidthBlock><p className={styles.not_found}>404 Страница не найдена</p></WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default NotFoundPage
