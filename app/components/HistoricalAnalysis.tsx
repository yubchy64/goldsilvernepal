import React from 'react';

const HistoricalAnalysis: React.FC = () => {
  return (
    <div className="card p-6 sm:p-8 animate-fade-in">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 tracking-tight">
        Historical Price Analysis
      </h2>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h3 className="text-base font-semibold text-gray-900 mb-2">Nepalese Gold Rate Trends</h3>
          <p className="leading-relaxed text-sm mb-3">
            Looking at a historical <strong className="font-medium text-gray-900">gold price in nepal chart</strong>, the <strong className="font-medium text-gray-900">nepalese gold rate</strong> has shown significant volatility. These changes are deeply influenced by international market trends, currency fluctuations, and local economic factors.
          </p>
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-3.5">
            <h4 className="font-medium text-orange-800 mb-2 text-sm">Key Insights</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm text-orange-700">
              <li>Gold prices rise during festival seasons (Dashain, Tihar)</li>
              <li>Wedding season (November to February) drives prices higher</li>
              <li>USD to NPR exchange rate is a major factor</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 mb-2">Silver Price Patterns</h3>
          <p className="leading-relaxed text-sm mb-3">
            Silver prices follow similar patterns to gold but with higher volatility.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5">
            <h4 className="font-medium text-gray-800 mb-2 text-sm">Market Characteristics</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
              <li>Higher volatility compared to gold</li>
              <li>Industrial demand affects prices</li>
              <li>Often follows gold trends with a lag</li>
              <li>Popular among small investors</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 mb-3">Seasonal Patterns</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-green-50 border border-green-100 rounded-lg p-3.5">
              <h4 className="font-medium text-green-800 mb-2 text-sm">High Demand</h4>
              <ul className="list-disc pl-4 space-y-1 text-sm text-green-700">
                <li>Dashain (Sep-Oct)</li>
                <li>Tihar (Oct-Nov)</li>
                <li>Wedding Season</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5">
              <h4 className="font-medium text-gray-700 mb-2 text-sm">Lower Demand</h4>
              <ul className="list-disc pl-4 space-y-1 text-sm text-gray-500">
                <li>Summer months</li>
                <li>Post-festival period</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 mb-2">Investment Considerations</h3>
          <p className="leading-relaxed text-xs text-gray-400">
            While historical trends provide insights, they don't guarantee future performance. Consider consulting with financial advisors.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HistoricalAnalysis;