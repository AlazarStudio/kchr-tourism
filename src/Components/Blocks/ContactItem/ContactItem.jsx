import styles from './ContactItem.module.css'

function ContactItem({ ...props }) {
	return (
		<div className={styles.contact_item}>
			<img src={props.img} alt='' />
			<div className={styles.contact_item__text}>
				<p>{props.title}</p>
				<p>{props.subtitle}</p>
			</div>
		</div>
	)
}

export default ContactItem
