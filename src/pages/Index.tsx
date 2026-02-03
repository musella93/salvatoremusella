import { motion, useReducedMotion } from "framer-motion";
import { FileDown, CalendarClock, Award, Linkedin, Mail } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
              <div className="w-[140px] h-[140px] rounded-full ring-2 ring-white/20 overflow-hidden">
                <img 
                  src={avatarImg} 
                  alt="Salvatore Musella - Digital Product Manager"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Subtle glow behind avatar */}
              <div className="absolute inset-0 -z-10 w-[140px] h-[140px] rounded-full blur-2xl bg-primary/20" />
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
            className="cta-primary"
            data-cta="resume"
          >
            <span className="cta-content">
              <FileDown className="cta-icon" />
              <span className="font-medium text-foreground">Download Resume</span>
            </span>
          </a>

          {/* Secondary CTA - Quick Chat */}
          <a
            href="https://salvatoremusella.com/quick-chat"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-secondary"
            data-cta="booking"
          >
            <span className="cta-content">
              <CalendarClock className="cta-icon" />
              <span className="font-medium text-foreground">Book a Quick Chat</span>
            </span>
          </a>

          {/* Tertiary CTA - Credly */}
          <a
            href="https://salvatoremusella.com/credly"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-tertiary"
            data-cta="credly"
          >
            <span className="cta-content">
              <Award className="cta-icon" />
              <span className="font-medium text-foreground/90">Credly Profile</span>
            </span>
          </a>

        </motion.nav>

        {/* Education & Certification */}
        <motion.section
          className="text-center space-y-1 -mt-2"
          variants={fadeInUp}
        >
          <p className="text-sm text-foreground/75">
            Università Bocconi · Politecnico di Milano · LUISS
          </p>
          <a
            href="https://salvatoremusella.com/credly"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-foreground/60 hover:text-foreground/80 transition-colors"
          >
            PMP® Certified Project Manager
          </a>
        </motion.section>

        {/* Micro Footer */}
        <motion.footer
          className="flex flex-col items-center gap-4 pt-4"
          variants={fadeInUp}
        >
          <TooltipProvider delayDuration={300}>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://www.linkedin.com/in/salvatoremusella"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent className="hidden md:block">
                  <p>LinkedIn</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="mailto:salvatore_musella@outlook.com"
                    className="w-11 h-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent className="hidden md:block">
                  <p>Email</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Salvatore Musella
          </p>
        </motion.footer>
      </motion.div>
    </main>
  );
};

export default Index;
