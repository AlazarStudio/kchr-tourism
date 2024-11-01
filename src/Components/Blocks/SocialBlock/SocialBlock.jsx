import { social } from '../../../../data'
import ContactItem from '../ContactItem/ContactItem'

import styles from './SocialBlock.module.css'

function SocialBlock({ children, ...props }) {
	return (
		<div className={styles.contacts_wrapper}>
			<p className={styles.name}>СОЦСЕТИ</p>
			{social.map(item => (
				<ContactItem key={item.id} {...item} />
			))}
		</div>
	)
}

export default SocialBlock
