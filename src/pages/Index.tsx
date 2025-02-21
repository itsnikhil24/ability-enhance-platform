import { useState, useEffect } from "react";
import { DisabilityAssessment } from "@/components/DisabilityAssessment";
import { DashboardCard } from "@/components/DashboardCard";
import { Brain, Book, MessageCircle, GraduationCap, ActivitySquare, User } from "lucide-react";

const Index = () => {
  const [showAssessment, setShowAssessment] = useState(true);
  const [selectedDisability, setSelectedDisability] = useState("");

  const handleDisabilitySelection = (disability) => {
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
    { title: "Ability Assessment", description: "Take a comprehensive test to evaluate your current abilities", icon: <Brain className="w-6 h-6 text-primary" />, route: "/assessment" },
    { title: "Recommended Courses", description: "Personalized learning paths based on your needs", icon: <Book className="w-6 h-6 text-primary" />, route: "/courses" },
    { title: "AI Assistant", description: "Get help and support from your personal AI tutor", icon: <MessageCircle className="w-6 h-6 text-primary" />, route: "/chat" },
    { title: "Mentorship", description: "Connect with experienced mentors for guidance", icon: <GraduationCap className="w-6 h-6 text-primary" />, route: "/mentorship" },
    { title: "Daily Exercises", description: "Practice activities to enhance your cognitive abilities", icon: <ActivitySquare className="w-6 h-6 text-primary" />, route: "/exercises" },
    { title: "Profile", description: "View your progress and learning journey", icon: <User className="w-6 h-6 text-primary" />, route: "/profile" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200">
     

      <DisabilityAssessment isOpen={showAssessment} onClose={() => setShowAssessment(false)} onComplete={handleDisabilitySelection} />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-extrabold text-gray-800 drop-shadow-md">Welcome to Your Learning Journey</h1>
          <p className="text-2xl text-gray-600">Personalized support for your cognitive enhancement</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {dashboardItems.map((item, index) => (
            <DashboardCard key={index} {...item} className="transform hover:scale-105 transition-transform duration-300 shadow-lg rounded-2xl overflow-hidden" />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
