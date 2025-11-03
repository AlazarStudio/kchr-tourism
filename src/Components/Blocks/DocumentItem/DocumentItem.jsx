import uploadsConfig from '../../../uploadsConfig'

import styles from './DocumentItem.module.css'

function DocumentItem({ children, ...props }) {
	return (
		<div className={styles.doc_wrapper}>
			<img
				src={
					props.src.toLowerCase().endsWith('.pdf')
						? '/images/pdf.png'
						: props.src.toLowerCase().endsWith('.docx')
							? '/images/docx.png'
							: props.src.toLowerCase().endsWith('.doc')
								? '/images/docx.png'
								: props.src.toLowerCase().endsWith('.rtf')
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
					{props.src.toLowerCase().endsWith('.pdf')
						? 'PDF'
						: props.src.toLowerCase().endsWith('.docx')
							? 'DOCX'
							: props.src.toLowerCase().endsWith('.doc')
								? 'DOC'
								: props.src.toLowerCase().endsWith('.rtf')
									? 'RTF'
									: 'EXCEL'}
				</p>
			</div>
		</div>
	)
}

export default DocumentItem
