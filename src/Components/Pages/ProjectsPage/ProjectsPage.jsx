import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from 'react-router-dom'

// import { projects } from '../../../../data'
import getToken from '../../../getToken'
import { API } from '../../../serverConfig'
import PageHeader from '../../Blocks/PageHeader/PageHeader'
import ProjectItem from '../../Blocks/ProjectItem/ProjectItem'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

import styles from './ProjectsPage.module.css'

const parseTotalFromContentRange = headerValue => {
	if (!headerValue) return 0
	const parts = headerValue.split('/')
	return Number(parts[1]) || 0
}

const fetchProjects = async ({ page, perPage }) => {
	try {
		const rangeStart = (page - 1) * perPage
		const rangeEnd = rangeStart + perPage - 1

		const response = await axios.get(`${API}/projects`, {
			params: {
				range: JSON.stringify([rangeStart, rangeEnd])
			},
			headers: { Authorization: `Bearer ${getToken()}` }
		})
		return {
			items: response.data,
			total: parseTotalFromContentRange(response.headers['content-range'])
		}
	} catch (error) {
		console.error('Error fetching products:', error)
		return { items: [], total: 0 }
	}
}

function ProjectsPage({ children, ...props }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const projectsRef = useRef(null)
	const [projects, setProjects] = useState([])
	const [pageCount, setPageCount] = useState(1)

	// Извлекаем параметр "page" из строки запроса
	const page = Math.max(parseInt(searchParams.get('page')) || 1, 1)

	const itemsPerPage = 6

	useEffect(() => {
		const getProjects = async () => {
			const { items, total } = await fetchProjects({
				page,
				perPage: itemsPerPage
			})
			setProjects(items)
			const totalPages = Math.max(1, Math.ceil(total / itemsPerPage))
			setPageCount(totalPages)

			if (total > 0 && page > totalPages) {
				setSearchParams({ page: totalPages })
			}
		}
		getProjects()
	}, [page, itemsPerPage, setSearchParams])

	const currentPage = Math.min(page, pageCount) - 1

	// console.log(projects.length)
	// console.log(displayProjects.length)

	const handlePageClick = ({ selected }) => {
		setSearchParams({ page: selected + 1 })
		if (projectsRef.current) {
			projectsRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	// const handlePageClick = e => {
	// 	setCurrentPage(e.selected)
	// 	window.scrollTo({ top: '0', behavior: 'smooth' })
	// }

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' })
	}, [])

	// Если запрашиваемая страница меньше 1 или больше pageCount, возвращаем NotFoundPage

	// if (safePage < 1 || safePage > pageCount) {
	// 	return <NotFoundPage />
	// }

	return (
		<main ref={projectsRef} className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<PageHeader title='наши Проекты' />

					{projects.length !== 0 ? (
						<>
							<div className={styles.projects_wrapper}>
								{projects.map((item, index) => (
									<ProjectItem key={index} {...item} />
								))}
							</div>

							<ReactPaginate
								previousLabel={
									<p
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '5px'
										}}
									>
										<img
											style={{ transform: 'rotate(180deg)' }}
											src='/images/next_paginate.png'
											alt=''
										/>
										Предыдущий
									</p>
								}
								nextLabel={
									<p
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '5px'
										}}
									>
										Следующий <img src='/images/next_paginate.png' alt='' />
									</p>
								}
								breakLabel={'...'}
								pageCount={pageCount}
								forcePage={currentPage}
								marginPagesDisplayed={2}
								pageRangeDisplayed={3}
								onPageChange={handlePageClick}
								containerClassName={styles.pagination}
								pageClassName={styles.page}
								previousClassName={styles.next_prev}
								nextClassName={styles.next_prev}
								activeClassName={styles.active}
							/>
						</>
					) : null}
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default ProjectsPage
