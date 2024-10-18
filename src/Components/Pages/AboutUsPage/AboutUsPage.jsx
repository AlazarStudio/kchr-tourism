import axios from 'axios'
import { useEffect, useState } from 'react'

import getToken from '../../../getToken'
import serverConfig from '../../../serverConfig'
import uploadsConfig from '../../../uploadsConfig'
import PageHeader from '../../Blocks/PageHeader/PageHeader'
import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './AboutUsPage.module.css'

const fetchAboutUs = async () => {
	try {
		const response = await axios.get(`${serverConfig}/about-us`, {
			headers: { Authorization: `Bearer ${getToken}` }
		})
		return response.data
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

function AboutUsPage({ children, ...props }) {
	const [info, setInfo] = useState([])

	useEffect(() => {
		const getInfo = async () => {
			const info = await fetchAboutUs()
			setInfo(info)
		}
		getInfo()
	}, [])

	const item = info[0]

	const img1 = item?.images?.[0]
	const img2 = item?.images?.[1]
	const img3 = item?.images?.[2]

	return (
		<main className={styles.main_wrapper}>
			<CenterBlock>
				<WidthBlock>
					<PageHeader title='о нас' />
					{info.length === 0 ? null : (
						<>
							<div className={styles.abus_images__wrapper}>
								<img src={`${uploadsConfig}${img1}`} alt='' />
								<img src={`${uploadsConfig}${img2}`} alt='' />
								<img src={`${uploadsConfig}${img3}`} alt='' />
							</div>

							<div
								className={styles.abus_text}
								dangerouslySetInnerHTML={{ __html: item.text }}
							/>
						</>
					)}
				</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default AboutUsPage
