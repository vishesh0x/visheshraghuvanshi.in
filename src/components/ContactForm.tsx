"use client";

// --- 1. Import useState ---
import { useState } from "react"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"; // --- 2. Import a loader icon ---

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

// A quick helper function to simulate a network delay
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ContactForm() {
  // --- 3. Add loading state ---
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "", subject: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // --- 4. Set loading true ---
    setIsSubmitting(true); 
    
    console.log(values);

    // --- Simulate sending the data ---
    // In a real app, you would replace this with:
    // await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) });
    await wait(1500); // Simulate a 1.5 second network request
    // --- End simulation ---

    // --- 5. Set loading false ---
    setIsSubmitting(false); 
    
    toast.success("Message Sent!", {
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    form.reset();
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email</FormLabel>
                <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason for contacting" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                  <SelectItem value="project-collaboration">Project Collaboration</SelectItem>
                  <SelectItem value="technical-question">Technical Question</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell me about your project or just say hi!"
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* --- 6. Update Button with loading state --- */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
}