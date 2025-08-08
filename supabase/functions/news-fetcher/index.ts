// =====================================
// SUPABASE EDGE FUNCTION: news-fetcher
// File: supabase/functions/news-fetcher/index.ts
// =====================================
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
// News API Configuration
const NEWS_APIS = {
  // NewsAPI.org (15,000 requests/month FREE)
  newsapi: {
    url: 'https://newsapi.org/v2/everything',
    key: Deno.env.get('NEWS_API_KEY'),
    params: {
      q: 'finance OR crypto OR bitcoin OR stock market OR trading OR "federal reserve" OR inflation',
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 1
    }
  },
  // Alpha Vantage (500 requests/day FREE)
  alphaVantage: {
    url: 'https://www.alphavantage.co/query',
    key: Deno.env.get('ALPHA_VANTAGE_KEY'),
    params: {
      function: 'NEWS_SENTIMENT',
      tickers: 'AAPL,GOOGL,MSFT,TSLA,BTC,ETH',
      limit: 1
    }
  },
  // Multiple RSS feeds (Unlimited FREE)
  rss: {
    urls: [
      "https://feeds.bloomberg.com/business/news.rss",
      "https://cointelegraph.com/rss",
      "https://www.coindesk.com/arc/outboundfeeds/rss/",
      "https://www.cnbc.com/id/15839135/device/rss/rss.html",
      "https://www.cnbc.com/id/100003114/device/rss/rss.html",
      "https://www.livemint.com/rss/market",
      "https://feeds.bloomberg.com/markets/news.rss",
      "https://feeds.bloomberg.com/technology/news.rss",
      "https://economictimes.indiatimes.com/rssfeedsdefault.cms",
      "https://www.theguardian.com/uk/business/rss",
      "https://www.euronews.com/rss?level=theme&name=business",
      "https://www.scmp.com/rss/91/feed",
      "https://oilprice.com/rss/main",
      "https://www.privateequitywire.co.uk/rss",
      "https://cityam.com/feed/",
      "https://www.hedgeweek.com/rss",
      "https://banking.einnews.com/rss",
      "https://feeds.bbci.co.uk/news/business/rss.xml",
      "https://feeds.theguardian.com/theguardian/uk/business/rss",
      "https://growthbusiness.co.uk/feed/",
      "https://feeds.bbci.co.uk/news/health/rss.xml",
      "https://www.autocar.co.uk/rss",
      "https://www.cityam.com/feed/"
    ]
  }
};
// =================================================================
// START: HELPER FUNCTION FOR STRICT DUPLICATE CHECK
// =================================================================
/**
 * Checks if a news article with the exact same title already exists in the database.
 * This is a strict check to prevent re-inserting the same article ever again.
 */ async function doesTitleExist(supabase, title) {
  try {
    const { count, error } = await supabase.from('news_feed').select('*', {
      count: 'exact',
      head: true
    }).eq('title', title);
    if (error) {
      console.error('Error in doesTitleExist check:', error);
      return false;
    }
    return count > 0;
  } catch (err) {
    console.error('Exception in doesTitleExist:', err);
    return false;
  }
}
// =================================================================
// END: HELPER FUNCTION
// =================================================================
serve(async (req)=>{
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    // Initialize Supabase client with service role key
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    console.log('🚀 Starting news fetch process...');
    // Fetch latest news from available APIs
    const newsItem = await fetchLatestNews(supabase);
    if (!newsItem) {
      console.log('❌ No new, non-duplicate news found from APIs or RSS feeds.');
      return new Response(JSON.stringify({
        success: true,
        message: 'No new news found to process.'
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // =================================================================
    // THIS IS THE MAIN LOGIC THAT CALLS THE HELPER FUNCTION
    // =================================================================
    const titleAlreadyExists = await doesTitleExist(supabase, newsItem.title);
    if (titleAlreadyExists) {
      console.log(`❌ Duplicate found. This title is already in the database: "${newsItem.title}"`);
      return new Response(JSON.stringify({
        success: true,
        message: 'This news article already exists and will not be re-inserted.'
      }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    // =================================================================
    // END: DUPLICATE CHECK LOGIC
    // =================================================================
    // Mark previous live news as historical
    const { error: updateError } = await supabase.from('news_feed').update({
      is_live: false
    }).eq('is_live', true);
    if (updateError) {
      console.error('Error updating previous news:', updateError);
    }
    // Insert new live news
    const { data, error } = await supabase.from('news_feed').insert([
      {
        ...newsItem,
        is_live: true
      }
    ]).select();
    if (error) {
      console.error('Error inserting news:', error);
      throw error;
    }
    console.log('✅ Successfully inserted new live news:', data[0].title);
    return new Response(JSON.stringify({
      success: true,
      news: data[0],
      message: 'News updated successfully'
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('❌ Top-level error in news-fetcher:', error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
});
async function fetchLatestNews(supabase) {
  // Try NewsAPI first (most reliable)
  try {
    const newsApiResult = await fetchFromNewsAPI(supabase);
    if (newsApiResult) {
      console.log('✅ Got news from NewsAPI');
      return newsApiResult;
    }
  } catch (error) {
    console.log('NewsAPI failed:', error.message);
  }
  // Try Alpha Vantage
  try {
    const alphaResult = await fetchFromAlphaVantage(supabase);
    if (alphaResult) {
      console.log('✅ Got news from Alpha Vantage');
      return alphaResult;
    }
  } catch (error) {
    console.log('Alpha Vantage failed:', error.message);
  }
  // Fallback to RSS
  try {
    const rssResult = await fetchFromRSS(supabase);
    if (rssResult) {
      console.log('✅ Got news from RSS');
      return rssResult;
    }
  } catch (error) {
    console.log('RSS failed:', error.message);
  }
  return null;
}
async function fetchFromNewsAPI(supabase) {
  const { newsapi } = NEWS_APIS;
  if (!newsapi.key) {
    console.log('NewsAPI key not found');
    return null;
  }
  const params = new URLSearchParams({
    ...newsapi.params,
    apiKey: newsapi.key
  });
  const response = await fetch(`${newsapi.url}?${params}`);
  if (!response.ok) {
    throw new Error(`NewsAPI HTTP ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  if (data.status === 'error') {
    throw new Error(`NewsAPI Error: ${data.message}`);
  }
  if (data.articles && data.articles.length > 0) {
    const article = data.articles[0];
    const cleanedTitle = cleanTitle(article.title);
    if (await doesTitleExist(supabase, cleanedTitle)) {
      console.log(`⚠️ NewsAPI article is a duplicate, skipping: ${cleanedTitle}`);
      return null;
    }
    if (article.title.includes('[Removed]') || article.title.length < 20) {
      return null;
    }
    return {
      title: cleanedTitle,
      summary: cleanText(article.description || article.content?.substring(0, 200) || 'Breaking financial news update'),
      image_url: article.urlToImage && isValidImageUrl(article.urlToImage) ? article.urlToImage : getRandomFinanceImage(),
      category: determineCategory(article.title + ' ' + (article.description || '')),
      source: article.source?.name || 'NewsAPI',
      external_url: article.url
    };
  }
  return null;
}
async function fetchFromAlphaVantage(supabase) {
  const { alphaVantage } = NEWS_APIS;
  if (!alphaVantage.key) return null;
  const params = new URLSearchParams({
    ...alphaVantage.params,
    apikey: alphaVantage.key
  });
  const response = await fetch(`${alphaVantage.url}?${params}`);
  if (!response.ok) {
    throw new Error(`Alpha Vantage HTTP ${response.status}`);
  }
  const data = await response.json();
  if (data['Error Message']) {
    throw new Error(`Alpha Vantage: ${data['Error Message']}`);
  }
  if (data.feed && data.feed.length > 0) {
    const article = data.feed[0];
    const cleanedTitle = cleanTitle(article.title);
    if (await doesTitleExist(supabase, cleanedTitle)) {
      console.log(`⚠️ Alpha Vantage article is a duplicate, skipping: ${cleanedTitle}`);
      return null;
    }
    return {
      title: cleanedTitle,
      summary: cleanText(article.summary || 'Market sentiment analysis and financial insights'),
      image_url: article.banner_image || getRandomFinanceImage(),
      category: determineCategory(article.title + ' ' + (article.summary || '')),
      source: 'Alpha Vantage',
      external_url: article.url
    };
  }
  return null;
}
function extractSourceFromRSS(rssUrl) {
  const sourceMap = {
    'bloomberg.com': 'Bloomberg',
    'cointelegraph.com': 'Cointelegraph',
    'coindesk.com': 'CoinDesk',
    'cnbc.com': 'CNBC',
    'livemint.com': 'Mint',
    'economictimes.indiatimes.com': 'Economic Times',
    'theguardian.com': 'The Guardian',
    'euronews.com': 'Euronews',
    'scmp.com': 'South China Morning Post',
    'oilprice.com': 'OilPrice',
    'privateequitywire.co.uk': 'Private Equity Wire',
    'cityam.com': 'City AM',
    'hedgeweek.com': 'HedgeWeek',
    'banking.einnews.com': 'Banking News',
    'bbci.co.uk': 'BBC',
    'growthbusiness.co.uk': 'Growth Business',
    'autocar.co.uk': 'Autocar'
  };
  for (const [domain, name] of Object.entries(sourceMap)){
    if (rssUrl.includes(domain)) {
      return name;
    }
  }
  try {
    const url = new URL(rssUrl);
    return url.hostname.replace('www.', '').replace('feeds.', '').split('.')[0];
  } catch  {
    return 'RSS Feed';
  }
}
async function fetchFromRSS(supabase) {
  const { rss } = NEWS_APIS;
  for (const rssUrl of rss.urls){
    try {
      console.log(`Trying RSS feed: ${rssUrl}`);
      const response = await fetch(rssUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)'
        }
      });
      if (!response.ok) {
        console.log(`RSS HTTP ${response.status} for ${rssUrl}`);
        continue;
      }
      const xmlText = await response.text();
      const items = xmlText.match(/<item>[\s\S]*?<\/item>/g);
      if (items && items.length > 0) {
        for (const item of items.slice(0, 3)){
          const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || item.match(/<title>(.*?)<\/title>/);
          if (titleMatch && titleMatch[1]) {
            const cleanedTitle = cleanTitle(titleMatch[1]);
            if (await doesTitleExist(supabase, cleanedTitle)) {
              console.log(`⚠️ RSS news is duplicate, trying next item/feed: ${cleanedTitle}`);
              continue;
            }
            const descMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || item.match(/<description>(.*?)<\/description>/);
            const linkMatch = item.match(/<link>(.*?)<\/link>/);
            let extractedImage = getRandomFinanceImage();
            const imagePatterns = [
              /<media:content[^>]+url="([^"]+)"/i,
              /<enclosure[^>]+url="([^"]+)"[^>]*type="image/i,
              /<media:thumbnail[^>]+url="([^"]+)"/i,
              /<image[^>]*>\s*<url>([^<]+)<\/url>/i,
              /<itunes:image[^>]+href="([^"]+)"/i
            ];
            for (const pattern of imagePatterns){
              const imageMatch = item.match(pattern);
              if (imageMatch && imageMatch[1] && isValidImageUrl(imageMatch[1])) {
                extractedImage = imageMatch[1];
                break;
              }
            }
            if (extractedImage === getRandomFinanceImage() && descMatch?.[1]) {
              const descImageMatch = descMatch[1].match(/<img[^>]+src="([^"]+)"/i);
              if (descImageMatch && descImageMatch[1] && isValidImageUrl(descImageMatch[1])) {
                extractedImage = descImageMatch[1];
              }
            }
            const cleanedDescription = cleanText(descMatch?.[1]?.replace(/<[^>]*>/g, '').substring(0, 200) || 'Latest financial market update');
            return {
              title: cleanedTitle,
              summary: cleanedDescription,
              image_url: extractedImage,
              category: determineCategory(cleanedTitle + ' ' + cleanedDescription),
              source: extractSourceFromRSS(rssUrl),
              external_url: linkMatch?.[1]
            };
          }
        }
      }
    } catch (error) {
      console.log(`RSS parsing error for ${rssUrl}:`, error.message);
      continue;
    }
  }
  return null;
}
function generateSampleNews() {
  const sampleNews = [
    {
      title: "🚀 Bitcoin Breaks Key Resistance Level",
      summary: "Cryptocurrency markets show strong momentum as Bitcoin pushes past technical resistance with increased institutional interest.",
      category: "crypto"
    },
    {
      title: "📈 Tech Stocks Lead Market Rally",
      summary: "Technology sector gains momentum on positive earnings outlook and AI investment growth across major companies.",
      category: "tech"
    },
    {
      title: "💹 Federal Reserve Policy Update",
      summary: "Central bank officials provide guidance on monetary policy direction amid changing economic conditions.",
      category: "markets"
    },
    {
      title: "⚡ Electric Vehicle Sales Surge",
      summary: "EV manufacturers report record deliveries as consumer adoption accelerates across global markets.",
      category: "stocks"
    },
    {
      title: "🥇 Gold Hits Multi-Month High",
      summary: "Precious metals rally on safe-haven demand as investors seek portfolio diversification.",
      category: "commodities"
    }
  ];
  const randomNews = sampleNews[Math.floor(Math.random() * sampleNews.length)];
  return {
    ...randomNews,
    image_url: getRandomFinanceImage(),
    source: 'Financial Wire'
  };
}
function cleanText(text) {
  if (!text) return '';
  return text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ').replace(/&#8230;/g, '...').replace(/&hellip;/g, '...').replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/<span[^>]*class="match"[^>]*>/gi, '').replace(/<\/span>/gi, '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}
function cleanTitle(title) {
  let cleaned = cleanText(title);
  cleaned = cleaned.replace(/^.*?:\s*/, '').replace(/\s*-\s*.*$/, '').trim();
  if (!cleaned.match(/^[\u{1F600}-\u{1F6FF}]|^[\u{1F300}-\u{1F5FF}]|^[\u{1F680}-\u{1F6FF}]|^[\u{1F700}-\u{1F77F}]|^[\u{1F780}-\u{1F7FF}]|^[\u{1F800}-\u{1F8FF}]|^[\u{2600}-\u{26FF}]|^[\u{2700}-\u{27BF}]/u)) {
    const category = determineCategory(cleaned);
    const emojis = {
      crypto: '🚀',
      stocks: '📈',
      tech: '🤖',
      markets: '💹',
      commodities: '🥇',
      banking: '🏦',
      energy: '⚡',
      business: '💼',
      ai: '🧠',
      health: '🏥',
      automotive: '🚗'
    };
    cleaned = `${emojis[category] || '📊'} ${cleaned}`;
  }
  return cleaned;
}
function determineCategory(text) {
  const categories = {
    crypto: [
      'bitcoin',
      'crypto',
      'blockchain',
      'ethereum',
      'dogecoin',
      'altcoin',
      'defi',
      'btc',
      'eth',
      'cryptocurrency',
      'digital currency',
      'mining'
    ],
    stocks: [
      'stock',
      'share',
      'equity',
      'dividend',
      'earnings',
      'ipo',
      'nasdaq',
      'nyse',
      'dow jones',
      'sp500',
      's&p'
    ],
    tech: [
      'tech',
      'technology',
      'software',
      'apple',
      'google',
      'microsoft',
      'meta',
      'amazon',
      'netflix',
      'tesla tech'
    ],
    ai: [
      'ai',
      'artificial intelligence',
      'machine learning',
      'chatgpt',
      'openai',
      'neural network',
      'deep learning',
      'automation'
    ],
    markets: [
      'market',
      'trading',
      'wall street',
      'dow',
      'sp500',
      'fed',
      'federal reserve',
      'interest rate',
      'inflation',
      'recession'
    ],
    commodities: [
      'gold',
      'oil',
      'silver',
      'commodity',
      'crude',
      'copper',
      'platinum',
      'natural gas',
      'wheat',
      'corn'
    ],
    banking: [
      'bank',
      'banking',
      'loan',
      'credit',
      'mortgage',
      'jpmorgan',
      'goldman sachs',
      'wells fargo',
      'citibank'
    ],
    energy: [
      'energy',
      'renewable',
      'solar',
      'wind',
      'nuclear',
      'power',
      'electricity',
      'exxon',
      'chevron'
    ],
    business: [
      'business',
      'company',
      'corporate',
      'merger',
      'acquisition',
      'revenue',
      'profit',
      'ceo',
      'startup'
    ],
    health: [
      'health',
      'healthcare',
      'pharma',
      'medical',
      'drug',
      'vaccine',
      'hospital',
      'medicine'
    ],
    automotive: [
      'car',
      'automotive',
      'vehicle',
      'ford',
      'gm',
      'toyota',
      'volkswagen',
      'electric vehicle',
      'ev'
    ]
  };
  const lowerText = text.toLowerCase();
  for (const [category, keywords] of Object.entries(categories)){
    if (keywords.some((keyword)=>lowerText.includes(keyword))) {
      return category;
    }
  }
  return 'markets';
}
function isValidImageUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' && (urlObj.pathname.includes('.jpg') || urlObj.pathname.includes('.jpeg') || urlObj.pathname.includes('.png') || urlObj.pathname.includes('.webp') || url.includes('unsplash.com') || url.includes('images.'));
  } catch  {
    return false;
  }
}
function getRandomFinanceImage() {
  const images = [
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518544866330-4e35c8f1b456?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=300&fit=crop&q=80'
  ];
  return images[Math.floor(Math.random() * images.length)];
}
