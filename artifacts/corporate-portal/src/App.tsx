import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toast';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Home } from '@/pages/home';
import { Training } from '@/pages/training';
import { Trainers } from '@/pages/trainers';
import { Contact } from '@/pages/contact';
import { AuthPage } from '@/pages/auth';
import { AdminPortal } from '@/pages/admin';
import { AuthProvider } from '@/lib/auth-context';
import { Shell } from '@/components/layout/shell';
import { AiLincLogo } from '@/components/ui/logo';
import { Link } from 'wouter';

const queryClient = new QueryClient();

function NotFound() {
  return (
    <Shell>
      <div className="flex-1 flex items-center justify-center py-24 bg-background">
        <div className="text-center max-w-md mx-auto space-y-6 px-4">
          <div className="flex justify-center mx-auto mb-4">
            <AiLincLogo size="lg" />
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground">404</h1>
          <p className="text-lg text-muted-foreground">The page you are looking for does not exist or has been moved.</p>
          <div className="pt-4">
            <Link href="/" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/training" component={Training} />
      <Route path="/trainers" component={Trainers} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={AuthPage} />
      <Route path="/register" component={AuthPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/admin" component={AdminPortal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
