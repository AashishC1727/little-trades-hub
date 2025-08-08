import React from 'react';
import { TrendingUp, Clock, ExternalLink, Share2, Bookmark, Eye } from 'lucide-react';
import type { NewsItem } from '../hooks/useNewsFeed';

// Helper functions for this component
const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
        crypto: 'from-orange-500 to-orange-600',
        stocks: 'from-green-500 to-green-600',
        tech: 'from-blue-500 to-blue-600',
        markets: 'from-purple-500 to-purple-600',
        commodities: 'from-yellow-500 to-yellow-600',
        ai: 'from-cyan-500 to-cyan-600',
        business: 'from-pink-500 to-pink-600',
        general: 'from-gray-500 to-gray-600'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
};

const getImpactColor = (impact: string) => {
    const colors: { [key: string]: string } = {
        high: 'text-red-600 bg-red-50',
        medium: 'text-yellow-600 bg-yellow-50',
        low: 'text-green-600 bg-green-50'
    };
    return colors[impact] || 'text-gray-600 bg-gray-50';
};

const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

interface NewsCardProps {
    news: NewsItem;
    isLive?: boolean;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, isLive = false, isHovered, onMouseEnter, onMouseLeave }) => (
    <div
        className={`group flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 cursor-pointer ${isLive ? 'border-4 border-red-400 shadow-red-300' : ''}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {isLive && (
            <div className="bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white px-4 py-2.5 flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="font-bold text-sm tracking-wide">BREAKING NEWS</span>
                <div className="ml-auto flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full animate-ping"></div><Clock className="w-4 h-4" /></div>
            </div>
        )}

        <div className="relative overflow-hidden">
            <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop&auto=format&q=80`; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-3 left-3"><span className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${getCategoryColor(news.category)} text-white text-xs font-bold uppercase tracking-wide shadow-lg`}>{news.category}</span></div>
            <div className="absolute top-3 right-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${getImpactColor(news.impact)}`}>{news.impact}</span></div>
            <div className={`absolute bottom-3 right-3 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"><Bookmark className="w-4 h-4 text-gray-700" /></button>
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"><Share2 className="w-4 h-4 text-gray-700" /></button>
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors" onClick={() => news.external_url !== '#' && window.open(news.external_url, '_blank')}><ExternalLink className="w-4 h-4 text-gray-700" /></button>
            </div>
        </div>

        <div className="p-6">
            <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">{news.title}</h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{news.summary}</p>
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-blue-500" /><span className="font-semibold text-gray-800">{news.source}</span></div>
                    <div className="flex items-center gap-1.5 text-gray-500"><Eye className="w-4 h-4" /><span className="text-xs">{news.views}</span></div>
                </div>
                <span className="text-gray-500 font-medium">{formatTime(news.created_at)}</span>
            </div>
        </div>
    </div>
);