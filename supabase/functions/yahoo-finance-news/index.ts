import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
// Comprehensive RSS feeds from reliable sources
const RSS_FEEDS = [
  // General Financial News
  {
    url: 'https://feeds.reuters.com/reuters/businessNews',
    source: 'Reuters',
    category: 'General'
  },
  {
    url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html',
    source: 'CNBC',
    category: 'General'
  },
  {
    url: 'https://feeds.bloomberg.com/business/news.rss',
    source: 'Bloomberg',
    category: 'General'
  },
  {
    url: 'https://rss.cnn.com/rss/money_news_economy.rss',
    source: 'CNN Business',
    category: 'General'
  },
  // Markets & Trading
  {
    url: 'https://feeds.reuters.com/reuters/markets',
    source: 'Reuters',
    category: 'Markets'
  },
  {
    url: 'https://www.cnbc.com/id/15839135/device/rss/rss.html',
    source: 'CNBC Markets',
    category: 'Markets'
  },
  {
    url: 'https://feeds.finance.yahoo.com/rss/2.0/headline',
    source: 'Yahoo Finance',
    category: 'Markets'
  },
  // Cryptocurrency
  {
    url: 'https://feeds.reuters.com/reuters/technology',
    source: 'Reuters Tech',
    category: 'Crypto'
  },
  {
    url: 'https://www.coindesk.com/arc/outboundfeeds/rss/',
    source: 'CoinDesk',
    category: 'Crypto'
  },
  {
    url: 'https://cointelegraph.com/rss',
    source: 'Cointelegraph',
    category: 'Crypto'
  },
  // Regional Feeds
  {
    url: 'https://feeds.reuters.com/reuters/INtopNews',
    source: 'Reuters',
    category: 'General',
    region: 'India'
  },
  {
    url: 'https://feeds.reuters.com/reuters/UKdomesticNews',
    source: 'Reuters',
    category: 'General',
    region: 'UK'
  },
  {
    url: 'https://feeds.reuters.com/reuters/EuropeNews',
    source: 'Reuters',
    category: 'General',
    region: 'Europe'
  },
  {
    url: 'https://feeds.reuters.com/reuters/AsiaNews',
    source: 'Reuters',
    category: 'General',
    region: 'Asia'
  },
  // Sector Specific
  {
    url: 'https://feeds.reuters.com/reuters/energy',
    source: 'Reuters',
    category: 'Energy',
    sector: 'Energy'
  },
  {
    url: 'https://feeds.reuters.com/reuters/healthcare',
    source: 'Reuters',
    category: 'Healthcare',
    sector: 'Pharmaceuticals'
  },
  {
    url: 'https://feeds.reuters.com/reuters/automotive',
    source: 'Reuters',
    category: 'Automotive',
    sector: 'Automotive'
  }
];
// Category mapping for intelligent content classification
const CATEGORY_KEYWORDS = {
  'Monetary Policy': [
    'federal reserve',
    'fed',
    'interest rate',
    'monetary policy',
    'central bank',
    'inflation rate',
    'rate cut',
    'rate hike'
  ],
  'Crypto': [
    'bitcoin',
    'ethereum',
    'cryptocurrency',
    'blockchain',
    'crypto',
    'digital currency',
    'defi',
    'nft'
  ],
  'AI': [
    'artificial intelligence',
    'ai',
    'machine learning',
    'chatgpt',
    'openai',
    'nvidia',
    'automation'
  ],
  'Inflation': [
    'inflation',
    'cpi',
    'consumer price',
    'deflation',
    'price increase'
  ],
  'Deals': [
    'merger',
    'acquisition',
    'buyout',
    'deal',
    'takeover',
    'ipo',
    'spac'
  ],
  'Investment Banks': [
    'goldman sachs',
    'morgan stanley',
    'jp morgan',
    'investment bank'
  ],
  'Private Equity': [
    'private equity',
    'blackstone',
    'kkr',
    'carlyle'
  ],
  'Hedge Funds': [
    'hedge fund',
    'citadel',
    'bridgewater'
  ],
  'Trade': [
    'trade war',
    'tariff',
    'export',
    'import',
    'wto'
  ],
  'Startups': [
    'startup',
    'venture capital',
    'funding',
    'seed round',
    'series a'
  ],
  'Taxes': [
    'tax',
    'irs',
    'taxation',
    'tax reform'
  ],
  'Currencies': [
    'currency',
    'forex',
    'dollar',
    'euro',
    'yen',
    'exchange rate'
  ],
  'Energy': [
    'oil',
    'gas',
    'renewable',
    'solar',
    'wind',
    'energy'
  ],
  'Pharmaceuticals': [
    'pharma',
    'drug',
    'medicine',
    'fda',
    'vaccine'
  ],
  'Automotive': [
    'tesla',
    'ford',
    'gm',
    'electric vehicle',
    'ev',
    'automotive'
  ],
  'Aerospace': [
    'boeing',
    'airbus',
    'aerospace',
    'aviation',
    'space'
  ],
  'Entertainment': [
    'disney',
    'netflix',
    'streaming',
    'media',
    'entertainment'
  ],
  'Property': [
    'real estate',
    'housing',
    'property',
    'reit',
    'mortgage'
  ]
};
const REGION_KEYWORDS = {
  'China': [
    'china',
    'chinese',
    'beijing',
    'shanghai'
  ],
  'India': [
    'india',
    'indian',
    'mumbai',
    'delhi',
    'rupee'
  ],
  'UK': [
    'britain',
    'british',
    'london',
    'pound',
    'sterling'
  ],
  'Europe': [
    'europe',
    'european',
    'eu',
    'euro'
  ],
  'Asia': [
    'asia',
    'asian',
    'japan',
    'korea',
    'singapore'
  ],
  'Africa': [
    'africa',
    'african',
    'south africa'
  ],
  'Middle East': [
    'middle east',
    'saudi',
    'uae',
    'israel'
  ],
  'Latin America': [
    'brazil',
    'mexico',
    'argentina',
    'latin america'
  ]
};
// News item type definition
interface NewsItem {
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  source: string;
  category: string;
  region?: string;
  sector?: string;
}

// Enhanced XML parsing function
function parseRSSItem(itemXML) {
  try {
    // Multiple parsing strategies for different RSS formats
    const titleRegex = /<title(?:\s[^>]*)?>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/is;
    const descRegex = /<description(?:\s[^>]*)?>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/description>/is;
    const linkRegex = /<link(?:\s[^>]*)?>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>/is;
    const pubDateRegex = /<pubDate(?:\s[^>]*)?>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/pubDate>/is;
    const guidRegex = /<guid(?:\s[^>]*)?>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/guid>/is;
    const title = titleRegex.exec(itemXML)?.[1]?.trim();
    const description = descRegex.exec(itemXML)?.[1]?.trim();
    const link = linkRegex.exec(itemXML)?.[1]?.trim();
    const pubDate = pubDateRegex.exec(itemXML)?.[1]?.trim();
    const guid = guidRegex.exec(itemXML)?.[1]?.trim();
    if (!title) return null;
    // Clean description and remove HTML tags
    const cleanDescription = description ? description.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').substring(0, 300) : '';
    return {
      title: title.replace(/&[^;]+;/g, ' '),
      summary: cleanDescription,
      url: link || guid || '#',
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString()
    };
  } catch (error) {
    console.error('Error parsing RSS item:', error);
    return null;
  }
}
// Intelligent content categorization
function categorizeContent(title, summary) {
  const content = `${title} ${summary}`.toLowerCase();
  let bestCategory = 'General';
  let maxMatches = 0;
  let region;
  let sector;
  // Find best matching category
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)){
    const matches = keywords.filter((keyword)=>content.includes(keyword.toLowerCase())).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCategory = category;
    }
  }
  // Detect region
  for (const [regionName, keywords] of Object.entries(REGION_KEYWORDS)){
    if (keywords.some((keyword)=>content.includes(keyword.toLowerCase()))) {
      region = regionName;
      break;
    }
  }
  // Detect sector (same as category for sectors)
  const sectorCategories = ['Energy', 'Pharmaceuticals', 'Automotive', 'Aerospace'];
  if (sectorCategories.includes(bestCategory)) {
    sector = bestCategory;
  }
  return {
    category: bestCategory,
    region,
    sector
  };
}
// Fetch and parse RSS feed with retry logic
async function fetchRSSFeed(feed): Promise<NewsItem[]> {
  const items: NewsItem[] = [];
  let attempts = 0;
  const maxAttempts = 2;
  while(attempts < maxAttempts){
    try {
      console.log(`Fetching from: ${feed.url} (attempt ${attempts + 1})`);
      const controller = new AbortController();
      const timeoutId = setTimeout(()=>controller.abort(), 8000); // 8 second timeout
      const response = await fetch(feed.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/2.0; +https://example.com)',
          'Accept': 'application/rss+xml, application/xml, text/xml',
          'Cache-Control': 'no-cache'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const xmlText = await response.text();
      console.log(`Retrieved ${xmlText.length} characters from ${feed.source}`);
      // Parse RSS items with multiple fallback patterns
      const itemPatterns = [
        /<item[^>]*>(.*?)<\/item>/gis,
        /<entry[^>]*>(.*?)<\/entry>/gis
      ];
      let rssItems: RegExpMatchArray[] = [];
      for (const pattern of itemPatterns){
        rssItems = Array.from(xmlText.matchAll(pattern));
        if (rssItems.length > 0) break;
      }
      console.log(`Found ${rssItems.length} items in ${feed.source} feed`);
      for (const match of rssItems.slice(0, 15)){
        const parsedItem = parseRSSItem(match[1]);
        if (parsedItem && parsedItem.title) {
          const categorization = categorizeContent(parsedItem.title, parsedItem.summary || '');
          items.push({
            title: parsedItem.title,
            summary: parsedItem.summary || '',
            url: parsedItem.url || '#',
            publishedAt: parsedItem.publishedAt || new Date().toISOString(),
            source: feed.source,
            category: categorization.category,
            region: categorization.region || feed.region,
            sector: categorization.sector || feed.sector
          });
        }
      }
      break; // Success, exit retry loop
    } catch (error) {
      attempts++;
      console.error(`Error fetching ${feed.source} (attempt ${attempts}):`, error.message);
      if (attempts >= maxAttempts) {
        console.error(`Failed to fetch ${feed.source} after ${maxAttempts} attempts`);
      } else {
        // Wait before retry
        await new Promise((resolve)=>setTimeout(resolve, 1000));
      }
    }
  }
  return items;
}
// Main handler function
const handler = async (req)=>{
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  const startTime = Date.now();
  console.log('Starting news aggregation...');
  try {
    // Fetch from multiple feeds concurrently with proper error handling
    const feedPromises = RSS_FEEDS.map((feed)=>fetchRSSFeed(feed).catch((error)=>{
        console.error(`Failed to fetch ${feed.source}:`, error);
        return []; // Return empty array on error
      }));
    const results = await Promise.allSettled(feedPromises);
    const allNews: NewsItem[] = [];
    results.forEach((result, index)=>{
      if (result.status === 'fulfilled') {
        allNews.push(...result.value);
      } else {
        console.error(`Feed ${RSS_FEEDS[index].source} failed:`, result.reason);
      }
    });
    // Remove duplicates based on title similarity
    const uniqueNews = allNews.reduce<NewsItem[]>((acc, current)=>{
      const isDuplicate = acc.some((item)=>item.title.toLowerCase().substring(0, 50) === current.title.toLowerCase().substring(0, 50));
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);
    // Sort by publication date (newest first) and limit results
    const sortedNews = uniqueNews.sort((a, b)=>new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 50);
    // Group by categories for better organization
    const categorizedNews = sortedNews.reduce<Record<string, NewsItem[]>>((acc, item)=>{
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
    const processingTime = Date.now() - startTime;
    console.log(`Processed ${sortedNews.length} unique news items in ${processingTime}ms`);
    return new Response(JSON.stringify({
      success: true,
      data: sortedNews,
      categorized: categorizedNews,
      count: sortedNews.length,
      sources: [
        ...new Set(sortedNews.map((item)=>item.source))
      ],
      categories: Object.keys(categorizedNews),
      lastUpdated: new Date().toISOString(),
      processingTimeMs: processingTime,
      cacheExpiry: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error('Critical error in news aggregation:', error);
    // Fallback news in case of complete failure
    const fallbackNews = [
      {
        title: "Market Update: Trading Activity Continues",
        summary: "Financial markets show ongoing activity with mixed signals across sectors",
        url: "#",
        publishedAt: new Date().toISOString(),
        source: "Market Update",
        category: "General"
      },
      {
        title: "Economic Indicators Show Steady Performance",
        summary: "Latest economic data reflects consistent performance across key metrics",
        url: "#",
        publishedAt: new Date(Date.now() - 600000).toISOString(),
        source: "Economic News",
        category: "General"
      }
    ];
    return new Response(JSON.stringify({
      success: false,
      data: fallbackNews,
      count: fallbackNews.length,
      error: "Primary news sources unavailable, showing fallback content",
      lastUpdated: new Date().toISOString(),
      processingTimeMs: Date.now() - startTime
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
};
serve(handler);
