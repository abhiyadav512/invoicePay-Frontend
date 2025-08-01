import { useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  FileText,
  DollarSign,
  Users,
  BarChart3,
  Shield,
  Zap,
  Star,
  Menu,
  X,
  Receipt,
} from "lucide-react";
import { useState } from "react";
import Footer from "../components/Footer";
import { useAuth } from "../components/contexts/authContexts";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: <FileText className="h-8 w-8 text-[oklch(0.488_0.243_264.376)]" />,
      title: "Smart Invoice Creation",
      description:
        "Create professional invoices in seconds with our intuitive interface and customizable templates.",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-[oklch(0.696_0.17_162.48)]" />,
      title: "Payment Tracking",
      description:
        "Monitor payment status, send reminders, and get paid faster with integrated payment solutions.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-[oklch(0.769_0.188_70.08)]" />,
      title: "Analytics & Reports",
      description:
        "Gain insights into your business with detailed analytics and comprehensive financial reports.",
    },
    {
      icon: <Users className="h-8 w-8 text-[oklch(0.627_0.265_303.9)]" />,
      title: "Client Management",
      description:
        "Organize client information, track payment history, and build stronger business relationships.",
    },
    {
      icon: <Shield className="h-8 w-8 text-[oklch(0.704_0.191_22.216)]" />,
      title: "Secure & Compliant",
      description:
        "Your data is protected with enterprise-grade security and compliance with industry standards.",
    },
    {
      icon: <Zap className="h-8 w-8 text-[oklch(0.645_0.246_16.439)]" />,
      title: "Automation Tools",
      description:
        "Automate recurring invoices, payment reminders, and follow-ups to save time and effort.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      content:
        "This platform has transformed how I handle invoicing. I get paid 40% faster now!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Small Business Owner",
      content:
        "The analytics features help me understand my cash flow better than ever before.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Consultant",
      content:
        "Clean interface, powerful features, and excellent customer support. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.205_0_0)]">
      <nav className="bg-[oklch(0.205_0_0)]/80 backdrop-blur-md border-b border-[oklch(1_0_0/0.1)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="flex gap-2 items-center">
                    <Receipt className="w-6 h-6 -rotate-20" />
                  </div>
                  <span className="text-xl font-bold text-[oklch(0.985_0_0)]">
                    InvoicePay
                  </span>
                </div>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <a
                    href="#features"
                    className="text-[oklch(0.708_0_0)] hover:text-[oklch(0.985_0_0)] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Features
                  </a>
                  <a
                    href="#testimonials"
                    className="text-[oklch(0.708_0_0)] hover:text-[oklch(0.985_0_0)] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Reviews
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6 space-x-3">
                <Button variant="ghost" asChild>
                  <a href="/login">Sign In</a>
                </Button>
                <Button asChild>
                  <a href="/dashboard">Get Started</a>
                </Button>
              </div>
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[oklch(0.205_0_0)] border-t border-[oklch(1_0_0/0.1)]">
              <a
                href="#features"
                className="text-[oklch(0.708_0_0)] hover:text-[oklch(0.985_0_0)] block px-3 py-2 rounded-md text-base font-medium"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-[oklch(0.708_0_0)] hover:text-[oklch(0.985_0_0)] block px-3 py-2 rounded-md text-base font-medium"
              >
                Reviews
              </a>
            </div>
          </div>
        )}
      </nav>

      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">
                  <Zap className="w-3 h-3 mr-1" />
                  New: AI-Powered Invoice Templates
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[oklch(0.985_0_0)] leading-tight">
                  Invoice Management
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.488_0.243_264.376)] to-[oklch(0.627_0.265_303.9)]">
                    {" "}
                    Made Simple
                  </span>
                </h1>
              </div>
              <p className="text-xl text-[oklch(0.708_0_0)] mb-8 leading-relaxed">
                Create professional invoices, track payments, and grow your
                business with our comprehensive invoicing platform. Join
                thousands of businesses who trust us with their billing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="text-lg px-8 py-3" asChild>
                  <a href="/dashboard">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3"
                  asChild
                >
                  <a href="/dashboard">View Demo</a>
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-[oklch(0.708_0_0)]">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-[oklch(0.696_0.17_162.48)] mr-2" />
                  Subscription plans launching soon.{" "}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[oklch(0.205_0_0)] rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-[oklch(1_0_0/0.1)]">
                <div className="bg-gradient-to-r from-[oklch(0.488_0.243_264.376)] to-[oklch(0.627_0.265_303.9)] rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center text-[oklch(0.985_0_0)]">
                    <h3 className="font-semibold">Invoice #INV-001</h3>
                    <Badge
                      variant="secondary"
                      className="bg-[oklch(0.696_0.17_162.48)] text-[oklch(0.985_0_0)]"
                    >
                      Paid
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[oklch(0.708_0_0)]">Amount:</span>
                    <span className="font-semibold text-[oklch(0.985_0_0)]">
                      $2,500.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[oklch(0.708_0_0)]">Due Date:</span>
                    <span className="font-semibold text-[oklch(0.985_0_0)]">
                      Jan 15, 2024
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[oklch(0.708_0_0)]">Client:</span>
                    <span className="font-semibold text-[oklch(0.985_0_0)]">
                      Acme Corp
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-[oklch(0.269_0_0)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[oklch(0.985_0_0)] mb-4">
              Everything you need to manage invoices
            </h2>
            <p className="text-xl text-[oklch(0.708_0_0)] max-w-2xl mx-auto">
              Powerful features designed to streamline your billing process and
              help you get paid faster.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-shadow duration-300 border-0 bg-[oklch(0.205_0_0)] backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-[oklch(0.985_0_0)]">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-[oklch(0.708_0_0)]">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-[oklch(0.205_0_0)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[oklch(0.985_0_0)] mb-4">
              Loved by businesses worldwide
            </h2>
            <p className="text-xl text-[oklch(0.708_0_0)]">
              See what our customers have to say about their experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 bg-[oklch(0.269_0_0)] backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[oklch(0.769_0.188_70.08)] text-[oklch(0.769_0.188_70.08)]"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-base italic leading-relaxed text-[oklch(0.708_0_0)]">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold text-[oklch(0.985_0_0)]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-[oklch(0.708_0_0)]">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[oklch(0.269_0_0)]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[oklch(0.985_0_0)] mb-6">
            Ready to streamline your invoicing?
          </h2>
          <p className="text-xl text-[oklch(0.708_0_0)] mb-8">
            Join thousands of businesses who have already transformed their
            billing process with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3" asChild>
              <a href="/dashboard">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3"
              asChild
            >
              <a href="/login">Sign In</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
