import React from 'react'
import {
	Create,
	Datagrid,
	Edit,
	FileField,
	FileInput,
	FunctionField,
	List,
	SimpleForm
} from 'react-admin'

import uploadsConfig from '../../../../uploadsConfig'
import RichTextInput from '../Auth/RichTextInput'
import { handleSave, handleSaveWithImages } from '../JS/fileUploadUtils'

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

			<FileInput
				source='imagesRaw'
				label='Добавить новые изображения'
				multiple
				validate={validateImageCount}
			>
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

export const AboutUsCreate = props => (
	<Create {...props} transform={handleSave}>
		<SimpleForm>
			<RichTextInput source='text' label='Текст' />
			<FileInput
				source='images'
				label='Изображения'
				multiple
				validate={validateImageCount}
			>
				<FileField source='src' title='title' />
			</FileInput>
		</SimpleForm>
	</Create>
)
