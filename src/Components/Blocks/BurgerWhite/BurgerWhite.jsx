import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './BurgerWhite.module.css'

function BurgerWhite({ menuRef, active, toggleBurger }) {
	// Управляем состоянием видимости подменю
	const [isMediaMenuOpen, setIsMediaMenuOpen] = useState(false)
	const mediaMenuRef = useRef(null)

	// Обработчик клика по пункту "МЕДИА"
	const toggleMediaMenu = () => {
		setIsMediaMenuOpen(!isMediaMenuOpen)
	}

	// Закрытие меню при клике вне его области
	useEffect(() => {
		const handleClickOutside = event => {
			if (
				mediaMenuRef.current &&
				!mediaMenuRef.current.contains(event.target)
			) {
				setIsMediaMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	// Функция для закрытия меню и перехода по ссылке
	const handleLinkClick = () => {
		setIsMediaMenuOpen(false)
		toggleBurger
	}
	return (
		<nav
			ref={menuRef}
			className={`${styles.burger} ${active ? styles.active : styles.closed}`}
		>
			<Link to='/news' onClick={toggleBurger}>
				НОВОСТИ
			</Link>
			<div className={styles.media_menu} ref={mediaMenuRef}>
				<a onClick={toggleMediaMenu}>О НАС</a>
				{isMediaMenuOpen && (
					<ul className={styles.dropdown_menu}>
						<li>
							<Link to='/about-us' onClick={handleLinkClick}>
								О НАС
							</Link>
						</li>
						<li>
							<Link to='/documents' onClick={handleLinkClick}>
								ДОКУМЕНТЫ
							</Link>
						</li>
					</ul>
				)}
			</div>
			<Link to='/our-projects' onClick={toggleBurger}>
				НАШИ ПРОЕКТЫ
			</Link>
			<Link to='/events-announcement' onClick={toggleBurger}>
				АНОНСЫ СОБЫТИЙ
			</Link>
			<Link to='/business-support' onClick={toggleBurger}>
				ПОДДЕРЖКА БИЗНЕСА
			</Link>
			<Link to='/contact' onClick={toggleBurger}>
				КОНТАКТЫ
			</Link>
		</nav>
	)
}

export default BurgerWhite
