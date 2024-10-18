import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import EventIcon from '@mui/icons-material/Event'
import InfoIcon from '@mui/icons-material/Info'
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import simpleRestProvider from 'ra-data-simple-rest'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import russianMessages from 'ra-language-russian'
import React from 'react'
import { Admin, Resource } from 'react-admin'

import serverConfig from '../../../serverConfig'

import { AboutUsCreate, AboutUsEdit, AboutUsList } from './CRUD/AboutUsCRUD'
import { BSCreate, BSEdit, BSList } from './CRUD/BSCRUD'
import { EventsCreate, EventsEdit, EventsList } from './CRUD/EventsCRUD'
import { NewsCreate, NewsEdit, NewsList } from './CRUD/NewsCRUD'
import authProvider from './JS/authProvider'
import { fetchJsonWithToken } from './JS/fetchJsonWithToken'
import LoginPage from './LoginPage'

// Подключение к REST API
const dataProvider = simpleRestProvider(`${serverConfig}`, fetchJsonWithToken)

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru')

function AdminPage() {
	return (
		<Admin
			basename='/admin'
			dataProvider={dataProvider}
			authProvider={authProvider}
			loginPage={<LoginPage />}
			i18nProvider={i18nProvider}
		>
			<Resource
				icon={NewspaperIcon}
				name='news'
				options={{ label: 'Новости' }}
				list={<NewsList />}
				edit={<NewsEdit />}
				create={<NewsCreate />}
			/>

			<Resource
				icon={EventIcon}
				name='projects'
				options={{ label: 'Проекты' }}
				list={<NewsList />}
				edit={<NewsEdit />}
				create={<NewsCreate />}
			/>

			<Resource
				icon={AddBusinessIcon}
				name='business-support'
				options={{ label: 'Поддержка бизнеса' }}
				list={<BSList />}
				edit={<BSEdit />}
				create={<BSCreate />}
			/>

			<Resource
				icon={LightbulbCircleIcon}
				name='events'
				options={{ label: 'Анонсы событий' }}
				list={<EventsList />}
				edit={<EventsEdit />}
				create={<EventsCreate />}
			/>

			<Resource
				icon={InfoIcon}
				name='about-us'
				options={{ label: 'О нас' }}
				list={<AboutUsList />}
				edit={<AboutUsEdit />}
				create={<AboutUsCreate />}
			/>
		</Admin>
	)
}

export default AdminPage
