import { Shell } from "@/components/layout/shell";
import { useListTrainers, useGetStats } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Star, Linkedin, Users2, Filter, Briefcase, ChevronRight } from "lucide-react";
import { useState } from "react";
import { trainer1, trainer2, trainer3, trainer4, trainer5, trainer6 } from "@/assets/images";

export function Trainers() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const { data: trainers, isLoading } = useListTrainers({ category: selectedCategory });
  const { data: stats } = useGetStats();

  const getTrainerImage = (index: number) => {
    const images = [trainer1, trainer2, trainer3, trainer4, trainer5, trainer6];
    return images[index % images.length];
  };

  return (
    <Shell>
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current">
            <polygon points="0,100 100,0 100,100" />
          </svg>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl space-y-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Our Elite AI Practitioners
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
              Learn directly from the engineers and leaders building tomorrow's AI systems at the world's most innovative organizations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 shrink-0 space-y-8">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-4 pb-2 border-b border-border">
                <Filter className="h-4 w-4" /> Expertise Area
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(undefined)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    !selectedCategory ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary text-muted-foreground'
                  }`}
                >
                  All Experts
                </button>
                {stats?.trainerCategories?.map(cat => (
                  <button
                    key={cat.category}
                    onClick={() => setSelectedCategory(cat.category)}
                    className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === cat.category ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary text-muted-foreground'
                    }`}
                  >
                    <span>{cat.category}</span>
                    <span className={`text-xs ${selectedCategory === cat.category ? 'text-primary-foreground/70' : 'text-muted-foreground/50'}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-secondary/50 rounded-xl p-6 border border-border">
              <h4 className="font-display font-semibold mb-2">Want to join the roster?</h4>
              <p className="text-sm text-muted-foreground mb-4">We are always looking for exceptional AI talent to lead our corporate programs.</p>
              <Button asChild variant="outline" className="w-full bg-background">
                <Link href="/contact?type=Trainer%20Request">Apply to Teach</Link>
              </Button>
            </div>
          </div>

          {/* Trainers Grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-6">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <Card key={i} className="animate-pulse bg-secondary/30 h-80 border-border/50">
                  </Card>
                ))
              ) : (Array.isArray(trainers) ? trainers : []).map((trainer, i) => (
                <Card key={trainer.id} className="overflow-hidden border-border/50 hover:border-primary/20 hover:shadow-lg transition-all flex flex-col group">
                  <div className="p-6 pb-0 flex items-start gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-border">
                      <img 
                        src={trainer.imageUrl || getTrainerImage(i)} 
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{trainer.name}</CardTitle>
                      <div className="text-sm font-medium text-accent">{trainer.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Briefcase className="h-3 w-3" /> {trainer.experience || "10+ years"}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 pt-4 grow flex flex-col">
                    <div className="flex items-center gap-4 mb-4 text-sm font-medium">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span>{trainer.rating?.toFixed(1) || "5.0"}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users2 className="h-4 w-4 mr-1" />
                        <span>{trainer.sessionsCompleted || 0} Sessions</span>
                      </div>
                      {trainer.linkedin && (
                        <a href={trainer.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-blue-600 transition-colors ml-auto">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                      {trainer.bio}
                    </p>
                    
                    <div className="mt-auto space-y-3">
                      <div className="text-xs font-semibold text-foreground uppercase tracking-wider">Expertise</div>
                      <div className="flex flex-wrap gap-1.5">
                        {trainer.expertise?.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-[10px] bg-secondary/80 hover:bg-secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-0">
                    <Button asChild variant="ghost" className="w-full rounded-none h-12 border-t border-border/50 text-foreground hover:text-primary hover:bg-primary/10 transition-colors font-medium">
                      <Link href={`/contact?type=Trainer%20Request&expert=${encodeURIComponent(trainer.name)}`}>
                        Request {trainer.name.split(' ')[0]} for Training <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {trainers?.length === 0 && (
              <div className="text-center py-24 bg-secondary/20 rounded-xl border border-border border-dashed w-full">
                <Users2 className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-display font-semibold mb-2">No experts found</h3>
                <p className="text-muted-foreground">Try adjusting your filters.</p>
              </div>
            )}
          </div>
          
        </div>
      </section>
    </Shell>
  );
}
