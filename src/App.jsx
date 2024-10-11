import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AboutUsPage from './Components/Pages/AboutUsPage/AboutUsPage'
import ContactsPage from './Components/Pages/ContactsPage/ContactsPage'
import EventsAnnouncementPage from './Components/Pages/EventsAnnouncementPage/EventsAnnouncementPage'
import MainPage from './Components/Pages/MainPage/MainPage'
import NewsDetail from './Components/Pages/NewsDetail/NewsDetail'
import NewsPage from './Components/Pages/NewsPage/NewsPage'
import NotFoundPage from './Components/Pages/NotFoundPage/NotFoundPage'
import ProjectsPage from './Components/Pages/ProjectsPage/ProjectsPage'
import Layout from './Components/Standart/Layout/Layout'

function App() {
	return (
		<>
			<Routes>
				<Route index element={<MainPage />} />
				<Route path='/' element={<Layout />}>
					<Route path='/news' element={<NewsPage />} />
					<Route path='/news/:id' element={<NewsDetail />} />
					<Route path='/about-us' element={<AboutUsPage />} />
					<Route path='/our-projects' element={<ProjectsPage />} />
					<Route
						path='/events-announcement'
						element={<EventsAnnouncementPage />}
					/>
					<Route path='/contact' element={<ContactsPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
