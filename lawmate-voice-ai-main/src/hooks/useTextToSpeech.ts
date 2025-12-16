import { useState, useEffect } from "react";

interface UseTextToSpeechReturn {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
}

export const useTextToSpeech = (): UseTextToSpeechReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!isSupported) return;

    const handleEnd = () => setIsSpeaking(false);
    window.speechSynthesis.addEventListener("end", handleEnd);

    return () => {
      window.speechSynthesis.removeEventListener("end", handleEnd);
      window.speechSynthesis.cancel();
    };
  }, [isSupported]);

  const speak = (text: string) => {
    if (!isSupported) return;

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
  };
};
