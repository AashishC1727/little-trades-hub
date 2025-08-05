import React, { useState, useEffect, useRef } from 'react';
import { Bell, TrendingUp, Clock, Wifi, WifiOff, Plus, RefreshCw, ChevronLeft, ChevronRight, ExternalLink, Share2, Bookmark, Eye, Filter, X } from 'lucide-react';

// +++ START: Filter Component Definition +++
// I've defined the new FilterComponent here to keep everything in one file as requested.
const FilterComponent = ({ activeFilters, setActiveFilters, onClose, newsCategories }) => {
    
    const handleFilterClick = (category) => {
        // Create a new Set from the existing filters to ensure we don't mutate state directly
        const newFilters = new Set(activeFilters);
        if (newFilters.has(category)) {
            newFilters.delete(category); // Toggle off
        } else {
            newFilters.add(category); // Toggle on
        }
        setActiveFilters(newFilters);
    };

    const clearFilters = () => {
        setActiveFilters(new Set());
    };

    return (
        // Modal overlay to cover the screen
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={onClose}>
            {/* Modal content container */}
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in-up"
                onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800">Filter News Categories</h3>
                    <button 
                        onClick={onClose} 
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Filter options */}
                <div className="py-6">
                    <div className="flex flex-wrap gap-3">
                        {newsCategories.map((category) => (
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

                {/* Footer with actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button
                        onClick={clearFilters}
                        disabled={activeFilters.size === 0}
                        className="font-semibold text-gray-600 hover:text-red-500 transition-colors disabled:opacity-50 disabled:hover:text-gray-600"
                    >
                        Clear All ({activeFilters.size})
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Done
                    </button>
                </div>
            </div>
            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
// +++ END: Filter Component Definition +++


const LiveNewsComponent = ({
  className = "",
  showHeader = true,
}) => {
  const [liveNews, setLiveNews] = useState(null);
  const [historicalNews, setHistoricalNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false); // Start as false until subscription is confirmed
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loadOffset, setLoadOffset] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [displayedNewsIds, setDisplayedNewsIds] = useState(new Set());
  const scrollContainerRef = useRef(null);

  // +++ START: State for Filter Functionality +++
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [filteredHistoricalNews, setFilteredHistoricalNews] = useState([]);
  const newsCategories = ['crypto', 'stocks', 'tech', 'ai', 'markets', 'commodities', 'business'];
  // +++ END: State for Filter Functionality +++

  // Mock data for fallback if Supabase connection fails
  const mockNewsData = [
    {
      id: Date.now() + 1,
      title: "Bitcoin Surges Past $50,000 Amid Institutional Interest",
      summary: "Major financial institutions are showing renewed interest in cryptocurrency investments, driving Bitcoin to new monthly highs with unprecedented trading volumes.",
      category: "crypto",
      image_url: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop&auto=format&q=80",
      source: "CryptoNews",
      external_url: "#",
      is_live: true,
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: Date.now() + 2,
      title: "Tech Stocks Rally on AI Innovation Breakthrough",
      summary: "Leading technology companies announce revolutionary AI partnerships, sparking investor confidence and driving tech sector growth.",
      category: "tech",
      image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&auto=format&q=80",
      source: "TechFinance",
      external_url: "#",
      is_live: false,
      created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    },
  ];

  // Get Supabase client - using your provided details
  const getSupabaseClient = async () => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const SUPABASE_URL = "https://iwbdeakpqfljskpxjejm.supabase.co";
      const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3YmRlYWtwcWZsanNrcHhqZWptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODAxMzMsImV4cCI6MjA2ODk1NjEzM30.mvShgsITnhM9XXm77PxiC0lxsbT73v_5xv3qNKONZBo";
      
      return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
    } catch (createError) {
      console.error('Failed to create Supabase client directly:', createError);
      return null;
    }
  };

  // Helper to check if news is already displayed
  const isNewsAlreadyDisplayed = (newsId) => displayedNewsIds.has(newsId);

  // Helper to add news to the displayed set
  const addToDisplayedNews = (newsItems) => {
    const newIds = newsItems.map(item => item.id);
    setDisplayedNewsIds(prev => new Set([...prev, ...newIds]));
  };

  // Fetch news from Supabase for initial load or "load more"
  const fetchNewsFromDatabase = async (limit = 10, offset = 0) => {
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) {
        console.log('Supabase not available, using mock data for initial load');
        return mockNewsData;
      }

      const { data, error } = await supabase
        .from('news_feed')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      console.log(`Successfully fetched ${data?.length || 0} items from Supabase`);
      return data || [];
    } catch (error) {
      console.error('Error fetching from database:', error);
      return offset === 0 ? mockNewsData : []; // Return mock data on initial load failure
    }
  };

  // Transform database data to match component's internal format
  const transformNewsData = (dbNews) => {
    const newsArray = Array.isArray(dbNews) ? dbNews : [dbNews];
    return newsArray.map(item => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      category: item.category || 'general',
      image_url: item.image_url || "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop&auto=format&q=80",
      source: item.source || 'News Source',
      external_url: item.external_url || '#',
      is_live: item.is_live || false,
      created_at: item.created_at,
      views: Math.floor(Math.random() * 20000 + 1000) + '',
      impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)]
    }));
  };

  // Initialize news data on first load
  const initializeNews = async () => {
    setLoading(true);
    try {
      const dbNews = await fetchNewsFromDatabase(10, 0);
      const transformedNews = transformNewsData(dbNews);
      
      if (transformedNews.length > 0) {
        const liveNewsItem = transformedNews.find(item => item.is_live);
        const historicalNewsItems = transformedNews.filter(item => !item.is_live);
        
        setLiveNews(liveNewsItem || null);
        setHistoricalNews(historicalNewsItems);
        setLoadOffset(transformedNews.length);
        addToDisplayedNews(transformedNews);
        setHasMoreData(transformedNews.length >= 10);
      }
    } catch (error) {
      console.error('Error initializing news:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load more historical news
  const loadMoreNews = async () => {
    if (loading || !hasMoreData) return;
    setLoading(true);
    try {
      const moreDbNews = await fetchNewsFromDatabase(6, loadOffset);
      if (moreDbNews.length > 0) {
        const transformedMoreNews = transformNewsData(moreDbNews);
        const filteredNews = transformedMoreNews.filter(item => !isNewsAlreadyDisplayed(item.id));
        
        if (filteredNews.length > 0) {
          setHistoricalNews(prev => [...prev, ...filteredNews]);
          addToDisplayedNews(filteredNews);
        }
        setLoadOffset(prev => prev + moreDbNews.length);
        setHasMoreData(moreDbNews.length >= 6);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error('Error loading more news:', error);
    } finally {
      setLoading(false);
    }
  };

  // =================================================================
  // START: REALTIME SUBSCRIPTION LOGIC
  // This replaces the old setInterval and checkForUpdates logic.
  // =================================================================
  useEffect(() => {
    // 1. Initial Load: Fetch the first batch of news on component mount.
    initializeNews();

    // 2. Setup Realtime Subscription
    let subscription = null;

    const setupSubscription = async () => {
      const supabase = await getSupabaseClient();
      if (!supabase) {
        console.error("Supabase client not available for realtime subscription.");
        return;
      }

      // Create a channel that listens for any changes on the 'news_feed' table.
      subscription = supabase.channel('news_feed_changes')
        .on(
          'postgres_changes', 
          { 
            event: 'INSERT', // We only care about new articles being added.
            schema: 'public', 
            table: 'news_feed' 
          }, 
          (payload) => {
            console.log('✅ Realtime update received!', payload.new);
            setLastUpdate(new Date());

            const newNewsItem = transformNewsData([payload.new])[0];

            if (isNewsAlreadyDisplayed(newNewsItem.id)) {
                console.log('Realtime update for an already displayed item, skipping.');
                return;
            }

            // Update the state with the new article
            if (newNewsItem.is_live) {
              // The new article is the breaking news.
              // The old 'liveNews' (if it exists) becomes the top historical item.
              setLiveNews(prevLiveNews => {
                if (prevLiveNews) {
                  setHistoricalNews(prev => [{ ...prevLiveNews, is_live: false }, ...prev]);
                }
                return newNewsItem;
              });
            } else {
              // If it's not live, it becomes the newest historical item.
              setHistoricalNews(prev => [newNewsItem, ...prev]);
            }
            
            addToDisplayedNews([newNewsItem]);
          }
        )
        .subscribe((status) => {
            // This callback lets us know the status of our connection.
            if (status === 'SUBSCRIBED') {
                console.log('🟢 Successfully subscribed to realtime news updates!');
                setConnected(true);
            } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
                console.log('🔴 Realtime connection error.');
                setConnected(false);
            }
        });
    };

    setupSubscription();

    // 3. Cleanup function: This is crucial.
    // When the component is removed from the screen, we must unsubscribe.
    return () => {
      if (subscription) {
        getSupabaseClient().then(supabase => supabase?.removeChannel(subscription));
        console.log('⚪️ Unsubscribed from realtime updates.');
      }
    };
  }, []); // The empty array [] ensures this effect runs only once.

  // +++ START: Effect for Filtering News +++
  // This effect runs whenever the main news list or the active filters change.
  useEffect(() => {
      // If no filters are selected, show all historical news.
      if (activeFilters.size === 0) {
          setFilteredHistoricalNews(historicalNews);
      } else {
          // Otherwise, filter the news to include only items whose category is in the activeFilters set.
          const filtered = historicalNews.filter(news => activeFilters.has(news.category));
          setFilteredHistoricalNews(filtered);
      }
  }, [activeFilters, historicalNews]); // Dependencies: reruns when filters or news change
  // +++ END: Effect for Filtering News +++


  // Manual refresh can now just re-initialize the data
  const handleManualRefresh = () => {
    setHistoricalNews([]);
    setLiveNews(null);
    setDisplayedNewsIds(new Set());
    setLoadOffset(0);
    initializeNews();
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
      energy: 'from-emerald-500 to-emerald-600',
      // Added new categories for the filter
      ai: 'from-cyan-500 to-cyan-600',
      business: 'from-pink-500 to-pink-600',
      general: 'from-gray-500 to-gray-600'
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
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${getCategoryColor(news.category)} text-white text-xs font-bold uppercase tracking-wide shadow-lg`}>
            {news.category}
          </span>
        </div>
        
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${getImpactColor(news.impact)}`}>
            {news.impact}
          </span>
        </div>
        
        <div className={`absolute bottom-3 right-3 flex gap-2 transition-all duration-300 ${hoveredCard === news.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Bookmark className="w-4 h-4 text-gray-700" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Share2 className="w-4 h-4 text-gray-700" />
          </button>
          <button 
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            onClick={() => news.external_url !== '#' && window.open(news.external_url, '_blank')}
          >
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
    <div className={`px-4 md:px-6 lg:px-8 ${className}`} style={{ background: 'transparent' }}>
        {/* +++ Render Filter Component Conditionally +++ */}
        {showFilter && (
            <FilterComponent 
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                onClose={() => setShowFilter(false)}
                newsCategories={newsCategories}
            />
        )}

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
            
            <button 
              onClick={handleManualRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 hover:text-blue-600 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="font-medium">Refresh</span>
            </button>
            
            {/* +++ Updated Filter Button to toggle the modal +++ */}
            <button 
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 hover:text-blue-600 relative"
            >
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filter</span>
              {activeFilters.size > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {activeFilters.size}
                  </div>
              )}
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
                <span>Real-time updates</span>
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
              
              {/* +++ Use filteredHistoricalNews for rendering +++ */}
              {filteredHistoricalNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
              
              {/* Enhanced Load More Card */}
              {hasMoreData && (
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
              )}
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
