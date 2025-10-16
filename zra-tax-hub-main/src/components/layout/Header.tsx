import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, FileText, CreditCard, Receipt, User, MessageCircle } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isPublicRoute = location.pathname === "/" || location.pathname.startsWith("/auth");

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/returns", label: "Returns", icon: FileText },
    { path: "/payments", label: "Payments", icon: CreditCard },
    { path: "/invoices", label: "Invoices", icon: Receipt },
    { path: "/profile", label: "Profile", icon: User },
  ];

  if (isPublicRoute) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-card">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary-light to-accent glow-primary group-hover:scale-110 transition-transform">
              <span className="text-xl font-bold text-white">ZRA</span>
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Tax Compliance Portal</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Button asChild variant="ghost" className="hover:scale-105 transition-transform">
              <Link to="/auth/login">Login</Link>
            </Button>
            <Button asChild className="glow-primary hover:scale-105 transition-transform">
              <Link to="/auth/register">Register</Link>
            </Button>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-card">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/dashboard" className="flex items-center space-x-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary-light to-accent glow-primary group-hover:scale-110 transition-transform">
            <span className="text-xl font-bold text-white">ZRA</span>
          </div>
          <span className="hidden text-lg font-semibold md:inline bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Tax Portal</span>
        </Link>
        
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Button
                key={item.path}
                asChild
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className={`gap-2 transition-all ${isActive ? 'glow-primary scale-105' : 'hover:scale-105'}`}
              >
                <Link to={item.path}>
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              </Button>
            );
          })}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-2 ml-2"
          >
            <Link to="/chat">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden md:inline">AI Assistant</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
