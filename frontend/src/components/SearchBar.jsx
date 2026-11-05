import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  courseFilter,
  setCourseFilter,
  availableCourses = [],
  filteredCount,
  totalCount,
}) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by first name, last name, or section..."
            className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-700 font-medium hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
            >
              <option value="">All Courses</option>
              {availableCourses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
              <Filter className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="text-xs font-medium text-slate-500 px-3 py-2 bg-slate-100 rounded-lg whitespace-nowrap">
            Showing <span className="font-semibold text-slate-800">{filteredCount}</span> of{' '}
            <span className="font-semibold text-slate-800">{totalCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
