
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DisabilityAssessmentProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (disability: string) => void;
}

const disabilities = [
  { id: "dyslexia", label: "Dyslexia" },
  { id: "memory-disorder", label: "Memory Disorder" },
  { id: "adhd", label: "ADHD" },
  { id: "processing-disorder", label: "Processing Disorder" },
];

export const DisabilityAssessment = ({ isOpen, onClose, onComplete }: DisabilityAssessmentProps) => {
  const [selectedDisability, setSelectedDisability] = useState<string>("");

  const handleSubmit = () => {
    if (selectedDisability) {
      onComplete(selectedDisability);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center mb-4">
            Welcome to Your Learning Journey
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <p className="text-muted-foreground mb-6">
            To personalize your experience, please select your primary learning consideration:
          </p>
          <RadioGroup
            onValueChange={setSelectedDisability}
            value={selectedDisability}
            className="gap-4"
          >
            {disabilities.map((disability) => (
              <div key={disability.id} className="flex items-center space-x-2">
                <RadioGroupItem value={disability.id} id={disability.id} />
                <Label htmlFor={disability.id} className="text-base">
                  {disability.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <Button
            onClick={handleSubmit}
            className="w-full mt-6"
            disabled={!selectedDisability}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
