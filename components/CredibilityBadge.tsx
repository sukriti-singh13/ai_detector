export default function CredibilityBadge() {
  return (
    <div className="bg-gradient-to-r from-theme-light/50 to-white rounded-xl p-6 border border-theme-light mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center md:text-left">
          <div className="text-3xl font-bold text-primary mb-1">Multi-Factor</div>
          <div className="text-sm text-theme-medium">Analysis Engine</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-3xl font-bold text-primary mb-1">High Accuracy</div>
          <div className="text-sm text-theme-medium">Detection Algorithm</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-3xl font-bold text-primary mb-1">Secure</div>
          <div className="text-sm text-theme-medium">Privacy-First Processing</div>
        </div>
      </div>
    </div>
  )
}

