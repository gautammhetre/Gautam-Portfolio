import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';
import useTypingAnimation from '@/hooks/useTypingAnimation';

const Hero = () => {
  const tagline = "Curious data enthusiast and creative technologist blending AI, design, and innovation to build intelligent, meaningful digital experiences.";
  const { displayedText, isComplete } = useTypingAnimation(tagline, 30, 800);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" 
        style={{ backgroundImage: `url(${heroImage})` }} 
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient opacity-80" />

      {/* Tech Grid + Scanlines */}
      <div className="absolute inset-0 tech-grid" aria-hidden="true" />
      <div className="absolute inset-0 scanlines" aria-hidden="true" />
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mt-12 md:mt-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-monoAlt tracking-tight">
            <span className="inline-block animate-text-reveal stagger-1 animate-gradient-text">
              Gautam
            </span>
            <br />
            <span className="inline-block animate-text-reveal stagger-2 text-foreground">
              Mhetre
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto min-h-[4rem] md:min-h-[3rem]">
            {displayedText}
            <span className={`inline-block w-0.5 h-6 ml-1 bg-primary align-middle ${isComplete ? 'animate-pulse' : 'animate-blink-caret'}`} />
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-4 transition-all duration-500 ${isComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button 
              size="lg" 
              className="glow-shadow hover:scale-105 transition-bounce animate-float-gentle" 
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="hover:scale-105 transition-bounce" 
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </Button>
          </div>
          
          <div className={`flex justify-center mb-12 transition-all duration-500 delay-100 ${isComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button asChild variant="outline" size="lg" className="hover:scale-105 transition-bounce">
              <a 
                href="https://drive.google.com/file/d/1an6sCpqqBJHTld2am-2cX0gUKQeKWZVL/view?usp=drive_link" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Open resume on Google Drive"
              >
                <span className="inline-flex items-center gap-2">
                  <Download size={20} />
                  Resume
                </span>
              </a>
            </Button>
          </div>
          
          {/* Social Links */}
          <div className={`flex justify-center space-x-6 mb-12 transition-all duration-500 delay-200 ${isComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <a 
              href="https://github.com/gautammhetre" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-full border border-border hover:border-primary hover:scale-110 transition-bounce hover:glow-shadow"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/gautam-mhetre-0132ba24a" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 rounded-full border border-border hover:border-primary hover:scale-110 transition-bounce hover:glow-shadow"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:gautammhetre@gmail.com" 
              className="p-3 rounded-full border border-border hover:border-primary hover:scale-110 transition-bounce hover:glow-shadow"
            >
              <Mail size={24} />
            </a>
          </div>
          
          {/* Scroll Indicator */}
          <button 
            onClick={() => scrollToSection('about')} 
            className={`animate-float-gentle hover:scale-110 transition-all duration-500 delay-300 ${isComplete ? 'opacity-100' : 'opacity-0'}`}
          >
            <ArrowDown size={32} className="text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
