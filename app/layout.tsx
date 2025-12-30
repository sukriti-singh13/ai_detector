import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'AI Content Detector | Professional AI-Generated Content Analysis',
  description: 'Advanced AI content detection technology. Analyze images and videos with high accuracy using multi-factor analysis algorithms. Professional-grade detection service.',
  keywords: ['AI detection', 'deepfake detection', 'AI content analysis', 'image verification', 'video analysis'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

