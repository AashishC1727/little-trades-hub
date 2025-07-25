import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface CTAButtonProps {
  text: string;
  link: string;
  style?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  icon?: boolean;
}

export const CTAButton = ({ 
  text, 
  link, 
  style = "primary", 
  size = "lg",
  icon = true 
}: CTAButtonProps) => {
  const handleClick = () => {
    window.location.href = link;
  };

  return (
    <Button 
      variant={style === "primary" ? "default" : style === "secondary" ? "secondary" : "outline"}
      size={size}
      onClick={handleClick}
      className="group relative overflow-hidden"
    >
      {icon && style === "primary" && (
        <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
      )}
      {text}
      {icon && (
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      )}
    </Button>
  );
};