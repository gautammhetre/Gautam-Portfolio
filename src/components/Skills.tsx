import { Badge } from '@/components/ui/badge';

const Skills = () => {
  const skills = ["Basic Web Development", "Python", "C++", "IoT", "Data Science", "Machine Learning", "Artificial Intelligence"];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-6 py-3 text-base hover:scale-110 transition-bounce card-shadow"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;