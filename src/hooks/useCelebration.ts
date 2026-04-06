import { useState, useEffect } from 'react';

interface UseCelebrationProps {
  currentQuestion: number;
  totalQuestions: number;
  isEnabled?: boolean;
}

interface UseCelebrationReturn {
  showCelebration: boolean;
  celebrationData: {
    questionsCompleted: number;
    totalQuestions: number;
    milestone: number;
  } | null;
  triggerCelebration: (questionNumber: number) => void;
  closeCelebration: () => void;
}

export const useCelebration = ({ 
  currentQuestion, 
  totalQuestions, 
  isEnabled = true 
}: UseCelebrationProps): UseCelebrationReturn => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{
    questionsCompleted: number;
    totalQuestions: number;
    milestone: number;
  } | null>(null);

  const triggerCelebration = (questionNumber: number) => {
    if (!isEnabled) return;
    
    // Check if this is a milestone (every 5 questions)
    if (questionNumber > 0 && questionNumber % 5 === 0) {
      setCelebrationData({
        questionsCompleted: questionNumber,
        totalQuestions,
        milestone: questionNumber
      });
      setShowCelebration(true);
    }
  };

  const closeCelebration = () => {
    setShowCelebration(false);
    setCelebrationData(null);
  };

  // Auto-trigger celebration when reaching milestones
  useEffect(() => {
    if (currentQuestion > 0 && currentQuestion % 5 === 0 && isEnabled) {
      // Small delay to ensure the question transition is complete
      const timer = setTimeout(() => {
        triggerCelebration(currentQuestion);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, isEnabled, totalQuestions]);

  return {
    showCelebration,
    celebrationData,
    triggerCelebration,
    closeCelebration
  };
};