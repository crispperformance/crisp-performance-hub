import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#testimonials", label: "Results" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="container-custom flex items-center justify-between h-20">
        {/* Logo placeholder */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
            <span className="font-display text-xl text-primary-foreground font-bold">CP</span>
          </div>
          <span className="font-display text-xl tracking-wider hidden sm:block">Crisp Performance</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <Button variant="hero" size="default" asChild>
            <a href="#contact">Get Started</a>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-t border-border"
        >
          <div className="container-custom py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-body text-base uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 py-2"
              >
                {link.label}
              </a>
            ))}
            <Button variant="hero" size="lg" className="mt-4" asChild>
              <a href="#contact">Get Started</a>
            </Button>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
};

export default Header;
