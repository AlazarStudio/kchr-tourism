import { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useSearchParams } from 'react-router-dom'

import { projects } from '../../../../data'
import PageHeader from '../../Blocks/PageHeader/PageHeader'
import ProjectItem from '../../Blocks/ProjectItem/ProjectItem'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

import styles from './ProjectsPage.module.css'

function ProjectsPage({ children, ...props }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const projectsRef = useRef(null)

	// Извлекаем параметр "page" из строки запроса
	const page = parseInt(searchParams.get('page')) || 1

	const itemsPerPage = 6
	
	const pageCount = Math.ceil(projects.length / itemsPerPage)

	const safePage = Math.min(page, pageCount)

	const [currentPage, setCurrentPage] = useState(safePage - 1)
	
	const displayProjects = projects.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage
	)

	// console.log(projects.length)
	// console.log(displayProjects.length)

	// Если запрашиваемая страница меньше 1 или больше pageCount, возвращаем NotFoundPage
	if (safePage < 1 || safePage > pageCount) {
		return <NotFoundPage />
	}

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
		// Обновляем currentPage при изменении параметра страницы
		setCurrentPage(safePage - 1)
	}, [safePage])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' })
	}, [])

	return (
		<main>
			<CenterBlock>
				<WidthBlock>
					<PageHeader title='наши Проекты' />

					<div ref={projectsRef} className={styles.projects_wrapper}>
						{displayProjects.map((item, index) => (
							<ProjectItem key={index} {...item} />
						))}
					</div>

					<ReactPaginate
						previousLabel={
							<p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
								<img
									style={{ transform: 'rotate(180deg)' }}
									src='/images/next_paginate.png'
									alt=''
								/>
								Предыдущий
							</p>
						}
						nextLabel={
							<p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
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
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default ProjectsPage
