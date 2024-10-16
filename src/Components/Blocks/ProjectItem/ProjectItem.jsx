import { Link } from 'react-router-dom'

import uploadsConfig from '../../../uploadsConfig'

import styles from './ProjectItem.module.css'

function ProjectItem({ children, ...props }) {
	return (
		<Link
			to={`/our-projects/${props.id}`}
			className={styles.project_item__wrapper}
		>
			{/* <img src={`${uploadsConfig}${props.images[0]}`} alt='' /> */}
			<img src={`${uploadsConfig}${props.images[0]}`} alt='' />
			<p style={{ textTransform: 'uppercase' }}>{props.title}</p>
		</Link>
	)
}

export default ProjectItem
