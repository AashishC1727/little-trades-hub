import React, { useState, useRef } from 'react';
import { Bell, RefreshCw, ChevronLeft, ChevronRight, Filter, Wifi, WifiOff, Clock, Plus } from 'lucide-react';
import { useNewsFeed } from '../hooks/useNewsFeed';
import { NewsCard } from './NewsCard';
import { FilterModal } from './FilterModal';

// This helper is only used here for the "lastUpdate" display
const formatTimeForUpdate = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

export const LiveNewsComponent = ({ showHeader = true, className = "" }) => {
    // Get all logic and state from our custom hook
    const {
        liveNews,
        filteredHistoricalNews,
        loading,
        connected,
        lastUpdate,
        hasMoreData,
        activeFilters,
        setActiveFilters,
        loadMoreNews,
        handleManualRefresh,
    } = useNewsFeed();

    // State that is purely for the UI of this component
    const [showFilter, setShowFilter] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
    const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 320, behavior: 'smooth' });

    return (
        <div className={`px-4 md:px-6 lg:px-8 ${className}`} style={{ background: 'transparent' }}>
            {showFilter && (
                <FilterModal
                    activeFilters={activeFilters}
                    setActiveFilters={setActiveFilters}
                    onClose={() => setShowFilter(false)}
                />
            )}

            {showHeader && (
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4 bg-transparent">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-3 rounded-2xl shadow-lg"><Bell className="w-6 h-6 text-white" /></div>
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Live Finance News</h2>
                            <p className="text-gray-600 font-medium">Real-time updates • Live market insights</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${connected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {connected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                                {connected ? 'Live Connected' : 'Reconnecting...'}
                            </div>
                            <div className="text-sm text-gray-500 bg-white px-3 py-2 rounded-full shadow-sm">
                                Updated {formatTimeForUpdate(lastUpdate)}
                            </div>
                        </div>
                        <button onClick={handleManualRefresh} disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /><span className="font-medium">Refresh</span></button>
                        <button onClick={() => setShowFilter(true)} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 relative">
                            <Filter className="w-4 h-4" /><span className="font-medium">Filter</span>
                            {activeFilters.size > 0 && <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">{activeFilters.size}</div>}
                        </button>
                    </div>
                </div>
            )}

            {(liveNews || filteredHistoricalNews.length > 0) && (
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3"><div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div><h3 className="text-2xl font-bold text-gray-900">Latest Market Updates</h3></div>
                        <div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-lg"><button onClick={scrollLeft} className="p-3 rounded-full hover:bg-blue-50"><ChevronLeft className="w-5 h-5" /></button><button onClick={scrollRight} className="p-3 rounded-full hover:bg-blue-50"><ChevronRight className="w-5 h-5" /></button></div>
                    </div>
                    <div ref={scrollContainerRef} className="flex gap-8 overflow-x-auto scrollbar-hide pb-6">
                        {liveNews && <NewsCard key={liveNews.id} news={liveNews} isLive isHovered={hoveredCard === liveNews.id} onMouseEnter={() => setHoveredCard(liveNews.id)} onMouseLeave={() => setHoveredCard(null)} />}
                        {filteredHistoricalNews.map((news) => <NewsCard key={news.id} news={news} isHovered={hoveredCard === news.id} onMouseEnter={() => setHoveredCard(news.id)} onMouseLeave={() => setHoveredCard(null)} />)}
                        {hasMoreData && (
                            <div className="flex-shrink-0 w-80"><div className="h-full flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl border-2 border-dashed border-blue-200"><button onClick={loadMoreNews} disabled={loading} className="flex flex-col items-center gap-6 p-10 text-center"><div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full flex items-center justify-center shadow-xl">{loading ? <RefreshCw className="w-10 h-10 text-white animate-spin" /> : <Plus className="w-10 h-10 text-white" />}</div><div><h4 className="font-bold text-xl text-gray-900 mb-2">{loading ? 'Loading...' : 'Discover More'}</h4><p className="text-gray-600">{loading ? 'Fetching insights...' : 'Explore more stories'}</p></div></button></div></div>
                        )}
                    </div>
                </div>
            )}

            {loading && filteredHistoricalNews.length === 0 && (
                <div className="flex items-center justify-center py-20"><RefreshCw className="w-12 h-12 animate-spin text-blue-600" /></div>
            )}

            <div className="mt-12 pt-8 border-t border-gray-200 bg-transparent">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                                {(liveNews ? 1 : 0) + filteredHistoricalNews.length}
                            </div>
                            <div className="text-sm text-gray-600">Stories Displayed</div>
                        </div>
                        <div className="w-px h-12 bg-gray-200"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">Live</div>
                            <div className="text-sm text-gray-600">Market Data</div>
                        </div>
                        <div className="w-px h-12 bg-gray-200"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">24/7</div>
                            <div className="text-sm text-gray-600">Coverage</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Powered by Supabase Realtime</span>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 ${connected ? 'bg-green-500' : 'bg-red-500'} rounded-full animate-pulse`}></div>
                            <span className={`text-sm font-medium ${connected ? 'text-green-600' : 'text-red-600'}`}>
                                {connected ? 'All systems operational' : 'Connection issue'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; } .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }`}</style>
        </div>
    );
};