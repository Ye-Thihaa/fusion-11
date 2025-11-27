import Navigation from "@/components/Navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const planTopics = [
  {
    question: "What is a SNPP?",
    answer: "A Small Nuclear Power Plant (SNPP) is a new generation of nuclear power technology. It is smaller, safer, and more efficient than traditional large nuclear plants."
  },
  {
    question: "Why Mon State?",
    answer: "Mon State has growing energy needs, expanding industries, and developing cities. A SNPP can provide:\n• Clean, reliable electricity\n• Power for hospitals, schools, and public service\n• Support for rubber, cement, steel, fisheries, and food processing industries"
  },
  {
    question: "Is It Safe?",
    answer: "Yes. SNPP include:\n• Passive safety systems that work without human intervention\n• Automatic shutdown capability\n• International safety oversight (IAEA)\n• Strict environmental and regulatory reviews"
  },
  {
    question: "How Will It Benefit the Community?",
    answer: "• New job opportunities and skills training\n• More stable electricity\n• Stronger economic growth\n• Better public infrastructure"
  },
  {
    question: "Will the Public Be Involved?",
    answer: "Absolutely. We will ensure:\n• Open communication\n• Community consultations\n• Transparent sharing of environmental and safety information"
  }
];

const Plan = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-bold text-foreground mb-4 neon-green">
              The Plan
            </h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about SNPP in Mon State
            </p>
          </motion.div>

          {/* Topics */}
          <div className="space-y-4">
            {planTopics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 text-left hover:border-primary/40 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {topic.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-primary" />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 text-muted-foreground whitespace-pre-line text-lg leading-relaxed">
                          {topic.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Plan;