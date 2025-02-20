
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";

export const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate credentials
    setIsLoggedIn(true);
    setShowLoginModal(false);
    toast({
      title: "Logged in successfully",
      description: "Welcome back!",
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSignupModal(false);
    toast({
      title: "Account created successfully",
      description: "Welcome to our platform!",
    });
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-semibold text-xl">CognitiveLab</Link>
        
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Button variant="ghost" onClick={() => setShowLoginModal(true)}>
                Login
              </Button>
              <Button onClick={() => setShowSignupModal(true)}>
                Sign Up
              </Button>
            </>
          ) : (
            <Button variant="ghost" onClick={() => setIsLoggedIn(false)}>
              Logout
            </Button>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login to your account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Signup Modal */}
      <Dialog open={showSignupModal} onOpenChange={setShowSignupModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create an account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSignup} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name">Full Name</Label>
              <Input id="signup-name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" required />
            </div>
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
        </DialogContent>
      </Dialog>
    </nav>
  );
};
