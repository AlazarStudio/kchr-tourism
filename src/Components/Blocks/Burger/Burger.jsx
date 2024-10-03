import { Link } from 'react-router-dom'

import styles from './Burger.module.css'

function Burger({ children, ...props }) {
	return (
		<nav className={styles.burger}>
			<Link to='/contacts'>НОВОСТИ</Link>
			<Link to='/contacts'>О НАС</Link>
			<Link to='/contacts'>НАШИ ПРОЕКТЫ</Link>
			<Link to='/contacts'>АНОНСЫ СОБЫТИЙ</Link>
			<Link to='/contacts'>ПОДДЕРЖКА БИЗНЕСА</Link>
			<Link to='/contacts'>КОНТАКТЫ</Link>
		</nav>
	)
}

export default Burger
