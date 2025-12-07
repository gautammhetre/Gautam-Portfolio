import useScrollAnimation from '@/hooks/useScrollAnimation';

const About = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();

  return (
    <section id="about" className="mt-20 md:mt-28 pt-32 pb-20 md:pt-40 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div ref={titleRef}>
            <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 ${
              titleVisible ? 'animate-text-reveal' : 'opacity-0'
            }`}>
              About <span className="animate-gradient-text">Me</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={textRef} className="space-y-6">
              <p className={`text-lg text-muted-foreground leading-relaxed ${
                textVisible ? 'animate-text-slide-right stagger-1' : 'opacity-0'
              }`}>
                I'm Gautam Mhetre, a developer driven by curiosity and a love for building things that matter. I'm currently studying Artificial Intelligence and Data Science, and I spend most of my time exploring how code, data, and design can come together to solve real-world problems.
              </p>
              
              <p className={`text-lg text-muted-foreground leading-relaxed ${
                textVisible ? 'animate-text-slide-right stagger-2' : 'opacity-0'
              }`}>
                I'm currently pursuing my degree in Artificial Intelligence and Data Science from SPPU, graduating in 2026. From predicting air quality to designing simple chatbots, I enjoy working on projects that push me to learn and grow. I believe in staying curious, thinking practically, and always moving forward one line of code at a time.
              </p>
            </div>
            
            <div ref={imageRef} className={`relative ${imageVisible ? 'animate-text-slide-left' : 'opacity-0'}`}>
              <div className="w-full h-80 card-gradient rounded-2xl card-shadow animate-glow" />
              <div className="absolute inset-4 rounded-xl overflow-hidden glass">
                <img 
                  src="/lovable-uploads/ba76cba0-3951-4d14-8df0-c29fb5bfaaf6.png" 
                  alt="Gautam Mhetre - AI & Data Science Student"
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-smooth"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
