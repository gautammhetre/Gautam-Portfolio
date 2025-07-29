import { Card } from '@/components/ui/card';
import { Code, Palette, Zap } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Building end-to-end solutions with modern frameworks and best practices"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating intuitive and beautiful user experiences with attention to detail"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Delivering fast, scalable applications optimized for real-world usage"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            About <span className="text-gradient">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate developer with over 5 years of experience creating 
                digital solutions that make a difference. My journey began with a 
                curiosity for how things work and evolved into a deep love for 
                crafting elegant code and beautiful interfaces.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge with 
                the developer community. I believe in continuous learning and 
                pushing the boundaries of what's possible.
              </p>
            </div>
            
            <div className="relative">
              <div className="w-full h-80 card-gradient rounded-2xl card-shadow animate-glow" />
              <div className="absolute inset-4 bg-muted/20 rounded-xl flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <Card key={index} className="p-6 card-shadow hover:scale-105 transition-bounce">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;