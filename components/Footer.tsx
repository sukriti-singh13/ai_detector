export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AI Content Detector</h3>
            <p className="text-theme-light text-sm leading-relaxed">
              Advanced detection technology powered by multi-factor analysis to identify AI-generated content with high accuracy.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Technology</h3>
            <ul className="space-y-2 text-theme-light text-sm">
              <li>Multi-factor Analysis</li>
              <li>Pattern Recognition</li>
              <li>Metadata Examination</li>
              <li>Texture Analysis</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-theme-light text-sm">
              <li className="text-theme-light">
                Documentation (Coming Soon)
              </li>
              <li className="text-theme-light">
                API Access (Coming Soon)
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-theme-medium/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-theme-light">
            <p>© {new Date().getFullYear()} AI Content Detector. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <span>Made by</span>
              <a 
                href="https://www.linkedin.com/in/sukritee-singh/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white font-semibold hover:text-theme-light transition-colors underline"
              >
                Sukriti
              </a>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

