/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Thermometer, Settings, ArrowRightLeft, Info, History } from 'lucide-react';

export default function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [isCelsiusToFahrenheit, setIsCelsiusToFahrenheit] = useState<boolean>(true);
  const [convertedTemp, setConvertedTemp] = useState<number | null>(null);
  const [recentActivity, setRecentActivity] = useState<string | null>(null);

  const handleConvert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      return;
    }

    let result: number;
    let activityText: string;
    
    if (isCelsiusToFahrenheit) {
      result = (val * 9/5) + 32;
      activityText = `${val}°C → ${result.toFixed(1)}°F`;
    } else {
      result = (val - 32) * 5/9;
      activityText = `${val}°F → ${result.toFixed(1)}°C`;
    }
    
    setConvertedTemp(parseFloat(result.toFixed(1)));
    setRecentActivity(activityText);
  };

  const currentUnitLabel = isCelsiusToFahrenheit ? '°F' : '°C';
  const getContextText = () => {
    if (convertedTemp === null) return '';
    if (isCelsiusToFahrenheit) {
      if (convertedTemp <= 32) return 'Freezing point of water or lower';
      if (convertedTemp >= 212) return 'Boiling point of water or higher';
      if (convertedTemp >= 68 && convertedTemp <= 72) return 'Standard room temperature';
      return '';
    } else {
      if (convertedTemp <= 0) return 'Freezing point of water or lower';
      if (convertedTemp >= 100) return 'Boiling point of water or higher';
      if (convertedTemp >= 20 && convertedTemp <= 22) return 'Standard room temperature';
      return '';
    }
  };

  return (
    <div className="bg-surface text-on-background min-h-screen flex flex-col font-sans">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-[var(--spacing-margin-mobile)] h-16 bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline">
        <div className="flex items-center gap-2">
          <Thermometer className="w-6 h-6 text-primary dark:text-primary-fixed-dim" />
          <h1 className="text-[20px] font-bold text-primary dark:text-primary-fixed-dim">TempScale</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors">
          <Settings className="w-5 h-5 text-on-surface-variant dark:text-on-surface-variant" />
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow pt-24 pb-16 px-4 md:px-margin-mobile flex flex-col items-center justify-center">
        {/* Central Conversion Card */}
        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl p-8 border border-outline-variant shadow-clinical">
          <div className="mb-8 text-center">
            <span className="text-[12px] font-bold text-on-surface-variant uppercase tracking-widest">Precision Converter</span>
            <h2 className="text-[24px] font-bold text-on-surface mt-1 tracking-tight">Temperature Unit Conversion</h2>
          </div>

          {/* Input Group */}
          <div className="space-y-6">
            <div>
              <label 
                htmlFor="temp-input" 
                className="block text-[12px] font-bold text-on-surface-variant mb-2 uppercase tracking-widest"
              >
                Value to Convert
              </label>
              <div className="relative group">
                <input
                  id="temp-input"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="0.0"
                  className="w-full h-14 bg-surface px-4 rounded-lg border border-outline-variant focus:border-primary focus:ring-0 focus:bg-[#F0F7FF] transition-all text-[20px] font-bold text-on-surface appearance-none outline-none"
                />
              </div>
            </div>

            {/* Unit Toggle */}
            <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant">
              <button 
                onClick={() => setIsCelsiusToFahrenheit(true)}
                className={`flex-1 py-2 rounded-md font-bold text-[14px] transition-all ${
                  isCelsiusToFahrenheit 
                    ? 'bg-surface-container-lowest shadow-sm text-primary' 
                    : 'text-on-surface-variant hover:bg-surface-container-high font-normal'
                }`}
              >
                Celsius to Fahrenheit
              </button>
              <button 
                onClick={() => setIsCelsiusToFahrenheit(false)}
                className={`flex-1 py-2 rounded-md font-bold text-[14px] transition-all ${
                  !isCelsiusToFahrenheit 
                    ? 'bg-surface-container-lowest shadow-sm text-primary' 
                    : 'text-on-surface-variant hover:bg-surface-container-high font-normal'
                }`}
              >
                Fahrenheit to Celsius
              </button>
            </div>

            {/* Convert Action */}
            <button
              onClick={handleConvert}
              className="w-full h-14 bg-primary text-on-primary rounded-lg font-bold text-[16px] hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <ArrowRightLeft className="w-5 h-5" />
              Convert
            </button>
          </div>

          {/* Result Section */}
          <div className={`mt-10 pt-8 border-t border-outline-variant flex flex-col items-center transition-opacity duration-300 ${convertedTemp !== null ? 'opacity-100' : 'opacity-50'}`}>
            <p className="text-[12px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Converted Temperature</p>
            <div className="text-center">
              <span className="text-6xl font-bold text-primary block leading-none">
                {convertedTemp !== null ? `${convertedTemp}${currentUnitLabel}` : '--'}
              </span>
              <p className="text-[14px] text-on-surface-variant mt-2 h-5">
                {getContextText()}
              </p>
            </div>
          </div>
        </div>

        {/* Utility Context Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[1280px]">
          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant">
            <Info className="w-6 h-6 text-secondary mb-2" />
            <p className="text-[12px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Standard Reference</p>
            <p className="text-[14px] text-on-surface">Absolute Zero: -273.15°C</p>
          </div>
          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant">
            <History className="w-6 h-6 text-secondary mb-2" />
            <p className="text-[12px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Recent Activity</p>
            <p className="text-[14px] text-on-surface h-5">{recentActivity || 'No recent conversions'}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-[var(--spacing-margin-mobile)] flex flex-col items-center gap-4 text-center bg-surface-container-low dark:bg-surface-container-lowest border-t border-outline-variant dark:border-outline">
        <div className="text-[12px] font-bold text-on-surface-variant uppercase tracking-widest">Tepscale OASIS INFOBYTE</div>
        <div className="flex gap-6">
          <a href="#" className="text-[14px] text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">Privacy</a>
          <a href="#" className="text-[14px] text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">Terms</a>
          <a href="#" className="text-[14px] text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">Support</a>
        </div>
        <p className="text-[14px] text-on-surface-variant opacity-70">© 2024 TempScale Precision. All rights reserved.</p>
      </footer>
    </div>
  );
}
