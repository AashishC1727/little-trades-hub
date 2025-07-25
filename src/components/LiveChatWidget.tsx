import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Minimize2, Maximize2 } from "lucide-react";

interface LiveChatWidgetProps {
  provider?: string;
  position?: "bottom-right" | "bottom-left";
  style?: "minimal" | "modern";
}

export const LiveChatWidget = ({ 
  provider = "little-little-chat", 
  position = "bottom-right",
  style = "minimal" 
}: LiveChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help you with any questions about Little Little. How can I assist you today?",
      sender: "agent",
      timestamp: new Date()
    }
  ]);

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4"
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "user",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      
      // Simulate agent response
      setTimeout(() => {
        const agentResponse = {
          id: messages.length + 2,
          text: "Thanks for your message! I'll get back to you shortly with a detailed response.",
          sender: "agent",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg hover:scale-105 transition-transform relative"
        >
          <MessageCircle className="w-6 h-6" />
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs"
          >
            1
          </Badge>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`w-80 h-96 shadow-xl transition-all duration-300 ${isMinimized ? 'h-12' : 'h-96'}`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <div>
                <div className="font-medium text-sm">Live Support</div>
                <div className="text-xs opacity-90">Usually replies instantly</div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-6 h-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
              >
                {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <CardContent className="flex-1 p-4 h-64 overflow-y-auto space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg text-sm ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button onClick={sendMessage} size="sm" className="px-3">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Press Enter to send
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
};