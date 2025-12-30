'use client'

import { DetectionResult } from '@/app/page'

interface ResultsDisplayProps {
  result: DetectionResult
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  // Use theme colors for confidence display
  const confidenceColor = result.confidence >= 70 
    ? 'text-primary' 
    : result.confidence >= 40 
    ? 'text-theme-medium' 
    : 'text-theme-muted'

  const confidenceBg = result.confidence >= 70 
    ? 'bg-theme-light' 
    : result.confidence >= 40 
    ? 'bg-theme-light/50' 
    : 'bg-theme-light/30'

  const progressBarColor = result.confidence >= 70 
    ? 'bg-primary' 
    : result.confidence >= 40 
    ? 'bg-theme-medium' 
    : 'bg-theme-muted'

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-theme-light/50">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              Analysis Results
            </h2>
            <p className="text-theme-medium">
              File: <span className="font-mono text-sm bg-theme-light/50 px-2 py-1 rounded">{result.fileName}</span>
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-8 mb-8 border-2 ${confidenceBg} ${result.confidence >= 70 ? 'border-primary/30' : result.confidence >= 40 ? 'border-theme-medium/30' : 'border-theme-muted/30'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm font-semibold text-theme-medium mb-2 uppercase tracking-wide">
              Detection Result
            </p>
            <p className={`text-4xl font-bold ${confidenceColor} mb-2`}>
              {result.isAiGenerated ? 'AI-Generated' : 'Real Content'}
            </p>
            <p className="text-sm text-theme-muted">
              {result.isAiGenerated 
                ? 'This content shows characteristics consistent with AI generation'
                : 'This content appears to be authentic and human-created'}
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-sm font-semibold text-theme-medium mb-2 uppercase tracking-wide">
              Confidence Level
            </p>
            <p className={`text-4xl font-bold ${confidenceColor} mb-2`}>
              {result.confidence}%
            </p>
            <p className="text-sm text-theme-muted">
              {result.confidence >= 70 
                ? 'High confidence detection'
                : result.confidence >= 40 
                ? 'Moderate confidence'
                : 'Lower confidence - requires review'}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-theme-medium font-medium">
            <span>Confidence Score</span>
            <span>{result.confidence}%</span>
          </div>
          <div className="w-full bg-theme-light rounded-full h-4 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressBarColor}`}
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center mb-6">
          <h3 className="text-2xl font-semibold text-primary">
            Analysis Reasoning
          </h3>
          <div className="ml-4 flex-1 h-px bg-theme-light"></div>
          <span className="ml-4 text-sm text-theme-muted">{result.reasoning.length} factors analyzed</span>
        </div>
        <ul className="space-y-4">
          {result.reasoning.map((reason, index) => (
            <li
              key={index}
              className="flex items-start p-5 bg-theme-light/30 rounded-lg border border-theme-light/50 hover:bg-theme-light/40 transition-colors"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">{index + 1}</span>
                </div>
              </div>
              <p className="text-theme-medium leading-relaxed pt-1">{reason}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

