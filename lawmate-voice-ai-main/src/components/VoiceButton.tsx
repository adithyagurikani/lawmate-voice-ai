import { Mic, MicOff } from "lucide-react";
import { Button } from "./ui/button";

interface VoiceButtonProps {
  isListening: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const VoiceButton = ({ isListening, onToggle, disabled }: VoiceButtonProps) => {
  return (
    <Button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={`rounded-full w-12 h-12 p-0 transition-all duration-300 ${
        isListening
          ? "bg-accent hover:bg-accent/90 animate-pulse-glow"
          : "bg-primary hover:bg-primary-light"
      }`}
    >
      {isListening ? (
        <MicOff className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </Button>
  );
};

export default VoiceButton;
