import ContactsBlock from '../../Blocks/ContactsBlock/ContactsBlock'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './ContactsPage.module.css'

function ContactsPage({ children, ...props }) {
	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					<div className={styles.head}>
						<img src='/images/left_pic.png' alt='' />
						<p>АНО КЧР ТУРИЗМ</p>
						<img src='/images/right_pic.png' alt='' />
					</div>
					<section className={styles.contacts_section}>
						<ContactsBlock />
						<div className={styles.work_schedule__wrapper}>
							<p className={styles.name}>РЕЖИМ РАБОТЫ</p>
							<div className={styles.work_schedule}>
								<p className={styles.date}>ПН­-ПТ</p>
								<p className={styles.time} style={{ color: 'var(--primaryColor)', fontWeight: '700' }}>
									10:00
								</p>
								<p className={styles.time} style={{ color: 'var(--primaryColor)', fontWeight: '700' }}>
									18:00
								</p>
								<p className={styles.date} >СБ-ВС</p>
								<p className={styles.weekend} style={{ color: 'var(--primaryColor)', fontWeight: '700' }}>
									Выходной
								</p>
							</div>
						</div>
					</section>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default ContactsPage
