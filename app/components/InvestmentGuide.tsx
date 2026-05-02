import React from 'react';

const InvestmentGuide: React.FC = () => {
  return (
    <div className="card p-6 sm:p-8 animate-fade-in">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 tracking-tight">
        Gold & Silver Investment Guide for Nepal
      </h2>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h3 className="text-base font-semibold text-gray-900 mb-2">Why Invest in Gold and Silver?</h3>
          <p className="leading-relaxed text-sm mb-4">
            Gold and silver have been trusted stores of wealth for centuries. The <strong className="font-medium text-gray-900">value of gold in nepal</strong> is deeply tied to cultural traditions and economic stability. By tracking the <strong className="font-medium text-gray-900">gold and silver exchange rate</strong>, investors can use precious metals as a reliable hedge against inflation.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong>Inflation Hedge:</strong> Gold and silver typically maintain value over time</li>
            <li><strong>Liquidity:</strong> It is easy to buy and sell within the established <strong className="font-medium text-gray-900">nepal gold market</strong></li>
            <li><strong>Tangible Asset:</strong> Physical ownership of bullion provides security</li>
            <li><strong>Cultural Significance:</strong> Deep-rooted tradition in Nepali culture for weddings and festivals</li>
            <li><strong>Portfolio Diversification:</strong> Reduces overall investment risk in the local economy</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 mb-3">Understanding Gold Types in Nepal</h3>
          <div className="space-y-3">
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
              <h4 className="font-medium text-orange-800 mb-1">Fine Gold (Chapawal)</h4>
              <p className="text-sm text-orange-700">
                99.9% pure gold used for investment and trading. Price is tracked per tola (11.664 grams).
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-1">Tejabi Gold</h4>
              <p className="text-sm text-gray-600">
                Jewelry-grade gold (~92% purity) used for ornaments. Includes making charges.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 mb-3">Getting Started</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">1</div>
              <div>
                <h4 className="font-medium text-gray-900">Set Your Budget</h4>
                <p className="text-sm text-gray-500">Start small if you're new to precious metals.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">2</div>
              <div>
                <h4 className="font-medium text-gray-900">Choose Your Form</h4>
                <p className="text-sm text-gray-500">Coins, bars, or jewelry.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">3</div>
              <div>
                <h4 className="font-medium text-gray-900">Find a Reputable Dealer</h4>
                <p className="text-sm text-gray-500">Purchase from FENEGOSIDA-affiliated dealers.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">4</div>
              <div>
                <h4 className="font-medium text-gray-900">Verify Purity</h4>
                <p className="text-sm text-gray-500">Ensure proper certification.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">5</div>
              <div>
                <h4 className="font-medium text-gray-900">Secure Storage</h4>
                <p className="text-sm text-gray-500">Use bank lockers or home safes.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-base font-semibold text-gray-900 mb-2">Disclaimer</h3>
          <p className="leading-relaxed text-xs bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-500">
            This guide is for educational purposes only. Always conduct your own research and consider consulting with a qualified financial advisor before making investment decisions.
          </p>
        </section>
      </div>
    </div>
  );
};

export default InvestmentGuide;