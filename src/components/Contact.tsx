import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            message: formData.message || null,
          }
        ]);

      if (dbError) throw dbError;

      // Send notification email
      const { error: emailError } = await supabase.functions.invoke('send-contact-notification', {
        body: { 
          name: formData.name, 
          email: formData.email, 
          phone: formData.phone, 
          message: formData.message 
        }
      });

      if (emailError) {
        console.warn('Email notification failed:', emailError);
        // Don't throw error - form submission still succeeded
      }

      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@yourportfolio.com",
      href: "mailto:hello@yourportfolio.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      href: "#"
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Let's Work Together</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm always interested in hearing about new opportunities and 
                  exciting projects. Whether you have a question or just want to 
                  say hi, I'll do my best to get back to you!
                </p>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <a 
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contact Form */}
            <Card className="card-shadow">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="transition-smooth focus:scale-105"
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="transition-smooth focus:scale-105"
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Your Phone Number (Optional)"
                      value={formData.phone}
                      onChange={handleChange}
                      className="transition-smooth focus:scale-105"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="transition-smooth focus:scale-105"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full glow-shadow hover:scale-105 transition-bounce"
                  >
                    <Send size={18} className="mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;