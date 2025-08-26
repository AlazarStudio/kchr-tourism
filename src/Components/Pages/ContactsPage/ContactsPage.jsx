import ContactsBlock from '../../Blocks/ContactsBlock/ContactsBlock'
import PageHeader from '../../Blocks/PageHeader/PageHeader'
import SocialBlock from '../../Blocks/SocialBlock/SocialBlock'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './ContactsPage.module.css'

function ContactsPage({ children, ...props }) {
	return (
		<main className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<PageHeader title='АНО Карачаево-Черкесия туризм' />
					<section className={styles.contacts_section}>
						<ContactsBlock />
						<SocialBlock />
						<div className={styles.work_schedule__wrapper}>
							<p className={styles.name}>РЕЖИМ РАБОТЫ</p>
							<div className={styles.work_schedule}>
								<p className={styles.date}>ПН­-ПТ</p>
								<p
									className={styles.time}
									style={{ color: 'var(--primaryColor)', fontWeight: '700' }}
								>
									10:00
								</p>
								<p
									className={styles.time}
									style={{ color: 'var(--primaryColor)', fontWeight: '700' }}
								>
									18:00
								</p>
								<p className={styles.date}>СБ-ВС</p>
								<p
									className={styles.weekend}
									style={{ color: 'var(--primaryColor)', fontWeight: '700' }}
								>
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
