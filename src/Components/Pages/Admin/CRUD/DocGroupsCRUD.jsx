import React from 'react'
import {
	Create,
	Datagrid,
	Edit,
	List,
	SimpleForm,
	TextField,
	TextInput
} from 'react-admin'

export const DocGroupsList = props => (
	<List {...props}>
		<Datagrid>
			<TextField source='title' label='Название группы'/>
		</Datagrid>
	</List>
)

export const DocGroupsEdit = props => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput source='title' label='Название группы' />
		</SimpleForm>
	</Edit>
)

export const DocGroupsCreate = props => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source='title' label='Название группы' />
		</SimpleForm>
	</Create>
)
