import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { CTAButton } from "@/components/CTAButton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image_url?: string;
  created_at: string;
  slug: string;
}

const LearnLibrary = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const categories = ["all", "investing", "options", "futures", "analysis", "risk"];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load articles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Knowledge Library</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Explore our comprehensive collection of educational articles, guides, and insights 
              to enhance your trading and investment knowledge.
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search articles by title or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-pulse text-lg">Loading articles...</div>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  {searchQuery || selectedCategory !== "all" 
                    ? "No articles found matching your criteria." 
                    : "No articles available yet."}
                </p>
                {(searchQuery || selectedCategory !== "all") && (
                  <div className="space-x-2">
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="text-primary hover:underline"
                    >
                      Clear search
                    </button>
                    <span className="text-muted-foreground">or</span>
                    <button 
                      onClick={() => setSelectedCategory("all")}
                      className="text-primary hover:underline"
                    >
                      view all categories
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedCategory === "all" ? "All Articles" : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Articles`}
                    </h2>
                    <p className="text-muted-foreground">
                      {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
                    </p>
                  </div>
                  
                  {selectedCategory !== "all" && (
                    <Badge variant="secondary" className="capitalize">
                      {selectedCategory}
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article, index) => (
                    <ArticleCard
                      key={article.id}
                      image={article.image_url}
                      title={article.title}
                      excerpt={article.excerpt}
                      link={`/articles/${article.slug}`}
                      category={article.category}
                      date={article.created_at}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Put your knowledge into practice with our comprehensive trading platform
            </p>
            <CTAButton 
              text="Get Started with Little Little"
              link="/auth"
              style="primary"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LearnLibrary;