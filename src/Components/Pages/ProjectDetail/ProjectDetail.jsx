import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { projects } from '../../../../data'
import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import uploadsConfig from '../../../uploadsConfig'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './ProjectDetail.module.css'

function ProjectDetail({ children, ...props }) {
	const { id } = useParams()
	console.log(id)

	// const article = projects.find(link => link.id == id)
	// console.log(article)

	const [projects, setProjects] = useState({})

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await axios.get(
					`${serverConfig}/projects/${parseInt(id)}`,
					{
						headers: { Authorization: `Bearer ${getToken}` }
					}
				)
				// console.log(response.data)
				setProjects(response.data)
			} catch (error) {
				console.error('Error fetching news:', error)
			}
		}
		fetchProjects()
	}, [id])

	useEffect(() => {
		window.scrollTo({ top: '0', behavior: 'instant' })
	}, [])

	return (
		<main className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<p className={styles.article_title}>{projects.title}</p>

					<div
						dangerouslySetInnerHTML={{ __html: projects.text }}
						className={styles.article_text}
					/>

					<div className={styles.article_images}>
						{projects.images &&
							Array.isArray(projects.images) &&
							projects.images.map((img, index) => (
								<img key={index} src={`${uploadsConfig}${img}`} alt='' />
							))}
					</div>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default ProjectDetail
