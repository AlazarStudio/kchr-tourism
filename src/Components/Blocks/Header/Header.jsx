import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'
import Burger from '../Burger/Burger'
import Links from '../Links/Links'

import styles from './Header.module.css'
import AccessibilityButton from '../AccessibilityButton/AccessibilityButton'

function Header({ children, ...props }) {
	const [burgerActive, setBurgerActive] = useState(false)
	const menuRef = useRef(null)
	const burgerIconRef = useRef(null)
	const [isScrolled, setIsScrolled] = useState(false)

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

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleScroll = () => {
		setIsScrolled(window.scrollY > 0)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<header
			className={`${styles.header} ${isScrolled ? styles.isScrolled : null}`}
		>
			<CenterBlock>
				<WidthBlock>
					<div className={styles.header_wrapper}>
						<Links />
						<div className={styles.wrapper_item}>
							<Link to='/' className={styles.main_icon}>
								<img src='/favicon-alazar-studio.png' alt='' />
								<div className={styles.main_text}>
									<p>КАРАЧАЕВО-ЧЕРКЕСИЯ</p>
									<p>ТУРИЗМ</p>
								</div>
							</Link>
							<Burger
								menuRef={menuRef}
								active={burgerActive}
								toggleBurger={toggleBurger}
							/>
						</div>
						<div className={styles.menu_search}>
							{/* <img src='/images/search.png' alt='' /> */}
							{/* <img src='/images/bvi.png' alt='' /> */}
							<AccessibilityButton
								srcDefault={'/images/bvi.png'}
								srcScrolled={'/images/bvi_white.png'}
								// isScrolled={isScrolled}
							/>
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

export default Header
