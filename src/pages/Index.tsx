import { motion, useReducedMotion } from "framer-motion";
import { FileDown, CalendarClock, Award, Linkedin, Mail, MapPin, MessageCircle, ImageDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toPng } from "html-to-image";
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

  const handleSaveCard = async () => {
    const element = document.getElementById("profile-card");
    if (!element) return;
    
    try {
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#0a0a12",
      });
      
      const link = document.createElement("a");
      link.download = "Salvatore_Musella_Card.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to save card:", err);
    }
  };
  return (
    <>
      {/* Ambient background with glows */}
      <div className="ambient-bg" aria-hidden="true" />
      <div className="ambient-glow-center" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <motion.div
          id="profile-card"
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
              href="https://go.salvatoremusella.com/cv"
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
              href="https://go.salvatoremusella.com/quick-chat"
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
              href="https://go.salvatoremusella.com/credly"
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
            <p className="text-xs text-foreground/70 tracking-wide whitespace-nowrap">
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

          {/* Contact Dock */}
          <motion.footer
            className="flex flex-col items-center gap-3"
            variants={fadeInUp}
          >
            <TooltipProvider delayDuration={300}>
              <div className="flex items-center justify-center gap-4">
                {/* WhatsApp */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://wa.me/393924499458"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-dock-btn group"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5 group-hover:text-green-400 transition-colors duration-300" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent className="hidden md:block">
                    <p>WhatsApp</p>
                  </TooltipContent>
                </Tooltip>

                {/* Email */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="mailto:salvatore_musella@outlook.com"
                      className="contact-dock-btn"
                      aria-label="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent className="hidden md:block">
                    <p>Email</p>
                  </TooltipContent>
                </Tooltip>

                {/* LinkedIn */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://www.linkedin.com/in/salvatoremusella/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-dock-btn"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent className="hidden md:block">
                    <p>LinkedIn</p>
                  </TooltipContent>
                </Tooltip>

                {/* Save Card */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleSaveCard}
                      className="contact-dock-btn"
                      aria-label="Save as Image"
                    >
                      <ImageDown className="w-5 h-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="hidden md:block">
                    <p>Save as Image</p>
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
