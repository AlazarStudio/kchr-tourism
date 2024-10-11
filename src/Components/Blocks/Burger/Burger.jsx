import { Link } from 'react-router-dom'

import styles from './Burger.module.css'

function Burger({ menuRef, active, toggleBurger }) {
	return (
		<nav
			ref={menuRef}
			className={`${styles.burger} ${active ? styles.active : styles.closed}`}
		>
			<Link to='/news' onClick={toggleBurger}>НОВОСТИ</Link>
			<Link to='/about-us' onClick={toggleBurger}>О НАС</Link>
			<Link to='/our-projects' onClick={toggleBurger}>НАШИ ПРОЕКТЫ</Link>
			<Link to='/events-announcement' onClick={toggleBurger}>АНОНСЫ СОБЫТИЙ</Link>
			<Link to='/business-support' onClick={toggleBurger}>ПОДДЕРЖКА БИЗНЕСА</Link>
			<Link to='/contact' onClick={toggleBurger}>КОНТАКТЫ</Link>
		</nav>
	)
}

export default Burger
