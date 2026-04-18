'use client';

export default function HistoricalAnalysis() {
  return (
    <div className="card p-6 sm:p-8 animate-fade-in">
      <h2 className="text-xl sm:text-2xl font-semibold heading-tight text-[#262626] mb-6">
        Historical Price Analysis
      </h2>

      <div className="space-y-6 text-[#262626]">
        <section>
          <h3 className="text-base font-semibold text-[#262626] mb-2">Gold Price Trends in Nepal</h3>
          <p className="leading-relaxed text-sm mb-3">
            Gold prices in Nepal have shown significant volatility, influenced by international market trends, currency fluctuations, and local economic factors.
          </p>
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-3.5">
            <h4 className="font-medium text-primary mb-2 text-sm">Key Insights</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm text-[#262626]">
              <li>Gold prices rise during festival seasons (Dashain, Tihar)</li>
              <li>Wedding season (November to February) drives prices higher</li>
              <li>USD to NPR exchange rate is a major factor</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-base font-semibold text-[#262626] mb-2">Silver Price Patterns</h3>
          <p className="leading-relaxed text-sm mb-3">
            Silver prices follow similar patterns to gold but with higher volatility.
          </p>
          <div className="bg-gray-50 border border-[#e5e7eb] rounded-lg p-3.5">
            <h4 className="font-medium text-[#262626] mb-2 text-sm">Market Characteristics</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm text-[#262626]">
              <li>Higher volatility compared to gold</li>
              <li>Industrial demand affects prices</li>
              <li>Often follows gold trends with a lag</li>
              <li>Popular among small investors</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-base font-semibold text-[#262626] mb-3">Seasonal Patterns</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 border border-[#e5e7eb] rounded-lg p-3.5">
              <h4 className="font-medium text-[#262626] mb-2 text-sm">High Demand</h4>
              <ul className="list-disc pl-4 space-y-1 text-sm text-[#262626]">
                <li>Dashain (Sep-Oct)</li>
                <li>Tihar (Oct-Nov)</li>
                <li>Wedding Season</li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-[#e5e7eb] rounded-lg p-3.5">
              <h4 className="font-medium text-[#262626] mb-2 text-sm">Lower Demand</h4>
              <ul className="list-disc pl-4 space-y-1 text-sm text-[#9ca3af]">
                <li>Summer months</li>
                <li>Post-festival period</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-base font-semibold text-[#262626] mb-2">Investment Considerations</h3>
          <p className="leading-relaxed text-xs text-[#9ca3af]">
            While historical trends provide insights, they don&apos;t guarantee future performance. Consider consulting with financial advisors.
          </p>
        </section>
      </div>
    </div>
  );
}