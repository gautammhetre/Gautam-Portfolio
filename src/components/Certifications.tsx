import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Award, ExternalLink, Image } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
      issuer: "Oracle",
      date: "2025",
      description: "Professional certification demonstrating expertise in Oracle Cloud Infrastructure data science services, machine learning, and advanced analytics capabilities.",
      skills: ["Oracle Cloud", "Data Science", "Machine Learning", "Analytics"],
      credentialId: "",
      verifyUrl: "",
      image: null
    },
    {
      title: "Deloitte Australia - Data Analytics Job Simulation",
      issuer: "Deloitte Australia",
      date: "2024",
      description: "Comprehensive job simulation program covering real-world data analytics challenges, business intelligence, and strategic decision-making processes.",
      skills: ["Data Analytics", "Business Intelligence", "Strategic Analysis", "Problem Solving"],
      credentialId: "",
      verifyUrl: "",
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
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            My <span className="text-gradient">Certifications</span>
          </h2>
          
          <div className="space-y-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-6 card-shadow hover:scale-[1.02] transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Certificate Photo */}
                  <div className="lg:w-64 flex-shrink-0">
                    <div className="aspect-[4/3] bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                      {cert.image ? (
                        <img 
                          src={cert.image} 
                          alt={`${cert.title} Certificate`}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <Image className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Certificate Photo</p>
                          <p className="text-xs text-muted-foreground mt-1">Add your certificate image here</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-5 h-5 text-primary" />
                          <h3 className="text-xl font-semibold text-foreground">{cert.title}</h3>
                        </div>
                        <p className="text-lg text-primary font-medium">{cert.issuer}</p>
                      </div>
                      <div className="flex flex-col md:text-right gap-2">
                        <div className="flex items-center gap-1 text-muted-foreground md:justify-end">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{cert.date}</span>
                        </div>
                        {cert.verifyUrl && (
                          <a
                            href={cert.verifyUrl}
                            className="flex items-center gap-1 text-primary hover:underline text-sm md:justify-end"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Verify Certificate
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {cert.description}
                    </p>

                    {cert.credentialId && (
                      <p className="text-sm text-muted-foreground mb-4">
                        <span className="font-medium">Credential ID:</span> {cert.credentialId}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
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