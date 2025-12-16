import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Home, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ChatMessage from "@/components/ChatMessage";
import VoiceButton from "@/components/VoiceButton";
import SuggestedQuestions from "@/components/SuggestedQuestions";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState<number | null>(null);
  
  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported: voiceSupported } = useSpeechRecognition();
  const { speak, stop: stopSpeaking, isSpeaking } = useTextToSpeech();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/legal-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: [...messages, { role: "user", content: userMessage }],
          }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error("Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";
      let textBuffer = "";
      let streamDone = false;

      // Add empty assistant message
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: "assistant",
                  content: assistantMessage,
                };
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to get response. Please try again.");
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    resetTranscript();
    if (isListening) stopListening();

    await streamChat(userMessage);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleQuestionClick = async (question: string) => {
    setInput(question);
    await streamChat(question);
  };

  const handleSpeak = (index: number, content: string) => {
    if (isSpeaking && speakingMessageIndex === index) {
      stopSpeaking();
      setSpeakingMessageIndex(null);
    } else {
      stopSpeaking();
      setSpeakingMessageIndex(index);
      speak(content);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card shadow-sm backdrop-blur-sm bg-card/95 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-bounce-subtle">
              <span className="text-xl">⚖️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">LawMate</h1>
              <p className="text-xs text-muted-foreground">Your AI Legal Assistant</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/")}
            className="hover:bg-primary/10 transition-all duration-300 hover:scale-110"
          >
            <Home className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center shadow-glow animate-bounce-subtle border-4 border-primary-light/30 animate-pulse-glow">
                <span className="text-5xl">⚖️</span>
              </div>
              <h2 className="text-3xl font-bold mb-3 animate-fade-in bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Welcome to LawMate
              </h2>
              <p className="text-muted-foreground mb-6 text-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Ask me anything about Indian laws and legal procedures
              </p>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <SuggestedQuestions onQuestionClick={handleQuestionClick} />
            </div>
          </div>
        ) : (
          <div className="space-y-4 pb-32">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.role}
                content={message.content}
                onSpeak={
                  message.role === "assistant"
                    ? () => handleSpeak(index, message.content)
                    : undefined
                }
                isSpeaking={isSpeaking && speakingMessageIndex === index}
              />
            ))}
            {isLoading && (
              <div className="flex items-center gap-3 text-muted-foreground animate-fade-in">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
                <span className="text-sm">LawMate is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t shadow-lg">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Ask about Indian laws..."}
              className="flex-1 transition-all duration-300 focus:shadow-glow"
              disabled={isLoading}
            />
            {voiceSupported && (
              <VoiceButton
                isListening={isListening}
                onToggle={handleVoiceToggle}
                disabled={isLoading}
              />
            )}
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()} 
              className="bg-primary hover:bg-primary-light transition-all duration-300 hover:scale-105 hover:shadow-glow"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-2 animate-fade-in">
            LawMate provides legal information, not legal advice. Consult a qualified lawyer for specific cases.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
