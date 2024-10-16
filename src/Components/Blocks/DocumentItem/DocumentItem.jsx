import styles from './DocumentItem.module.css'

function DocumentItem({ children, ...props }) {
	return (
		<div className={styles.doc_wrapper}>
			<img src={props.images} alt='' />
			<div className={styles.doc_info}>
				<a href={props.src} target='_blank'>
					{props.title}
				</a>
				<p style={{ color: '#696969' }}>
					{props.src.endsWith('.pdf')
						? 'PDF'
						: props.src.endsWith('.docx')
							? 'DOCX'
							: 'EXCEL'}
				</p>
			</div>
		</div>
	)
}

export default DocumentItem