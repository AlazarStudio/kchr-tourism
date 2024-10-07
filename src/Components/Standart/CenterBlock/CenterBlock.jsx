import styles from './CenterBlock.module.css'

function CenterBlock({ children, ...props }) {
	return (
		<>
			<div
				{...props}
				className={styles.CenterBlock}
				style={{
					width: props.width,
					height: props.height,
					minHeight:props.minHeight,
					gap: props.gap,
					background: `url(${props.background})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundColor: props.backgroundColor,
					backgroundBlendMode: props.backgroundBlendMode,
					margin: props.margin,
					padding: props.padding,
					opacity: props.opacity,
					borderBottomRightRadius: props.borderBottomRightRadius,
					borderBottomLeftRadius: props.borderBottomLeftRadius
				}}
			>
				{children}
			</div>
		</>
	)
}

export default CenterBlock
