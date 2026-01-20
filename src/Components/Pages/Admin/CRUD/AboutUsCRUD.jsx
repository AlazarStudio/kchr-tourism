import React from 'react'
import {
	Create,
	Datagrid,
	Edit,
	FileField,
	FileInput,
	FunctionField,
	ImageField,
	ImageInput,
	List,
	SimpleForm
} from 'react-admin'

import RichTextInput from '../Auth/RichTextInput'
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils'
import { UPLOAD } from '../../../../serverConfig'

const stripHTML = html => {
	const tmp = document.createElement('DIV')
	tmp.innerHTML = html
	return tmp.textContent || tmp.innerText || ''
}

// Валидация для ограничения количества изображений
const validateImageCount = value => {
	if (value && value.length > 3) {
		return 'Можно загрузить не более 3 изображений'
	}
	return undefined
}

export const AboutUsList = props => (
	<List {...props}>
		<Datagrid>
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

export const AboutUsEdit = props => (
	<Edit {...props} transform={handleSaveWithImages}>
		<SimpleForm>
			<RichTextInput source='text' label='Текст' />

			<ImageInput
				source='imagesRaw'
				label='Добавить новые изображения'
				multiple
				validate={validateImageCount}
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

export const AboutUsCreate = props => (
	<Create {...props} transform={handleSave}>
		<SimpleForm>
			<RichTextInput source='text' label='Текст' />
			<ImageInput
				source='images'
				label='Изображения'
				multiple
				validate={validateImageCount}
			>
				<ImageField source='src' title='title' />
			</ImageInput>
		</SimpleForm>
	</Create>
)
