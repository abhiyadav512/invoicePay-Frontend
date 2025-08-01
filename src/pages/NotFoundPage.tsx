import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Home,
  ArrowLeft,
  FileText,
  Search,
  RefreshCw,
  AlertTriangle,
  Compass,
  HelpCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/contexts/authContexts";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [countdown, setCountdown] = useState(10);
  const [autoRedirect, setAutoRedirect] = useState(true);

  // Auto redirect countdown
  useEffect(() => {
    if (!autoRedirect) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate(isAuthenticated ? "/dashboard" : "/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, isAuthenticated, autoRedirect]);

  const handleStopRedirect = () => {
    setAutoRedirect(false);
  };

  const quickLinks = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Home",
      href: "/",
      description: "Return to homepage",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Invoices",
      href: "/invoices",
      description: "Manage your invoices",
      requiresAuth: true,
    },
    {
      icon: <Search className="h-5 w-5" />,
      label: "Dashboard",
      href: "/dashboard",
      description: "Access your dashboard",
      requiresAuth: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8 relative">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-primary to-primary/70 rounded-full mb-6 animate-pulse">
            <AlertTriangle className="h-16 w-16 text-primary-foreground" />
          </div>

          <div className="absolute -top-4 -left-4 w-6 h-6 bg-primary/60 rounded-full animate-bounce delay-100"></div>
          <div className="absolute -top-2 -right-6 w-4 h-4 bg-primary/40 rounded-full animate-bounce delay-300"></div>
          <div className="absolute -bottom-2 -left-6 w-5 h-5 bg-primary/80 rounded-full animate-bounce delay-500"></div>
        </div>

        <div className="mb-8">
          <h1 className="text-6xl sm:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 mb-4">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off into the
            digital void. Don't worry though – even the best explorers sometimes
            take a wrong turn!
          </p>
        </div>

        {autoRedirect && (
          <div className="mb-8 p-4 bg-card border border-border rounded-lg max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <RefreshCw className="h-4 w-4 text-primary animate-spin" />
              <span className="text-foreground font-medium">
                Auto-redirecting in {countdown} seconds
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStopRedirect}
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel redirect
            </Button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="text-lg px-8 py-3" asChild>
            <Link to={isAuthenticated ? "/dashboard" : "/"}>
              <Home className="mr-2 h-5 w-5" />
              Take Me Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-3"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-lg px-8 py-3"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Refresh Page
          </Button>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center justify-center">
            <Compass className="mr-2 h-5 w-5" />
            Quick Navigation
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {quickLinks
              .filter((link) => !link.requiresAuth || isAuthenticated)
              .map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="group p-4 bg-card border border-border rounded-lg hover:bg-accent transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-2 bg-primary rounded-lg group-hover:scale-110 transition-transform duration-300 text-primary-foreground">
                      {link.icon}
                    </div>
                    <h4 className="font-medium text-foreground">
                      {link.label}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className="p-6 bg-card border border-border rounded-lg max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Search className="h-5 w-5 text-primary" />
            <h4 className="text-lg font-medium text-foreground">
              Still can't find what you're looking for?
            </h4>
          </div>
          <p className="text-muted-foreground mb-4">
            Try checking the URL for typos, or contact our support team for
            assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link to="/support">
                <HelpCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <a href="mailto:support@invoicepro.com">Send Email</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
