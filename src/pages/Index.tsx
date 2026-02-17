import { motion, useReducedMotion } from "framer-motion";
import { FileDown, CalendarClock, Award, Linkedin, Mail, MapPin, UserPlus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { profile } from "@/data/profile";
import { downloadVCard } from "@/utils/generateVCard";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Index = () => {
  const shouldReduceMotion = useReducedMotion();

  const handleSaveCard = () => {
    downloadVCard();
  };

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
          className="w-full max-w-[440px] liquid-glass-card px-8 pt-6 pb-5 md:px-10 md:pt-8 md:pb-6 space-y-5"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Hero Section */}
          <motion.header className="text-center space-y-4" variants={fadeInUp}>
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="relative group">
                <motion.div 
                  className="w-[170px] h-[170px] rounded-full ring-1 ring-white/15 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
                  whileHover={{ y: -2 }}
                >
                  <img 
                    src={profile.photoUrl} 
                    alt={`${profile.fullName} - ${profile.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
                {/* Soft glow behind avatar */}
                <div className="absolute inset-0 -z-10 w-[170px] h-[170px] rounded-full avatar-glow transition-all duration-500 group-hover:opacity-100 group-hover:scale-110" />
              </div>
            </div>

            {/* Name & Title - Typography-first */}
            <div className="space-y-2.5">
              <h1 className="text-[1.75rem] md:text-[2rem] font-semibold text-foreground tracking-tight leading-tight">
                {profile.fullName}
              </h1>
              <h2 className="text-lg md:text-xl text-foreground/90 font-medium tracking-tight">
                Digital <span className="accent-gradient-text">Product</span> Manager
              </h2>
              <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400 -mt-1">
                <MapPin className="w-3 h-3 opacity-60" />
                <span>{profile.location}</span>
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
                <FileDown className="cta-icon w-4 h-4 flex-shrink-0" />
                <span className="font-medium text-white">Download Resume</span>
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
                <CalendarClock className="cta-icon w-4 h-4 flex-shrink-0" />
                <span className="font-medium text-white/90">Book a Quick Chat</span>
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
                <Award className="cta-icon w-4 h-4 flex-shrink-0" />
                <span className="font-medium text-white/80">View Credentials</span>
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

          {/* Micro Footer */}
          <motion.footer
            className="flex flex-col items-center gap-2 -mt-1"
            variants={fadeInUp}
          >
            <TooltipProvider delayDuration={300}>
              <div className="flex items-center gap-1">
                {/* WhatsApp */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={profile.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 flex items-center justify-center text-foreground/60 hover:text-foreground transition-all duration-300 rounded-full hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      aria-label="WhatsApp"
                    >
                      <WhatsAppIcon className="w-[20px] h-[20px]" />
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
                      href={`mailto:${profile.email}`}
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

                {/* LinkedIn */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={profile.linkedinUrl}
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

                {/* Save Card */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleSaveCard}
                      className="w-11 h-11 flex items-center justify-center text-foreground/60 hover:text-foreground transition-all duration-300 rounded-full hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      aria-label="Add to Contacts"
                    >
                      <UserPlus className="w-[22px] h-[22px]" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="hidden md:block">
                    <p>Add to Contacts</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
            <p className="text-[11px] text-white/30 tracking-wide">
              © {new Date().getFullYear()} {profile.fullName}
            </p>
          </motion.footer>
        </motion.div>
      </main>
    </>
  );
};

export default Index;
