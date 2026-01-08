import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Aaron",
      role: "Seasoned Gym-goer",
      content: "The first four weeks have ben great, I have really enjoyed it. You are doing a great job at providing a lot, whenever I message needing advice or form checks you are always there and your knowledge and experience really showed in the RDL video.",
      rating: 5,
    },
    {
      name: "Dylan",
      role: "Martial Artist",
      content: "You have given me enough to allow me to get confident in going to the gym and it gave me a massive motivation to go. As I have gotten more confident with the workouts and now enjoying the gym more I feel like I can have a go at this on my own.",
      rating: 5,
    },
    {
      name: "Tamsin",
      role: "Powerlifter",
      content: "It's weird how I feel miles stronger on squats now we train them less than I did when I was doing ridiculous volume every week. They're already stronger than they used to be, madness!",
      rating: 5,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-widest font-body">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            Client <span className="text-primary">Success Stories</span>
          </h2>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 relative card-elevated">
            <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/10" />
            
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-primary fill-primary" />
              ))}
            </div>
            
            <p className="text-xl md:text-2xl font-body font-light leading-relaxed mb-8 text-foreground/90">
              "{testimonials[activeIndex].content}"
            </p>
            
            <div>
              <p className="font-display text-lg">{testimonials[activeIndex].name}</p>
              <p className="text-muted-foreground text-sm">{testimonials[activeIndex].role}</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center gap-4 flex-wrap">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`px-6 py-3 rounded-lg border transition-all duration-300 ${
                activeIndex === index
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-transparent border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              <span className="font-body text-sm">{testimonial.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
