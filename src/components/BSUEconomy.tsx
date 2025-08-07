import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Info, TrendingUp, AlertTriangle, Filter } from 'lucide-react';

// Mock BSU data
const bsuIndex = [
  { category: "Electronics", example: "Bluetooth Speaker", bsuRange: "12–15", minBsu: 12, maxBsu: 15 },
  { category: "Services", example: "1-hour Coding Help", bsuRange: "10–12", minBsu: 10, maxBsu: 12 },
  { category: "Photography Gear", example: "Used DSLR Camera", bsuRange: "45–50", minBsu: 45, maxBsu: 50 },
  { category: "Skills", example: "Logo Design (2 Concepts)", bsuRange: "25–30", minBsu: 25, maxBsu: 30 },
  { category: "Food", example: "3x Home-Cooked Meals", bsuRange: "18–22", minBsu: 18, maxBsu: 22 },
  { category: "Books", example: "Programming Books Set", bsuRange: "8–12", minBsu: 8, maxBsu: 12 },
  { category: "Furniture", example: "Office Chair", bsuRange: "35–40", minBsu: 35, maxBsu: 40 },
  { category: "Art", example: "Digital Illustration", bsuRange: "20–25", minBsu: 20, maxBsu: 25 }
];

// Mock marketplace items with BSU values
const mockMarketplaceItems = [
  { id: 1, name: "Vintage Camera", category: "Photography Gear", bsu: 47 },
  { id: 2, name: "Web Design Service", category: "Services", bsu: 28 },
  { id: 3, name: "Ergonomic Keyboard", category: "Electronics", bsu: 14 },
  { id: 4, name: "Guitar Lessons", category: "Skills", bsu: 22 },
  { id: 5, name: "Homemade Pastries", category: "Food", bsu: 19 },
  { id: 6, name: "Standing Desk", category: "Furniture", bsu: 38 },
  { id: 7, name: "Portrait Session", category: "Skills", bsu: 31 },
  { id: 8, name: "Tech Books Bundle", category: "Books", bsu: 11 }
];

const BSUEconomy = () => {
  const [bsuRange, setBsuRange] = useState([0, 100]);
  const [showMismatchWarning, setShowMismatchWarning] = useState(false);

  // Filter items based on BSU range
  const filteredItems = mockMarketplaceItems.filter(
    item => item.bsu >= bsuRange[0] && item.bsu <= bsuRange[1]
  );

  const getBSUColor = (bsu) => {
    if (bsu <= 15) return 'bg-green-100 text-green-800';
    if (bsu <= 30) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const simulateMismatchCheck = () => {
    const offerBSU = 45;
    const requestBSU = 25;
    const mismatch = Math.abs(offerBSU - requestBSU) / Math.max(offerBSU, requestBSU) * 100;
    
    if (mismatch > 15) {
      setShowMismatchWarning(true);
      setTimeout(() => setShowMismatchWarning(false), 5000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            BSU Economy: Platform Value Layer
          </h2>
          <p className="text-xl text-gray-600 font-medium">
            Because chickens don't scale
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* What is BSU Section */}
          <div>
            <Card className="bg-white border-0 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Info className="w-6 h-6 text-blue-600" />
                  What is BSU?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>BSU (Barter-Stable Unit)</strong> is how we estimate fair value.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Based on completed trades across categories, the system learns how much a thing is worth in context.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>No tokens. No fiat. No fixed prices.</strong> Just trade intelligence.
                </p>
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Dynamic Pricing</h4>
                      <p className="text-sm text-blue-800">
                        BSU values adjust based on real trade patterns, demand fluctuations, and category trends.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* BSU Range Filter */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter by BSU Range
                </CardTitle>
                <CardDescription>
                  Showing {filteredItems.length} items in range {bsuRange[0]}–{bsuRange[1]} BSU
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={bsuRange}
                    onValueChange={setBsuRange}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0 BSU</span>
                    <span>100 BSU</span>
                  </div>
                  
                  {/* Filtered Items Preview */}
                  <div className="grid grid-cols-2 gap-2 mt-6">
                    {filteredItems.slice(0, 4).map(item => (
                      <div key={item.id} className="p-2 bg-gray-50 rounded-lg border">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-800 truncate">
                            {item.name}
                          </span>
                          <Badge className={`text-xs ${getBSUColor(item.bsu)}`}>
                            {item.bsu} BSU
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-500">{item.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* BSU Index Table */}
          <div>
            <Card className="bg-white border-0 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Sample BSU Index</CardTitle>
                <CardDescription>
                  Current market rates across categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bsuIndex.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{item.category}</div>
                        <div className="text-sm text-gray-600">{item.example}</div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getBSUColor((item.minBsu + item.maxBsu) / 2)}`}>
                          {item.bsuRange} BSU
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1 cursor-pointer group">
                          <Info className="w-3 h-3 inline mr-1" />
                          <span className="group-hover:text-gray-700">
                            Based on historical trade behavior
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* BSU Mismatch Demo */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  Mismatch Detection Demo
                </CardTitle>
                <CardDescription>
                  See how BSU prevents unfair trades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <button
                  onClick={simulateMismatchCheck}
                  className="w-full p-4 bg-gray-100 hover:bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 transition-colors text-gray-700"
                >
                  Simulate Imbalanced Trade
                </button>

                {showMismatchWarning && (
                  <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg animate-pulse">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 mb-2">Trade Imbalance Detected</h4>
                        <p className="text-sm text-yellow-800 mb-2">
                          Your offer (45 BSU) and request (25 BSU) are imbalanced. Continue anyway?
                        </p>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700">
                            Continue Anyway
                          </button>
                          <button className="px-3 py-1 bg-white text-yellow-800 text-sm rounded border border-yellow-300 hover:bg-yellow-50">
                            Adjust Offer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    BSU calculations run in real-time
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BSUEconomy;