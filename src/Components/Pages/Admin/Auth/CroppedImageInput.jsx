import React, { useRef, useState } from 'react'
import { ImageInput } from 'react-admin'
import { useFormContext } from 'react-hook-form'

import ImageCropDialog from './ImageCropDialog'

const toFile = item => {
	if (item instanceof File) return item
	if (item && item.rawFile instanceof File) return item.rawFile
	return null
}

/**
 * ImageInput с шагом обрезки: новые файлы по очереди проходят через диалог.
 * Пропсы и children — как у ImageInput.
 */
const CroppedImageInput = ({ source, children, onChange, ...rest }) => {
	const { getValues, setValue } = useFormContext()
	const [batch, setBatch] = useState({ queue: [], total: 0 })
	const [aspectKey, setAspectKey] = useState('cover')
	// File'ы, которые уже прошли (или сознательно миновали) диалог
	const seenRef = useRef(new WeakSet())

	const current = batch.queue[0]

	const shift = () =>
		setBatch(prev => {
			const queue = prev.queue.slice(1)
			return { queue, total: queue.length ? prev.total : 0 }
		})

	// react-admin зовёт onChange значением ДО parse: массив, где старые
	// элементы уже в форме { rawFile, src, title }, а новые — голые File
	const handleChange = (...args) => {
		const value = args[0]
		const list = Array.isArray(value) ? value : value ? [value] : []
		const fresh = []
		list.forEach(item => {
			const file = toFile(item)
			if (!file || seenRef.current.has(file)) return
			seenRef.current.add(file)
			// GIF не режем: canvas потерял бы анимацию
			if (file.type === 'image/gif') return
			if (!file.type.startsWith('image/')) return
			fresh.push(file)
		})
		if (fresh.length) {
			setBatch(prev => ({
				queue: [...prev.queue, ...fresh],
				total: prev.total + fresh.length
			}))
		}
		if (onChange) onChange(...args)
	}

	// Значение формы держим в том же виде, что строит FileInput.transformFile:
	// handleSave* в JS/fileUploadUtils.js читают именно f.rawFile
	const replaceInForm = (original, next) => {
		const currentValue = getValues(source)
		const isTarget = item => item === original || toFile(item) === original
		const wrap = () => ({
			rawFile: next,
			src: URL.createObjectURL(next),
			title: next.name
		})
		let result
		if (Array.isArray(currentValue)) {
			result = currentValue.reduce((acc, item) => {
				if (!isTarget(item)) acc.push(item)
				else if (next) acc.push(wrap())
				return acc
			}, [])
		} else if (isTarget(currentValue)) {
			result = next ? wrap() : null
		} else {
			result = currentValue
		}
		setValue(source, result, { shouldDirty: true, shouldTouch: true })
	}

	const handleApply = (croppedFile, nextAspectKey) => {
		setAspectKey(nextAspectKey)
		seenRef.current.add(croppedFile)
		replaceInForm(current, croppedFile)
		shift()
	}

	const handleSkip = nextAspectKey => {
		setAspectKey(nextAspectKey)
		shift()
	}

	const handleCancel = () => {
		replaceInForm(current, null)
		shift()
	}

	return (
		<>
			<ImageInput {...rest} source={source} onChange={handleChange}>
				{children}
			</ImageInput>
			<ImageCropDialog
				open={Boolean(current)}
				file={current}
				index={batch.total - batch.queue.length}
				total={batch.total}
				initialAspectKey={aspectKey}
				onApply={handleApply}
				onSkip={handleSkip}
				onCancel={handleCancel}
			/>
		</>
	)
}

export default CroppedImageInput
