import axios from 'axios'
import { useEffect, useState } from 'react'

import { docs } from '../../../../data'
import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import DocumentItem from '../../Blocks/DocumentItem/DocumentItem'
import PageHeader from '../../Blocks/PageHeader/PageHeader'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './DocsPage.module.css'

const fetchDocs = async () => {
	try {
		const response = await axios.get(`${serverConfig}/docs`, {
			headers: { Authorization: `Bearer ${getToken}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

const fetchDocsGroup = async () => {
	try {
		const response = await axios.get(`${serverConfig}/group`, {
			headers: { Authorization: `Bearer ${getToken}` }
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

	return (
		<main className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<PageHeader title='Документы' />
					{groups
						.filter(group => hasDocuments(group.id))
						.map(group => (
							<div key={group.id} className={styles.group_wrapper}>
								<p className={styles.category_title}>{group.title}</p>
								<div className={styles.docs_wrapper}>
									{docs.map(item =>
										item.groupId == group.id ? (
											<DocumentItem key={item.id} {...item} />
										) : null
									)}
								</div>
							</div>
						))}
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default DocsPage
