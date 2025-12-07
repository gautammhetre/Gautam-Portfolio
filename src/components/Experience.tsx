import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const Experience = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  const experiences = [
    {
      title: "Data Science Intern",
      company: "Netleap IT And Training Solutions",
      location: "Nashik, India",
      period: "Dec 2024 - Feb 2025",
      description: "Worked on machine learning models for predictive analytics and data preprocessing pipelines.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Statistics"]
    },
    {
      title: "Vice President",
      company: "AIDS Department",
      location: "Nashik, India",
      period: "Aug 2024 - Aug 2025",
      description: "Led academic, technical, and cultural initiatives as Vice President of the AIDS branch, organizing high-impact events like Blind Coding and Blindfold Maze with 300+ participants, while representing the department in college council decisions.",
      technologies: ["Leadership", "Communication Skills", "Teamwork", "Public Speaking", "Management"]
    },
    {
      title: "Event Coordinator",
      company: "Coding Club - GCOERC",
      location: "Nashik, India",
      period: "Sept 2025 - Present",
      description: "Recently joined as Event Coordinator for the college coding club, responsible for planning and organizing technical workshops, coding competitions, and collaborative programming events to enhance peer learning and technical skills development.",
      technologies: ["Event Management", "Technical Workshops", "Community Building", "Project Coordination"]
    },
    {
      title: "Internshala Student Partner",
      company: "Internshala",
      location: "Nashik, India",
      period: "Aug 2025 - Present",
      description: "Campus ambassador promoting Internshala's educational courses and training programs, building strategic networks within the college community, and facilitating career development opportunities for fellow students through workshops and awareness campaigns.",
      technologies: ["Campus Marketing", "Networking", "Public Speaking", "Digital Marketing", "Student Engagement"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div ref={titleRef}>
            <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 ${
              titleVisible ? 'animate-text-reveal' : 'opacity-0'
            }`}>
              My <span className="animate-gradient-text">Experience</span>
            </h2>
          </div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ exp, index }: { exp: any; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <div ref={ref}>
      <Card className={`p-6 card-shadow hover:scale-[1.02] transition-all duration-300 ${
        isVisible ? `animate-text-slide-right stagger-${(index % 4) + 1}` : 'opacity-0'
      }`}>
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
          {exp.technologies.map((tech: string, techIndex: number) => (
            <Badge key={techIndex} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Experience;
