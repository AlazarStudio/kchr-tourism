import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import AboutUsPage from './Components/Pages/AboutUsPage/AboutUsPage'
import AdminPage from './Components/Pages/Admin/AdminPage'
import BSDetail from './Components/Pages/BSDetail/BSDetail'
import BusinessSupportPage from './Components/Pages/BusinessSupportPage/BusinessSupportPage'
import ContactsPage from './Components/Pages/ContactsPage/ContactsPage'
import DocsPage from './Components/Pages/DocsPage/DocsPage'
import EventsAnnouncementPage from './Components/Pages/EventsAnnouncementPage/EventsAnnouncementPage'
import EventsDetail from './Components/Pages/EventsDetail/EventsDetail'
import MainPage from './Components/Pages/MainPage/MainPage'
import NewsDetail from './Components/Pages/NewsDetail/NewsDetail'
import NewsPage from './Components/Pages/NewsPage/NewsPage'
import NotFoundPage from './Components/Pages/NotFoundPage/NotFoundPage'
import ProjectDetail from './Components/Pages/ProjectDetail/ProjectDetail'
import ProjectsPage from './Components/Pages/ProjectsPage/ProjectsPage'
import VIsitDetail from './Components/Pages/VIsitDetail/VIsitDetail'
import Layout from './Components/Standart/Layout/Layout'

function App() {
	return (
		<>
			<Routes>
				<Route index element={<MainPage />} />
				<Route path='/' element={<Layout />}>
					<Route path='/places-to-visit/:id' element={<VIsitDetail />} />
					<Route path='/news' element={<NewsPage />} />
					<Route path='/news/:id' element={<NewsDetail />} />
					<Route path='/about-us' element={<AboutUsPage />} />
					<Route path='/documents' element={<DocsPage />} />
					<Route path='/our-projects' element={<ProjectsPage />} />
					<Route path='/our-projects/:id' element={<ProjectDetail />} />
					<Route
						path='/events-announcement'
						element={<EventsAnnouncementPage />}
					/>
					<Route path='/events-announcement/:id' element={<EventsDetail />} />
					<Route path='/business-support' element={<BusinessSupportPage />} />
					<Route path='/business-support/:id' element={<BSDetail />} />
					<Route path='/contact' element={<ContactsPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
				<Route path='/admin/*' element={<AdminPage />} />
			</Routes>
		</>
	)
}

export default App
