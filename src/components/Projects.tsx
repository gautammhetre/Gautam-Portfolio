import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const Projects = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: otherTitleRef, isVisible: otherTitleVisible } = useScrollAnimation();

  const projects = [
    {
      title: "Delhi AQI Prediction",
      description: "Machine learning model for predicting Air Quality Index (AQI) based on pollutant levels including CO, NO, NO2, O3, and SO2 concentrations.",
      image: "🌬️",
      tech: ["Python", "Machine Learning", "Data Science", "Pandas"],
      github: "https://github.com/gautammhetre/Delhi-AQI-Prediction",
      featured: true
    },
    {
      title: "YOLOv5 Car Object Detection",
      description: "Real-time car detection system using YOLOv5 deep learning model for traffic monitoring and analysis.",
      image: "🚗",
      tech: ["Python", "YOLOv5", "OpenCV", "PyTorch"],
      github: "https://github.com",
      featured: true
    },
    {
      title: "Portfolio Website",
      description: "Modern, responsive portfolio showcasing projects and skills with smooth animations and dark mode.",
      image: "💼",
      tech: ["React", "Tailwind CSS", "TypeScript", "Framer Motion"],
      github: "https://github.com/gautammhetre/Gautam-Portfolio",
      featured: true
    },
    {
      title: "Smart Chatbot Assistant",
      description: "Rule-based chatbot system with natural language processing capabilities for automated customer support and query handling.",
      image: "🤖",
      tech: ["Python", "NLP", "Rule-based AI", "Text Processing"],
      github: "https://github.com/gautammhetre/rulebasedbot",
      featured: false
    },
    {
      title: "Disease Recommendation System",
      description: "Machine learning system that recommends diseases based on symptoms input, helping with preliminary medical diagnosis and healthcare guidance.",
      image: "🏥",
      tech: ["Python", "Machine Learning", "Healthcare", "Data Analysis"],
      github: "https://github.com/gautammhetre/Disease-Recommendation-System",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={titleRef}>
            <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 ${
              titleVisible ? 'animate-text-reveal' : 'opacity-0'
            }`}>
              Featured <span className="animate-gradient-text">Projects</span>
            </h2>
          </div>
          
          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard key={index} project={project} index={index} />
            ))}
          </div>
          
          {/* Other Projects */}
          <div ref={otherTitleRef}>
            <h3 className={`text-2xl font-semibold mb-8 text-center ${
              otherTitleVisible ? 'animate-text-reveal' : 'opacity-0'
            }`}>
              Other Projects
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <OtherProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedProjectCard = ({ project, index }: { project: any; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <div ref={ref}>
      <Card className={`overflow-hidden card-shadow hover:scale-105 transition-bounce group ${
        isVisible ? `animate-text-reveal stagger-${(index % 4) + 1}` : 'opacity-0'
      }`}>
        <CardHeader className="p-0">
          <div className="h-48 card-gradient flex items-center justify-center text-6xl group-hover:scale-110 transition-smooth">
            {project.image}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="mb-3 text-xl">{project.title}</CardTitle>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech: string, techIndex: number) => (
              <Badge key={techIndex} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 hover:glow-shadow"
              onClick={() => window.open(project.github, '_blank')}
            >
              <Github size={16} />
              View Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const OtherProjectCard = ({ project, index }: { project: any; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <div ref={ref}>
      <Card className={`card-shadow hover:scale-105 transition-bounce ${
        isVisible ? `animate-text-slide-right stagger-${(index % 4) + 1}` : 'opacity-0'
      }`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="text-3xl">{project.image}</div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:glow-shadow"
                onClick={() => window.open(project.github, '_blank')}
              >
                <Github size={16} />
              </Button>
            </div>
          </div>
          <h4 className="font-semibold mb-2">{project.title}</h4>
          <p className="text-muted-foreground text-sm mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.tech.map((tech: string, techIndex: number) => (
              <Badge key={techIndex} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
