import { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import PageHeader from '../../Blocks/PageHeader/PageHeader'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

import { legalDocs } from './legalDocs'
import styles from './LegalPage.module.css'

const LINK_RE =
	/([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})|((?:https?:\/\/|www\.)[^\s,)]+)|(\+\s?7\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2})|([A-Za-z0-9-]+\.ru\/?)/g

const splitTrailingPunct = value => {
	const match = value.match(/[.,;:]+$/)
	if (!match) return [value, '']
	return [value.slice(0, -match[0].length), match[0]]
}

const linkify = text => {
	const nodes = []
	let lastIndex = 0
	let key = 0

	for (const match of text.matchAll(LINK_RE)) {
		const [full, email, , phone] = match
		const start = match.index

		if (start > lastIndex) {
			nodes.push(text.slice(lastIndex, start))
		}

		if (email) {
			const [core, tail] = splitTrailingPunct(email)
			nodes.push(
				<a key={key++} href={`mailto:${core}`} className={styles.link}>
					{core}
				</a>
			)
			if (tail) nodes.push(tail)
		} else if (phone) {
			nodes.push(
				<a
					key={key++}
					href={`tel:${phone.replace(/[^\d+]/g, '')}`}
					className={styles.link}
				>
					{phone}
				</a>
			)
		} else {
			const [core, tail] = splitTrailingPunct(full)
			const href = core.startsWith('http') ? core : `https://${core}`
			nodes.push(
				<a key={key++} href={href} target='_blank' className={styles.link}>
					{core}
				</a>
			)
			if (tail) nodes.push(tail)
		}

		lastIndex = start + full.length
	}

	if (lastIndex < text.length) {
		nodes.push(text.slice(lastIndex))
	}

	return nodes
}

const renderRuns = runs =>
	runs.map((run, i) =>
		run.b ? (
			<strong key={i}>{linkify(run.v)}</strong>
		) : (
			<Fragment key={i}>{linkify(run.v)}</Fragment>
		)
	)

function LegalPage() {
	const { slug } = useParams()
	const doc = legalDocs[slug]

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' })
	}, [slug])

	if (!doc) {
		return <NotFoundPage />
	}

	return (
		<main className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<PageHeader title={doc.title} />
					<article className={styles.content}>
						{doc.blocks.map((block, index) => {
							if (block.t === 'subtitle') {
								return (
									<p key={index} className={styles.subtitle}>
										{linkify(block.v)}
									</p>
								)
							}

							if (block.t === 'h2') {
								return (
									<h2 key={index} className={styles.heading}>
										{block.v}
									</h2>
								)
							}

							if (block.t === 'h3') {
								return (
									<h3 key={index} className={styles.subheading}>
										{block.v}
									</h3>
								)
							}

							if (block.t === 'ul') {
								return (
									<ul key={index} className={styles.list}>
										{block.items.map((item, i) => (
											<li key={i}>
												{item.runs ? renderRuns(item.runs) : linkify(item)}
											</li>
										))}
									</ul>
								)
							}

							return (
								<p key={index} className={styles.paragraph}>
									{block.runs ? renderRuns(block.runs) : linkify(block.v)}
								</p>
							)
						})}
					</article>
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default LegalPage
