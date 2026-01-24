import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { href: "about", label: "About" },
    { href: "services", label: "Services" },
    { href: "testimonials", label: "Results" },
    { href: "contact", label: "Contact" },
  ];

  const getLink = (href: string) => isHomePage ? `#${href}` : `/#${href}`;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="container-custom flex items-center justify-between h-20">
        <a href={isHomePage ? "#" : "/"} className="flex items-center gap-3">
          <img
            src="/favicon.ico"
            alt="Crisp Performance"
            className="w-12 h-12 object-contain"
          />
          <span className="font-display text-xl tracking-wider">Crisp Performance</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={getLink(link.href)}
              className="font-body text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="font-body text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 outline-none">
              Resources
              <ChevronDown size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background border-border">
              <DropdownMenuItem asChild>
                <Link to="/resources/macro-calculator" className="cursor-pointer">
                  Macro Calculator
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/resources/bmr-calculator" className="cursor-pointer">
                  BMR Calculator
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/resources/pl8" className="cursor-pointer">
                  PL8
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="hero" size="default" asChild>
            <a href={getLink("contact")}>Get Started</a>
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
                href={getLink(link.href)}
                onClick={() => setIsMenuOpen(false)}
                className="font-body text-base uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="space-y-2">
              <span className="font-body text-base uppercase tracking-wider text-foreground py-2 block">
                Resources
              </span>
              <Link
                to="/resources/macro-calculator"
                onClick={() => setIsMenuOpen(false)}
                className="font-body text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 py-2 pl-4 block"
              >
                Macro Calculator
              </Link>
              <Link
                to="/resources/bmr-calculator"
                onClick={() => setIsMenuOpen(false)}
                className="font-body text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 py-2 pl-4 block"
              >
                BMR Calculator
              </Link>
              <Link
                to="/resources/pl8"
                onClick={() => setIsMenuOpen(false)}
                className="font-body text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300 py-2 pl-4 block"
              >
                PL8
              </Link>
            </div>
            <Button variant="hero" size="lg" className="mt-4" asChild>
              <a href={getLink("contact")}>Get Started</a>
            </Button>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
};

export default Header;
