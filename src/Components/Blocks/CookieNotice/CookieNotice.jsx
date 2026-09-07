import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import styles from './CookieNotice.module.css'

const STORAGE_KEY = 'cookieNoticeAccepted'

function readAccepted() {
	try {
		return localStorage.getItem(STORAGE_KEY) === '1'
	} catch {
		return false
	}
}

// Уведомление о cookie: на сайте только служебные cookie, поэтому без выбора категорий
function CookieNotice() {
	const { pathname } = useLocation()
	const [accepted, setAccepted] = useState(readAccepted)

	if (accepted || pathname.startsWith('/admin')) return null

	const accept = () => {
		try {
			localStorage.setItem(STORAGE_KEY, '1')
		} catch {
			// приватный режим: плашка скроется до перезагрузки
		}
		setAccepted(true)
	}

	return (
		<div className={styles.notice} role='dialog' aria-label='Использование файлов cookie'>
			<p className={styles.text}>
				Сайт использует файлы cookie, необходимые для его работы. Продолжая пользоваться
				сайтом, вы соглашаетесь с{' '}
				<Link to='/legal/privacy-policy' className={styles.link}>
					Политикой обработки персональных данных
				</Link>
				.
			</p>
			<button type='button' className={styles.button} onClick={accept}>
				Понятно
			</button>
		</div>
	)
}

export default CookieNotice
