import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Book, Clock, Users, ChevronLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  students: number;
  level: string;
  image: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Reading Comprehension Mastery",
    description: "Master reading comprehension with specialized techniques for dyslexia.",
    duration: "8 weeks",
    students: 1240,
    level: "Beginner",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Writing Skills Development",
    description: "Develop effective writing strategies tailored for dyslexic learners.",
    duration: "10 weeks",
    students: 890,
    level: "Intermediate",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Memory Enhancement Techniques",
    description: "Learn powerful memory techniques to improve learning efficiency.",
    duration: "6 weeks",
    students: 1560,
    level: "All Levels",
    image: "/placeholder.svg"
  }
];

const Courses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEnroll = (courseId: number) => {
    if (enrolledCourses.includes(courseId)) {
      toast({
        title: "Already enrolled",
        description: "You are already enrolled in this course.",
        variant: "destructive",
      });
      return;
    }

    setEnrolledCourses([...enrolledCourses, courseId]);
    toast({
      title: "Successfully enrolled!",
      description: "You have been enrolled in the course.",
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
          <h1 className="text-4xl font-bold tracking-tight">Recommended Courses</h1>
          <p className="text-xl text-muted-foreground">
            Courses tailored to support your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardHeader>
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 flex-grow">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{course.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{course.level}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant={enrolledCourses.includes(course.id) ? "secondary" : "default"}
                  onClick={() => handleEnroll(course.id)}
                >
                  {enrolledCourses.includes(course.id) ? "Enrolled" : "Enroll Now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
