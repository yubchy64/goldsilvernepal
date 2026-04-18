import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the current gold price in Nepal today?",
      answer: "The gold price in Nepal today fluctuates based on international market rates and local factors. Our tracker provides the live market gold and silver prices, specifically the Fine Gold (Chapawal) price per tola."
    },
    {
      question: "How often are the gold and silver rates updated?",
      answer: "Our gold silver live rate is updated daily to match the official rates set by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA). You can rely on our nepal bullion tracker for current rates."
    },
    {
      question: "What is the gold price in Nepal today per tola 24k?",
      answer: "The 24k gold price in Nepal today (also known as Fine Gold or Chapawal) is tracked continuously. You can see the exact per tola rate at the top of this page."
    },
    {
      question: "What is the difference between 24 carat gold and Tejabi Gold?",
      answer: "The gold price Nepal 24 carat reflects 99.9% pure gold, used primarily for investment. Tejabi Gold is jewelry-grade gold (around 92% purity) that includes making charges."
    },
    {
      question: "What is a Tola in the Nepal gold market?",
      answer: "In the Nepal gold market, a Tola is a traditional South Asian unit of mass equal to approximately 11.6638 grams. It is the standard measurement for the gold price in nepal tola."
    },
    {
      question: "What is the silver price in Nepal today?",
      answer: "The silver price in Nepal today per tola is displayed alongside our gold rates. Silver rate in Nepal is also determined daily by the federation and tracks global silver prices in Nepal."
    },
    {
      question: "Why do the gold prices in Nepal change daily?",
      answer: "The current rate of gold in nepal is influenced by international bullion markets, USD to NPR exchange rates, import duties, and local demand. These create daily changes in the gold and silver exchange rate."
    },
    {
      question: "Where can I check the gold rate today in Kathmandu?",
      answer: "You can check the silver rate today kathmandu and the gold price in nepal market today directly on our live tracker. We update prices daily to reflect current local market conditions."
    },
    {
      question: "How do I calculate the gold rate in Nepal per gram?",
      answer: "To find the gold rate in nepal today per gram, simply use our Price Calculator. Since 1 tola equals 11.6638 grams, the calculator divides the per tola gold price in Nepal by 11.6638 to get the per gram rate."
    },
    {
      question: "Are these the official Nepal Rastra Bank gold rates?",
      answer: "The rates provided are the official prices set by the Nepal Gold and Silver Dealers' Association (FENEGOSIDA), which is the standard benchmark used by jewelers across the country."
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
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`
                border border-gray-100 rounded-lg overflow-hidden
                ${openIndex === index ? 'bg-gray-50' : ''}
              `}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700 pr-4">
                  {faq.question}
                </span>
                <span 
                  className={`
                    w-6 h-6 flex items-center justify-center rounded-full text-gray-400 transition-all
                    ${openIndex === index ? 'bg-primary text-white' : 'bg-gray-100'}
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
                <div className="px-4 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQ;