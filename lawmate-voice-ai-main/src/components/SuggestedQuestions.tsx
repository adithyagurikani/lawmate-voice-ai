import { Button } from "./ui/button";

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const questions = [
  "What is Section 498A of IPC?",
  "How do I file an FIR?",
  "What are my rights during arrest?",
  "Explain bail procedures in India",
  "What is the difference between IPC and CrPC?",
];

const SuggestedQuestions = ({ onQuestionClick }: SuggestedQuestionsProps) => {
  return (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground mb-3 font-medium">✨ Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onQuestionClick(question)}
            className="text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-card animate-fade-in group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="group-hover:animate-wiggle">{question}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
