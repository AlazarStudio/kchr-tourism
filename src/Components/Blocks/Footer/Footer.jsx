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
							<a href='https://max.ru/id917041946_biz' target='_blank' rel='noopener noreferrer' aria-label='Канал в Max'>
								<img src='/images/max.png' alt='' style={{ width: '34px', height: '34px' }} />
							</a>
							<a href='https://vk.com/kchturism' target='_blank'>
								<img src='/images/vk.png' alt='' />
							</a>
						</div>
					</div>
					<nav className={styles.legal} aria-label='Юридические документы'>
						<Link to='/legal/privacy-policy'>Политика обработки персональных данных</Link>
						<Link to='/legal/consent'>Согласие на обработку персональных данных</Link>
						<Link to='/legal/terms'>Пользовательское соглашение</Link>
					</nav>
				</WidthBlock>
			</CenterBlock>
		</footer>
	)
}

export default Footer
