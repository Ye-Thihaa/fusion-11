import { Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-12 py-6">
      <div className="flex items-center justify-between max-w-[1800px] mx-auto">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
             <img src="/icon.svg" alt="SMR Icon" className="w-7 h-7" />
          </div>
          <span className="text-foreground text-xl font-semibold">Fussion 11</span>
        </Link>
        
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className={location.pathname === "/" ? "text-primary neon-green transition-colors font-medium" : "text-muted-foreground hover:text-primary hover:neon-green transition-all"}
          >
            Home
          </Link>
            <Link 
            to="/plan" 
            className={location.pathname === "/plan" ? "text-primary neon-green transition-colors font-medium" : "text-muted-foreground hover:text-primary hover:neon-green transition-all"}
          >
            Plan
          </Link>
          <Link 
            to="/map" 
            className={location.pathname === "/map" ? "text-primary neon-green transition-colors font-medium" : "text-muted-foreground hover:text-primary hover:neon-green transition-all"}
          >
            Map
          </Link>
          <Link 
            to="/calculate" 
            className={location.pathname === "/calculate" ? "text-primary neon-green transition-colors font-medium" : "text-muted-foreground hover:text-primary hover:neon-green transition-all"}
          >
            Calculate
          </Link>
          <a 
            href="https://snpp-ai-aid.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary hover:neon-green transition-all"
          >
            Chat bot
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
