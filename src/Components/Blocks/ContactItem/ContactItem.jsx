import styles from './ContactItem.module.css'

function ContactItem({ ...props }) {
	return (
		<a href={props.link} target='_blank' className={styles.contact_item}>
			{props.images ? (
				<img src={props.images} alt='' />
			) : (
				<p
					style={{
						background:
							'linear-gradient(90deg, rgb(37, 169, 221), rgb(0, 238, 208))',
						color: 'white',
						padding: '10px',
						borderRadius: '50px'
					}}
				>
					MAX
				</p>
			)}
			<div className={styles.contact_item__text}>
				<p style={!props.subtitle ? {fontSize: "20px", lineHeight: "23px", color: "#000"} : {}}>{props.title}</p>
				{props.subtitle && (
					<p>{props.subtitle}</p>
				)}
			</div>
		</a>
	)
}

export default ContactItem
