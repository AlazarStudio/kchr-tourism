import { useState } from 'react'
import { Link } from 'react-router-dom'

import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './Feedback.module.css'

function Feedback({ children, ...props }) {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		comment: ''
	})

	const [successMessage, setSuccessMessage] = useState('')

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}))
	}

	const handleSubmit = e => {
		e.preventDefault()

		fetch('/mail/mail.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		})
			.then(response => response.json)
			.then(data => {
				if (data.success) {
					setSuccessMessage('Сообщение успешно отправлено!')
					setFormData({
						fullName: '',
						email: '',
						comment: ''
					})
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
								alignItems: 'flex-start',
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
							htmlFor='agreePrivacy'
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'flex-start',
								gap: '15px'
							}}
						>
							<input
								className={styles.checkBox}
								type='checkbox'
								id='agreePrivacy'
								required
							/>
							<span>
								Ознакомлен с{' '}
								<Link
									to='/legal/privacy-policy'
									target='_blank'
									className={styles.docLink}
								>
									Политикой конфиденциальности
								</Link>{' '}
								и согласен на{' '}
								<Link
									to='/legal/consent'
									target='_blank'
									className={styles.docLink}
								>
									обработку персональных данных
								</Link>
							</span>
						</label>
						<button type='submit'>ОТПРАВИТЬ</button>
					</form>
				</WidthBlock>
			</CenterBlock>
	)
}

export default Feedback
