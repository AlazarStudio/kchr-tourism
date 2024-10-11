import { Link } from 'react-router-dom'

import { projects } from '../../../../data'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import ProjectItem from '../ProjectItem/ProjectItem'

import styles from './OurProjectsBlock.module.css'

function OurProjectsBlock({ children, ...props }) {
	return (
		<section>
			<CenterBlock>
				<WidthBlock>
					<header className={styles.events_header}>
						<div className={styles.events_header__item}>
							<img src='/images/left_pic.png' alt='' />
							<div className={styles.events_header__text}>
								<p>наши Проекты</p>
							</div>
						</div>
						<Link to='/our-projects'>Все проекты</Link>
					</header>
					<div className={styles.our_projects_wrapper}>
						{projects.slice(-4).map((item, index) => (
							<ProjectItem key={index} {...item} />
						))}
					</div>
				</WidthBlock>
			</CenterBlock>
		</section>
	)
}

export default OurProjectsBlock
