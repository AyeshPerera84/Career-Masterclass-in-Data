
export interface Module {
  id: string;
  section: string;
  title: string;
  description: string;
  content: string;
  videoTimestamp?: string;
  points: number;
  quiz?: Quiz;
  caseStudy?: {
    title: string;
    url: string;
  };
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserState {
  points: number;
  completedModules: string[];
  currentModuleId: string;
  level: number;
}

export interface AIFeedback {
  assessment: string;
  suggestion: string;
  isCorrect: boolean;
}
