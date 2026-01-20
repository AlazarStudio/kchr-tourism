import { Link } from 'react-router-dom'

import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './Footer.module.css'

function Footer({ children, ...props }) {
	return (
		<footer className={styles.footer}>
			<CenterBlock>
				<WidthBlock>
					<div className={styles.footer_wrapper}>
						<Link to='/contact' className={styles.main_icon}>
							<img src='/favicon-alazar-studio.png' alt='' />
							<div className={styles.main_text}>
								<p>КАРАЧАЕВО-ЧЕРКЕСИЯ</p>
								<p>ТУРИЗМ</p>
							</div>
						</Link>
						<nav className={styles.links}>
							<Link to='/news'>ИНТЕРЕСНОЕ О РЕГИОНЕ</Link>
							<Link to='/about-us'>О НАС</Link>
							<Link to='/our-projects'>НАШИ ПРОЕКТЫ</Link>
							<Link to='/events-announcement'>АНОНСЫ СОБЫТИЙ</Link>
							<Link to='/business-support'>ПОДДЕРЖКА БИЗНЕСА</Link>
							<Link to='/contact'>КОНТАКТЫ</Link>
						</nav>
						<div className={styles.links}>
							<a href='tel:+79280319656' target='_blank' title='+79280319656'>
								ТЕЛЕФОН <br /> <br />
								+7 (928) 031-96-56
							</a>
							<a
								href='mailto:kchtourism@bk.ru'
								target='_blank'
								title='kchtourism@bk.ru'
							>
								ПОЧТА <br /> <br />
								kchtourism@bk.ru
							</a>
						</div>
						<div className={styles.link}>
							<a href='https://t.me/kchturism' target='_blank'>
								<img src='/images/telegram.png' alt='' />
							</a>
							<a href='https://vk.com/kchturism' target='_blank'>
								<img src='/images/vk.png' alt='' />
							</a>
						</div>
					</div>
				</WidthBlock>
			</CenterBlock>
		</footer>
	)
}

export default Footer
