import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";
import { AiLincLogo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30 mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <AiLincLogo size="md" showTagline={true} />
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Empowering organizations with world-class AI expertise. We connect corporate teams with top-tier AI practitioners for impactful, tailored training.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Platform</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/training" className="hover:text-primary transition-colors">Corporate Training</Link></li>
              <li><Link href="/trainers" className="hover:text-primary transition-colors">Our Experts</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Become a Trainer</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Press & Media</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <span>enterprise@ailinc.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>100 Innovation Dr<br />San Francisco, CA 94103</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Linc Corporation. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
