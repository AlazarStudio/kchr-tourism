import { useState } from 'react'

import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './FeedbackBS.module.css'

function FeedbackBS({ children, ...props }) {
	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
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
						phone: '',
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
				{/* <WidthBlock position='relative'> */}
					<header className={styles.events_header}>
						<div className={styles.events_header__item}>
							{/* <img src='/images/left_pic.png' alt='' /> */}
							<div className={styles.events_header__text}>
								<p>Оставьте заявку на бесплатную консультацию</p>
							</div>
						</div>
					</header>
					<form action='' onSubmit={handleSubmit} className={styles.form}>
						<label htmlFor='fullName'>
							ФИО*
							<input type='text' name='fullName' required />
						</label>

						<label htmlFor='fullName'>
							Телефон*
							<input type='tel' name='phone' required />
						</label>

						<label htmlFor='fullName'>
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

						{/* <label
							htmlFor='agree'
							style={{
								display: 'flex',
								flexDirection: 'row',
								gap: '15px',
								// fontSize: '16px'
							}}
						>
							<input
								className={styles.checkBox}
								type='checkbox'
								name=''
								id=''
								required
							/>
							Отправляя форму, я даю согласие на обработку персональных данных,
							подтверждаю согласие с политикой конфиденциальности
						</label> */}
						<button type='submit'>ОТПРАВИТЬ</button>
					</form>
				{/* </WidthBlock> */}
			</CenterBlock>
	)
}

export default FeedbackBS
