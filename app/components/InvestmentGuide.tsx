'use client';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gold & Silver Investment Guide Nepal | How to Invest in Gold Nepal',
  description: 'Learn how to invest in gold and silver in Nepal. Complete guide covers fine gold (Chapawal), 22K tejabi gold, Nepal gold market, buying gold in Kathmandu, and precious metals investment.',
  keywords: 'gold investment Nepal, silver investment Nepal, how to buy gold Nepal, invest in gold Nepal, Nepal gold market guide, buy gold Kathmandu',
};

export default function InvestmentGuide() {
  return (
    <div className="card p-6 sm:p-8 animate-fade-in">
      <h2 className="text-xl sm:text-2xl font-semibold heading-tight text-[#262626] mb-6">
        Gold & Silver Investment Guide for Nepal
      </h2>

      <div className="space-y-6 text-[#262626]">
        <section>
          <h3 className="text-base font-semibold text-[#262626] mb-2">Why Invest in Gold and Silver?</h3>
          <p className="leading-relaxed text-sm mb-4">
            Gold and silver have been trusted stores of value for centuries. In Nepal, investing in precious metals is a popular way to preserve wealth and hedge against inflation.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong>Inflation Hedge:</strong> Gold and silver typically maintain value over time</li>
            <li><strong>Liquidity:</strong> Easy to buy and sell in Nepal&apos;s established bullion market</li>
            <li><strong>Tangible Asset:</strong> Physical ownership provides security</li>
            <li><strong>Cultural Significance:</strong> Deep-rooted tradition in Nepali culture</li>
            <li><strong>Portfolio Diversification:</strong> Reduces overall investment risk</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-[#262626] mb-3">Understanding Gold Types in Nepal</h3>
          <div className="space-y-3">
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
              <h4 className="font-medium text-primary mb-1">Fine Gold (Chapawal)</h4>
              <p className="text-sm text-[#262626]">
                99.9% pure gold used for investment and trading. Price is tracked per tola (11.664 grams).
              </p>
            </div>
            <div className="bg-gray-50 border border-[#e5e7eb] rounded-lg p-4">
              <h4 className="font-medium text-[#262626] mb-1">Tejabi Gold</h4>
              <p className="text-sm text-[#262626]">
                Jewelry-grade gold (~92% purity) used for ornaments. Includes making charges.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-base font-semibold text-[#262626] mb-3">Getting Started</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-medium flex-shrink-0 shadow-sm">1</div>
              <div>
                <h4 className="font-medium text-[#262626]">Set Your Budget</h4>
                <p className="text-sm text-[#9ca3af]">Start small if you&apos;re new to precious metals.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-medium flex-shrink-0 shadow-sm">2</div>
              <div>
                <h4 className="font-medium text-[#262626]">Choose Your Form</h4>
                <p className="text-sm text-[#9ca3af]">Coins, bars, or jewelry.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-medium flex-shrink-0 shadow-sm">3</div>
              <div>
                <h4 className="font-medium text-[#262626]">Find a Reputable Dealer</h4>
                <p className="text-sm text-[#9ca3af]">Purchase from FENEGOSIDA-affiliated dealers.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-medium flex-shrink-0 shadow-sm">4</div>
              <div>
                <h4 className="font-medium text-[#262626]">Verify Purity</h4>
                <p className="text-sm text-[#9ca3af]">Ensure proper certification.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-medium flex-shrink-0 shadow-sm">5</div>
              <div>
                <h4 className="font-medium text-[#262626]">Secure Storage</h4>
                <p className="text-sm text-[#9ca3af]">Use bank lockers or home safes.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-base font-semibold text-[#262626] mb-2">Disclaimer</h3>
          <p className="leading-relaxed text-xs bg-gray-50 border border-[#e5e7eb] rounded-lg p-3 text-[#9ca3af]">
            This guide is for educational purposes only. Always conduct your own research and consider consulting with a qualified financial advisor before making investment decisions.
          </p>
        </section>
      </div>
    </div>
  );
}