import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Award, ExternalLink, ChevronDown } from 'lucide-react';
import oracleBadge from '@/assets/certificates/oracle-badge.png';
import deloitteCertificate from '@/assets/certificates/deloitte-certificate.png';
import tataCertificate from '@/assets/certificates/tata-certificate.png';
import dishaCertificate from '@/assets/certificates/disha-certificate.jpg';
import iotArduinoCertificate from '@/assets/certificates/iot-arduino-certificate.png';

const CertificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const certifications = [
    {
      title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
      issuer: "Oracle",
      date: "2025",
      credentialId: "",
      verifyUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=C9AD3AFC099340261137BF2360FB2D1459269FF3BB4DBA882E98A6C0C5DE2FB8",
      image: oracleBadge
    },
    {
      title: "Deloitte Australia - Data Analytics Job Simulation",
      issuer: "Deloitte Australia",
      date: "2024",
      credentialId: "",
      verifyUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_ghsBEMLzsDdNsrcTW_1751885115931_completion_certificate.pdf",
      image: deloitteCertificate
    },
    {
      title: "Data Visualisation: Empowering Business with Effective Insights Job Simulation",
      issuer: "Tata",
      date: "2024",
      credentialId: "",
      verifyUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_ghsBEMLzsDdNsrcTW_1753454165750_completion_certificate.pdf",
      image: tataCertificate
    },
    {
      title: "Certificate Course in Programming",
      issuer: "Disha Computer Institute - India",
      date: "2024",
      credentialId: "D7553488329",
      verifyUrl: "",
      image: dishaCertificate
    },
    {
      title: "IoT Using Arduino",
      issuer: "Cognifront",
      date: "2024",
      credentialId: "",
      verifyUrl: "",
      image: iotArduinoCertificate
    }
  ];

  const scrollToCertifications = () => {
    const element = document.getElementById('certifications');
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 text-foreground hover:text-primary transition-smooth group">
          <Award className="w-4 h-4" />
          <span className="hidden lg:inline">Certifications</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 glass border-border/20" align="end">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">My Certifications</h3>
            <Badge variant="secondary" className="text-xs">
              {certifications.length} Total
            </Badge>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/20 transition-smooth group cursor-pointer"
                onClick={() => cert.verifyUrl && window.open(cert.verifyUrl, '_blank')}
              >
                <div className="w-8 h-8 rounded overflow-hidden border border-border/20 flex-shrink-0">
                  <img 
                    src={cert.image} 
                    alt={`${cert.issuer} Certificate`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground line-clamp-1">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-muted-foreground">{cert.date}</p>
                  {cert.credentialId && (
                    <p className="text-xs text-primary font-mono">ID: {cert.credentialId}</p>
                  )}
                </div>
                {cert.verifyUrl && (
                  <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-3 pt-3 border-t border-border/20">
            <button 
              onClick={scrollToCertifications}
              className="w-full text-xs text-primary hover:text-primary/80 transition-colors"
            >
              View All Certifications →
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CertificationsDropdown;