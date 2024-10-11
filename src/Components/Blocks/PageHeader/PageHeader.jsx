import styles from './PageHeader.module.css'

function PageHeader({ children, ...props }) {
	return (
		<header className={styles.head}>
			<img src='/images/left_pic.png' alt='' />
			<p>{props.title}</p>
			<img src='/images/right_pic.png' alt='' />
		</header>
	)
}

export default PageHeader
