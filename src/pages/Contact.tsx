

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";


export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // Simulated submission
    toast.success("Your message has been sent successfully!");

    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="py-16 px-6 bg-background text-foreground">
      <div className="container mx-auto max-w-2xl space-y-8">
        <h2 className="text-4xl font-bold text-center">Contact Us</h2>
        <p className="text-center text-lg">
          Use the form below for any inquiries or support. We’ll get back to you promptly.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2"
              rows={5}
            />
          </div>

          <div className="text-center">
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Send
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

