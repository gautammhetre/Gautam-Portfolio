import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Award, ExternalLink } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      title: "Machine Learning Fundamentals",
      issuer: "Coursera",
      date: "March 2024",
      description: "Comprehensive course covering supervised and unsupervised learning algorithms, neural networks, and practical implementation using Python.",
      skills: ["Machine Learning", "Python", "TensorFlow", "Data Analysis"],
      credentialId: "ABC123DEF456",
      verifyUrl: "#"
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "January 2024",
      description: "Cloud computing fundamentals, AWS services overview, security best practices, and billing concepts.",
      skills: ["AWS", "Cloud Computing", "Security", "Architecture"],
      credentialId: "AWS-CCP-789",
      verifyUrl: "#"
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
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;