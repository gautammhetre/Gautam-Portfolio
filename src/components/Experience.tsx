import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "AI Research Intern",
      company: "Tech Innovation Lab",
      location: "Remote",
      period: "Jun 2024 - Aug 2024",
      description: "Worked on machine learning models for predictive analytics and data preprocessing pipelines.",
      technologies: ["Python", "TensorFlow", "Pandas", "Scikit-learn"]
    },
    {
      title: "Web Development Intern",
      company: "Digital Solutions Inc",
      location: "Pune, India",
      period: "Dec 2023 - Feb 2024",
      description: "Developed responsive web applications and contributed to full-stack development projects.",
      technologies: ["React", "Node.js", "MongoDB", "Express.js"]
    },
    {
      title: "Freelance Developer",
      company: "Self-Employed",
      location: "Remote",
      period: "Jan 2023 - Present",
      description: "Building custom web solutions and AI-powered applications for various clients.",
      technologies: ["React", "Python", "FastAPI", "PostgreSQL"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            My <span className="text-gradient">Experience</span>
          </h2>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="p-6 card-shadow hover:scale-[1.02] transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                    <p className="text-lg text-primary font-medium">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:text-right gap-1">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;