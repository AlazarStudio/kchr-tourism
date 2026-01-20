import axios from 'axios'
import { useEffect, useMemo, useRef, useState } from 'react'

import getToken from '../../../getToken'
import { API } from '../../../serverConfig'
import DocumentItem from '../../Blocks/DocumentItem/DocumentItem'
import PageHeader from '../../Blocks/PageHeader/PageHeader'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './DocsPage.module.css'

const fetchDocs = async () => {
	try {
		const response = await axios.get(`${API}/docs?all=true`, {
			headers: { Authorization: `Bearer ${getToken()}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

const fetchDocsGroup = async () => {
	try {
		const response = await axios.get(`${API}/group?all=true`, {
			headers: { Authorization: `Bearer ${getToken()}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function DocsPage({ children, ...props }) {
	const [docs, setDocs] = useState([])
	const [groups, setGroups] = useState([])
	const [openGroups, setOpenGroups] = useState(new Set())
	const didInitOpen = useRef(false)

	useEffect(() => {
		const getDocs = async () => {
			const docs = await fetchDocs()
			setDocs(docs)
		}
		getDocs()
	}, [])

	useEffect(() => {
		const getGroups = async () => {
			const groups = await fetchDocsGroup()
			setGroups(groups)
		}
		getGroups()
	}, [])

	// Функция для проверки наличия документов в группе
	const hasDocuments = groupId => {
		return docs.some(item => item.groupId === groupId)
	}

	const docsByGroup = useMemo(() => {
		return docs.reduce((acc, item) => {
			if (!acc[item.groupId]) acc[item.groupId] = []
			acc[item.groupId].push(item)
			return acc
		}, {})
	}, [docs])

	useEffect(() => {
		if (!didInitOpen.current && groups.length && docs.length) {
			const next = new Set(
				groups
					.filter(group => docs.some(item => item.groupId === group.id))
					.map(group => group.id)
			)
			setOpenGroups(next)
			didInitOpen.current = true
		}
	}, [docs, groups])

	const toggleGroup = groupId => {
		setOpenGroups(prev => {
			const next = new Set(prev)
			if (next.has(groupId)) {
				next.delete(groupId)
			} else {
				next.add(groupId)
			}
			return next
		})
	}

	return (
		<main className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<PageHeader title='Документы' />
					{groups
						.filter(group => hasDocuments(group.id))
						.map(group => (
							<div key={group.id} className={styles.group_wrapper}>
								<button
									type='button'
									className={styles.category_button}
									onClick={() => toggleGroup(group.id)}
									aria-expanded={openGroups.has(group.id)}
								>
									<span className={styles.category_title}>{group.title}</span>
									<span
										className={`${styles.category_icon} ${
											openGroups.has(group.id) ? styles.category_icon_open : ''
										}`}
										aria-hidden='true'
									>
										+
									</span>
								</button>
								<div
									className={`${styles.docs_wrapper} ${
										openGroups.has(group.id) ? styles.docs_wrapper_open : ''
									}`}
									aria-hidden={!openGroups.has(group.id)}
								>
									{(docsByGroup[group.id] || []).map(item => (
										<DocumentItem key={item.id} {...item} />
									))}
								</div>
							</div>
						))}
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default DocsPage
