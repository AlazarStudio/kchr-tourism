import uploadsConfig from '../../../uploadsConfig'

import styles from './DocumentItem.module.css'

function DocumentItem({ children, ...props }) {
	return (
		<div className={styles.doc_wrapper}>
			<img
				src={
					props.src.endsWith('.pdf')
						? '/images/pdf.png'
						: props.src.endsWith('.docx')
							? '/images/docx.png'
							: props.src.endsWith('.doc')
								? '/images/docx.png'
								: props.src.endsWith('.rtf')
									? 'images/docx.png'
									: '/images/xls.png'
				}
				alt=''
			/>
			<div className={styles.doc_info}>
				<a href={`${uploadsConfig}${props.src}`} target='_blank'>
					{props.title}
				</a>
				<p style={{ color: '#696969' }}>
					{props.src.endsWith('.pdf')
						? 'PDF'
						: props.src.endsWith('.docx')
							? 'DOCX'
							: props.src.endsWith('.doc')
								? 'DOC'
								: props.src.endsWith('.rtf')
									? 'RTF'
									: 'EXCEL'}
				</p>
			</div>
		</div>
	)
}

export default DocumentItem
