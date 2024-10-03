import { Link } from 'react-router-dom'

import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import Burger from '../Burger/Burger'
import Links from '../Links/Links'

import styles from './Header.module.css'

function Header({ children, ...props }) {
	return (
		<header className={styles.header}>
			<CenterBlock>
				<WidthBlock>
					<div className={styles.header_wrapper}>
						<Links />
						<div className={styles.wrapper_item}>
							<Link to='/contacts' className={styles.main_icon}>
								<img src='/favicon-alazar-studio.png' alt='' />
								<div className={styles.main_text}>
									<p>КАРАЧАЕВО-ЧЕРКЕСИЯ</p>
									<p>ТУРИЗМ</p>
								</div>
							</Link>
							<Burger />
						</div>
					</div>
				</WidthBlock>
			</CenterBlock>
		</header>
	)
}

export default Header
