import { motion, useReducedMotion } from "framer-motion";
import { FileDown, CalendarClock, Award, ChevronRight, Linkedin } from "lucide-react";
import avatarImg from "@/assets/avatar.jpg";

const Index = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeInUp = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: "easeOut" },
      };

  const staggerContainer = shouldReduceMotion
    ? {}
    : {
        animate: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-8">
      <motion.div
        className="w-full max-w-[440px] space-y-8"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Hero Section */}
        <motion.header className="text-center space-y-4" variants={fadeInUp}>
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-[120px] h-[120px] rounded-full ring-2 ring-white/20 overflow-hidden">
                <img 
                  src={avatarImg} 
                  alt="Salvatore Musella - Digital Product Manager"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Subtle glow behind avatar */}
              <div className="absolute inset-0 -z-10 w-[120px] h-[120px] rounded-full blur-2xl bg-primary/20" />
            </div>
          </div>

          {/* Name & Title */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Salvatore Musella
            </h1>
            <h2 className="text-lg text-foreground/90 font-medium">
              Digital Product Manager
            </h2>
            <p className="text-sm text-muted-foreground">
              eCommerce • Mobile Apps • Digital Platforms
            </p>
          </div>
        </motion.header>

        {/* Action Stack - CTA Buttons */}
        <motion.nav className="space-y-3" variants={fadeInUp} aria-label="Primary actions">
          {/* Primary CTA - Resume */}
          <a
            href="https://salvatoremusella.com/cv"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary group"
            data-cta="resume"
          >
            <span className="flex items-center gap-3">
              <FileDown className="w-5 h-5 text-foreground/80" />
              <span className="font-medium text-foreground">Download Resume</span>
            </span>
            <ChevronRight className="w-5 h-5 text-foreground/50 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Secondary CTA - Quick Chat */}
          <a
            href="https://salvatoremusella.com/quick-chat"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-secondary group"
            data-cta="booking"
          >
            <span className="flex items-center gap-3">
              <CalendarClock className="w-5 h-5 text-foreground/70" />
              <span className="font-medium text-foreground/90">Book a Quick Chat</span>
            </span>
            <ChevronRight className="w-5 h-5 text-foreground/40 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Tertiary CTA - Credly */}
          <a
            href="https://salvatoremusella.com/credly"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-tertiary group"
            data-cta="credly"
          >
            <span className="flex items-center gap-3">
              <Award className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground font-medium">Verified Credentials</span>
            </span>
            <ChevronRight className="w-5 h-5 text-foreground/30 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Email helper text */}
          <p className="text-center text-xs text-muted-foreground pt-2">
            Prefer email?{" "}
            <a
              href="mailto:salvatore_musella@outlook.com"
              className="text-foreground/70 hover:text-foreground underline underline-offset-2 transition-colors"
            >
              salvatore_musella@outlook.com
            </a>
          </p>
        </motion.nav>

        {/* Social Proof - Credentials */}
        <motion.section
          className="space-y-4"
          variants={fadeInUp}
          aria-labelledby="credentials-label"
        >
          <p
            id="credentials-label"
            className="text-center text-[10px] uppercase tracking-widest text-muted-foreground font-medium"
          >
            Certified & Educated At
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["PMP", "Polimi", "LUISS", "Bocconi", "Adobe"].map((badge) => (
              <span key={badge} className="badge-credential">
                {badge}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Micro Footer */}
        <motion.footer
          className="flex flex-col items-center gap-4 pt-4"
          variants={fadeInUp}
        >
          <a
            href="https://www.linkedin.com/in/salvatoremusella"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-white/5"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Salvatore Musella
          </p>
        </motion.footer>
      </motion.div>
    </main>
  );
};

export default Index;
