import { Shell } from "@/components/layout/shell";
import { useSubmitInquiry } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Building2, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid corporate email required"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().optional(),
  type: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Please provide some details about your inquiry"),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export function Contact() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const typeParam = searchParams.get("type");
  const programParam = searchParams.get("program");
  const expertParam = searchParams.get("expert");

  const { toast } = useToast();
  const submitInquiry = useSubmitInquiry();

  const defaultMessage = programParam 
    ? `I am interested in learning more about the "${programParam}" training program for my team.`
    : expertParam 
      ? `I am interested in requesting ${expertParam} for a corporate training session.`
      : "";

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      type: typeParam || "Corporate Training",
      message: defaultMessage,
    },
  });

  const onSubmit = (data: InquiryFormValues) => {
    submitInquiry.mutate({ data }, {
      onSuccess: () => {
        toast({
          title: "Inquiry Submitted Successfully",
          description: "An AI Linc architect will be in touch within 24 hours.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your inquiry. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Shell>
      <section className="bg-secondary/30 py-12 md:py-20 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Connect with AI Linc
            </h1>
            <p className="text-lg text-muted-foreground">
              Whether you need enterprise training, want to book an expert, or are interested in joining our roster—we're ready to engage.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8 lg:pr-8">
              <div>
                <h3 className="font-display text-2xl font-bold mb-6">Global Offices</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">San Francisco (HQ)</h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        100 Innovation Drive<br />
                        Suite 400<br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">London</h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        The AI Hub, Silicon Roundabout<br />
                        London, EC1V 1AB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <h3 className="font-display text-2xl font-bold mb-6">Direct Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Enterprise Sales</div>
                      <a href="mailto:enterprise@ailinc.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        enterprise@ailinc.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Global Support</div>
                      <a href="tel:+18005550199" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        +1 (800) 555-0199
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-3 border-border/60 shadow-lg shadow-black/5 bg-card">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl">Send an Inquiry</CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and the appropriate team will get back to you promptly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Corporate Email</FormLabel>
                            <FormControl>
                              <Input placeholder="jane@company.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Corp" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inquiry Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a topic" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Corporate Training">Corporate Training</SelectItem>
                              <SelectItem value="Trainer Request">Book an Expert</SelectItem>
                              <SelectItem value="Become a Trainer">Become a Trainer</SelectItem>
                              <SelectItem value="General Inquiry">General Inquiry</SelectItem>
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
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your technical stack, team size, and goals..." 
                              className="min-h-[120px] resize-y" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base font-semibold" 
                      disabled={submitInquiry.isPending}
                    >
                      {submitInquiry.isPending ? "Sending..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
          </div>
        </div>
      </section>
    </Shell>
  );
}
