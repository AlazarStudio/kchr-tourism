// fileUploadUtils.js
import Cookies from 'js-cookie'

import uploadsConfig from '../../../../uploadsConfig'

// Убедитесь, что путь правильный

const token = Cookies.get('token')

// Функция для загрузки одного файла на сервер
export const uploadFile = async file => {
	const formData = new FormData()
	formData.append('images', file)

	try {
		const response = await fetch(`${uploadsConfig}/uploads`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: formData
		})

		const data = await response.json()
		return data.filePaths // Возвращает массив ссылок на загруженные файлы
	} catch (error) {
		console.error('Ошибка при загрузке файлов:', error)
		throw error
	}
}

// Функция для загрузки всех файлов перед сохранением формы
export const uploadFiles = async files => {
	const uploadedFiles = await Promise.all(
		files.map(file => uploadFile(file.rawFile))
	)
	return uploadedFiles.flat() // Получаем плоский массив с ссылками на файлы
}

// Функция для обработки сохранения формы
export const handleSave = async values => {
	if (values.images && values.images.length > 0) {
		// Загружаем все изображения на сервер
		const uploadedImages = await uploadFiles(values.images)

		// Заменяем файлы ссылками на загруженные изображения
		values.images = uploadedImages
	}

	// Возвращаем измененные данные для создания новости
	return values
}
