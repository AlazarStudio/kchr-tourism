import React from 'react'
import { Outlet } from 'react-router-dom'

import { useAccessibilityScript } from '../../Blocks/BVI/BVI'
import { useAccessibilityStyles } from '../../Blocks/BVIStyles/BVIStyles'
import Footer from '../../Blocks/Footer/Footer'
import Header from '../../Blocks/Header/Header'

function Empty({ children, ...props }) {
    // useAccessibilityStyles()
    // useAccessibilityScript()
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}

export default Empty
