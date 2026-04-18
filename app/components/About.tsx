'use client';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Gold Price Nepal | Live Bullion Tracker Nepal',
  description: 'Learn about our gold price Nepal tracker. We provide live gold and silver rates in Nepal, daily market updates, price calculator, and Nepal bullion market information. Trusted source for Nepal gold market prices.',
  keywords: 'about gold price Nepal, about Nepal gold tracker, Nepal bullion tracker, gold rate nepal, about silver price nepal, Nepal gold market info',
};

export default function About() {
  return (
    <div className="card p-6 sm:p-8 animate-fade-in">
      <h2 className="text-xl sm:text-2xl font-semibold heading-tight text-[#262626] mb-6">
        About Nepal Gold & Silver Tracker
      </h2>

      <div className="space-y-6 text-[#262626]">
        <section>
          <h3 className="text-base font-semibold text-[#262626] mb-2">Our Mission</h3>
          <p className="leading-relaxed text-sm">
            Nepal Gold & Silver Tracker provides accurate, real-time information about gold and silver prices in Nepal. We help investors, jewellers, and consumers make informed decisions by tracking daily market rates and providing historical trend analysis.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-[#262626] mb-2">Data Sources</h3>
          <p className="leading-relaxed text-sm">
            Our prices are sourced from the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA) and other reputable market sources. We update our rates daily to ensure you have access to the most current market information.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-[#262626] mb-3">What We Offer</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Real-time Fine Gold (Chapawal) and Silver prices per tola</li>
            <li>Historical price trends and charts</li>
            <li>Price calculator for easy conversions</li>
            <li>Daily market updates</li>
            <li>Educational content about gold and silver investing in Nepal</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-[#262626] mb-2">Contact Us</h3>
          <p className="leading-relaxed text-sm mb-4">
            Have questions or suggestions? We&apos;d love to hear from you.
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.71 5.933a2.25 2.25 0 002.36 0l9.71-5.933z" />
                </svg>
              </span>
              <span className="text-[#262626]">yubraj.dev.np@gmail.com</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-[#262626]">Kathmandu, Nepal</span>
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-base font-semibold text-[#262626] mb-2">Legal Information</h3>
          <p className="leading-relaxed text-xs text-[#9ca3af]">
            This website is for informational purposes only. While we strive for accuracy, prices may vary between dealers. Always verify with your local jeweller before making transactions.
          </p>
        </section>
      </div>
    </div>
  );
}