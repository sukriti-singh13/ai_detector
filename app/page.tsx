'use client'

import { useState } from 'react'
import FileUploader from '@/components/FileUploader'
import ResultsDisplay from '@/components/ResultsDisplay'
import CredibilityBadge from '@/components/CredibilityBadge'

export interface DetectionResult {
  isAiGenerated: boolean
  confidence: number
  reasoning: string[]
  fileName: string
  fileType: 'image' | 'video'
}

export default function Home() {
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (file: File) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/detect', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze file')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-theme-light/20 to-white">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
              Advanced AI Detection Technology
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            AI Content Detector
          </h1>
          <p className="text-xl md:text-2xl text-theme-medium max-w-3xl mx-auto leading-relaxed mb-4">
            Professional-grade analysis to identify AI-generated images and videos with high accuracy
          </p>
          <p className="text-theme-muted max-w-2xl mx-auto">
            Utilizing advanced multi-factor analysis including pattern recognition, metadata examination, and texture analysis
          </p>
        </div>

        {/* Credibility Badge */}
        <CredibilityBadge />

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8 border border-theme-light/50">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-primary mb-2">Upload Content for Analysis</h2>
            <p className="text-theme-medium">Supported formats: JPEG, PNG, WebP, GIF, MP4, WebM, OGG, MOV (Max 50MB)</p>
          </div>
          <FileUploader onFileSelect={handleFileUpload} disabled={loading} />
          
          {loading && (
            <div className="mt-8 text-center py-8">
              <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-theme-light border-t-primary mb-4"></div>
              <p className="text-theme-medium font-medium">
                Processing your file...
              </p>
              <p className="text-sm text-theme-muted mt-2">
                Our analysis engine is examining your content
              </p>
            </div>
          )}

          {error && (
            <div className="mt-8 p-5 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-red-800 font-semibold mb-1">Analysis Error</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && <ResultsDisplay result={result} />}

        {/* How It Works Section */}
        {!result && !loading && (
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-theme-light/50">
            <h2 className="text-2xl font-semibold text-primary mb-8 text-center">How Our Detection Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Pattern Analysis</h3>
                <p className="text-theme-medium text-sm leading-relaxed">
                  Examines noise patterns, symmetry, and texture characteristics that distinguish AI-generated content
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Metadata Examination</h3>
                <p className="text-theme-medium text-sm leading-relaxed">
                  Analyzes EXIF data and file metadata to identify inconsistencies typical of generated content
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Confidence Scoring</h3>
                <p className="text-theme-medium text-sm leading-relaxed">
                  Provides detailed confidence metrics with comprehensive reasoning for each detection result
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

