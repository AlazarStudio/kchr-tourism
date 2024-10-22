import { useState } from 'react'
import Stories from 'react-insta-stories'

import styles from './StoryViewer.module.css'

function StoryViewer({ stories, onClose }) {
	return (
		<div className={styles.storyViewerOverlay}>
			<div className={styles.storyViewerContainer}>
				<Stories
					stories={stories}
					defaultInterval={4000}
					width='100%'
					height='100%'
					onAllStoriesEnd={onClose}
				/>
				<button className={styles.closeButton} onClick={onClose}>
					<img src="/images/stories_exit.png" alt="" />
				</button>
			</div>
		</div>
	)
}

export default StoryViewer
