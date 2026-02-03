import { motion, useReducedMotion } from "framer-motion";
import { FileDown, CalendarClock, Award, Linkedin, Mail, MapPin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import avatarImg from "@/assets/avatar.jpg";

const Index = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeInUp = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
      };

  const staggerContainer = shouldReduceMotion
    ? {}
    : {
        animate: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      };

  return (
    <>
      {/* Ambient background with glows */}
      <div className="ambient-bg" aria-hidden="true" />
      <div className="ambient-glow-center" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <motion.div
          className="w-full max-w-[440px] glass-card px-8 pt-6 pb-5 md:px-10 md:pt-8 md:pb-6 space-y-5"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Hero Section */}
          <motion.header className="text-center space-y-4" variants={fadeInUp}>
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-[150px] h-[150px] rounded-full ring-1 ring-white/15 overflow-hidden">
                  <img 
                    src={avatarImg} 
                    alt="Salvatore Musella - Digital Product Manager"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Soft glow behind avatar */}
                <div className="absolute inset-0 -z-10 w-[150px] h-[150px] rounded-full avatar-glow" />
              </div>
            </div>

            {/* Name & Title - Typography-first */}
            <div className="space-y-2.5">
              <h1 className="text-[1.75rem] md:text-[2rem] font-semibold text-foreground tracking-tight leading-tight">
                Salvatore Musella
              </h1>
              <h2 className="text-lg md:text-xl text-foreground/90 font-medium tracking-tight">
                Digital Product Manager
              </h2>
              <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400 -mt-1">
                <MapPin className="w-3 h-3 opacity-60" />
                <span>Lugano, Switzerland</span>
              </p>
            </div>
          </motion.header>

          {/* Action Stack - CTA Buttons */}
          <motion.nav className="w-full max-w-[360px] mx-auto space-y-2.5" variants={fadeInUp} aria-label="Primary actions">
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
                <span className="font-medium text-foreground/95">Book a Quick Chat</span>
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
                <span className="font-medium text-white/75">Credly Profile</span>
              </span>
            </a>
          </motion.nav>

          {/* Education & Certification */}
          <motion.section
            className="text-center space-y-0.5 mt-2"
            variants={fadeInUp}
          >
            <p className="text-xs text-foreground/70 tracking-wide">
              Università Bocconi <span className="text-foreground/40">·</span> Politecnico di Milano <span className="text-foreground/40">·</span> LUISS
            </p>
            <a
              href="https://www.credly.com/badges/78c536ac-737f-4997-8579-d736ea328bc8/public_url"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[11px] text-foreground/50 hover:text-foreground/70 transition-colors duration-300"
            >
              PMP® Certified Project Manager
            </a>
          </motion.section>

          {/* Micro Footer */}
          <motion.footer
            className="flex flex-col items-center gap-2 -mt-1"
            variants={fadeInUp}
          >
            <TooltipProvider delayDuration={300}>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://www.linkedin.com/in/salvatoremusella"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 flex items-center justify-center text-foreground/60 hover:text-foreground transition-all duration-300 rounded-full hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-[22px] h-[22px]" />
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
                      className="w-11 h-11 flex items-center justify-center text-foreground/60 hover:text-foreground transition-all duration-300 rounded-full hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      aria-label="Email"
                    >
                      <Mail className="w-[22px] h-[22px]" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent className="hidden md:block">
                    <p>Email</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
            <p className="text-[11px] text-white/30 tracking-wide">
              © {new Date().getFullYear()} Salvatore Musella
            </p>
          </motion.footer>
        </motion.div>
      </main>
    </>
  );
};

export default Index;
