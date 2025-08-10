// File: useNewsFeed.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

// Define the shape of a news item right here for simplicity
export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  image_url: string;
  source: string;
  external_url: string;
  is_live: boolean;
  created_at: string;
  views: string;
  impact: 'high' | 'medium' | 'low';
}

// Supabase details
const SUPABASE_URL = "https://iwbdeakpqfljskpxjejm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3YmRlYWtwcWZsanNrcHhqZWptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODAxMzMsImV4cCI6MjA2ODk1NjEzM30.mvShgsITnhM9XXm77PxiC0lxsbT73v_5xv3qNKONZBo";
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);


export const useNewsFeed = () => {
  const [liveNews, setLiveNews] = useState<NewsItem | null>(null);
  const [historicalNews, setHistoricalNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loadOffset, setLoadOffset] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [displayedNewsIds, setDisplayedNewsIds] = useState(new Set<number>());
  const [activeFilters, setActiveFilters] = useState(new Set<string>());

  const isNewsAlreadyDisplayed = (newsId: number) => displayedNewsIds.has(newsId);
  
  const addToDisplayedNews = (newsItems: NewsItem[]) => {
      const newIds = newsItems.map(item => item.id);
      setDisplayedNewsIds(prev => new Set([...prev, ...newIds]));
  };

  const transformNewsData = (dbNews: any[]): NewsItem[] => {
    return dbNews.map(item => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      category: item.category || 'general',
      image_url: item.image_url || "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop&auto=format&q=80",
      source: item.source || 'News Source',
      external_url: item.external_url || '#',
      is_live: item.is_live || false,
      created_at: item.created_at,
      views: Math.floor(Math.random() * 20000 + 1000).toString(),
      impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as NewsItem['impact']
    }));
  };

  const fetchNewsFromDatabase = useCallback(async (limit = 10, offset = 0) => {
    try {
      const { data, error } = await supabase
        .from('news_feed')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching from database:', error);
      return []; 
    }
  }, []);

  const initializeNews = useCallback(async () => {
    setLoading(true);
    const dbNews = await fetchNewsFromDatabase(10, 0);
    const transformedNews = transformNewsData(dbNews);
    
    if (transformedNews.length > 0) {
      setLiveNews(transformedNews.find(item => item.is_live) || null);
      setHistoricalNews(transformedNews.filter(item => !item.is_live));
      setLoadOffset(transformedNews.length);
      addToDisplayedNews(transformedNews);
      setHasMoreData(transformedNews.length >= 10);
    }
    setLoading(false);
  }, [fetchNewsFromDatabase]);

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
  
  const handleManualRefresh = () => {
    setHistoricalNews([]);
    setLiveNews(null);
    setDisplayedNewsIds(new Set());
    setLoadOffset(0);
    initializeNews();
  };

  useEffect(() => {
    initializeNews();
    const channel = supabase.channel('news_feed_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'news_feed' }, 
      (payload) => {
        setLastUpdate(new Date());
        const newItem = transformNewsData([payload.new])[0];
        if (isNewsAlreadyDisplayed(newItem.id)) return;

        if (newItem.is_live) {
          setLiveNews(prevLive => {
            if (prevLive) setHistoricalNews(prevHist => [{ ...prevLive, is_live: false }, ...prevHist]);
            return newItem;
          });
        } else {
          setHistoricalNews(prev => [newItem, ...prev]);
        }
        addToDisplayedNews([newItem]);
      })
      .subscribe((status) => setConnected(status === 'SUBSCRIBED'));

    return () => {
      supabase.removeChannel(channel);
    };
  }, [initializeNews]);

  const filteredHistoricalNews = useMemo(() => {
    if (activeFilters.size === 0) return historicalNews;
    return historicalNews.filter(news => activeFilters.has(news.category));
  }, [activeFilters, historicalNews]);
  
  return {
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
  };
};