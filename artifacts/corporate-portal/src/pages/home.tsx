
import { Shell } from "@/components/layout/shell";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useGetStats, useListTrainingPrograms, useListTrainers } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, Users, BookOpen, Star, Sparkles, Building2, ChevronRight } from "lucide-react";
import { heroBg, trainer1, trainer2, trainer3, trainer4, trainer5, trainer6, program1, program2, program3 } from "@/assets/images";

export function Home() {
  const { data: stats } = useGetStats();
  const { data: programs } = useListTrainingPrograms();
  const { data: trainers } = useListTrainers();

  const featuredPrograms = Array.isArray(programs) ? programs.filter(p => p.featured).slice(0, 3) : [];
  const featuredTrainers = Array.isArray(trainers) ? trainers.filter(t => t.featured).slice(0, 4) : [];

  const programImages = [program1, program2, program3];
  const trainerImages = [trainer1, trainer2, trainer3, trainer4, trainer5, trainer6];

  return (
    <Shell>
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/40" />

        <div className="container relative z-10 mx-auto px-4 md:px-6 py-24 lg:py-36 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4 text-accent" />
              The Future of Corporate AI Competency
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Equip your enterprise with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-purple-300">world-class AI expertise</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
              AI Linc bridges the gap between theoretical AI and business reality. We deploy elite industry practitioners to upskill your workforce, accelerate transformation, and build durable competitive advantage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base h-12 px-8 font-semibold shadow-lg shadow-primary/20">
                <Link href="/training">Explore Corporate Programs</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/40 text-foreground bg-secondary/40 hover:bg-primary/20 hover:text-white text-base h-12 px-8 font-semibold">
                <Link href="/trainers">Meet Our Experts</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-background py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50 text-center">
            <div className="space-y-2">
              <h3 className="font-display text-4xl font-bold text-foreground">{stats?.totalTrainers || 0}+</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Verified Experts</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-4xl font-bold text-foreground">{stats?.totalPrograms || 0}+</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Training Pathways</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-4xl font-bold text-foreground">98%</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Client Satisfaction</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-4xl font-bold text-foreground">Enterprise</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Grade Security</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Why leading organizations partner with AI Linc
            </h2>
            <p className="text-lg text-muted-foreground">
              We don't just teach technology—we instill the capability to leverage AI for tangible business outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Practitioner-Led</CardTitle>
                <CardDescription className="text-base mt-2">
                  Learn from experts actively building AI systems at top technology companies. Real-world insights, not academic theory.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Tailored for Enterprise</CardTitle>
                <CardDescription className="text-base mt-2">
                  Curriculums customized to your industry, tech stack, and strategic objectives. We speak your business language.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-background border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Measurable Impact</CardTitle>
                <CardDescription className="text-base mt-2">
                  Every program is designed with clear ROI metrics. From code quality improvements to accelerated product cycles.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="space-y-4 max-w-2xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Featured Training Programs
              </h2>
              <p className="text-lg text-muted-foreground">
                Intensive, high-impact pathways designed to transform your engineering and leadership teams.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/training">
                View All Programs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredPrograms.length > 0 ? (
              featuredPrograms.map((program, i) => (
                <Card key={program.id} className="flex flex-col overflow-hidden border-border/50 group">
                  <div className="aspect-[16/9] overflow-hidden bg-secondary relative">
                    <img
                      src={programImages[i % 3] || program.imageUrl || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"}
                      alt={program.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="accent" className="shadow-sm font-semibold">{program.level}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs font-medium">{program.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" /> {program.duration}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2 leading-tight group-hover:text-accent transition-colors">{program.title}</CardTitle>
                    <CardDescription className="line-clamp-3 mt-4 text-sm leading-relaxed">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-4 border-t">
                    <Button asChild variant="ghost" className="w-full justify-between -ml-4 hover:bg-transparent hover:text-accent">
                      <Link href="/contact">
                        Request details <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              // Empty/Loading state
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="flex flex-col h-[400px] animate-pulse bg-secondary/50 border-none">
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Trainers */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Learn from the Vanguard of AI
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Our roster includes principal engineers, AI researchers, and data science executives from top technology companies.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTrainers.length > 0 ? (
              featuredTrainers.map((trainer, i) => (
                <Card key={trainer.id} className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
                  <CardHeader className="text-center items-center pb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-accent">
                      <img
                        src={trainer.imageUrl || trainerImages[i % trainerImages.length]}
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl">{trainer.name}</CardTitle>
                    <CardDescription className="text-primary-foreground/70 font-medium">
                      {trainer.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center pb-6">
                    <div className="flex items-center justify-center mb-4">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span className="ml-2 font-semibold">{trainer.rating?.toFixed(1) || "5.0"}</span>
                      <span className="text-primary-foreground/50 text-xs ml-1">({trainer.sessionsCompleted} sessions)</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {trainer.expertise?.slice(0, 2).map((exp) => (
                        <Badge key={exp} variant="outline" className="border-primary-foreground/20 text-primary-foreground/80 text-[10px]">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Empty/Loading
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-64 rounded-xl bg-primary-foreground/10 animate-pulse" />
              ))
            )}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="border-primary/40 text-foreground bg-secondary/40 hover:bg-primary/20 hover:text-white font-semibold">
              <Link href="/trainers">View Full Expert Roster</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-secondary rounded-2xl p-8 md:p-16 text-center max-w-4xl mx-auto border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Ready to elevate your organization's AI capabilities?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Schedule a consultation to discuss your technical challenges, skill gaps, and how our custom training programs can accelerate your roadmap.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link href="/contact">Request Consultation</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8 bg-background">
                  <Link href="/training">Browse Curriculum</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
