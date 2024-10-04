import { contacts } from '../../../../data'
import ContactItem from '../ContactItem/ContactItem'

import styles from './ContactsBlock.module.css'

function ContactsBlock({ children, ...props }) {
	return (
		<div className={styles.contacts_wrapper}>
			<p className={styles.name}>КОНТАКТЫ</p>
			{contacts.map(item => (
				<ContactItem key={item.id} {...item} />
			))}
		</div>
	)
}

export default ContactsBlock
