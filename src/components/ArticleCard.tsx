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
    <Card 
      className="group hover:shadow-lg transition-all duration-300 hover-scale cursor-pointer animate-fade-in"
      style={style}
    >
      {image && (
        <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <CardHeader>
        {(category || date) && (
          <div className="flex items-center justify-between mb-2">
            {category && (
              <Badge variant="secondary" className="capitalize">
                {category}
              </Badge>
            )}
            {date && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {formatDate(date)}
              </div>
            )}
          </div>
        )}
        
        <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </CardTitle>
        
        <CardDescription className="line-clamp-3">
          {excerpt}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Button 
          variant="ghost" 
          className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          onClick={() => window.location.href = link}
        >
          Read More
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
};