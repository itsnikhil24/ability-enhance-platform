
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const dailyQuestions: Question[] = [
  {
    id: 1,
    question: "What is the most effective way to improve memory?",
    options: [
      "Active recall practice",
      "Passive reading",
      "Highlighting text",
      "Simply re-reading material"
    ],
    correctAnswer: "Active recall practice"
  },
  {
    id: 2,
    question: "Which learning technique has been proven most effective?",
    options: [
      "Spaced repetition",
      "Cramming",
      "Multitasking",
      "Marathon study sessions"
    ],
    correctAnswer: "Spaced repetition"
  }
];

const DailyExercise = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (Object.keys(answers).length < dailyQuestions.length) {
      toast({
        title: "Incomplete",
        description: "Please answer all questions before submitting.",
        variant: "destructive"
      });
      return;
    }

    let correctCount = 0;
    dailyQuestions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = (correctCount / dailyQuestions.length) * 100;
    setScore(finalScore);
    setSubmitted(true);

    // Save to localStorage
    const today = new Date().toISOString().split('T')[0];
    const existingScores = JSON.parse(localStorage.getItem('dailyScores') || '{}');
    existingScores[today] = finalScore;
    localStorage.setItem('dailyScores', JSON.stringify(existingScores));

    // Update streak
    const streak = JSON.parse(localStorage.getItem('streak') || '0');
    localStorage.setItem('streak', JSON.stringify(streak + 1));

    toast({
      title: "Exercise Completed!",
      description: `Your score: ${finalScore}%. Keep up the good work!`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daily Learning Exercise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {dailyQuestions.map((question) => (
              <div key={question.id} className="space-y-4">
                <h3 className="font-medium">{question.question}</h3>
                <RadioGroup
                  onValueChange={(value) => 
                    setAnswers(prev => ({ ...prev, [question.id]: value }))
                  }
                  value={answers[question.id]}
                  disabled={submitted}
                >
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`q${question.id}-${index}`} />
                      <Label htmlFor={`q${question.id}-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
            {!submitted && (
              <Button onClick={handleSubmit} className="w-full mt-4">
                Submit Answers
              </Button>
            )}
            {submitted && (
              <div className="text-center mt-4">
                <p className="text-2xl font-bold">Your Score: {score}%</p>
                <Button asChild className="mt-4">
                  <Link to="/profile">View Progress</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailyExercise;
