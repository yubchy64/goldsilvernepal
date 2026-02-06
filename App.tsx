import React, { useState, useEffect, useCallback } from 'react';
import { fetchLivePrices } from './services/geminiService';
import { PriceData, HistoricalDataPoint, GroundingSource } from './types';
import { generateRelativeHistory, INITIAL_EMPTY_HISTORY } from './constants';
import MetalCard from './components/MetalCard';
import HistoryChart from './components/HistoryChart';
import PriceCalculator from './components/PriceCalculator';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [historyData, setHistoryData] = useState<HistoricalDataPoint[]>(INITIAL_EMPTY_HISTORY);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [isStale, setIsStale] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchLivePrices();
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setPriceData(response.data);
        setSources(response.sources);
        setLastRefreshed(new Date());

        // Check if data is from today (Simple YYYY-MM-DD check)
        const todayStr = new Date().toISOString().split('T')[0];
        // Note: This is UTC check, might vary by timezone, but good enough for a warning
        const isDateStale = response.data.lastUpdated !== todayStr;
        setIsStale(isDateStale);

        const freshHistory = generateRelativeHistory(
            response.data.fineGoldPerTola, 
            response.data.silverPerTola
        );
        setHistoryData(freshHistory);
      }
    } catch (e) {
      setError("An unexpected error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center pb-12">
      
      {/* Mobile Refresh Button (Sticky Bottom Right) */}
      <div className="sm:hidden fixed bottom-6 right-6 z-50">
          <button
             onClick={fetchData} 
             disabled={loading}
             className="h-14 w-14 rounded-full bg-yellow-600 shadow-xl flex items-center justify-center text-white active:scale-95 transition-transform"
          >
               {loading ? (
                <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                </svg>
            )}
          </button>
      </div>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Hero / Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-xl text-yellow-700">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.621c1.033 0 1.875.843 1.875 1.875v.003c0 1.035-.843 1.875-1.875 1.875S10.125 13.782 10.125 12.75v-.003c0-1.033.843-1.875 1.875-1.875zM12 5.25a6.75 6.75 0 00-6.75 6.75c0 3.728 3.022 6.75 6.75 6.75s6.75-3.022 6.75-6.75A6.75 6.75 0 0012 5.25z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                        Nepal <span className="text-yellow-600">Bullion</span> Tracker
                    </h1>
                </div>
                <p className="text-gray-500 max-w-lg">
                    Real-time market rates for Fine Gold and Silver.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                {priceData?.lastUpdated && (
                     <div className={`flex items-center gap-2 text-sm font-medium py-2 px-4 rounded-full border shadow-sm ${isStale ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-white border-gray-200 text-gray-600'}`}>
                        {isStale ? (
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                             <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                           </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-500">
                                <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                            </svg>
                        )}
                        {isStale ? `Old Rate: ${priceData.lastUpdated}` : `Date: ${priceData.lastUpdated}`}
                    </div>
                )}

                 {lastRefreshed && (
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white py-2 px-4 rounded-full border border-gray-200 shadow-sm">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isStale ? 'bg-orange-400' : 'bg-green-400'}`}></span>
                          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isStale ? 'bg-orange-500' : 'bg-green-500'}`}></span>
                        </span>
                        Checked: {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                )}
                
                <button 
                    onClick={fetchData} 
                    disabled={loading}
                    className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95"
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                        </svg>
                    )}
                    Reload
                </button>
            </div>
        </div>

        {/* Error Message */}
        {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3 animate-fade-in">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0 text-red-500">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                {error}
            </div>
        )}

        {/* Price Cards Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
            <MetalCard 
                metalName="Gold" 
                pricePerTola={priceData?.fineGoldPerTola || 0}
                colorClass="bg-yellow-500"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                    </svg>
                }
            />
            <MetalCard 
                metalName="Silver" 
                pricePerTola={priceData?.silverPerTola || 0}
                colorClass="bg-slate-400"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z" clipRule="evenodd" />
                    </svg>
                }
            />
        </div>

        {/* Chart & Calculator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 flex flex-col h-full">
                <HistoryChart data={historyData} />
            </div>
            <div className="lg:col-span-1 flex flex-col h-full">
                <PriceCalculator 
                    goldPricePerTola={priceData?.fineGoldPerTola || 0}
                    silverPricePerTola={priceData?.silverPerTola || 0}
                />
            </div>
        </div>

        {/* Sources & Disclaimer */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-gray-500 text-sm">
            <h4 className="font-semibold text-gray-700 mb-2">Sources:</h4>
            {sources.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    {sources.map((source, idx) => (
                        <li key={idx} className="break-all">
                            {source.web ? (
                                <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 hover:underline transition-colors">
                                    {source.web.title || source.web.uri}
                                </a>
                            ) : (
                                <span>Unknown Source</span>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mb-4">Rates are manually verified and updated daily.</p>
            )}
            
            <p className="opacity-75">
                <strong>Disclaimer:</strong> Prices are for informational purposes only. While we update these rates daily to match market standards (FENEGOSIDA), please verify with your local jeweller before making transactions.
            </p>
        </div>

      </main>
    </div>
  );
};

export default App;