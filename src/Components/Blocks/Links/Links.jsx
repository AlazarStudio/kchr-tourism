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
					style={{ fontSize: '16px' }}
					href='https://перваятуристическая.рф/'
					target='_blank'
				>
					Туристический портал КЧР
				</a>
			</div>
			<div className={styles.wrapper_item}>
				<div className={styles.link}>
					{/* <img src='/images/search.png' alt='' /> */}
					<img src='/images/bvi.png' alt='' />
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
		</div>
	)
}

export default Links
