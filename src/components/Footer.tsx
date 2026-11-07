import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [showServiceCode, setShowServiceCode] = useState(false);

  const links = [
    ['Audio Description', 'Investor Relations', 'Legal Notices'],
    ['Help Center', 'Jobs', 'Cookie Preferences'],
    ['Gift Cards', 'Netflix Shop', 'Corporate Information'],
    ['Media Center', 'Terms of Use', 'Contact Us'],
  ];

  return (
    <footer className="mt-20 border-t border-neutral-800/80 bg-[#141414] text-neutral-500 text-xs py-12 px-4 md:px-12 select-none">
      <div className="max-w-6xl mx-auto space-y-6">
        <p className="hover:underline cursor-pointer">
          Questions? Call 1-800-012-3456 (Toll-Free)
        </p>

        {/* 4 Column Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {links.map((col, colIdx) => (
            <ul key={colIdx} className="space-y-3">
              {col.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => e.preventDefault()}
                    className="hover:underline hover:text-neutral-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Service Code Button */}
        <div className="pt-4">
          <button
            onClick={() => setShowServiceCode(!showServiceCode)}
            className="border border-neutral-700 hover:border-neutral-500 text-neutral-400 hover:text-white px-3 py-1.5 transition-colors"
          >
            {showServiceCode ? 'Service Code: 849-204-FLX' : 'Service Code'}
          </button>
        </div>

        <p className="text-[11px] text-neutral-600 pt-2">
          © 2026 StreamFlix, Inc. An authentic cinematic entertainment experience.
        </p>
      </div>
    </footer>
  );
};
