import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Award, ExternalLink, Image } from 'lucide-react';
import oracleBadge from '@/assets/certificates/oracle-badge.png';

const Certifications = () => {
  const certifications = [
    {
      title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
      issuer: "Oracle",
      date: "2025",
      description: "Professional certification demonstrating expertise in Oracle Cloud Infrastructure data science services, machine learning, and advanced analytics capabilities.",
      skills: ["Oracle Cloud", "Data Science", "Machine Learning", "Analytics"],
      credentialId: "C9AD3AFC099340261137BF2360FB2D1459269FF3BB4DBA882E98A6C0C5DE2FB8",
      verifyUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=C9AD3AFC099340261137BF2360FB2D1459269FF3BB4DBA882E98A6C0C5DE2FB8",
      image: oracleBadge
    },
    {
      title: "Deloitte Australia - Data Analytics Job Simulation",
      issuer: "Deloitte Australia",
      date: "2024",
      description: "Comprehensive job simulation program covering real-world data analytics challenges, business intelligence, and strategic decision-making processes.",
      skills: ["Data Analytics", "Business Intelligence", "Strategic Analysis", "Problem Solving"],
      credentialId: "",
      verifyUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_ghsBEMLzsDdNsrcTW_1751885115931_completion_certificate.pdf",
      image: null
    },
    {
      title: "Data Visualisation: Empowering Business with Effective Insights Job Simulation",
      issuer: "Tata",
      date: "2024",
      description: "Specialized program focused on creating impactful data visualizations and deriving actionable business insights from complex datasets.",
      skills: ["Data Visualization", "Business Insights", "Dashboard Design", "Analytics"],
      credentialId: "",
      verifyUrl: "",
      image: null
    },
    {
      title: "Certificate Course in Programming",
      issuer: "Disha Computer Institute - India",
      date: "2024",
      description: "Comprehensive programming course covering fundamental and advanced programming concepts, software development practices, and practical coding skills.",
      skills: ["Programming", "Software Development", "Coding", "Computer Science"],
      credentialId: "",
      verifyUrl: "",
      image: null
    },
    {
      title: "IoT Using Arduino",
      issuer: "Cognifront",
      date: "2024",
      description: "Hands-on course covering Internet of Things development using Arduino microcontrollers, sensors, and connectivity solutions.",
      skills: ["IoT", "Arduino", "Microcontrollers", "Embedded Systems"],
      credentialId: "",
      verifyUrl: "",
      image: null
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            My <span className="text-gradient">Certifications</span>
          </h2>
          
          {/* Certificate Grid - Small boxes in rows */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-4 card-shadow hover:scale-105 transition-all duration-300">
                {/* Certificate Photo */}
                <div className="aspect-[4/3] bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center overflow-hidden mb-3">
                  {cert.image ? (
                    <img 
                      src={cert.image} 
                      alt={`${cert.title} Certificate`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <div className="text-center p-2">
                      <Image className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Certificate</p>
                    </div>
                  )}
                </div>
                
                {/* Certificate Info */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Award className="w-3 h-3 text-primary" />
                    {cert.verifyUrl && (
                      <a 
                        href={cert.verifyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">{cert.title}</h3>
                  <p className="text-xs text-primary font-medium mb-1">{cert.issuer}</p>
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-2">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs">{cert.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {cert.skills.slice(0, 2).map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs px-1 py-0">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;