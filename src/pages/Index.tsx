import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ImmersiveBackground from '@/components/ImmersiveBackground';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <ImmersiveBackground />
      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
