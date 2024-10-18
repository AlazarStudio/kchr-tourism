import Cookies from 'js-cookie'

import uploadsConfig from '../../../../uploadsConfig'

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

	return values
}

// Функция для обновления изображений
export const updateImages = async (existingImages = [], newFiles = []) => {
	// Загружаем новые файлы на сервер
	let uploadedImages = []
	if (newFiles.length > 0) {
		uploadedImages = await uploadFiles(newFiles)
	}

	// Объединяем старые изображения с новыми и удаляем дубликаты
	const updatedImages = Array.from(
		new Set([...existingImages, ...uploadedImages])
	)

	return updatedImages
}

// Функция для сохранения формы
export const handleSaveWithImages = async values => {
	const existingImages = values.images || [] // Старые изображения
	const newFiles = values.imagesRaw || [] // Новые загруженные файлы

	// Обновляем изображения (старые + новые)
	const updatedImages = await updateImages(existingImages, newFiles)

	// Сохраняем значения формы с обновленными изображениями
	values.images = updatedImages

	// Удаляем временные поля
	delete values.imagesRaw

	return values
}
