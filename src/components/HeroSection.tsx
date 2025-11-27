import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="max-w-[1800px] mx-auto w-full pl-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-hero leading-tight">
  <span className="text-foreground">Myanmar's </span>
  <span className="text-primary font-bold drop-shadow-[0_0_25px_rgba(126,217,87,0.8)]">Next</span>
  <br />
  <span className="text-foreground">Energy Step</span>
</h1>       
            <Button variant="hero" className="group">
              Load More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right Image - Extends to edge */}
          <div className="relative -mr-12 lg:-mr-0 lg:ml-12">
            <img 
              src="./build.png" 
              alt="Industrial Energy Storage Tanks"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;