import React from 'react';
import { Search, Moon, Sun, Plus } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const handleNewEvent = () => {
    window.dispatchEvent(new Event('open-new-event-modal'));
  };

  return (
    <header className="flex-shrink-0 bg-white p-4 h-[60px] border-b border-gray-200 flex items-center justify-between dark:bg-slate-800 dark:border-slate-700 transition-colors duration-300">
      <h1 className="text-sm font-semibold text-gray-600 uppercase tracking-wide dark:text-slate-400">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-gray-200 border border-transparent rounded-lg text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white w-64 transition-colors"
          />
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
        </div>

        {title === 'Calendar' && (
           <button 
             onClick={handleNewEvent}
             className="px-4 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 text-sm flex items-center gap-2 transition-colors shadow-md shadow-violet-200 dark:shadow-none"
           >
             <Plus className="w-4 h-4" />
             <span className="hidden sm:inline">New Event</span>
           </button>
        )}

        <button
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
          className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700 transition-colors"
        >
          <Sun className="hidden dark:block w-5 h-5 text-yellow-400" />
          <Moon className="block dark:hidden w-5 h-5 text-violet-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;