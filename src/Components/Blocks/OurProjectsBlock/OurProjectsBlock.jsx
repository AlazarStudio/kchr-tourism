import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// import { projects } from '../../../../data'
import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import ProjectItem from '../ProjectItem/ProjectItem'

import styles from './OurProjectsBlock.module.css'

const fetchProjects = async () => {
	try {
		const response = await axios.get(`${serverConfig}/projects`, {
			headers: { Authorization: `Bearer ${getToken}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function OurProjectsBlock({ children, ...props }) {
	const [projects, setProjects] = useState([])

	useEffect(() => {
		const getProjects = async () => {
			const projects = await fetchProjects()
			setProjects(projects)
		}
		getProjects()
	}, [])

	return (
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
	)
}

export default OurProjectsBlock
