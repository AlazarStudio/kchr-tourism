import AccessibilityButton from '../AccessibilityButton/AccessibilityButton'
import styles from './Links.module.css'

function Links({ children, ...props }) {
	return (
		<div className={styles.links}>
			<div className={styles.wrapper_item}>
				<a
					href='https://национальныепроекты.рф/projects/turizm/'
					target='_blank'
					className={styles.link}
				>
					<img src='/images/national_project.png' alt='' />
					<p>Нацпроект “Туризм”</p>
				</a>
				<a
					href='http://tourismkchr.ru/'
					target='_blank'
					className={styles.link}
				>
					<img
						style={{
							width: '220px',
							objectFit: 'cover'
						}}
						src='/images/min-tourism.png'
						alt=''
					/>
					{/* <p>Министерство туризма КЧР</p> */}
				</a>
				<a
					href='https://посетикчр.рф/'
					target='_blank'
					rel='noopener noreferrer'
					aria-label='Туристический портал Карачаево-Черкесии'
				>
					<img
						src='/images/portal-logo.png'
						alt='Карачаево-Черкесия'
						style={{ height: '36px', width: 'auto' }}
					/>
				</a>
			</div>
			<div className={styles.wrapper_item}>
				<div className={styles.link}>
					{/* <img src='/images/search.png' alt='' /> */}
					<AccessibilityButton
						srcDefault={'/images/bvi.png'}
						srcScrolled={'/images/bvi_white.png'}
						// isScrolled={isScrolled}
					/>
					{/* <img
						id='specialButton'
						src='/images/bvi.png'
						alt=''
						// onClick={()=>{window.location.reload()}}
						style={{ cursor: 'pointer' }}
					/> */}
				</div>
				<div className={styles.link}>
					<a href='https://max.ru/id917041946_biz' target='_blank' rel='noopener noreferrer' aria-label='Канал в Max'>
						<img src='/images/max_blue.png' alt='' />
					</a>
					<a href='https://vk.com/kchturism' target='_blank'>
						<img src='/images/vk.png' alt='' />
					</a>
				</div>
			</div>
		</div>
	)
}

export default Links
