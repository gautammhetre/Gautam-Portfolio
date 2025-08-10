

const About = () => {
  return (
    <section id="about" className="py-20 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            About <span className="text-gradient">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm Gautam Mhetre, a developer driven by curiosity and a love for building things that matter. I'm currently studying Artificial Intelligence and Data Science, and I spend most of my time exploring how code, data, and design can come together to solve real-world problems.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm currently pursuing my degree in Artificial Intelligence and Data Science from SPPU, graduating in 2026. From predicting air quality to designing simple chatbots, I enjoy working on projects that push me to learn and grow. I believe in staying curious, thinking practically, and always moving forward one line of code at a time.
              </p>
            </div>
            
            <div className="relative">
              <div className="w-full h-80 card-gradient rounded-2xl card-shadow animate-glow" />
              <div className="absolute inset-4 bg-muted/20 rounded-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/ba76cba0-3951-4d14-8df0-c29fb5bfaaf6.png" 
                  alt="Gautam Mhetre - AI & Data Science Student"
                  className="w-full h-full object-cover rounded-lg"
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