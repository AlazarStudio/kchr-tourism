import Cookies from 'js-cookie'

import { UPLOAD } from '../../../../serverConfig'

const token = Cookies.get('token')

// Функция для загрузки одного файла на сервер
export const uploadFile = async file => {
	const formData = new FormData()
	formData.append('images', file)

	try {
		const response = await fetch(`${UPLOAD}/uploads`, {
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
	const validFiles = (files || []).filter(f => f && f.rawFile)
	const uploadedFiles = await Promise.all(
		validFiles.map(file => uploadFile(file.rawFile))
	)
	return uploadedFiles.flat() // Получаем плоский массив с ссылками на файлы
}

// Функция для загрузки одного видео на сервер
export const uploadVideoFile = async file => {
	const formData = new FormData()
	formData.append('videos', file)

	try {
		const response = await fetch(`${UPLOAD}/upload-video`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: formData
		})

		const data = await response.json()
		return data.filePaths
	} catch (error) {
		console.error('Ошибка при загрузке видео:', error)
		throw error
	}
}

// Функция для загрузки всех видео перед сохранением формы
export const uploadVideos = async files => {
	const validFiles = (files || []).filter(f => f && f.rawFile)
	const uploadedFiles = await Promise.all(
		validFiles.map(file => uploadVideoFile(file.rawFile))
	)
	return uploadedFiles.flat()
}

// Функция для обработки сохранения формы
export const handleSave = async values => {
	if (values.images && values.images.length > 0) {
		// Загружаем все изображения на сервер
		const uploadedImages = await uploadFiles(values.images)

		// Заменяем файлы ссылками на загруженные изображения
		values.images = uploadedImages
	}

	if (values.videos && values.videos.length > 0) {
		// Загружаем все видео на сервер
		const uploadedVideos = await uploadVideos(values.videos)
		values.videos = uploadedVideos
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

// Функция для обновления видео
export const updateVideos = async (existingVideos = [], newFiles = []) => {
	let uploadedVideos = []
	if (newFiles.length > 0) {
		uploadedVideos = await uploadVideos(newFiles)
	}
	return Array.from(new Set([...existingVideos, ...uploadedVideos]))
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

	// Обновляем видео (старые + новые)
	const existingVideos = (values.videos || []).filter(v => typeof v === 'string')
	const newVideoFiles = values.videosRaw || []
	const newFromVideosInput = (values.videos || []).filter(v => v && v.rawFile)
	const allNewVideos = [...newVideoFiles, ...newFromVideosInput]
	const updatedVideos = await updateVideos(existingVideos, allNewVideos)
	values.videos = updatedVideos
	delete values.videosRaw

	return values
}
