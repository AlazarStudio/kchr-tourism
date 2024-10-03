import styles from './Links.module.css'

function Links({ children, ...props }) {
	return (
		<div className={styles.links}>
			<div className={styles.wrapper_item}>
				<div className={styles.link}>
					<img src='/images/national_project.png' alt='' />
					<p>Нацпроект “Туризм”</p>
				</div>
				<div className={styles.link}>
					<img src='/images/min_tourism.png' alt='' />
					<p>Министерство туризма КЧР</p>
				</div>
				<p>Туристический портал КЧР </p>
			</div>
			<div className={styles.wrapper_item}>
				<div className={styles.link}>
					<img src='/images/search.png' alt='' />
					<img src='/images/bvi.png' alt='' />
				</div>
				<div className={styles.link}>
					<img src='/images/telegram.png' alt='' />
					<img src='/images/vk.png' alt='' />
				</div>
			</div>
		</div>
	)
}

export default Links
