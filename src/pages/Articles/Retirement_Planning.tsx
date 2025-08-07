import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import annualSpendingImage from "@/assets/Learn/Retirement/annual_spending.png";
import annuityPotImage from "@/assets/Learn/Retirement/annuity_pot.png";
import portfolioDepletion from "@/assets/Learn/Retirement/portfolio_depletion.png";

const Retirement = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-20">
                <article className="max-w-3xl mx-auto px-3 py-16">
                    {/* Article Header */}
                    <header className="mb-16 text-center">
                        <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-8 leading-tight">
                            How Much Do You Really Need to Retire Happy?
                        </h1>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                            <span>By Ashish Choudhary</span>
                            <span>•</span>
                            <span>7 min read</span>
                        </div>
                        <Separator className="w-16 mx-auto mt-8" />
                    </header>

                    {/* Article Content */}
                    <div className="prose-custom space-y-8">
                        <div className="text-xl leading-relaxed text-gray-700 space-y-6">
                            <p>
                                Let's cut through the noise for a second. Most people already know they should be saving for retirement. The real question is: <strong>how much is enough</strong> to actually stop working and live the life you want?
                            </p>

                            <p>
                                Turns out, most of us are worried. Around 6 in 10 millennials think they'll need to work again after retiring. A similar chunk of Gen Z feels behind already. And over half of UK adults are nervous about their standard of living dropping when they stop earning. So if you've been feeling anxious about this you're not alone.
                            </p>

                            <p>
                                Here's the thing: retirement doesn't look the same for everyone. For some, it's a full stop with no more work, more travel, and time for hobbies. For others, it's more of a pivot, maybe working fewer hours, freelancing, or doing something more creative.
                            </p>

                            <p>
                                That's why there's no single number that fits everyone. What you really need is a plan that matches your lifestyle goals.
                            </p>
                        </div>

                        <Separator className="my-12" />

                        <section className="space-y-6">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                                <h2 className="text-3xl font-light tracking-tight">Get Clear on the Life You Want</h2>
                            </div>

                            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                                <p>
                                    A good starting point is to figure out what kind of life you want to live once work becomes optional. Fancy a few holidays each year? Dining out regularly? Want to help your kids or grandkids financially? The more specific you get, the better.
                                </p>

                                <p>
                                    The UK's Pensions and Lifetime Savings Association (PLSA) breaks retirement lifestyles down into three buckets:
                                </p>

                                <div className="bg-gray-50 p-8 rounded-lg space-y-4">
                                    <div className="border-l-4 border-black pl-6">
                                        <h4 className="font-medium text-black mb-2">Minimum</h4>
                                        <p className="text-gray-600">Covers basic needs. One UK holiday a year, public transport, occasional meals out.</p>
                                    </div>
                                    <div className="border-l-4 border-gray-400 pl-6">
                                        <h4 className="font-medium text-black mb-2">Moderate</h4>
                                        <p className="text-gray-600">A bit more comfort. A European holiday, a few weekend breaks, and more spending flexibility.</p>
                                    </div>
                                    <div className="border-l-4 border-gray-300 pl-6">
                                        <h4 className="font-medium text-black mb-2">Comfortable</h4>
                                        <p className="text-gray-600">Frequent holidays abroad, regular socialising, hobbies, and a newer car every few years.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                                <h2 className="text-3xl font-light tracking-tight">What Each Lifestyle Costs (Per Year)</h2>
                            </div>

                            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                                <p>
                                    These are rough after-tax spending targets. Keep in mind, these assume you've paid off your mortgage and don't need long-term care.
                                </p>

                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="grid grid-cols-3 bg-black text-white text-sm font-medium">
                                        <div className="p-4">Lifestyle</div>
                                        <div className="p-4 text-center">One Person</div>
                                        <div className="p-4 text-center">Two People</div>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        <div className="grid grid-cols-3">
                                            <div className="p-4 font-medium">Minimum</div>
                                            <div className="p-4 text-center">~£14,400</div>
                                            <div className="p-4 text-center">~£22,400</div>
                                        </div>
                                        <div className="grid grid-cols-3 bg-gray-50">
                                            <div className="p-4 font-medium">Moderate</div>
                                            <div className="p-4 text-center">~£23,300</div>
                                            <div className="p-4 text-center">~£34,000</div>
                                        </div>
                                        <div className="grid grid-cols-3">
                                            <div className="p-4 font-medium">Comfortable</div>
                                            <div className="p-4 text-center">~£31,300</div>
                                            <div className="p-4 text-center">~£43,100</div>
                                        </div>
                                    </div>
                                </div>

                                <p>
                                    The full state pension (as of 2025-26) gives you around <strong>£11,975</strong> per year so the rest needs to come from your own savings or pensions.
                                </p>

                                <p>
                                    To cover these lifestyles fully, including taxes and inflation, you'll need to build a decent-sized retirement pot.
                                </p>
                            </div>
                        </section>

                        {/* Image after Step 2 */}
                        <div className="my-12 flex justify-center">
                            <div className="max-w-2xl">
                                <img
                                    src={annualSpendingImage}
                                    alt="Annual spending breakdown for different retirement lifestyles"
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                                <p className="text-sm text-gray-500 text-center mt-3 italic">
                                    Understanding your annual spending needs is crucial for retirement planning
                                </p>
                            </div>
                        </div>                        <section className="space-y-6">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                                <h2 className="text-3xl font-light tracking-tight">How Big Should Your Pension Be?</h2>
                            </div>

                            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                                <p>
                                    Here's where things get a little more technical. One common approach is to <strong>buy an annuity</strong> where you trade your pension pot for guaranteed income for life.
                                </p>

                                <p>
                                    Based on current annuity rates, here's what you might need upfront:
                                </p>

                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="grid grid-cols-3 bg-black text-white text-sm font-medium">
                                        <div className="p-4">Lifestyle</div>
                                        <div className="p-4 text-center">One Person</div>
                                        <div className="p-4 text-center">Two People</div>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        <div className="grid grid-cols-3">
                                            <div className="p-4 font-medium">Minimum</div>
                                            <div className="p-4 text-center">~£20,000–£35,000</div>
                                            <div className="p-4 text-center">Covered by state pension</div>
                                        </div>
                                        <div className="grid grid-cols-3 bg-gray-50">
                                            <div className="p-4 font-medium">Moderate</div>
                                            <div className="p-4 text-center">~£330,000–£490,000</div>
                                            <div className="p-4 text-center">~£165,000–£250,000</div>
                                        </div>
                                        <div className="grid grid-cols-3">
                                            <div className="p-4 font-medium">Comfortable</div>
                                            <div className="p-4 text-center">~£540,000–£800,000</div>
                                            <div className="p-4 text-center">~£300,000–£460,000</div>
                                        </div>
                                    </div>
                                </div>

                                <p>
                                    These are estimates, of course. Your health, location, interest rates and timing all affect what income you'll actually get.
                                </p>
                            </div>
                        </section>

                        {/* Image after Step 3 */}
                        <div className="my-12 flex justify-center">
                            <div className="max-w-2xl">
                                <img
                                    src={annuityPotImage}
                                    alt="Annuity pot size requirements for different retirement lifestyles"
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                                <p className="text-sm text-gray-500 text-center mt-3 italic">
                                    The size of pension pot needed varies significantly based on your desired lifestyle
                                </p>
                            </div>
                        </div>                        <section className="space-y-6">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">4</div>
                                <h2 className="text-3xl font-light tracking-tight">What If You Stay Invested Instead?</h2>
                            </div>

                            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                                <p>
                                    Instead of locking in an annuity, many people now choose to <strong>stay invested</strong> and gradually draw down their money over time. If your investments grow at, say, 5% per year (a ballpark figure, not a guarantee), here's what you'd roughly need for a 35-year retirement:
                                </p>

                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="grid grid-cols-2 bg-black text-white text-sm font-medium">
                                        <div className="p-4">Lifestyle</div>
                                        <div className="p-4 text-center">Retirement Pot Needed</div>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        <div className="grid grid-cols-2">
                                            <div className="p-4 font-medium">Minimum</div>
                                            <div className="p-4 text-center">~£225,000</div>
                                        </div>
                                        <div className="grid grid-cols-2 bg-gray-50">
                                            <div className="p-4 font-medium">Moderate</div>
                                            <div className="p-4 text-center">~£531,000</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="p-4 font-medium">Comfortable</div>
                                            <div className="p-4 text-center">~£740,000</div>
                                        </div>
                                    </div>
                                </div>

                                <p>
                                    This assumes no state pension, no tax-free lump sums, and that you withdraw money consistently over time.
                                </p>

                                <p>
                                    Of course, markets fluctuate. Inflation eats into your buying power. And everyone's timeline is different. But this gives you a sense of the ballpark.
                                </p>
                            </div>
                        </section>

                        {/* Image after Step 4 */}
                        <div className="my-12 flex justify-center">
                            <div className="max-w-2xl">
                                <img
                                    src={portfolioDepletion}
                                    alt="Investment growth comparison for retirement planning"
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                                <p className="text-sm text-gray-500 text-center mt-3 italic">
                                    Investment growth comparison for retirement planning
                                </p>
                            </div>
                        </div>

                        <section className="space-y-6">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">5</div>
                                <h2 className="text-3xl font-light tracking-tight">So, What Should You Do?</h2>
                            </div>

                            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                                <p>
                                    There's no magic number, only a mix of smart decisions and small steps over time. Your future lifestyle depends on:
                                </p>

                                <div className="bg-gray-50 p-8 rounded-lg">
                                    <ul className="space-y-3">
                                        <li className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                                            <span>When you retire (early or later)</span>
                                        </li>
                                        <li className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                                            <span>Whether you rent or own your home</span>
                                        </li>
                                        <li className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                                            <span>Whether you work part-time in retirement</span>
                                        </li>
                                        <li className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                                            <span>How long you live</span>
                                        </li>
                                        <li className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-black rounded-full mt-3 flex-shrink-0"></div>
                                            <span>How your investments perform</span>
                                        </li>
                                    </ul>
                                </div>

                                <p>
                                    If you're in your 20s or 30s, this might feel a long way off. But the sooner you start, the more you benefit from compound growth where your money earns money on its own over time.
                                </p>

                                <p>
                                    Even if you're starting later, it's not too late. The key is to get real about the life you want, then build toward that, bit by bit.
                                </p>
                            </div>
                        </section>

                        <Separator className="my-12" />

                        <section className="space-y-6">
                            <h2 className="text-3xl font-light tracking-tight">Want Help?</h2>
                            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                                <p>
                                    If you're not sure where to start, check out <a href="https://www.moneyhelper.org.uk/en" target="_blank" className="text-blue-600">Pension Wise</a>, a free, government-backed service offering guidance on retirement planning. Or get independent financial advice if your situation's more complex.
                                </p>
                            </div>
                        </section>

                        <div className="bg-black text-white p-8 rounded-lg text-center">
                            <p className="text-xl font-light leading-relaxed">
                                Bottom line? Forget chasing perfection. Just get moving. Plan for the lifestyle you want, understand the trade-offs, and use time and compounding to your advantage.
                            </p>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
};

export default Retirement;