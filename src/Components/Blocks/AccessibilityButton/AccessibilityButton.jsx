// AccessibilityButton.jsx
import React, { useEffect, useRef } from 'react'

import { useAccessibilityScript } from '../BVI/BVI'
import { useAccessibilityStyles } from '../BVIStyles/BVIStyles'

const AccessibilityButton = ({ srcDefault, srcScrolled, isScrolled }) => {
	const btnRef = useRef(null)

	// useEffect(() => {
	//   if (btnRef.current) {
	//     // Назначаем кнопке id, который ожидает внешний скрипт
	//     btnRef.current.id = 'specialButton';

	//     // Подключаем CSS, если его ещё нет
	//     const linkId = 'accessibility-styles';
	//     if (!document.getElementById(linkId)) {
	//       const link = document.createElement('link');
	//       link.rel = 'stylesheet';
	//       link.href = 'https://lidrekon.ru/slep/css/special.min.css';
	//       link.id = linkId;
	//       document.head.appendChild(link);
	//     }

	//     // Подключаем скрипт, если его ещё нет
	//     const scriptId = 'accessibility-script';
	//     if (!document.getElementById(scriptId)) {
	//       const script = document.createElement('script');
	//       script.src = 'https://lidrekon.ru/slep/js/uhpv-full.min.js';
	//       script.async = true;
	//       script.id = scriptId;
	//       document.body.appendChild(script);
	//     }
	//   }
	// }, []); // пустой массив зависимостей гарантирует, что эффект выполнится один раз после монтирования
	useAccessibilityStyles()
	useAccessibilityScript()

	return (
		<img
			// ref={btnRef}
			id='specialButton'
			src={isScrolled ? srcScrolled : srcDefault}
			alt='Режим для слабовидящих'
			style={{ cursor: 'pointer' }}
			onClick={() => {
				window.location.reload()
			}}
		/>
	)
}

export default AccessibilityButton
