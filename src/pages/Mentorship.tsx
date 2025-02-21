import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Mail, Star, Clock, BookOpen, ChevronLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Mentor {
  id: number;
  name: string;
  expertise: string;
  rating: number;
  experience: string;
  sessions: number;
  availability: string;
  image: string;
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    expertise: "Reading Specialist & Educational Psychologist",
    rating: 4.9,
    experience: "15 years",
    sessions: 1240,
    availability: "Mon, Wed, Fri",
    image: "\christopher-campbell-rDEOVtE7vOs-unsplash.jpg"
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    expertise: "Dyslexia Expert & Language Therapist",
    rating: 4.8,
    experience: "12 years",
    sessions: 890,
    availability: "Tue, Thu, Sat",
    image: "stefan-stefancik-QXevDflbl8A-unsplash.jpg"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    expertise: "Special Education & Writing Coach",
    rating: 4.7,
    experience: "8 years",
    sessions: 650,
    availability: "Mon-Fri",
    image: "vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg"
  }
];

const Mentorship = () => {
  const [requestedMentors, setRequestedMentors] = useState<number[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRequestMentor = (mentorId: number) => {
    if (requestedMentors.includes(mentorId)) {
      toast({
        title: "Already requested",
        description: "You have already requested this mentor.",
        variant: "destructive",
      });
      return;
    }

    setRequestedMentors([...requestedMentors, mentorId]);
    toast({
      title: "Request sent!",
      description: "The mentor will contact you soon.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
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

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Expert Mentors</h1>
          <p className="text-xl text-muted-foreground">
            Connect with experienced mentors specialized in learning support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle className="text-xl">{mentor.name}</CardTitle>
                    <CardDescription>{mentor.expertise}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">{mentor.rating} rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{mentor.experience} experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{mentor.sessions} sessions completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Available: {mentor.availability}</span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  className="flex-1"
                  variant={requestedMentors.includes(mentor.id) ? "secondary" : "default"}
                  onClick={() => handleRequestMentor(mentor.id)}
                >
                  {requestedMentors.includes(mentor.id) ? "Requested" : "Request Mentor"}
                </Button>
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
