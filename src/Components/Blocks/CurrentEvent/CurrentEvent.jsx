import styles from './CurrentEvent.module.css'

function CurrentEvent({ children, ...props }) {
	return (
		<div className={styles.current_event__wrapper}>
			<img src='/images/current_event.png' alt='' />
			<div className={styles.current_event__text}>
				<p>ТЕКУЩЕЕ СОБЫТИЕ</p>
				<p className={styles.title}>Последнее свидание с летом</p>
				<p className={styles.text}>
					Это классный повод для свидания и со своей второй половинкой.
					<br />
					Значит, план действий таков⬇️
					<br />
					<br />
					✔️пишете ей/ ему
					<br />
					✔️берете плед и вкусняшки
					<br />
					✔️едете в Архыз
					<br />
					✔️устраиваете пикник на одном из склонов
					<br />
					✔️и признаетесь в любви друг другу и горам
				</p>
			</div>
		</div>
	)
}

export default CurrentEvent
