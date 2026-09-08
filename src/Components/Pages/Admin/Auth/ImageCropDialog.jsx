import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import React, { useCallback, useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'

const CROP_AREA_HEIGHT = 400

const ASPECT_PRESETS = [
	{ key: 'cover', label: '4:5 обложка', value: 4 / 5 },
	{ key: 'square', label: '1:1', value: 1 },
	{ key: 'wide', label: '16:9', value: 16 / 9 },
	// Пропорции оригинала подставляются после загрузки картинки в Cropper
	{ key: 'original', label: 'Оригинал', value: null }
]

const loadImage = src =>
	new Promise((resolve, reject) => {
		const img = new Image()
		img.crossOrigin = 'anonymous'
		img.onload = () => resolve(img)
		img.onerror = reject
		img.src = src
	})

/**
 * Вырезает выбранную область и отдаёт её как File.
 * Всегда JPEG: бэк принимает только jpeg|jpg|png|gif|heic|heif|jfif
 * по расширению и mime, а дальше сам конвертирует в webp.
 */
export async function getCroppedImageFile(src, pixelCrop, originalName) {
	const img = await loadImage(src)
	const canvas = document.createElement('canvas')
	canvas.width = pixelCrop.width
	canvas.height = pixelCrop.height
	const ctx = canvas.getContext('2d')
	if (!ctx) throw new Error('Canvas 2d недоступен')
	ctx.drawImage(
		img,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height
	)
	const blob = await new Promise((resolve, reject) => {
		canvas.toBlob(
			result => (result ? resolve(result) : reject(new Error('toBlob failed'))),
			'image/jpeg',
			0.92
		)
	})
	const baseName = (originalName || 'image').replace(/\.[^.]+$/, '') || 'image'
	return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' })
}

const ImageCropDialog = ({
	open,
	file,
	index = 0,
	total = 1,
	initialAspectKey = 'cover',
	onApply,
	onSkip,
	onCancel
}) => {
	const [src, setSrc] = useState(null)
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
	const [aspectKey, setAspectKey] = useState(initialAspectKey)
	const [naturalAspect, setNaturalAspect] = useState(1)
	const [busy, setBusy] = useState(false)

	// Новый файл — новый objectURL и сброс всех настроек кадра
	useEffect(() => {
		if (!file) {
			setSrc(null)
			return undefined
		}
		const url = URL.createObjectURL(file)
		setSrc(url)
		setCrop({ x: 0, y: 0 })
		setZoom(1)
		setCroppedAreaPixels(null)
		setNaturalAspect(1)
		setAspectKey(initialAspectKey)
		return () => URL.revokeObjectURL(url)
	}, [file, initialAspectKey])

	const handleCropComplete = useCallback((_area, areaPixels) => {
		setCroppedAreaPixels(areaPixels)
	}, [])

	const handleMediaLoaded = useCallback(mediaSize => {
		if (mediaSize?.naturalWidth && mediaSize?.naturalHeight) {
			setNaturalAspect(mediaSize.naturalWidth / mediaSize.naturalHeight)
		}
	}, [])

	const handleAspectChange = (_event, next) => {
		if (!next) return
		setAspectKey(next)
		setCrop({ x: 0, y: 0 })
		setZoom(1)
	}

	const handleApply = async () => {
		if (!src || !croppedAreaPixels) {
			onSkip?.(aspectKey)
			return
		}
		setBusy(true)
		try {
			const cropped = await getCroppedImageFile(
				src,
				croppedAreaPixels,
				file.name
			)
			onApply?.(cropped, aspectKey)
		} catch (error) {
			// Картинку не удалось отрисовать (например HEIC) — оставляем оригинал
			console.error('Ошибка обрезки:', error)
			onSkip?.(aspectKey)
		} finally {
			setBusy(false)
		}
	}

	const preset = ASPECT_PRESETS.find(item => item.key === aspectKey)
	const aspect = preset?.value ?? naturalAspect

	return (
		<Dialog open={open} onClose={onCancel} maxWidth='sm' fullWidth>
			<DialogTitle
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					pr: 1
				}}
			>
				<span>
					Обрезка изображения
					{total > 1 ? ` — ${index + 1} из ${total}` : ''}
				</span>
				<IconButton onClick={onCancel} aria-label='Закрыть' size='small'>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<Typography variant='body2' color='text.secondary' sx={{ mb: 1.5 }}>
					Выберите нужную область изображения. Затем нажмите «Применить».
				</Typography>
				<ToggleButtonGroup
					exclusive
					size='small'
					value={aspectKey}
					onChange={handleAspectChange}
					sx={{ mb: 1.5 }}
				>
					{ASPECT_PRESETS.map(item => (
						<ToggleButton key={item.key} value={item.key}>
							{item.label}
						</ToggleButton>
					))}
				</ToggleButtonGroup>
				<div
					style={{
						position: 'relative',
						width: '100%',
						height: CROP_AREA_HEIGHT,
						background: '#f1f5f9',
						borderRadius: 8,
						overflow: 'hidden'
					}}
				>
					{src && (
						<Cropper
							image={src}
							crop={crop}
							zoom={zoom}
							aspect={aspect}
							objectFit='contain'
							onCropChange={setCrop}
							onZoomChange={setZoom}
							onCropComplete={handleCropComplete}
							onMediaLoaded={handleMediaLoaded}
						/>
					)}
				</div>
				<Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
					Масштаб
				</Typography>
				<Slider
					min={1}
					max={3}
					step={0.1}
					value={zoom}
					onChange={(_event, next) => setZoom(next)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel}>Отмена</Button>
				<Button variant='outlined' onClick={() => onSkip?.(aspectKey)}>
					Без обрезки
				</Button>
				<Button variant='contained' onClick={handleApply} disabled={busy}>
					Применить
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ImageCropDialog
