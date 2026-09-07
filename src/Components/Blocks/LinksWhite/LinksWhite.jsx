import AccessibilityButton from '../AccessibilityButton/AccessibilityButton'

import styles from './LinksWhite.module.css'

function LinksWhite({ children, isScrolled }) {
	return (
		<div className={`${styles.links} ${isScrolled ? styles.borderScroll : ''}`}>
			<div
				className={`${styles.wrapper_item} ${isScrolled ? styles.isScrolled : ''}`}
			>
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
					className={styles.tourism}
					href='https://посетикчр.рф/'
					target='_blank'
					rel='noopener noreferrer'
					aria-label='Туристический портал Карачаево-Черкесии'
				>
					<img
						src={!isScrolled ? '/images/portal-logo-white.png' : '/images/portal-logo.png'}
						alt='Карачаево-Черкесия'
						style={{ height: '36px', width: 'auto' }}
					/>
				</a>
			</div>
			<div className={styles.wrapper_item}>
				<div className={styles.link}>
					{/* <img src='/images/search_white.png' alt='' /> */}
					<AccessibilityButton
						srcDefault={'/images/bvi_white.png'}
						srcScrolled={'/images/bvi.png'}
						isScrolled={isScrolled}
					/>
					{/* <img
						id='specialButton'
						src={!isScrolled ? '/images/bvi_white.png' : '/images/bvi.png'}
						alt=''
						style={{cursor:'pointer'}}
						// onClick={()=>{window.location.reload()}}
					/> */}
				</div>
				<div className={styles.link}>
					<a href='https://max.ru/id917041946_biz' target='_blank' rel='noopener noreferrer' aria-label='Канал в Max'>
						<img src='/images/max.png' alt='' style={{ width: '34px', height: '34px' }} />
					</a>
					<a href='https://vk.com/kchturism' target='_blank'>
						<img
							src={!isScrolled ? '/images/vk_white.png' : '/images/vk.png'}
							alt=''
						/>
					</a>
				</div>
			</div>
		</div>
	)
}

export default LinksWhite
