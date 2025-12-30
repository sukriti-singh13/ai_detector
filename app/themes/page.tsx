'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ColorScheme {
  name: string
  primary: string
  medium: string
  light: string
  muted: string
  description: string
}

const colorSchemes: ColorScheme[] = [
  {
    name: 'Ocean Teal (Current)',
    primary: '#0B2E33',
    medium: '#4F7C82',
    light: '#B8E3E9',
    muted: '#93B1B5',
    description: 'Deep teal with light cyan accents - calm and professional'
  },
  {
    name: 'Forest Green',
    primary: '#1B4332',
    medium: '#40916C',
    light: '#B7E4C7',
    muted: '#74C69D',
    description: 'Natural greens - fresh and trustworthy'
  },
  {
    name: 'Royal Blue',
    primary: '#0D1B2A',
    medium: '#415A77',
    light: '#E0E1DD',
    muted: '#778DA9',
    description: 'Deep blues - professional and modern'
  },
  {
    name: 'Warm Purple',
    primary: '#2D1B69',
    medium: '#6C5CE7',
    light: '#E8E4F0',
    muted: '#A29BFE',
    description: 'Rich purples - creative and innovative'
  },
  {
    name: 'Sunset Orange',
    primary: '#5C2E05',
    medium: '#E17055',
    light: '#FDCB6E',
    muted: '#FFB142',
    description: 'Warm oranges - energetic and friendly'
  },
  {
    name: 'Slate Gray',
    primary: '#1A1A1A',
    medium: '#4A5568',
    light: '#E2E8F0',
    muted: '#718096',
    description: 'Neutral grays - clean and minimalist'
  },
  {
    name: 'Crimson Red',
    primary: '#5C0E0E',
    medium: '#C92A2A',
    light: '#FFE5E5',
    muted: '#FF8787',
    description: 'Bold reds - confident and attention-grabbing'
  },
  {
    name: 'Ocean Blue',
    primary: '#0A2647',
    medium: '#144272',
    light: '#B4D4FF',
    muted: '#5B8FB8',
    description: 'Ocean blues - calm and dependable'
  },
  {
    name: 'Emerald',
    primary: '#064E3B',
    medium: '#059669',
    light: '#D1FAE5',
    muted: '#34D399',
    description: 'Vibrant greens - growth and success'
  },
  {
    name: 'Amber',
    primary: '#78350F',
    medium: '#D97706',
    light: '#FEF3C7',
    muted: '#FBBF24',
    description: 'Golden amber - warm and inviting'
  }
]

export default function ThemesPage() {
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(colorSchemes[0])
  const [previewMode, setPreviewMode] = useState(false)

  const applyScheme = (scheme: ColorScheme) => {
    setSelectedScheme(scheme)
    if (previewMode) {
      // Apply CSS variables for preview
      document.documentElement.style.setProperty('--preview-primary', scheme.primary)
      document.documentElement.style.setProperty('--preview-medium', scheme.medium)
      document.documentElement.style.setProperty('--preview-light', scheme.light)
      document.documentElement.style.setProperty('--preview-muted', scheme.muted)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="text-theme-medium hover:text-primary mb-4 inline-block">
            ← Back to Detector
          </Link>
          <h1 className="text-4xl font-bold text-primary mb-4">
            Color Scheme Options
          </h1>
          <p className="text-theme-medium text-lg">
            Explore different color combinations for your AI Detector
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {colorSchemes.map((scheme, index) => (
            <div
              key={index}
              onClick={() => applyScheme(scheme)}
              className={`
                bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all
                border-2 ${selectedScheme.name === scheme.name 
                  ? 'border-primary ring-2 ring-theme-light' 
                  : 'border-gray-200 hover:border-theme-medium'
                }
              `}
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2" style={{ color: scheme.primary }}>
                  {scheme.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {scheme.description}
                </p>
              </div>

              {/* Color Swatches */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-12 h-12 rounded-lg border border-gray-200"
                    style={{ backgroundColor: scheme.primary }}
                  />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-700">Primary</p>
                    <p className="text-xs text-gray-500 font-mono">{scheme.primary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-12 h-12 rounded-lg border border-gray-200"
                    style={{ backgroundColor: scheme.medium }}
                  />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-700">Medium</p>
                    <p className="text-xs text-gray-500 font-mono">{scheme.medium}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-12 h-12 rounded-lg border border-gray-200"
                    style={{ backgroundColor: scheme.light }}
                  />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-700">Light</p>
                    <p className="text-xs text-gray-500 font-mono">{scheme.light}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-12 h-12 rounded-lg border border-gray-200"
                    style={{ backgroundColor: scheme.muted }}
                  />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-700">Muted</p>
                    <p className="text-xs text-gray-500 font-mono">{scheme.muted}</p>
                  </div>
                </div>
              </div>

              {/* Preview Card */}
              <div 
                className="rounded-lg p-4 border"
                style={{ 
                  backgroundColor: scheme.light,
                  borderColor: scheme.medium 
                }}
              >
                <div className="space-y-2">
                  <div 
                    className="h-3 rounded-full"
                    style={{ 
                      backgroundColor: scheme.primary,
                      width: '75%'
                    }}
                  />
                  <p 
                    className="text-sm font-semibold"
                    style={{ color: scheme.primary }}
                  >
                    Sample Text
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: scheme.medium }}
                  >
                    Secondary text example
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Scheme Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-theme-light">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Selected: {selectedScheme.name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Color Values */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Color Values</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-theme-light/30">
                  <span className="font-medium text-theme-medium">Primary</span>
                  <code className="text-sm font-mono text-primary bg-white px-2 py-1 rounded">
                    {selectedScheme.primary}
                  </code>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-theme-light/30">
                  <span className="font-medium text-theme-medium">Medium</span>
                  <code className="text-sm font-mono text-primary bg-white px-2 py-1 rounded">
                    {selectedScheme.medium}
                  </code>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-theme-light/30">
                  <span className="font-medium text-theme-medium">Light</span>
                  <code className="text-sm font-mono text-primary bg-white px-2 py-1 rounded">
                    {selectedScheme.light}
                  </code>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-theme-light/30">
                  <span className="font-medium text-theme-medium">Muted</span>
                  <code className="text-sm font-mono text-primary bg-white px-2 py-1 rounded">
                    {selectedScheme.muted}
                  </code>
                </div>
              </div>
            </div>

            {/* Tailwind Config */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Tailwind Config</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`colors: {
  primary: {
    DEFAULT: '${selectedScheme.primary}',
  },
  theme: {
    medium: '${selectedScheme.medium}',
    light: '${selectedScheme.light}',
    muted: '${selectedScheme.muted}',
  },
}`}
              </pre>
            </div>
          </div>

          {/* Live Preview */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Live Preview</h3>
            <div 
              className="rounded-xl p-6 border-2"
              style={{
                background: `linear-gradient(to bottom right, ${selectedScheme.light}, white)`,
                borderColor: selectedScheme.muted
              }}
            >
              <h4 
                className="text-2xl font-bold mb-2"
                style={{ color: selectedScheme.primary }}
              >
                AI Content Detector
              </h4>
              <p 
                className="mb-4"
                style={{ color: selectedScheme.medium }}
              >
                Preview of how the selected color scheme looks
              </p>
              
              <div 
                className="rounded-lg p-4 mb-4 border"
                style={{
                  backgroundColor: selectedScheme.light,
                  borderColor: selectedScheme.muted
                }}
              >
                <p 
                  className="text-sm font-semibold mb-2"
                  style={{ color: selectedScheme.primary }}
                >
                  Detection Result: AI-Generated
                </p>
                <div className="mb-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{
                      backgroundColor: selectedScheme.muted,
                      width: '100%'
                    }}
                  >
                    <div 
                      className="h-2 rounded-full"
                      style={{
                        backgroundColor: selectedScheme.primary,
                        width: '75%'
                      }}
                    />
                  </div>
                </div>
                <p 
                  className="text-xs"
                  style={{ color: selectedScheme.medium }}
                >
                  Confidence: 75%
                </p>
              </div>

              <div 
                className="rounded-lg p-3 border"
                style={{
                  backgroundColor: selectedScheme.light + '40',
                  borderColor: selectedScheme.muted
                }}
              >
                <p 
                  className="text-xs"
                  style={{ color: selectedScheme.medium }}
                >
                  Analysis reasoning would appear here...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

