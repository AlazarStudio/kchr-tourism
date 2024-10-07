import styles from './LinksWhite.module.css'

function LinksWhite({ children, ...props }) {
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
					<img src='/images/min_tourism.png' alt='' />
					<p>Министерство туризма КЧР</p>
				</a>
				<p>Туристический портал КЧР </p>
			</div>
			<div className={styles.wrapper_item}>
				<div className={styles.link}>
					<img src='/images/search_white.png' alt='' />
					<img src='/images/bvi_white.png' alt='' />
				</div>
				<div className={styles.link}>
					<a href='https://t.me/kchturism' target='_blank'>
						<img src='/images/telegram_white.png' alt='' />
					</a>
					<a href='https://vk.com/kchturism' target='_blank'>
						<img src='/images/vk_white.png' alt='' />
					</a>
				</div>
			</div>
		</div>
	)
}

export default LinksWhite
