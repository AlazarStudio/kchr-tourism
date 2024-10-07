import { Link } from 'react-router-dom'

import styles from './BurgerWhite.module.css'

function BurgerWhite({ menuRef, active, toggleBurger }) {
	return (
		<nav
			ref={menuRef}
			className={`${styles.burger} ${active ? styles.active : styles.closed}`}
		>
			<Link to='/contact' onClick={toggleBurger}>НОВОСТИ</Link>
			<Link to='/contact' onClick={toggleBurger}>О НАС</Link>
			<Link to='/contact' onClick={toggleBurger}>НАШИ ПРОЕКТЫ</Link>
			<Link to='/contact' onClick={toggleBurger}>АНОНСЫ СОБЫТИЙ</Link>
			<Link to='/contact' onClick={toggleBurger}>ПОДДЕРЖКА БИЗНЕСА</Link>
			<Link to='/contact' onClick={toggleBurger}>КОНТАКТЫ</Link>
		</nav>
	)
}

export default BurgerWhite
