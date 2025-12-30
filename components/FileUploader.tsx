'use client'

import { useCallback, useState } from 'react'

interface FileUploaderProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
}

export default function FileUploader({ onFileSelect, disabled }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) setIsDragging(true)
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const validateAndHandleFile = useCallback((file: File) => {
    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
    
    if (!validImageTypes.includes(file.type) && !validVideoTypes.includes(file.type)) {
      alert('Please upload a valid image (JPEG, PNG, WebP, GIF) or video (MP4, WebM, OGG, MOV) file.')
      return
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      alert('File size must be less than 50MB.')
      return
    }

    onFileSelect(file)
  }, [onFileSelect])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (disabled) return

    const file = e.dataTransfer.files[0]
    if (file) {
      validateAndHandleFile(file)
    }
  }, [disabled, validateAndHandleFile])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      validateAndHandleFile(file)
    }
  }, [validateAndHandleFile])

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-xl p-12 text-center transition-all
        ${isDragging 
          ? 'border-primary bg-theme-light' 
          : 'border-theme-muted hover:border-theme-medium'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <input
        type="file"
        id="file-upload"
        accept="image/*,video/*"
        onChange={handleFileInput}
        disabled={disabled}
        className="hidden"
      />
      <label
        htmlFor="file-upload"
        className={`cursor-pointer ${disabled ? 'pointer-events-none' : ''}`}
      >
        <svg
          className="mx-auto h-16 w-16 text-theme-medium mb-4"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-xl font-semibold text-primary mb-2">
          {isDragging ? 'Drop your file here' : 'Drag and drop your file here'}
        </p>
        <p className="text-base text-theme-medium mb-4 font-medium">
          or <span className="text-primary underline cursor-pointer">click to browse</span>
        </p>
        <p className="text-sm text-theme-muted">
          Supported formats: JPEG, PNG, WebP, GIF, MP4, WebM, OGG, MOV • Maximum size: 50MB
        </p>
      </label>
    </div>
  )
}

