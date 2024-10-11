import styles from './CenterBlock.module.css'

function CenterBlock({
	children,
	width,
	height,
	minHeight,
	gap,
	background,
	backgroundRepeat,
	backgroundSize,
	backgroundColor,
	backgroundBlendMode,
	margin,
	padding,
	opacity,
	borderBottomRightRadius,
	borderBottomLeftRadius,
	...props
}) {
	return (
		<>
			<div
				{...props}
				className={styles.CenterBlock}
				style={{
					width: width,
					height: height,
					minHeight: minHeight,
					gap: gap,
					background: `url(${background})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundColor: backgroundColor,
					backgroundBlendMode: backgroundBlendMode,
					margin: margin,
					padding: padding,
					opacity: opacity,
					borderBottomRightRadius: borderBottomRightRadius,
					borderBottomLeftRadius: borderBottomLeftRadius
				}}
			>
				{children}
			</div>
		</>
	)
}

export default CenterBlock
