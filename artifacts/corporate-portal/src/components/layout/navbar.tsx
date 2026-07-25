import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { BrainCircuit, Menu, X, ShieldCheck, User, LogOut, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Badge } from "@/components/ui/badge";

import { AiLincLogo } from "@/components/ui/logo";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();

  const links = [
    { href: "/", label: "Home" },
    { href: "/training", label: "Corporate Training" },
    { href: "/trainers", label: "Our Experts" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <AiLincLogo size="sm" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location === link.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link
                  href="/admin"
                  className={cn(
                    "text-sm font-semibold transition-colors flex items-center gap-1 text-primary",
                    location === "/admin" ? "text-accent" : "hover:text-accent"
                  )}
                >
                  <ShieldCheck className="h-4 w-4" /> Admin Portal
                </Link>
              </li>
            )}
          </ul>

          <div className="h-6 w-px bg-border hidden lg:block" />

          {/* User Auth state button */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right text-xs">
                <span className="font-semibold text-foreground">{user.name}</span>
                <span className="text-muted-foreground capitalize flex items-center justify-end gap-1">
                  {user.role === "admin" ? (
                    <Badge variant="outline" className="text-[10px] py-0 px-1.5 bg-primary/10 text-primary border-primary/20">Admin</Badge>
                  ) : (
                    <span className="text-[11px] text-muted-foreground">Student</span>
                  )}
                </span>
              </div>
              <Button size="sm" variant="ghost" onClick={logout} title="Sign Out" className="h-8 w-8 p-0">
                <LogOut className="h-4 w-4 text-muted-foreground hover:text-destructive" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="font-medium text-xs">
                <Link href="/login">
                  <LogIn className="h-3.5 w-3.5 mr-1" /> Sign In
                </Link>
              </Button>
              <Button asChild size="sm" className="hidden lg:flex font-semibold text-xs">
                <Link href="/login">Register Student</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 absolute top-16 left-0 right-0 shadow-lg animate-in slide-in-from-top-2">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block text-lg font-medium transition-colors",
                    location === link.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-semibold text-primary"
                >
                  🛡️ Admin Portal
                </Link>
              </li>
            )}
            <li className="pt-2">
              {user ? (
                <Button variant="outline" onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full font-semibold">
                  Sign Out ({user.name})
                </Button>
              ) : (
                <Button asChild className="w-full font-semibold">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In / Register
                  </Link>
                </Button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
