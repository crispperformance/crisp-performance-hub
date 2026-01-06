import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dumbbell, Video, Users, ClipboardList, ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Dumbbell,
      title: "1-on-1 Personal Training",
      description: "Personalised in-person sessions tailored to your goals. Get hands-on guidance, form correction, and real-time feedback to maximise every rep.",
      features: ["Custom workout plans", "Nutritional guidance", "Progress tracking", "Flexible scheduling"],
    },
    {
      icon: Video,
      title: "Online Coaching",
      description: "Train anywhere with comprehensive online programs. Perfect for busy professionals who need flexibility without sacrificing results.",
      features: ["Video tutorials", "Weekly check-ins", "App-based tracking", "24/7 support"],
    },
    {
      icon: ClipboardList,
      title: "Programme Design",
      description: "Custom training programmes designed for athletes and fitness enthusiasts who want a structured path to their goals.",
      features: ["Periodised training", "Sport-specific focus", "Recovery protocols", "Performance testing"],
    },
  ];

  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-widest font-body">Services</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            How I Can <span className="text-primary">Help You</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 font-body">
            Choose the training style that fits your lifestyle and goals. 
            Every program is designed to deliver measurable results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-300 card-elevated"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm font-body mb-4">{service.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="xl" asChild>
            <a href="#contact" className="flex items-center gap-2">
              Enquire Now
              <ArrowRight size={20} />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
