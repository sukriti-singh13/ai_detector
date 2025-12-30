'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-theme-light/50 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">AI Detector</div>
            </div>
          </Link>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-xs text-theme-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

