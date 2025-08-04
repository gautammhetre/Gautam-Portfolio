import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Air Quality Prediction Model",
      description: "Machine learning model to predict air quality levels using environmental data and historical patterns.",
      image: "🌬️",
      tech: ["Python", "Scikit-learn", "Pandas", "TensorFlow"],
      github: "https://github.com",
      featured: true
    },
    {
      title: "Smart Chatbot Assistant",
      description: "AI-powered chatbot with natural language processing capabilities for customer support automation.",
      image: "🤖",
      tech: ["Python", "NLP", "Flask", "OpenAI API"],
      github: "https://github.com",
      featured: true
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for analyzing and visualizing complex datasets with real-time updates.",
      image: "📊",
      tech: ["React", "D3.js", "Python", "FastAPI"],
      github: "https://github.com",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          
          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden card-shadow hover:scale-105 transition-bounce group">
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
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Github size={16} />
                      View Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Other Projects */}
          <h3 className="text-2xl font-semibold mb-8 text-center">Other Projects</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <Card key={index} className="card-shadow hover:scale-105 transition-bounce">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{project.image}</div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Github size={16} />
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">{project.title}</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
