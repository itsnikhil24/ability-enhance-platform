
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const questions = [
  {
    id: 1,
    question: "How often do you find it challenging to read long paragraphs of text?",
    options: [
      { value: "rarely", label: "Rarely or never" },
      { value: "sometimes", label: "Sometimes" },
      { value: "often", label: "Often" },
      { value: "always", label: "Almost always" },
    ],
  },
  {
    id: 2,
    question: "Do letters appear to move or 'dance' on the page while reading?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "sometimes", label: "Sometimes" },
      { value: "frequently", label: "Frequently" },
    ],
  },
  {
    id: 3,
    question: "How difficult is it for you to remember what you've just read?",
    options: [
      { value: "not-difficult", label: "Not difficult" },
      { value: "slightly", label: "Slightly difficult" },
      { value: "moderately", label: "Moderately difficult" },
      { value: "very", label: "Very difficult" },
    ],
  },
];

export const AbilityAssessment = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      toast({
        title: "Please answer all questions",
        variant: "destructive",
      });
      return;
    }

    setShowResults(true);
    toast({
      title: "Assessment completed!",
      description: "Your results have been calculated.",
    });
  };

  const calculateScore = () => {
    let score = 0;
    Object.entries(answers).forEach(([_, value]) => {
      if (value === "often" || value === "always" || value === "frequently" || value === "very") {
        score += 3;
      } else if (value === "sometimes" || value === "moderately") {
        score += 2;
      } else if (value === "rarely" || value === "slightly") {
        score += 1;
      }
    });
    return (score / (questions.length * 3)) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Dyslexia Assessment Test</h1>
          <p className="text-muted-foreground">
            This assessment will help us understand your reading challenges better.
          </p>
        </div>

        {!showResults ? (
          <Card>
            <CardContent className="pt-6 space-y-8">
              {questions.map((q) => (
                <div key={q.id} className="space-y-4">
                  <h3 className="font-medium">{q.question}</h3>
                  <RadioGroup
                    onValueChange={(value) =>
                      setAnswers((prev) => ({ ...prev, [q.id]: value }))
                    }
                    value={answers[q.id]}
                  >
                    {q.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`${q.id}-${option.value}`} />
                        <Label htmlFor={`${q.id}-${option.value}`}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
              <Button onClick={handleSubmit} className="w-full mt-6">
                Submit Assessment
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Your Assessment Results</CardTitle>
              <CardDescription>
                Based on your answers, we've calculated your dyslexia indication score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-primary">
                  {Math.round(calculateScore())}%
                </div>
                <p className="text-muted-foreground">
                  {calculateScore() > 70
                    ? "Your answers suggest a high likelihood of dyslexia. We recommend consulting with a learning specialist."
                    : calculateScore() > 40
                    ? "Your answers suggest moderate reading challenges. Consider using our recommended tools and exercises."
                    : "Your answers suggest mild or no significant reading challenges."}
                </p>
                <Button onClick={() => setShowResults(false)} variant="outline">
                  Retake Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
