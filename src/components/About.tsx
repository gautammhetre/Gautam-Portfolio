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
              <p className="text-lg text-muted-foreground leading-relaxed">Hey, I'm Gautam Mhetre — someone who’s always been curious about how things work and how to make them better. That curiosity turned into a passion for technology, and over the past few years, it’s grown into something deeper: a drive to build things that solve real problems.

I’m currently pursuing my degree in Artificial Intelligence and Data Science from SPPU, graduating in 2026. Along the way, I’ve explored data science, machine learning, and web development — not just to learn them, but to apply them meaningfully. Whether it’s predicting air quality in Delhi or building a rule-based chatbot, I like creating things that actually do something.

I don’t chase hype; I chase understanding. I believe learning never stops, and even a small project can teach something big. Outside of coding, I enjoy experimenting with new tools, helping out fellow learners, and pushing myself to think a little differently each day.

This portfolio is a glimpse into what I’ve built, what I’m building, and the kind of work I want to keep doing.</p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">I’m currently pursuing my degree in Artificial Intelligence and Data Science from SPPU, graduating in 2026. Along the way, I’ve explored data science, machine learning, and web development not just to learn them, but to apply them meaningfully. Whether it’s predicting air quality in Delhi or building a rule-based chatbot, I like creating things that actually do something.

I don’t chase hype; I chase understanding. I believe learning never stops, and even a small project can teach something big. Outside of coding, I enjoy experimenting with new tools, helping out fellow learners, and pushing myself to think a little differently each day.

This portfolio is a glimpse into what I’ve built, what I’m building, and the kind of work I want to keep doing.</p>
            </div>
            
            <div className="relative">
              <div className="w-full h-80 card-gradient rounded-2xl card-shadow animate-glow" />
              <div className="absolute inset-4 bg-muted/20 rounded-xl flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item, index) => <Card key={index} className="p-6 card-shadow hover:scale-105 transition-bounce">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </Card>)}
          </div>
        </div>
      </div>
    </section>;
};
export default About;