import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";
import { CSSProperties } from "react";

interface ArticleCardProps {
  image?: string;
  title: string;
  excerpt: string;
  link: string;
  category?: string;
  date?: string;
  style?: CSSProperties;
}

export const ArticleCard = ({ 
  image, 
  title, 
  excerpt, 
  link, 
  category, 
  date,
  style 
}: ArticleCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article 
      className="group cursor-pointer animate-fade-in border-b border-border/20 pb-8 mb-8 last:border-b-0 hover:border-border/40 transition-colors"
      style={style}
      onClick={() => window.location.href = link}
    >
      {image && (
        <div className="mb-6 overflow-hidden rounded-lg bg-muted">
          <img 
            src={image} 
            alt={title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="space-y-4">
        {(date || category) && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {date && <span>{formatDate(date)}</span>}
            {date && category && <span>•</span>}
            {category && <span>{category}</span>}
          </div>
        )}
        
        <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
          {title}
        </h2>
        
        <p className="text-muted-foreground leading-relaxed">
          {excerpt}
        </p>
      </div>
    </article>
  );
};