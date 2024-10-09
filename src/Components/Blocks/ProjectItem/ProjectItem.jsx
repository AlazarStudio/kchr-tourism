import styles from './ProjectItem.module.css'

function ProjectItem({ children, ...props }) {
	return (
		<div className={styles.project_item__wrapper}>
			<img src={props.img} alt='' />
			<p style={{ textTransform: 'uppercase' }}>{props.title}</p>
		</div>
	)
}

export default ProjectItem
