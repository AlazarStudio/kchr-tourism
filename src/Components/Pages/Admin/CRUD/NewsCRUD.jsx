import React from 'react'
import {
	Create,
	Datagrid,
	DateTimeInput,
	Edit,
	FileField,
	FileInput,
	FunctionField,
	List,
	SimpleForm,
	TextField,
	TextInput
} from 'react-admin'

import RichTextInput from '../Auth/RichTextInput'
import { handleSave } from '../JS/fileUploadUtils'

const stripHTML = html => {
	const tmp = document.createElement('DIV')
	tmp.innerHTML = html
	return tmp.textContent || tmp.innerText || ''
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
			<TextField source='date' label='Дата' />

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
			{/* <TextField
				source='text'
				label='Текст'
				style={{
					display: '-webkit-box',
					WebkitLineClamp: 4,
					WebkitBoxOrient: 'vertical',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'normal'
				}}
			/> */}
		</Datagrid>
	</List>
)

export const NewsEdit = props => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled source='id' label='ID' />
			<TextInput source='title' label='Заголовок' />
			{/* <TextInput multiline source='text' label='Текст' /> */}
			<RichTextInput source='text' label='Текст' />
			<DateTimeInput source='date' label='Дата' />
			<FileInput source='images' label='Изображения' multiple>
				<FileField source='src' title='title' />
			</FileInput>
		</SimpleForm>
	</Edit>
)

export const NewsCreate = props => (
	<Create {...props} transform={handleSave}>
		<SimpleForm>
			<TextInput source='title' label='Заголовок' />
			<RichTextInput source='text' label='Текст' />
			<DateTimeInput source='date' label='Дата' />
			<FileInput source='images' label='Изображения' multiple>
				<FileField source='src' title='title' />
			</FileInput>
		</SimpleForm>
	</Create>
)
