import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CreditCard, Receipt, MessageCircle, CheckCircle, Shield, ArrowRight, Sparkles, Zap, Lock } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import Header from "@/components/layout/Header";
import logo from '../../public/logo.png'
const LandingPage = () => {
  const features = [
    {
      icon: FileText,
      title: "File Tax Returns",
      description: "Easily file VAT, PAYE, and Income Tax returns online with step-by-step guidance.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: CreditCard,
      title: "Make Payments",
      description: "Secure online payment processing with instant receipts and payment history.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Receipt,
      title: "Smart Invoices",
      description: "View and validate your e-invoices in compliance with ZRA regulations.",
      gradient: "from-orange-500 to-amber-500",
    },
    {
      icon: MessageCircle,
      title: "AI Tax Assistant",
      description: "Get instant answers to tax questions from our intelligent chatbot.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: CheckCircle,
      title: "Track Compliance",
      description: "Monitor your compliance status and TCC eligibility in real-time.",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Bank-level security protecting your sensitive tax information.",
      gradient: "from-red-500 to-rose-500",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
    { value: "100%", label: "Secure" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <Header />
      
      
      {/* Hero Section with Mesh Gradient */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 mesh-gradient opacity-40 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container relative z-10 py-20 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Powered by AI Technology</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                ZRA Tax Compliance
                <span className="block mt-2 gradient-text">
                  Reimagined
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Experience the future of tax compliance with our AI-powered platform. 
                File returns, make payments, and track compliance in real-time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg group glow-primary hover:scale-105 transition-all">
                  <Link to="/auth/register">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg glass-button hover:scale-105 transition-all">
                  <Link to="/auth/login">
                    Sign In
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-2xl opacity-30 animate-pulse-slow" />
              <img 
                src={heroImage} 
                alt="Tax compliance dashboard" 
                className="relative rounded-3xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container relative z-10">
          <div className="text-center mb-16 space-y-4 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Powerful Features</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Everything You Need for
              <span className="block gradient-text">Tax Compliance</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Streamline your tax processes with our comprehensive suite of AI-powered tools.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group glass-card hover:shadow-card-hover transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in border-2 hover:border-primary/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-card border-2 hover:shadow-card-hover transition-all duration-500">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 backdrop-blur-sm">
                      <Lock className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium">Secure & Trusted</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold">
                      Bank-Level
                      <span className="block gradient-text">Security</span>
                    </h3>
                    
                    <p className="text-muted-foreground">
                      Your data is protected with military-grade encryption and multi-factor authentication. 
                      We comply with all ZRA security requirements and international standards.
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-2 border-background" />
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-background" />
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 border-2 border-background" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Trusted by 50,000+ users</p>
                        <p className="text-xs text-muted-foreground">and growing every day</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-6 text-center space-y-2 hover:scale-105 transition-transform">
                      <div className="text-3xl font-bold gradient-text">256-bit</div>
                      <div className="text-sm text-muted-foreground">Encryption</div>
                    </div>
                    <div className="glass-card p-6 text-center space-y-2 hover:scale-105 transition-transform">
                      <div className="text-3xl font-bold gradient-text">24/7</div>
                      <div className="text-sm text-muted-foreground">Monitoring</div>
                    </div>
                    <div className="glass-card p-6 text-center space-y-2 hover:scale-105 transition-transform">
                      <div className="text-3xl font-bold gradient-text">ISO</div>
                      <div className="text-sm text-muted-foreground">Certified</div>
                    </div>
                    <div className="glass-card p-6 text-center space-y-2 hover:scale-105 transition-transform">
                      <div className="text-3xl font-bold gradient-text">100%</div>
                      <div className="text-sm text-muted-foreground">Compliant</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-10" />
        
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Start Your Journey Today</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Ready to Transform Your
              <span className="block gradient-text">Tax Compliance?</span>
            </h2>
            
            <p className="text-lg text-muted-foreground">
              Join thousands of taxpayers who have simplified their tax compliance with ZRA's next-generation portal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg group glow-primary hover:scale-105 transition-all">
                <Link to="/auth/register">
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg glass-button hover:scale-105 transition-all">
                <Link to="/auth/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 backdrop-blur-sm bg-background/50">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Zambia Revenue Authority. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
