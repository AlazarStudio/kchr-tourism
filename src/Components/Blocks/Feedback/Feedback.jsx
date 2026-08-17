import { useState } from 'react'
import { Link } from 'react-router-dom'

import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './Feedback.module.css'

function Feedback({ children, ...props }) {
	const [successMessage, setSuccessMessage] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		const form = e.currentTarget
		const fd = new FormData(form)

		const payload = {
			fullName: (fd.get('fullName') || '').toString().trim(),
			email: (fd.get('email') || '').toString().trim(),
			comment: (fd.get('comment') || '').toString().trim(),
			consent: form.consent.checked,
			consentDocument: 'Согласие на обработку персональных данных',
			consentVersion: 'от 17 августа 2026 года',
			consentUrl: `${window.location.origin}/legal/consent`,
			page: window.location.href,
			consentedAt: new Date().toISOString()
		}

		fetch('/mail/mail.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					setSuccessMessage('Сообщение успешно отправлено!')
					form.reset()
				} else {
					console.error('Произошла ошибка:', data.message)
				}
			})
			.catch(error => {
				console.error('Catch error: ', error)
			})
	}

	return (
			<CenterBlock>
				<WidthBlock position='relative'>
					<header className={styles.events_header}>
						<div className={styles.events_header__item}>
							<img src='/images/left_pic.png' alt='' />
							<div className={styles.events_header__text}>
								<p>Обратная связь</p>
							</div>
						</div>
					</header>
					<form action='' onSubmit={handleSubmit} className={styles.form}>
						<label htmlFor='fullName'>
							Имя*
							<input type='text' name='fullName' required />
						</label>

						<label htmlFor='email'>
							E-mail*
							<input type='email' name='email' required />
						</label>

						<textarea
							name='comment'
							id='comment'
							style={{ resize: 'none' }}
							placeholder='Ваш Комментарий'
							required
						></textarea>

						<label
							htmlFor='agreeTerms'
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								gap: '15px'
							}}
						>
							<input
								className={styles.checkBox}
								type='checkbox'
								id='agreeTerms'
								required
							/>
							<span>
								Согласен с{' '}
								<Link
									to='/legal/terms'
									target='_blank'
									className={styles.docLink}
								>
									Соглашением пользования сайтом
								</Link>
							</span>
						</label>

						<label
							htmlFor='agreeConsent'
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								gap: '15px'
							}}
						>
							<input
								className={styles.checkBox}
								type='checkbox'
								name='consent'
								id='agreeConsent'
								required
							/>
							<span>
								Я даю{' '}
								<Link
									to='/legal/consent'
									target='_blank'
									className={styles.docLink}
								>
									согласие на обработку персональных данных
								</Link>
							</span>
						</label>

						<p className={styles.policyNote}>
							Обработка данных осуществляется в соответствии с{' '}
							<Link
								to='/legal/privacy-policy'
								target='_blank'
								className={styles.docLink}
							>
								Политикой конфиденциальности
							</Link>
						</p>
						<button type='submit'>ОТПРАВИТЬ</button>
					</form>
				</WidthBlock>
			</CenterBlock>
	)
}

export default Feedback
