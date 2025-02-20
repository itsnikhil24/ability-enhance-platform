
import { useState, useEffect } from "react";
import { DisabilityAssessment } from "@/components/DisabilityAssessment";
import { DashboardCard } from "@/components/DashboardCard";
import { Brain, Book, MessageCircle, GraduationCap, ActivitySquare } from "lucide-react";

const Index = () => {
  const [showAssessment, setShowAssessment] = useState(true);
  const [selectedDisability, setSelectedDisability] = useState<string>("");

  const handleDisabilitySelection = (disability: string) => {
    setSelectedDisability(disability);
    localStorage.setItem("userDisability", disability);
  };

  useEffect(() => {
    const savedDisability = localStorage.getItem("userDisability");
    if (savedDisability) {
      setSelectedDisability(savedDisability);
      setShowAssessment(false);
    }
  }, []);

  const dashboardItems = [
    {
      title: "Ability Assessment",
      description: "Take a comprehensive test to evaluate your current abilities",
      icon: <Brain className="w-6 h-6 text-primary" />,
      route: "/assessment"
    },
    {
      title: "Recommended Courses",
      description: "Personalized learning paths based on your needs",
      icon: <Book className="w-6 h-6 text-primary" />,
      route: "/courses"
    },
    {
      title: "AI Assistant",
      description: "Get help and support from your personal AI tutor",
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      route: "/chat"
    },
    {
      title: "Mentorship",
      description: "Connect with experienced mentors for guidance",
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
      route: "/mentors"
    },
    {
      title: "Daily Exercises",
      description: "Practice activities to enhance your cognitive abilities",
      icon: <ActivitySquare className="w-6 h-6 text-primary" />,
      route: "/exercises"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DisabilityAssessment
        isOpen={showAssessment}
        onClose={() => setShowAssessment(false)}
        onComplete={handleDisabilitySelection}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Welcome to Your Learning Journey</h1>
            <p className="text-xl text-muted-foreground">
              Personalized support for your cognitive enhancement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {dashboardItems.map((item, index) => (
              <DashboardCard
                key={index}
                {...item}
                className={`fade-in [animation-delay:${index * 100}ms]`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
