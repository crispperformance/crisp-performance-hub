import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Analytics } from "@vercel/analytics/next";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "I'll get back to you as soon as possible.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    { icon: MapPin, label: "Location", value: "West Yorkshire, UK" },
    { icon: Mail, label: "Email", value: "owen@crispperformance.com" },
  ];

  const socials = [
    { icon: Instagram, href: "http://www.instagram.com/owen_crisp", label: "Instagram" },
  ];

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-widest font-body">Contact</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            Ready to <span className="text-primary">Get Started?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 font-body">
            Fill out the form below and I'll be in touch within 24 hours to discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 border border-border/50 card-elevated">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-body text-muted-foreground mb-2">First Name</label>
                  <Input
                    type="text"
                    placeholder="John"
                    required
                    className="bg-background border-border focus:border-primary h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body text-muted-foreground mb-2">Last Name</label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    required
                    className="bg-background border-border focus:border-primary h-12"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-body text-muted-foreground mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="bg-background border-border focus:border-primary h-12"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-body text-muted-foreground mb-2">Phone</label>
                <Input
                  type="tel"
                  placeholder="+44 7XXX XXXXXX"
                  className="bg-background border-border focus:border-primary h-12"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-body text-muted-foreground mb-2">Service Interest</label>
                <Select>
                  <SelectTrigger className="bg-background border-border focus:border-primary h-12">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online Coaching</SelectItem>
                    <SelectItem value="program">Program Design</SelectItem>
                    <SelectItem value="other">Nutrition and Lifestyle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-body text-muted-foreground mb-2">Message</label>
                <Textarea
                  placeholder="Tell me about your goals and what I can help you with..."
                  required
                  rows={5}
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full mt-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Enquiry
                    <Send size={20} />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border/50">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-body">{item.label}</p>
                    <p className="font-display text-lg">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <p className="text-sm text-muted-foreground font-body mb-4">Follow me on social media</p>
              <div className="flex gap-3">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 bg-card rounded-lg border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="mt-10 p-6 bg-primary/10 rounded-lg border border-primary/30">
              <h4 className="font-display text-lg mb-2">Quick Response Guarantee</h4>
              <p className="text-sm text-muted-foreground font-body">
                I aim to respond to all enquiries in 24 hours! 
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
