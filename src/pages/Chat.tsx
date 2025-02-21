import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizontal, Bot, User, ChevronLeft, Home } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Function to format message content by:
// 1. Converting **text** to bold
// 2. Converting single * to a bullet point (•)
const formatMessageContent = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*|\*)/g); // Split by **text** or single *
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index}>
          {part.slice(2, -2)}
        </strong>
      );
    } else if (part === "*") {
      return (
        <span key={index} className="mr-1">•</span>
      );
    }
    return part;
  });
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI learning assistant. How can I help you today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('API Key:', import.meta.env.VITE_GOOGLE_API_KEY);

    if (!inputMessage.trim()) return;

    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    if (!apiKey) {
      toast({
        title: "Error",
        description: "API key not found.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage }] }],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed: ${errorData.error?.message || "Unknown error"}`);
      }

      const data = await response.json();
      const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand that.";

      setMessages((prev) => [...prev, { role: "assistant", content: aiMessage }]);
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: `Failed to get response: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
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
          <h1 className="text-4xl font-bold tracking-tight">AI Learning Assistant</h1>
          <p className="text-xl text-muted-foreground">
            Your personal AI tutor to help with your learning journey
          </p>
        </div>

        <Card className="h-[600px] flex flex-col">
          <ScrollArea className="flex-grow p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "assistant"
                      ? "items-start"
                      : "items-start flex-row-reverse"
                  }`}
                >
                  <div
                    className={`size-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === "assistant" ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="size-5 text-primary-foreground" />
                    ) : (
                      <User className="size-5 text-secondary-foreground" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-line break-words ${
                      message.role === "assistant"
                        ? "bg-muted text-left"
                        : "bg-primary text-primary-foreground text-right"
                    }`}
                  >
                    {formatMessageContent(message.content)}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 items-start">
                  <div className="size-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="size-5 text-primary-foreground" />
                  </div>
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                <SendHorizontal className="size-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;


// D:\Web Development\Project\Cognitive_lab\.env.local