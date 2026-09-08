import { useRef, useState } from 'react'

import styles from './VideoPlayer.module.css'

const fmt = sec => {
	if (!Number.isFinite(sec) || sec < 0) return '0:00'
	const minutes = Math.floor(sec / 60)
	const seconds = Math.floor(sec % 60)
	return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function VideoPlayer({ src, className = '' }) {
	const wrapperRef = useRef(null)
	const videoRef = useRef(null)
	// ролики часто начинаются с проявления из чёрного, поэтому первый кадр не
	// годится на стоп-кадр: ищем ближайший достаточно светлый (см. checkPoster)
	const scanRef = useRef(true)
	const canvasRef = useRef(null)
	const [playing, setPlaying] = useState(false)
	const [started, setStarted] = useState(false)
	const [muted, setMuted] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)

	const toggle = () => {
		const video = videoRef.current
		if (!video) return
		if (video.paused) {
			scanRef.current = false
			// стоп-кадр мог остаться на 2-3 секунде — играем с начала
			if (!started) video.currentTime = 0
			video.play()
		} else video.pause()
	}

	// Браузеры (в том числе iOS Safari) держат чёрный фон, пока не декодирован
	// хотя бы один кадр, поэтому вручную сдвигаем время на 0.1с — это стоп-кадр
	const handleLoadedMetadata = () => {
		const video = videoRef.current
		if (!video) return
		setDuration(video.duration)
		setMuted(video.muted)
		if (video.currentTime < 0.1) video.currentTime = 0.1
	}

	// Оцениваем яркость текущего кадра: если он почти чёрный, шагаем вперёд
	// геометрически (1, 2, 4, 8, 16, 32с), пока не найдём нормальный кадр
	// (не дальше 60с и середины ролика)
	const checkPoster = () => {
		const video = videoRef.current
		if (!video || !scanRef.current) return

		let mean = 0
		try {
			if (!canvasRef.current) {
				const canvas = document.createElement('canvas')
				canvas.width = 32
				canvas.height = 18
				canvasRef.current = canvas
			}
			const ctx = canvasRef.current.getContext('2d')
			ctx.drawImage(video, 0, 0, 32, 18)
			const { data } = ctx.getImageData(0, 0, 32, 18)
			let sum = 0
			for (let i = 0; i < data.length; i += 4)
				sum += (data[i] + data[i + 1] + data[i + 2]) / 3
			mean = sum / (data.length / 4)
		} catch {
			scanRef.current = false
			return
		}

		if (mean >= 40) {
			scanRef.current = false
			return
		}
		// шаги 1, 2, 4, 8, 16, 32 с — не дальше 60 с и середины ролика
		const next = video.currentTime < 1 ? 1 : video.currentTime * 2
		if (next <= Math.min(60, video.duration / 2)) video.currentTime = next
		else scanRef.current = false
	}

	const seek = e => {
		const value = Number(e.target.value)
		scanRef.current = false
		setStarted(true)
		setCurrentTime(value)
		if (videoRef.current) videoRef.current.currentTime = value
	}

	const toggleMute = () => {
		const video = videoRef.current
		if (!video) return
		video.muted = !video.muted
		setMuted(video.muted)
	}

	const toggleFullscreen = () => {
		const wrapper = wrapperRef.current
		if (wrapper && wrapper.requestFullscreen) wrapper.requestFullscreen()
		else if (videoRef.current && videoRef.current.webkitEnterFullscreen)
			videoRef.current.webkitEnterFullscreen()
	}

	// пока ролик не запускали, показываем 0:00, хотя стоп-кадр взят позже
	const shownTime = started ? currentTime : 0

	return (
		<div
			ref={wrapperRef}
			className={`${styles.player} ${playing ? '' : styles.paused} ${className}`}
		>
			<video
				ref={videoRef}
				src={`${src}#t=0.1`}
				preload='metadata'
				playsInline
				crossOrigin='anonymous'
				onClick={toggle}
				onLoadedMetadata={handleLoadedMetadata}
				onLoadedData={checkPoster}
				onSeeked={checkPoster}
				onDurationChange={e => setDuration(e.currentTarget.duration)}
				onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
				onPlay={() => {
					setPlaying(true)
					setStarted(true)
					scanRef.current = false
				}}
				onPause={() => setPlaying(false)}
				onEnded={() => setPlaying(false)}
			/>

			{!playing && (
				<button
					type='button'
					className={styles.play_overlay}
					aria-label='Воспроизвести'
					onClick={toggle}
				>
					<svg viewBox='0 0 24 24' width='26' height='26' fill='#fff'>
						<path d='M8 5v14l11-7z' />
					</svg>
				</button>
			)}

			<div className={styles.controls}>
				<button
					type='button'
					className={styles.button}
					aria-label={playing ? 'Пауза' : 'Воспроизвести'}
					onClick={toggle}
				>
					{playing ? (
						<svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>
							<path d='M6 5h4v14H6zM14 5h4v14h-4z' />
						</svg>
					) : (
						<svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>
							<path d='M8 5v14l11-7z' />
						</svg>
					)}
				</button>

				<input
					type='range'
					className={styles.progress}
					min={0}
					max={duration || 0}
					step={0.1}
					value={shownTime}
					onChange={seek}
					aria-label='Перемотка'
				/>

				<span className={styles.time}>
					{fmt(shownTime)} / {fmt(duration)}
				</span>

				<button
					type='button'
					className={styles.button}
					aria-label={muted ? 'Включить звук' : 'Выключить звук'}
					onClick={toggleMute}
				>
					{muted ? (
						<svg
							viewBox='0 0 24 24'
							width='20'
							height='20'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path
								d='M4 9h3l5-4v14l-5-4H4z'
								fill='currentColor'
								stroke='none'
							/>
							<path d='M16 9.5l4 5M20 9.5l-4 5' />
						</svg>
					) : (
						<svg
							viewBox='0 0 24 24'
							width='20'
							height='20'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path
								d='M4 9h3l5-4v14l-5-4H4z'
								fill='currentColor'
								stroke='none'
							/>
							<path d='M16 8.5a4 4 0 0 1 0 7' />
						</svg>
					)}
				</button>

				<button
					type='button'
					className={styles.button}
					aria-label='Во весь экран'
					onClick={toggleFullscreen}
				>
					<svg
						viewBox='0 0 24 24'
						width='20'
						height='20'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5' />
					</svg>
				</button>
			</div>
		</div>
	)
}

export default VideoPlayer
