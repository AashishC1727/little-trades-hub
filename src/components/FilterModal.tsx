// File: FilterModal.tsx
import React from 'react';
import { X } from 'lucide-react';

const NEWS_CATEGORIES = ['crypto', 'stocks', 'tech', 'ai', 'markets', 'commodities', 'business'];

interface FilterModalProps {
  activeFilters: Set<string>;
  setActiveFilters: (filters: Set<string>) => void;
  onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ activeFilters, setActiveFilters, onClose }) => {
  const handleFilterClick = (category: string) => {
    const newFilters = new Set(activeFilters);
    if (newFilters.has(category)) {
      newFilters.delete(category);
    } else {
      newFilters.add(category);
    }
    setActiveFilters(newFilters);
  };

  const clearFilters = () => setActiveFilters(new Set());

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Filter News Categories</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="py-6">
          <div className="flex flex-wrap gap-3">
            {NEWS_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterClick(category)}
                className={`px-4 py-2 rounded-full font-semibold text-sm capitalize transition-all duration-200 border-2 ${
                  activeFilters.has(category)
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button onClick={clearFilters} disabled={activeFilters.size === 0} className="font-semibold text-gray-600 hover:text-red-500 transition-colors disabled:opacity-50 disabled:hover:text-gray-600">Clear All ({activeFilters.size})</button>
          <button onClick={onClose} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">Done</button>
        </div>
        <style>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
        `}</style>
      </div>
    </div>
  );
};