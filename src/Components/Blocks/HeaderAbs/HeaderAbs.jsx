import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import Burger from '../Burger/Burger'
import BurgerWhite from '../BurgerWhite/BurgerWhite'
import Links from '../Links/Links'
import LinksWhite from '../LinksWhite/LinksWhite'

import styles from './HeaderAbs.module.css'

function HeaderAbs({ children, ...props }) {
	const [burgerActive, setBurgerActive] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const menuRef = useRef(null)
	const burgerIconRef = useRef(null)

	const toggleBurger = () => {
		setBurgerActive(prevIsOpen => !prevIsOpen)
	}

	const handleClickOutside = event => {
		if (
			menuRef.current &&
			!menuRef.current.contains(event.target) &&
			burgerIconRef.current &&
			!burgerIconRef.current.contains(event.target)
		) {
			setBurgerActive(false)
		}
	}

	const handleScroll = () => {
		setIsScrolled(window.scrollY > 0) // Устанавливаем true, если прокрутка больше 0
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		window.addEventListener('scroll', handleScroll)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
			<CenterBlock>
				<WidthBlock>
					<div className={styles.header_wrapper}>
						<LinksWhite isScrolled={isScrolled} />
						<div className={styles.wrapper_item}>
							<Link to='/' className={styles.main_icon}>
								<img src='/favicon-alazar-studio.png' alt='' />
								<div className={`${styles.main_text} ${isScrolled ? styles.scrolled_main_text : ''}`}>
									<p>КАРАЧАЕВО-ЧЕРКЕСИЯ</p>
									<p>ТУРИЗМ</p>
								</div>
							</Link>
							<BurgerWhite
								menuRef={menuRef}
								active={burgerActive}
								toggleBurger={toggleBurger}
								isScrolled={isScrolled}
							/>
						</div>
						<div className={styles.menu_search}>
							{/* <img src='/images/search.png' alt='' /> */}
							<img src='/images/bvi.png' alt='' />
							<div
								onClick={toggleBurger}
								className={styles.burger_icon}
								ref={burgerIconRef}
							>
								<img src='/images/menu.png' alt='Menu' />
							</div>
						</div>
					</div>
				</WidthBlock>
			</CenterBlock>
		</header>
	)
}

export default HeaderAbs
