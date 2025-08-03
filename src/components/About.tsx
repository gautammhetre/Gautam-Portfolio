import { Card } from '@/components/ui/card';
import { Code, Palette, Zap } from 'lucide-react';
const About = () => {
  const highlights = [{
    icon: Code,
    title: "Full-Stack Development",
    description: "Building end-to-end solutions with modern frameworks and best practices"
  }, {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user experiences with attention to detail"
  }, {
    icon: Zap,
    title: "Performance Optimization",
    description: "Delivering fast, scalable applications optimized for real-world usage"
  }];
  return <section id="about" className="py-20 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            About <span className="text-gradient">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">I’m Gautam Mhetre, a developer driven by curiosity and a love for building things that matter. I’m currently studying Artificial Intelligence and Data Science, and I spend most of my time exploring how code, data, and design can come together to solve real-world problems.</p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">I’m currently pursuing my degree in Artificial Intelligence and Data Science from SPPU, graduating in 2026.From predicting air quality to designing simple chatbots, I enjoy working on projects that push me to learn and grow. I believe in staying curious, thinking practically, and always moving forward one line of code at a time.</p>
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
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>;
};
export default About;