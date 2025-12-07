import { Badge } from '@/components/ui/badge';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const Skills = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation();

  const skills = ["Basic Web Development", "Python", "C++", "IoT", "Data Science", "Machine Learning", "Artificial Intelligence"];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div ref={titleRef}>
            <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 ${
              titleVisible ? 'animate-text-reveal' : 'opacity-0'
            }`}>
              Technical <span className="animate-gradient-text">Skills</span>
            </h2>
          </div>
          
          <div ref={skillsRef} className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className={`px-6 py-3 text-base hover:scale-110 transition-bounce card-shadow ${
                  skillsVisible ? `animate-text-reveal stagger-${index + 1}` : 'opacity-0'
                }`}
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
