import { useState } from "react";
import { Shell } from "@/components/layout/shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { useLocation } from "wouter";
import { Lock, Mail, User, Building, Phone, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { getApiUrl } from "@/lib/utils";

export function AuthPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regPhone, setRegPhone] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(getApiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      login(data.user);
      toast({
        title: `Welcome back, ${data.user.name}`,
        description: data.user.role === "admin" ? "Logged into Admin Portal." : "Logged in successfully.",
      });

      if (data.user.role === "admin") {
        setLocation("/admin");
      } else {
        setLocation("/training");
      }
    } catch (err: any) {
      toast({
        title: "Authentication Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(getApiUrl("/api/auth/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
          company: regCompany,
          phone: regPhone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      login(data.user);
      toast({
        title: "Account Created Successfully",
        description: "Your student registration is complete. An advisor will review your profile.",
      });
      setLocation("/training");
    } catch (err: any) {
      toast({
        title: "Registration Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickLoginAdmin = () => {
    setLoginEmail("admin@ailinc.com");
    setLoginPassword("admin123");
  };

  const quickLoginStudent = () => {
    setLoginEmail("rahul@techcorp.com");
    setLoginPassword("student123");
  };

  return (
    <Shell>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-md">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> AI Linc Enterprise Portal
          </div>
          <h1 className="text-3xl font-display font-bold">Portal Access</h1>
          <p className="text-sm text-muted-foreground">Sign in to your corporate training account or register as a new student.</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register Student</TabsTrigger>
          </TabsList>

          {/* SIGN IN TAB */}
          <TabsContent value="login">
            <Card className="border-border/50 shadow-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">Sign In</CardTitle>
                <CardDescription>Enter your email and password to access your portal</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full font-semibold" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"} <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  {/* Demo Quick Logins */}
                  <div className="pt-4 border-t border-border/50 space-y-2">
                    <p className="text-xs text-muted-foreground text-center font-medium">Demo Quick Logins</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={quickLoginAdmin} className="text-xs">
                        <ShieldCheck className="h-3.5 w-3.5 mr-1 text-primary" /> Fill Admin
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={quickLoginStudent} className="text-xs">
                        <User className="h-3.5 w-3.5 mr-1 text-accent" /> Fill Student
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* REGISTER TAB */}
          <TabsContent value="register">
            <Card className="border-border/50 shadow-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">Register as Student</CardTitle>
                <CardDescription>Create your account to request training courses</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-name"
                        placeholder="Jane Doe"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Work Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="jane@company.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="reg-company">Company</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="reg-company"
                          placeholder="Acme Corp"
                          value={regCompany}
                          onChange={(e) => setRegCompany(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="reg-phone"
                          placeholder="+1 555-0199"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="••••••••"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full font-semibold" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Create Student Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Shell>
  );
}
