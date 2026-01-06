import { motion } from "framer-motion";
import { Award, Target, Heart, Zap } from "lucide-react";

const AboutSection = () => {
  const values = [
    { icon: Target, title: "Precision", desc: "Every program is tailored to your unique goals" },
    { icon: Zap, title: "Intensity", desc: "Pushing boundaries with purpose and passion" },
    { icon: Heart, title: "Dedication", desc: "Your success is my number one priority" },
    { icon: Award, title: "Results", desc: "Proven methods that deliver real outcomes" },
  ];

  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-gradient-to-br from-secondary to-muted rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="w-20 h-1 bg-primary mb-4" />
                <p className="font-display text-2xl">Your Coach</p>
              </div>
              {/* Placeholder for coach image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-muted-foreground/30 font-display text-6xl">PHOTO</span>
              </div>
            </div>
            {/* Accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary rounded-lg" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary text-sm uppercase tracking-widest font-body">About Me</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
              Dedicated to Your <span className="text-primary">Transformation</span>
            </h2>
            <div className="space-y-4 text-muted-foreground font-body">
              <p>
                With over a decade of experience in personal training and performance coaching, 
                I've dedicated my career to helping individuals unlock their full potential.
              </p>
              <p>
                My approach combines science-backed training methodologies with a deep understanding 
                of what motivates people to succeed. Whether you're an athlete looking to gain a 
                competitive edge or someone starting their fitness journey, I'm here to guide you 
                every step of the way.
              </p>
              <p>
                At Crisp Performance, it's not just about the physical transformation—it's about 
                building mental resilience, confidence, and habits that last a lifetime.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {values.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border/50"
                >
                  <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
