import Cookies from 'js-cookie'
import simpleRestProvider from 'ra-data-simple-rest'
import React from 'react'
import {
	Admin,
	AuthContext,
	Create,
	Datagrid,
	DateInput,
	DateTimeInput,
	Edit,
	FileField,
	FileInput,
	ImageField,
	List,
	Resource,
	SimpleForm,
	TextField,
	TextInput,
	fetchUtils
} from 'react-admin'
import { EditGuesser, ListGuesser } from 'react-admin'

import serverConfig from '../../../serverConfig'

import authProvider from './Auth/authProvider'
import uploadsConfig from '../../../uploadsConfig'

const token = Cookies.get('token')

// Функция для загрузки файлов на сервер
const uploadFile = async file => {
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
const uploadFiles = async files => {
	const uploadedFiles = await Promise.all(
		files.map(file => uploadFile(file.rawFile))
	)
	return uploadedFiles.flat() // Получаем плоский массив с ссылками на файлы
}

// Функция для обработки сохранения формы
const handleSave = async values => {
	if (values.images && values.images.length > 0) {
		// Загружаем все изображения на сервер
		const uploadedImages = await uploadFiles(values.images)

		// Заменяем файлы ссылками на загруженные изображения
		values.images = uploadedImages
	}

	// Возвращаем измененные данные для создания новости
	return values
}

const fetchJsonWithToken = async (url, options = {}) => {
	console.log(url, options)
	if (!options.headers) {
		options.headers = new Headers({ Accept: 'application/json' })
	}
	options.headers.set('Authorization', `Bearer ${token}`)

	try {
		const response = await fetchUtils.fetchJson(url, options)
		return response
	} catch (error) {
		console.error('Fetch error:', error)
		throw error
	}
}

// Подключение к REST API
const dataProvider = simpleRestProvider(`${serverConfig}`, fetchJsonWithToken)

const CustomIcon = () => (
	<img
		src={'/public/images/abus1.png'}
		alt='Custom Icon'
		style={{ width: 24, height: 24 }}
	/>
)
function AdminPage() {
	return (
		<Admin
			basename='/admin'
			dataProvider={dataProvider}
			authProvider={authProvider}
		>
			<Resource
				icon={CustomIcon}
				name='news'
				options={{ label: 'Новости' }}
				list={props => (
					<List {...props}>
						<Datagrid>
							<TextField source='id' label='ID' />
							<TextField source='title' label='Заголовок' />
							<TextField
								source='text'
								label='Текст'
								// Добавляем стили для обрезки текста
								style={{
									display: '-webkit-box',
									WebkitLineClamp: 4, // Ограничение строк
									WebkitBoxOrient: 'vertical',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'normal'
								}}
							/>
						</Datagrid>
					</List>
				)}
				edit={props => (
					<Edit {...props}>
						<SimpleForm>
							<TextInput disabled source='id' label='ID' />
							<TextInput source='title' label='Заголовок' />
							<TextInput multiline source='text' label='Текст' />
						</SimpleForm>
					</Edit>
				)}
				create={props => (
					<Create {...props} transform={handleSave}>
						<SimpleForm
							// onSubmit={async values => {
							// 	const newData = await handleSave(values)
							// 	console.log(newData)
							// 	return dataProvider.create('news', { data: newData })
							// }}
						>
							<TextInput source='title' label='Заголовок' />
							{/* <input type="text" /> */}
							<TextInput multiline source='text' label='Текст' />
							<DateTimeInput source='date' label='Дата' />
							<FileInput source='images' label='Изображения' multiple>
								<FileField source='src' title='title' />
							</FileInput>
						</SimpleForm>
					</Create>
				)}
			/>
		</Admin>
	)
}

export default AdminPage
