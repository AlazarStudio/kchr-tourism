import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Contacts from './Components/Pages/Contacts/Contacts'
import MainPage from './Components/Pages/MainPage/MainPage'
import NotFoundPage from './Components/Pages/NotFoundPage/NotFoundPage'
import Layout from './Components/Standart/Layout/Layout'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<MainPage />} />
					<Route path='/contacts' element={<Contacts />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
