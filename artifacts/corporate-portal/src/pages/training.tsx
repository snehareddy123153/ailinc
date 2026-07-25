import { Shell } from "@/components/layout/shell";
import { useListTrainingPrograms } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BookOpen, Clock, Target, CheckCircle2, ChevronRight, Layers } from "lucide-react";
import { program1, program2, program3 } from "@/assets/images";
import { useState } from "react";

export function Training() {
  const { data: programs, isLoading } = useListTrainingPrograms();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.isArray(programs) ? Array.from(new Set(programs.map(p => p.category))) : [];
  
  const filteredPrograms = Array.isArray(programs) 
    ? (selectedCategory ? programs.filter(p => p.category === selectedCategory) : programs)
    : [];

  const getProgramImage = (index: number) => {
    const images = [program1, program2, program3];
    return images[index % images.length];
  };

  return (
    <Shell>
      {/* Header */}
      <section className="bg-secondary/50 py-16 md:py-24 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl space-y-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Corporate AI Curriculum
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Rigorous, practitioner-led training pathways designed to transform your engineering and leadership teams from AI-aware to AI-native.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 items-start md:items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Layers className="h-4 w-4" />
              <span>Filter by focus area:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer text-sm px-4 py-1.5"
                onClick={() => setSelectedCategory(null)}
              >
                All Programs
              </Badge>
              {categories.map(cat => (
                <Badge 
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className="cursor-pointer text-sm px-4 py-1.5"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <Card key={i} className="flex flex-col h-[500px] animate-pulse bg-secondary/30 border-border/50">
                </Card>
              ))
            ) : filteredPrograms?.map((program, i) => (
              <Card key={program.id} className="flex flex-col overflow-hidden border-border/50 group bg-card transition-shadow hover:shadow-md">
                <div className="aspect-[16/9] overflow-hidden bg-secondary relative">
                  <img 
                    src={program.imageUrl || getProgramImage(i)} 
                    alt={program.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge variant="secondary" className="shadow-sm font-semibold backdrop-blur-md bg-background/90">{program.level}</Badge>
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs font-medium text-accent border-accent/20 bg-accent/5">{program.category}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center font-medium">
                      <Clock className="h-3 w-3 mr-1" /> {program.duration}
                    </span>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 mt-4 text-sm leading-relaxed">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      Key Outcomes
                    </div>
                    <ul className="space-y-2">
                      {program.outcomes?.slice(0, 2).map((outcome, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="mt-auto pt-4 border-t bg-secondary/10">
                  <Button asChild className="w-full font-semibold">
                    <Link href={`/contact?type=Corporate%20Training&program=${encodeURIComponent(program.title)}`}>
                      Inquire for Enterprise
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredPrograms?.length === 0 && (
            <div className="text-center py-24 bg-secondary/20 rounded-xl border border-border border-dashed">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-display font-semibold mb-2">No programs found</h3>
              <p className="text-muted-foreground">Try adjusting your category filter.</p>
            </div>
          )}

        </div>
      </section>
      
      {/* Custom Enterprise Banner */}
      <section className="py-16 bg-primary text-primary-foreground border-y border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Need a custom curriculum?
              </h2>
              <p className="text-primary-foreground/80 text-lg">
                Our architects can design a proprietary training pathway specifically for your proprietary data, models, and strategic goals.
              </p>
            </div>
            <Button asChild size="lg" variant="secondary" className="shrink-0 w-full md:w-auto h-12 px-8 font-semibold">
              <Link href="/contact">Speak to an Architect</Link>
            </Button>
          </div>
        </div>
      </section>
    </Shell>
  );
}
