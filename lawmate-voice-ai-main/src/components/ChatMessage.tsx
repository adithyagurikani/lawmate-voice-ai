import { Bot, User, Volume2 } from "lucide-react";
import { Button } from "./ui/button";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  onSpeak?: () => void;
  isSpeaking?: boolean;
}

const ChatMessage = ({ role, content, onSpeak, isSpeaking }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? "justify-end animate-slide-in-right" : "justify-start animate-slide-in-left"}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className={`flex flex-col max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-4 py-3 transition-all duration-300 hover:scale-[1.02] ${
            isUser
              ? "bg-primary text-primary-foreground shadow-card hover:shadow-glow"
              : "bg-card text-card-foreground border border-border shadow-sm hover:shadow-card hover:border-primary/30"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
        
        {!isUser && onSpeak && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSpeak}
            className={`mt-1 text-xs ${isSpeaking ? "text-accent" : "text-muted-foreground"}`}
          >
            <Volume2 className="w-3 h-3 mr-1" />
            {isSpeaking ? "Speaking..." : "Listen"}
          </Button>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-5 h-5 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
