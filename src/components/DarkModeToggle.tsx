import React, { useEffect, useState } from'react';
import { Moon, Sun } from'lucide-react';

const DarkModeToggle: React.FC = () => {
 const [isDark, setIsDark] = useState(() => {
 // Check localStorage or system preference
 const saved = localStorage.getItem('theme');
 if (saved) return saved ==='dark';
 return window.matchMedia('(prefers-color-scheme: dark)').matches;
 });

 useEffect(() => {
 // Apply theme
 if (isDark) {
 document.documentElement.classList.add('dark');
 localStorage.setItem('theme','dark');
 } else {
 document.documentElement.classList.remove('dark');
 localStorage.setItem('theme','light');
 }
 }, [isDark]);

 return (
 <button
 onClick={() => setIsDark(!isDark)}
 className="relative group p-2 rounded-lg hover:bg-[var(--ud-gold-pale)] transition-all duration-300"
 aria-label={isDark ?'Switch to light mode' :'Switch to dark mode'}
 title={isDark ?'Switch to light mode' :'Switch to dark mode'}
 >
 <div className="relative w-6 h-6 flex items-center justify-center">
 {/* Sun Icon - Light Mode */}
 <Sun
 className={`absolute h-5 w-5 text-yellow-500 transition-all duration-500 ${isDark
 ?'rotate-90 scale-0 opacity-0'
 :'rotate-0 scale-100 opacity-100'
 }`}
 />

 {/* Moon Icon - Dark Mode */}
 <Moon
 className={`absolute h-5 w-5 text-[var(--ud-gold)] transition-all duration-500 ${isDark
 ?'rotate-0 scale-100 opacity-100'
 :'-rotate-90 scale-0 opacity-0'
 }`}
 />
 </div>

 {/* Animated background glow */}
 <div
 className={`absolute inset-0 rounded-lg blur-md transition-opacity duration-300 opacity-0 group-hover:opacity-20 ${isDark ?'bg-blue-400' :'bg-yellow-400'
 }`}
 />
 </button>
 );
};

export default DarkModeToggle;
