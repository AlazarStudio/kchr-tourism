import { docs } from '../../../../data'
import DocumentItem from '../../Blocks/DocumentItem/DocumentItem'
import PageHeader from '../../Blocks/PageHeader/PageHeader'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './DocsPage.module.css'

function DocsPage({ children, ...props }) {
	return (
		<main className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<PageHeader title='Документы' />
					<p className={styles.category_title}>Государственное-задание</p>
					<div className={styles.docs_wrapper}>
						{docs.map((item, index) =>
							item.categoryId == 1 ? (
								<DocumentItem key={index} {...item} />
							) : null
						)}
					</div>
					<p className={styles.category_title}>Реализация 442-ФЗ</p>
					<div className={styles.docs_wrapper}>
						{docs.map((item, index) =>
							item.categoryId == 2 ? (
								<DocumentItem key={index} {...item} />
							) : null
						)}
					</div>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default DocsPage
