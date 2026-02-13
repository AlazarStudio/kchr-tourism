import React from 'react'
import {
	Create,
	Datagrid,
	DateTimeInput,
	Edit,
	FileField,
	FileInput,
	FunctionField,
	ImageField,
	ImageInput,
	List,
	SelectInput,
	SimpleForm,
	TextField,
	TextInput,
	required
} from 'react-admin'

import { UPLOAD } from '../../../../serverConfig'
import RichTextInput from '../Auth/RichTextInput'
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils'

const stripHTML = html => {
	const tmp = document.createElement('DIV')
	tmp.innerHTML = html
	return tmp.textContent || tmp.innerText || ''
}

const formatDate = dateString => {
	const options = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}

	return new Date(dateString).toLocaleString('ru-RU', options)
}

export const NewsList = props => (
	<List {...props}>
		<Datagrid>
			<TextField source='id' label='№' />
			<TextField
				source='title'
				label='Заголовок'
				style={{
					display: '-webkit-box',
					WebkitLineClamp: 4,
					WebkitBoxOrient: 'vertical',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'normal'
				}}
			/>

			<FunctionField label='Дата' render={record => formatDate(record.date)} />

			<FunctionField
				label='Текст'
				render={record => stripHTML(record.text)}
				style={{
					display: '-webkit-box',
					WebkitLineClamp: 4,
					WebkitBoxOrient: 'vertical',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'normal'
				}}
			/>
		</Datagrid>
	</List>
)

export const NewsEdit = props => (
	<Edit {...props} transform={handleSaveWithImages}>
		<SimpleForm>
			<TextInput disabled source='id' label='№' />
			<SelectInput
				source='type'
				label='Выберите тип'
				choices={[
					{ id: 'news', name: 'Новость' },
					{ id: 'article', name: 'Статья' }
				]}
			/>
			<TextInput source='title' label='Заголовок' />
			<RichTextInput source='text' label='Текст' />
			<DateTimeInput source='date' label='Дата' />

			<ImageInput
				source='imagesRaw'
				label='Добавить новые изображения'
				multiple
			>
				<ImageField source='src' title='title' />
			</ImageInput>

			{/* Поле для редактирования старых и добавления новых изображений */}
			<ImageInput
				source='images'
				label='Изображения'
				multiple
				accept='image/*'
				format={value =>
					value && value.length
						? value.map(image => ({
								src: image.includes('http') ? image : `${UPLOAD}${image}`,
								title: image
							}))
						: []
				}
				parse={value =>
					value.map(file => {
						// Если это новый файл (имеет rawImage), вернем только его имя
						if (file.rawImage) {
							return file.rawImage
						}
						// Если это старое изображение (имеет только src), извлекаем имя файла
						return file.src.replace(`${UPLOAD}`, '')
					})
				}
			>
				<ImageField source='src' title='title' />
			</ImageInput>

			<FileInput
				source='videosRaw'
				label='Добавить новые видео'
				multiple
				accept='video/*'
			>
				<FileField source='src' title='title' />
			</FileInput>

			<FileInput
				source='videos'
				label='Видео'
				multiple
				accept='video/*'
				format={value =>
					value && value.length
						? value.map(video => ({
								src: video.includes('http') ? video : `${UPLOAD}${video}`,
								title: video
							}))
						: []
				}
				parse={value =>
					value
						? value.map(file => {
								if (file.rawFile) {
									return file.rawFile
								}
								return file.src.replace(`${UPLOAD}`, '')
							})
						: []
				}
			>
				<FileField source='src' title='title' />
			</FileInput>
		</SimpleForm>
	</Edit>
)

export const NewsCreate = props => (
	<Create {...props} transform={handleSave}>
		<SimpleForm>
			<SelectInput
				source='type'
				label='Выберите тип'
				defaultValue={'news'}
				choices={[
					{ id: 'news', name: 'Новость' },
					{ id: 'article', name: 'Статья' }
				]}
				validate={required()}
			/>
			<TextInput source='title' label='Заголовок' />
			<RichTextInput source='text' label='Текст' />
			<DateTimeInput source='date' label='Дата' />
			<ImageInput source='images' label='Изображения' multiple>
				<ImageField source='src' title='title' />
			</ImageInput>
			<FileInput source='videos' label='Видео' multiple accept='video/*'>
				<FileField source='src' title='title' />
			</FileInput>
		</SimpleForm>
	</Create>
)
