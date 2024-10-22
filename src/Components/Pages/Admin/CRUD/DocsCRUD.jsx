import AddIcon from '@mui/icons-material/Add'
import React from 'react'
import {
	Button,
	Create,
	Datagrid,
	Edit,
	FileField,
	FileInput,
	List,
	ReferenceInput,
	SelectInput,
	SimpleForm,
	TextField,
	TextInput,
	useDataProvider,
	useNotify,
	useRefresh
} from 'react-admin'

import {
	handleSaveDocument,
	handleSaveWithDocument
} from '../JS/docsUploadUtils'

export const DocsList = props => (
	<List {...props}>
		<Datagrid>
			<TextField source='Group.title' label='Группа' />
			<TextField source='title' label='Название' />
		</Datagrid>
	</List>
)

export const DocsEdit = props => {
	const refresh = useRefresh()
	const notify = useNotify()
	const dataProvider = useDataProvider()

	const handleAddGroup = async () => {
		const title = prompt('Введите название новой группы документов')
		if (title) {
			try {
				await dataProvider.create('group', { data: { title } })
				notify('Группа успешно создана', { type: 'success' })
				refresh()
			} catch (error) {
				notify('Ошибка при создании группы', { type: 'error' })
			}
		}
	}

	return (
		<Edit {...props} transform={handleSaveWithDocument}>
			<SimpleForm>
				<ReferenceInput source='groupId' reference='group' label='Группа'>
					<SelectInput optionText='title' />
				</ReferenceInput>
				<Button label='Добавить группу' onClick={handleAddGroup}>
					<AddIcon />
				</Button>
				<TextInput source='title' label='Название' />
				<FileInput source='src' label='Документ'>
					<FileField source='src' title='title' target='_blank' />
				</FileInput>
			</SimpleForm>
		</Edit>
	)
}

export const DocsCreate = props => {
	const refresh = useRefresh()
	const notify = useNotify()
	const dataProvider = useDataProvider()

	const handleAddGroup = async () => {
		const title = prompt('Введите название новой группы документов')
		if (title) {
			try {
				await dataProvider.create('group', { data: { title } })
				notify('Группа успешно создана', { type: 'success' })
				refresh()
			} catch (error) {
				notify('Ошибка при создании группы', { type: 'error' })
			}
		}
	}

	return (
		<Create {...props} transform={handleSaveDocument}>
			<SimpleForm>
				<ReferenceInput source='groupId' reference='group' label='Группа'>
					<SelectInput optionText='title' required/>
				</ReferenceInput>
				<Button label='Добавить группу' onClick={handleAddGroup}>
					<AddIcon />
				</Button>
				<TextInput source='title' label='Название' />
				<FileInput source='src' label='Документ'>
					<FileField source='src' title='title' target='_blank' />
				</FileInput>
			</SimpleForm>
		</Create>
	)
}
