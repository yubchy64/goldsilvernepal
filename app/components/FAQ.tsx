'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gold & Silver Price FAQ Nepal | Gold Rate Questions',
  description: 'Frequently asked questions about gold price Nepal, silver rate in Nepal, 24K gold price, gold per tola rate, and Nepal bullion market. Get answers to common gold and silver price questions.',
  keywords: 'gold price FAQ Nepal, silver rate FAQ Nepal, gold rate questions, Nepal gold FAQ, gold price answers, silver price questions Nepal',
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the current gold price in Nepal?",
      answer: "Gold prices in Nepal fluctuate daily based on international market rates and local factors. Our tracker shows real-time Fine Gold (Chapawal) prices per tola, which is the standard unit for precious metals in Nepal."
    },
    {
      question: "How often are the prices updated?",
      answer: "Our prices are updated daily to match the official rates set by the Nepal Gold and Silver Dealers' Association (FENEGOSIDA). You can refresh the page anytime to check for the latest rates."
    },
    {
      question: "What is the difference between Fine Gold and Tejabi Gold?",
      answer: "Fine Gold (Chapawal) is 99.9% pure gold used for investment and trading. Tejabi Gold is jewelry-grade gold (around 92% purity) that includes making charges and is used for ornaments."
    },
    {
      question: "What is a Tola?",
      answer: "A Tola is a traditional South Asian unit of mass equal to approximately 11.664 grams. It's the standard unit for measuring gold and silver in Nepal."
    },
    {
      question: "Are these prices accurate for making purchases?",
      answer: "While we update our rates daily to match market standards (FENEGOSIDA), please verify with your local jeweler before making transactions as prices may vary slightly between dealers."
    },
    {
      question: "Why do gold prices change daily?",
      answer: "Gold prices in Nepal are influenced by international gold market rates, currency exchange rates (USD to NPR), import duties, and local demand. These factors cause daily fluctuations."
    },
    {
      question: "Can I use this data for investment decisions?",
      answer: "Our tracker provides valuable historical data and current rates to help you track market trends. However, for investment decisions, we recommend consulting with a financial advisor and considering multiple factors."
    },
    {
      question: "What is the silver price per tola in Nepal?",
      answer: "Silver prices are also tracked on our platform and follow similar market dynamics as gold. The current silver price per tola is displayed on our main page alongside gold prices."
    },
    {
      question: "What is today's gold rate in Nepal?",
      answer: "Today's gold rate in Nepal is updated daily based on FENEGOSIDA rates. Check our main page for the current gold price per tola for 24K (99.9% pure) gold in Nepal."
    },
    {
      question: "What is the 24K gold price in Nepal today?",
      answer: "24K gold price in Nepal (also known as Chapawal or Fine Gold) is 99.9% pure gold. Today's 24K gold price per tola is displayed on our price tracker."
    },
    {
      question: "How much is gold per gram in Nepal?",
      answer: "Gold price per gram in Nepal is calculated from the per tola rate. Since 1 tola equals 11.664 grams, simply divide the per tola price by 11.664 to get the per gram rate."
    },
    {
      question: "What is the Nepal gold market rate today?",
      answer: "The Nepal gold market rate is set by FENEGOSIDA (Federation of Nepal Gold and Silver Dealers' Association). Our tracker displays the latest gold market rate in Kathmandu and across Nepal."
    },
    {
      question: "What is silver rate in Nepal today?",
      answer: "Silver rate in Nepal today varies based on international silver prices and exchange rates. Check our tracker for current silver price per tola in Nepal."
    },
    {
      question: "Where can I check gold price in Kathmandu today?",
      answer: "You can check gold price in Kathmandu today on our live tracker. We update prices daily to reflect the current Kathmandu gold market rates."
    },
    {
      question: "What is the price of gold in Nepal per tola?",
      answer: "Gold price in Nepal per tola is the standard measurement. One tola equals 11.664 grams. Our tracker shows current gold price per tola updated daily."
    },
    {
      question: "How much is 1 tola gold price in Nepal?",
      answer: "1 tola gold price in Nepal is approximately 11.664 grams. The current price is shown on our main page and updates daily according to FENEGOSIDA rates."
    },
    {
      question: "What is fine gold (Chapawal) price in Nepal?",
      answer: "Fine Gold, also known as Chapawal in Nepal, is 99.9% pure gold. It's the standard investment-grade gold and is tracked per tola in Nepal."
    },
    {
      question: "How do I calculate gold price per gram in Nepal?",
      answer: "To calculate gold price per gram in Nepal, divide the per tola price by 11.664 (since 1 tola = 11.664 grams). Use our price calculator tool for instant conversions."
    },
    {
      question: "What is the gold and silver price in Nepal today?",
      answer: "Gold and silver price in Nepal today are both displayed on our tracker. Gold and silver prices update daily based on FENEGOSIDA rates."
    },
    {
      question: "Is silver price in Nepal per tola today available?",
      answer: "Yes, silver price in Nepal per tola is available on our tracker. We display both gold and silver prices updated daily."
    }
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="card p-6 sm:p-8 animate-fade-in">
        <h2 className="text-xl sm:text-2xl font-semibold heading-tight text-[#262626] mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`
                border border-[#e5e7eb] rounded-lg overflow-hidden
                ${openIndex === index ? 'bg-gray-50/50' : 'bg-white'}
              `}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-[#262626] pr-4">
                  {faq.question}
                </span>
                <span
                  className={`
                    w-6 h-6 flex items-center justify-center rounded-lg text-[#9ca3af] transition-all
                    ${openIndex === index ? 'bg-primary text-white shadow-sm' : 'bg-gray-100'}
                  `}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-3 h-3 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>

              <div
                className={`
                  overflow-hidden transition-all duration-200
                  ${openIndex === index ? 'max-h-40 pb-4' : 'max-h-0'}
                `}
              >
                <div className="px-4 text-sm text-[#262626] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}