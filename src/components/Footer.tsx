import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const socials = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Mail, href: "mailto:hello@crispperformance.com", label: "Email" },
  ];

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <a href="#" className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <span className="font-display text-lg text-primary-foreground font-bold">CP</span>
              </div>
              <span className="font-display text-lg tracking-wider">Crisp Performance</span>
            </a>
            <p className="text-muted-foreground text-sm font-body mt-2">
              Elevate your performance. Transform your life.
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-3">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-sm font-body">
            © {currentYear} Crisp Performance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
