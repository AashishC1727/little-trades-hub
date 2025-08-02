import React, { useState, useEffect, useRef } from 'react';
import { Bell, TrendingUp, Clock, Wifi, WifiOff, Plus, RefreshCw, ChevronLeft, ChevronRight, ExternalLink, Share2, Bookmark, Eye, Filter } from 'lucide-react';

const LiveNewsComponent = ({ 
  className = "", 
  showHeader = true, 
  maxHistoricalNews = 6,
  updateInterval = 120000 // 2 minutes
}) => {
  const [liveNews, setLiveNews] = useState(null);
  const [historicalNews, setHistoricalNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loadOffset, setLoadOffset] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const scrollContainerRef = useRef(null);

  // Mock data for demonstration
  const mockNewsData = [
    {
      id: 1,
      title: "Bitcoin Surges Past $50,000 Amid Institutional Interest",
      summary: "Major financial institutions are showing renewed interest in cryptocurrency investments, driving Bitcoin to new monthly highs with unprecedented trading volumes.",
      category: "crypto",
      image_url: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop&auto=format&q=80",
      source: "CryptoNews",
      views: "12.3K",
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      is_live: true,
      impact: "high"
    },
    {
      id: 2,
      title: "Tech Stocks Rally on AI Innovation Breakthrough",
      summary: "Leading technology companies announce revolutionary AI partnerships, sparking investor confidence and driving tech sector growth.",
      category: "tech",
      image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&auto=format&q=80",
      source: "TechFinance",
      views: "8.7K",
      created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      is_live: false,
      impact: "medium"
    },
    {
      id: 3,
      title: "Federal Reserve Signals Potential Rate Changes",
      summary: "Economic indicators suggest possible monetary policy adjustments in the coming quarter, impacting global markets significantly.",
      category: "banking",
      image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&auto=format&q=80",
      source: "Financial Times",
      views: "15.2K",
      created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      is_live: false,
      impact: "high"
    },
    {
      id: 4,
      title: "Green Energy Stocks Reach New Heights",
      summary: "Renewable energy sector experiences unprecedented growth as global climate initiatives accelerate investment flows.",
      category: "energy",
      image_url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop&auto=format&q=80",
      source: "Energy Daily",
      views: "6.1K",
      created_at: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      is_live: false,
      impact: "medium"
    },
    {
      id: 5,
      title: "Gold Prices Fluctuate Amid Market Uncertainty",
      summary: "Precious metals market shows volatility as investors seek safe haven assets during economic uncertainty periods.",
      category: "commodities",
      image_url: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&h=400&fit=crop&auto=format&q=80",
      source: "Commodity Watch",
      views: "4.8K",
      created_at: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
      is_live: false,
      impact: "low"
    },
    {
      id: 6,
      title: "International Markets Show Mixed Signals",
      summary: "Global trading sessions reveal divergent trends across major international exchanges with varying regional impacts.",
      category: "international",
      image_url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop&auto=format&q=80",
      source: "Global Markets",
      views: "9.3K",
      created_at: new Date(Date.now() - 150 * 60 * 1000).toISOString(),
      is_live: false,
      impact: "medium"
    }
  ];

  // Initialize with mock data
  useEffect(() => {
    initializeNews();
  }, []);

  const initializeNews = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const liveNewsItem = mockNewsData.find(item => item.is_live);
      const historicalNewsItems = mockNewsData.filter(item => !item.is_live);
      
      setLiveNews(liveNewsItem);
      setHistoricalNews(historicalNewsItems);
      setLoadOffset(historicalNewsItems.length);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreNews = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      // Simulate loading more news
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const moreNews = [
        {
          id: Date.now() + 1,
          title: "Emerging Markets Show Strong Growth Potential",
          summary: "Analysis reveals promising opportunities in developing economies despite global challenges and market volatility.",
          category: "markets",
          image_url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop&auto=format&q=80",
          source: "Market Analysis",
          views: "7.5K",
          created_at: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
          is_live: false,
          impact: "medium"
        },
        {
          id: Date.now() + 2,
          title: "Banking Sector Adapts to Digital Transformation",
          summary: "Traditional banks accelerate digital initiatives to compete with fintech innovations and changing consumer demands.",
          category: "banking",
          image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format&q=80",
          source: "Banking Today",
          views: "11.2K",
          created_at: new Date(Date.now() - 210 * 60 * 1000).toISOString(),
          is_live: false,
          impact: "high"
        },
        {
          id: Date.now() + 3,
          title: "Stock Market Volatility Creates Opportunities",
          summary: "Market fluctuations present both challenges and potential gains for strategic investors with long-term vision.",
          category: "stocks",
          image_url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop&auto=format&q=80",
          source: "Stock Watch",
          views: "13.8K",
          created_at: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
          is_live: false,
          impact: "medium"
        }
      ];
      
      setHistoricalNews(prev => [...prev, ...moreNews]);
      setLoadOffset(prev => prev + moreNews.length);
    } catch (error) {
      console.error('Error loading more news:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      crypto: 'from-orange-500 to-orange-600',
      stocks: 'from-green-500 to-green-600',
      tech: 'from-blue-500 to-blue-600',
      markets: 'from-purple-500 to-purple-600',
      commodities: 'from-yellow-500 to-yellow-600',
      international: 'from-red-500 to-red-600',
      banking: 'from-indigo-500 to-indigo-600',
      energy: 'from-emerald-500 to-emerald-600'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const getImpactColor = (impact) => {
    const colors = {
      high: 'text-red-600 bg-red-50',
      medium: 'text-yellow-600 bg-yellow-50',
      low: 'text-green-600 bg-green-50'
    };
    return colors[impact] || 'text-gray-600 bg-gray-50';
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const NewsCard = ({ news, isLive = false }) => (
    <div 
      className={`group flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 cursor-pointer ${isLive ? 'ring-2 ring-red-400 ring-opacity-60 shadow-red-100' : ''}`}
      onMouseEnter={() => setHoveredCard(news.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {isLive && (
        <div className="bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white px-4 py-2.5 flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="font-bold text-sm tracking-wide">BREAKING NEWS</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
            <Clock className="w-4 h-4" />
          </div>
        </div>
      )}
      
      <div className="relative overflow-hidden">
        <img 
          src={news.image_url} 
          alt={news.title}
          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop&auto=format&q=80`;
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${getCategoryColor(news.category)} text-white text-xs font-bold uppercase tracking-wide shadow-lg`}>
            {news.category}
          </span>
        </div>
        
        {/* Impact Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${getImpactColor(news.impact)}`}>
            {news.impact}
          </span>
        </div>
        
        {/* Hover Actions */}
        <div className={`absolute bottom-3 right-3 flex gap-2 transition-all duration-300 ${hoveredCard === news.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Bookmark className="w-4 h-4 text-gray-700" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Share2 className="w-4 h-4 text-gray-700" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <ExternalLink className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {news.title}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
          {news.summary}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="font-semibold text-gray-800">{news.source}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Eye className="w-4 h-4" />
              <span className="text-xs">{news.views}</span>
            </div>
          </div>
          <span className="text-gray-500 font-medium">{formatTime(news.created_at)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${className}`} style={{ background: 'transparent' }}>
      {/* Enhanced Header */}
      {showHeader && (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4 bg-transparent">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-3 rounded-2xl shadow-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Live Finance News
              </h2>
              <p className="text-gray-600 font-medium">Real-time updates • Live market insights</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${connected ? 'bg-green-100 text-green-700 shadow-green-200 shadow-md' : 'bg-red-100 text-red-700 shadow-red-200 shadow-md'}`}>
                {connected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                {connected ? 'Live Connected' : 'Reconnecting...'}
              </div>
              <div className="text-sm text-gray-500 bg-white px-3 py-2 rounded-full shadow-sm">
                Updated {formatTime(lastUpdate.toISOString())}
              </div>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 hover:text-blue-600">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filter</span>
            </button>
          </div>
        </div>
      )}

      {/* News Section */}
      {(liveNews || historicalNews.length > 0) && (
        <div className="bg-transparent">
          <div className="flex items-center justify-between mb-8 bg-transparent">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-200"></div>
                <h3 className="text-2xl font-bold text-gray-900">Latest Market Updates</h3>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                <Clock className="w-4 h-4" />
                <span>Auto-refresh every 2 minutes</span>
              </div>
            </div>
            
            {/* Enhanced Navigation */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-lg">
                <button
                  onClick={scrollLeft}
                  className="p-3 rounded-full hover:bg-blue-50 transition-all duration-300 text-gray-600 hover:text-blue-600 hover:shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-3 rounded-full hover:bg-blue-50 transition-all duration-300 text-gray-600 hover:text-blue-600 hover:shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Horizontal Scrolling Container */}
          <div className="relative bg-transparent">
            <div 
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto scrollbar-hide pb-6"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Live News First */}
              {liveNews && (
                <NewsCard key={liveNews.id} news={liveNews} isLive={true} />
              )}
              
              {/* Historical News */}
              {historicalNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
              
              {/* Enhanced Load More Card */}
              <div className="flex-shrink-0 w-80">
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl border-2 border-dashed border-blue-200 hover:border-blue-400 hover:from-blue-50 hover:to-purple-100 transition-all duration-500 hover:shadow-xl group cursor-pointer">
                  <button
                    onClick={loadMoreNews}
                    disabled={loading}
                    className="flex flex-col items-center gap-6 p-10 text-center"
                  >
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500">
                        {loading ? (
                          <RefreshCw className="w-10 h-10 text-white animate-spin" />
                        ) : (
                          <Plus className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                        )}
                      </div>
                      {!loading && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                          <span className="text-xs font-bold text-gray-800">+</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {loading ? 'Loading Stories...' : 'Discover More'}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {loading ? 'Fetching the latest financial insights' : 'Explore trending market stories and breaking news'}
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && historicalNews.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-lg">
          <div className="relative">
            <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mb-4" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 rounded-full animate-pulse"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Market Updates</h3>
          <p className="text-gray-600">Fetching the latest financial news and insights...</p>
        </div>
      )}

      {/* Enhanced Bottom Section */}
      <div className="mt-12 pt-8 border-t border-gray-200 bg-transparent">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {(liveNews ? 1 : 0) + historicalNews.length}
              </div>
              <div className="text-sm text-gray-600">Stories Today</div>
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
            <span className="text-sm text-gray-600">Powered by real-time market data</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-600">All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default LiveNewsComponent;