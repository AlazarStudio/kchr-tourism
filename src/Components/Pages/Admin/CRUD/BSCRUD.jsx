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
TextInput
} from 'react-admin'

import RichTextInput from '../Auth/RichTextInput'
import CroppedImageInput from '../Auth/CroppedImageInput'
import {
	handleSaveWithDocs,
	handleSaveWithFilesAndDocs,
	handleSaveWithImagesAndDocs
} from '../JS/fileUploadUtils'
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
year: 'numeric'
}

return new Date(dateString).toLocaleString('ru-RU', options)
}

export const BSList = props => (
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

export const BSEdit = props => (
<Edit {...props} transform={handleSaveWithImagesAndDocs}>
<SimpleForm>
<TextInput disabled source='id' label='№' />
<SelectInput
source='type'
label='Выберите тип поддержки'
choices={[
{ id: 'tourism', name: 'Для туризма' },
{ id: 'hoteliers', name: 'Для отельеров' },
{ id: 'grants', name: 'Гранты' }
]}
required
/>
<TextInput source='title' label='Заголовок' required />
<RichTextInput source='text' label='Текст' />
<DateTimeInput source='date' label='Дата' required />
<CroppedImageInput
source='imagesRaw'
label='Добавить новые изображения'
multiple
>
<ImageField source='src' title='title' />
</CroppedImageInput>

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
if (file.rawImage) {
return file.rawImage
}
return file.src.replace(`${UPLOAD}`, '')
})
}
>
<ImageField source='src' title='title' />
</ImageInput>

<FileInput source='documentsRaw' label='Добавить документы' multiple accept='.pdf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
<FileField source='src' title='title' target='_blank' />
</FileInput>

<FileInput
source='documents'
label='Документы'
multiple
accept='.pdf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
format={value =>
value && value.length
? value.map(document => ({
src: document.includes('http') ? document : `${UPLOAD}${document}`,
title: document.split('/').pop()
  }))
: []
}
parse={value =>
value.map(file => {
if (file.rawFile) {
return file.rawFile
}
return file.src.replace(`${UPLOAD}`, '')
})
}
>
<FileField source='src' title='title' target='_blank' />
</FileInput>
</SimpleForm>
</Edit>
)

export const BSCreate = props => (
<Create {...props} transform={handleSaveWithFilesAndDocs}>
<SimpleForm>
<SelectInput
source='type'
label='Выберите тип поддержки'
choices={[
{ id: 'tourism', name: 'Для туризма' },
{ id: 'hoteliers', name: 'Для отельеров' },
{ id: 'grants', name: 'Гранты' }
]}
required
/>
<TextInput source='title' label='Заголовок' required />
<RichTextInput source='text' label='Текст' />
<DateTimeInput source='date' label='Дата' required />
<CroppedImageInput source='images' label='Изображения' multiple>
<ImageField source='src' title='title' />
</CroppedImageInput>
<FileInput source='documents' label='Документы' multiple accept='.pdf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
<FileField source='src' title='title' target='_blank' />
</FileInput>
</SimpleForm>
</Create>
)
