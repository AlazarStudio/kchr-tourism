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
					style={{ fontSize: '16px' }}
					href='https://перваятуристическая.рф/'
					target='_blank'
				>
					Туристический портал КЧР
				</a>
			</div>
			<div className={styles.wrapper_item}>
				<div className={styles.link}>
					{/* <img src='/images/search_white.png' alt='' /> */}
					<img
						src={!isScrolled ? '/images/bvi_white.png' : '/images/bvi.png'}
						alt=''
					/>
				</div>
				<div className={styles.link}>
					<a href='https://t.me/kchturism' target='_blank'>
						<img
							src={
								!isScrolled
									? '/images/telegram_white.png'
									: '/images/telegram.png'
							}
							alt=''
						/>
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
