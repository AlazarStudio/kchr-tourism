import CenterBlock from '../../Standart/CenterBlock/CenterBlock'
import WidthBlock from '../../Standart/WidthBlock/WidthBlock'

import styles from './Contacts.module.css'

function Contacts({ children, ...props }) {
	return (
		<main>
			<CenterBlock>
				<WidthBlock>Contacts</WidthBlock>
			</CenterBlock>
		</main>
	)
}

export default Contacts
