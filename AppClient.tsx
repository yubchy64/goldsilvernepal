'use client';

import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { PriceData, GroundingSource } from './types';
import MetalCard from './components/MetalCard';

// Lazy load all components to reduce initial bundle size
const PriceCalculator = lazy(() => import('./components/PriceCalculator'));
const FAQ = lazy(() => import('./components/FAQ'));
const About = lazy(() => import('./components/About'));
const HistoricalAnalysis = lazy(() => import('./components/HistoricalAnalysis'));
const InvestmentGuide = lazy(() => import('./components/InvestmentGuide'));

const App: React.FC<{ initialData?: { data: PriceData; sources: GroundingSource[] } }> = ({ initialData }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [isStale, setIsStale] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/prices');
      const json = await response.json();

      if (json.error) {
        setError(json.error);
      } else if (json.data) {
        setPriceData(json.data);
        setSources(json.sources || []);
        setLastRefreshed(new Date());

        const todayStr = new Date().toISOString().split('T')[0];
        const isDateStale = json.data.lastUpdated !== todayStr;
        setIsStale(isDateStale);
      }
    } catch (e) {
      setError("An unexpected error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialData?.data) {
      setPriceData(initialData.data);
      setSources(initialData.sources);
      setLastRefreshed(new Date());

      const todayStr = new Date().toISOString().split('T')[0];
      setIsStale(initialData.data.lastUpdated !== todayStr);
      setLoading(false);
    } else {
      fetchData();
    }
  }, [initialData, fetchData]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'historical', label: 'Historical' },
    { id: 'investment', label: 'Investment' },
    { id: 'faq', label: 'FAQ' },
    { id: 'about', label: 'About' }
  ];

return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#262626] flex flex-col items-center pb-8 px-3 sm:px-4">

      <main className="flex-grow w-full max-w-5xl mx-auto px-6 sm:px-8 py-6 sm:py-8">

        {/* Hero / Title Section - All in one row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 min-w-max">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.621c1.033 0 1.875.843 1.875 1.875v.003c0 1.035-.843 1.875-1.875 1.875S10.125 13.782 10.125 12.75v-.003c0-1.033.843-1.875 1.875-1.875zM12 5.25a6.75 6.75 0 00-6.75 6.75c0 3.728 3.022 6.75 6.75 6.75s6.75-3.022 6.75-6.75A6.75 6.75 0 0012 5.25z" clipRule="evenodd" />
                    </svg>
                </div>
                <h1 className="text-3xl sm:text-4xl font-semibold heading-tight text-[#262626] whitespace-nowrap">
                    Nepal <span className="text-primary">Bullion</span> Tracker
                </h1>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap justify-start md:justify-end items-center gap-3">
                {/* Navigation */}
                <nav className="flex flex-wrap md:flex-nowrap gap-1 bg-white/40 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-white/60">
                    {navItems.map((item) => (
                      <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`
                              px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                              ${activeSection === item.id
                                  ? 'bg-white text-primary shadow-md transform scale-105'
                                  : 'text-[#262626] hover:text-[#262626] hover:bg-white/50'
                              }
                          `}
                      >
                          {item.label}
                      </button>
                    ))}
                </nav>

                {/* Status indicators */}
                {priceData?.lastUpdated && (
                     <div className={`
                        flex items-center gap-2 text-sm font-medium py-1.5 px-3 rounded-full border
                        ${isStale
                          ? 'bg-orange-50 border-orange-200 text-orange-700'
                          : 'bg-white border-[#e5e7eb] text-gray-600'
                        }
                     `}>
                        {isStale ? (
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                             <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                           </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary">
                                <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                            </svg>
                        )}
                        <span className="text-xs whitespace-nowrap">
                            {isStale ? `Old: ${priceData.lastUpdated}` : priceData.lastUpdated}
                            {priceData.nepaliDate && ` • ${priceData.nepaliDate}`}
                        </span>
                    </div>
                )}

                 {lastRefreshed && (
                     <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-white py-1.5 px-3 rounded-full border border-[#e5e7eb]">
                         <span className="relative flex h-2 w-2">
                           <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isStale ? 'bg-orange-400' : 'bg-primary'}`}></span>
                           <span className={`relative inline-flex rounded-full h-2 w-2 ${isStale ? 'bg-orange-500' : 'bg-primary'}`}></span>
                         </span>
                         <span className="text-xs">{lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                     </div>
                 )}
            </div>
        </div>

{/* Error Message */}
        {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-3 animate-fade-in">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0 text-red-500">
                   <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                 </svg>
                 {error}
            </div>
        )}

        {/* Price Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <MetalCard
                metalName="Gold"
                pricePerTola={priceData?.fineGoldPerTola || 0}
                colorClass="bg-primary"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                    </svg>
                }
            />
            <MetalCard
                metalName="Silver"
                pricePerTola={priceData?.silverPerTola || 0}
                colorClass="bg-gray-400"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z" clipRule="evenodd" />
                    </svg>
                }
            />
        </div>

        {/* Calculator Section */}
        <div className="mb-6 w-full md:w-[calc(50%-0.75rem)] mx-auto">
            <Suspense fallback={<div className="card p-6 animate-pulse">Loading calculator...</div>}>
                <PriceCalculator
                    goldPricePerTola={priceData?.fineGoldPerTola || 0}
                    silverPricePerTola={priceData?.silverPerTola || 0}
                />
            </Suspense>
        </div>

        {/* FAQ Section */}
        {(activeSection === 'faq' || activeSection === 'home') && (
            <div className="mb-8">
                <Suspense fallback={<div className="card p-6 animate-pulse">Loading FAQ...</div>}>
                    <FAQ />
                </Suspense>
            </div>
        )}

        {/* Historical Analysis Section */}
        {activeSection === 'historical' && (
            <div className="mb-8">
                <Suspense fallback={<div className="card p-6 animate-pulse">Loading analysis...</div>}>
                    <HistoricalAnalysis />
                </Suspense>
            </div>
        )}

        {/* Investment Guide Section */}
        {activeSection === 'investment' && (
            <div className="mb-8">
                <Suspense fallback={<div className="card p-6 animate-pulse">Loading guide...</div>}>
                    <InvestmentGuide />
                </Suspense>
            </div>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
            <div className="mb-8">
                <Suspense fallback={<div className="card p-6 animate-pulse">Loading about...</div>}>
                    <About />
                </Suspense>
            </div>
        )}

        {/* Sources & Disclaimer */}
        <div className="mt-10 pt-8 border-t border-[#e5e7eb]">
            <h3 className="text-base font-semibold text-[#262626] mb-3">Sources:</h3>
            {sources.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1.5 mb-5">
                    {sources.map((source, idx) => (
                        <li key={idx} className="break-all">
                            {source.web ? (
                                <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                                    {source.web.title || source.web.uri}
                                </a>
                            ) : (
                                <span className="text-[#9ca3af] text-sm">Unknown Source</span>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mb-5 text-[#262626] text-sm">Rates are manually verified and updated daily via FENEGOSIDA.</p>
            )}

            <div className="bg-gray-50 border border-[#e5e7eb] rounded-lg p-4">
                <p className="text-[#262626] text-sm leading-relaxed">
                    <strong className="font-medium text-[#262626]">Disclaimer:</strong> Prices are for informational purposes only. While we update these rates daily to match market standards (FENEGOSIDA), please verify with your local jeweller before making transactions.
                </p>
            </div>
        </div>

      </main>
    </div>
  );
};

export default App;