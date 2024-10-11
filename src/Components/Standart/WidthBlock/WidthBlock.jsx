import styles from './WidthBlock.module.css'

function WidthBlock({ children, position, ...props }) {
	return (
		<>
			<div
				style={{ position: position }}
				{...props}
				className={styles.WidthBlock}
			>
				{children}
			</div>
		</>
	)
}

export default WidthBlock
