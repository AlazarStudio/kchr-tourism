import React from 'react'
import {
	BooleanInput,
	CheckboxGroupInput,
	Create,
	Datagrid,
	DateTimeInput,
	Edit,
	FileField,
	FileInput,
	FunctionField,
	List,
	SelectInput,
	SimpleForm,
	TextField,
	TextInput
} from 'react-admin'

import uploadsConfig from '../../../../uploadsConfig'
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
		year: 'numeric',
		weekday: 'long'
		// hour: '2-digit',
		// minute: '2-digit'
	}

	return new Date(dateString).toLocaleString('ru-RU', options)
}

export const EventsList = props => (
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

export const EventsEdit = props => (
	<Edit {...props} transform={handleSaveWithImages}>
		<SimpleForm>
			<TextInput disabled source='id' label='№' />
			<BooleanInput source='isCurrent' label='Сделать событие текущим' />
			<SelectInput
				source='city'
				label='Выберите город'
				choices={[
					{ id: 'Архыз', name: 'Архыз' },
					{ id: 'Теберда', name: 'Теберда' },
					{ id: 'Домбай', name: 'Домбай' },
					{ id: 'Черкесск', name: 'Черкесск' },
					{ id: 'Пятигорск', name: 'Пятигорск' }
				]}
			/>
			<TextInput source='title' label='Заголовок' />
			<RichTextInput source='text' label='Текст' />
			<DateTimeInput source='date' label='Дата' />

			<FileInput source='imagesRaw' label='Добавить новые изображения' multiple>
				<FileField source='src' title='title' />
			</FileInput>

			<FunctionField
				label='Старые изображения'
				render={record => {
					const images = Array.isArray(record.images)
						? record.images
						: [record.images]

					return (
						<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
							{images.map((image, index) => (
								<div key={index}>
									<img
										src={`${uploadsConfig}${image}`}
										alt={image}
										style={{
											width: '150px',
											height: '200px',
											objectFit: 'cover'
										}}
									/>
								</div>
							))}
						</div>
					)
				}}
			/>
		</SimpleForm>
	</Edit>
)

export const EventsCreate = props => (
	<Create {...props} transform={handleSave}>
		<SimpleForm>
			<SelectInput
				source='city'
				label='Выберите город'
				choices={[
					{ id: 'Архыз', name: 'Архыз' },
					{ id: 'Теберда', name: 'Теберда' },
					{ id: 'Домбай', name: 'Домбай' },
					{ id: 'Черкесск', name: 'Черкесск' },
					{ id: 'Пятигорск', name: 'Пятигорск' }
				]}
			/>
			<TextInput source='title' label='Заголовок' />
			<RichTextInput source='text' label='Текст' />
			<DateTimeInput source='date' label='Дата' />
			<FileInput source='images' label='Изображения' multiple>
				<FileField source='src' title='title' />
			</FileInput>
		</SimpleForm>
	</Create>
)
