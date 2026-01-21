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
	ImageField,
	ImageInput,
	List,
	SelectInput,
	SimpleForm,
	TextField,
	TextInput
} from 'react-admin'

import RichTextInput from '../Auth/RichTextInput'
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils'
import { UPLOAD } from '../../../../serverConfig'

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
					{ id: 'Домбай', name: 'Домбай' },
					{ id: 'Казань', name: 'Казань' },
					{ id: 'Карачаевск', name: 'Карачаевск' },
					{ id: 'Кисловодск', name: 'Кисловодск' },
					{ id: 'Краснодар', name: 'Краснодар' },
					{ id: 'Малокарачаевский район', name: 'Малокарачаевский район' },
					{ id: 'Минеральные воды', name: 'Минеральные воды' },
					{ id: 'Москва', name: 'Москва' },
					{ id: 'Пятигорск', name: 'Пятигорск' },
					{ id: 'Санкт-Петербург', name: 'Санкт-Петербург' },
					{ id: 'Софийская поляна', name: 'Софийская поляна' },
					{ id: 'Сочи', name: 'Сочи' },
					{ id: 'Ставрополь', name: 'Ставрополь' },
					{ id: 'Теберда (нижняя)', name: 'Теберда (нижняя)' },
					{ id: 'Теберда (верхняя)', name: 'Теберда (верхняя)' },
					{ id: 'Новая теберда', name: 'Новая теберда' },
					{ id: 'Черкесск', name: 'Черкесск' }
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
								src: image.includes('http')
									? image
									: `${UPLOAD}${image}`,
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
					{ id: 'Домбай', name: 'Домбай' },
					{ id: 'Казань', name: 'Казань' },
					{ id: 'Карачаевск', name: 'Карачаевск' },
					{ id: 'Кисловодск', name: 'Кисловодск' },
					{ id: 'Краснодар', name: 'Краснодар' },
					{ id: 'Малокарачаевский район', name: 'Малокарачаевский район' },
					{ id: 'Минеральные воды', name: 'Минеральные воды' },
					{ id: 'Москва', name: 'Москва' },
					{ id: 'Пятигорск', name: 'Пятигорск' },
					{ id: 'Санкт-Петербург', name: 'Санкт-Петербург' },
					{ id: 'Сочи', name: 'Сочи' },
					{ id: 'Ставрополь', name: 'Ставрополь' },
					{ id: 'Теберда', name: 'Теберда' },
					{ id: 'Черкесск', name: 'Черкесск' }
				]}
			/>
			<TextInput source='title' label='Заголовок' />
			<RichTextInput source='text' label='Текст' />
			<DateTimeInput source='date' label='Дата' />
			<ImageInput source='images' label='Изображения' multiple>
				<ImageField source='src' title='title' />
			</ImageInput>
		</SimpleForm>
	</Create>
)
