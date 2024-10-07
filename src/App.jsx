import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ContactsPage from './Components/Pages/ContactsPage/ContactsPage'
import MainPage from './Components/Pages/MainPage/MainPage'
import NotFoundPage from './Components/Pages/NotFoundPage/NotFoundPage'
import Layout from './Components/Standart/Layout/Layout'

function App() {
	return (
		<>
			<Routes>
				<Route index element={<MainPage />} />
				<Route path='/' element={<Layout />}>
					<Route path='/contact' element={<ContactsPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
