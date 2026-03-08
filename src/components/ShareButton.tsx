import { useState, useRef, useEffect } from "react";
import { Share2, Link, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const QR_URL = "https://go.salvatoremusella.com/from-screen-qr";
const SHARE_URL = "https://go.salvatoremusella.com/from-share-button";

export function ShareButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copiedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();
  const supportsShare = typeof navigator !== "undefined" && !!navigator.share;

  useEffect(() => {
    return () => {
      if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
    };
  }, []);

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: "Salvatore Musella - Digital Product Manager",
        url: SHARE_URL,
      });
    } catch (e: unknown) {
      if ((e as Record<string, unknown>)?.name === "AbortError") return;
      toast({
        title: "Couldn't open share options",
        description: "Please use Copy link instead.",
        variant: "destructive",
      });
    }
  };

  const fallbackCopy = (text: string): boolean => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    try {
      textarea.select();
      return document.execCommand("copy") === true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const handleCopyLink = async () => {
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(SHARE_URL);
        success = true;
      } else {
        success = fallbackCopy(SHARE_URL);
      }
    } catch {
      success = fallbackCopy(SHARE_URL);
    }

    if (success) {
      setCopied(true);
      if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
      copiedTimeout.current = setTimeout(() => setCopied(false), 1500);
    } else {
      toast({
        title: "Could not copy link",
        description: "Please copy the URL manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Share"
        className="w-11 h-11 flex items-center justify-center rounded-full
                   backdrop-blur-xl border transition-all duration-200
                   overflow-hidden
                   shadow-[0_2px_12px_rgba(0,0,0,0.10),0_0_0_0.5px_rgba(255,255,255,0.06)]
                   dark:bg-white/[0.08] dark:border-white/[0.14] dark:text-white/90
                   dark:hover:bg-white/[0.12] dark:hover:border-white/[0.18]
                   dark:active:bg-white/[0.14]
                   bg-white/65 border-black/[0.10] text-foreground/80
                   hover:bg-white/75 hover:border-black/[0.13]
                   active:bg-white/80 active:scale-[0.94]
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background
                   theme-toggle-glass"
      >
        <Share2 className="w-5 h-5 relative z-[2]" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[min(88vw,340px)] max-h-[calc(100dvh-2rem)] overflow-y-auto
                          px-7 pt-7 pb-[max(1.75rem,env(safe-area-inset-bottom))]
                          !rounded-3xl sm:!rounded-3xl backdrop-blur-xl border
                          bg-white/65 border-black/10
                          dark:bg-white/[0.07] dark:border-white/10
                          shadow-[0_8px_40px_hsl(220_30%_50%/0.08),0_1px_3px_hsl(220_30%_50%/0.04)]
                          dark:shadow-[0_8px_40px_hsl(220_30%_10%/0.25)]
                          ring-1 ring-inset ring-white/20 dark:ring-white/[0.08]
                          before:absolute before:inset-0 before:rounded-3xl before:pointer-events-none before:z-[1]
                          before:bg-[radial-gradient(ellipse_60%_50%_at_15%_12%,_rgba(255,255,255,0.18)_0%,_transparent_70%)]
                          dark:before:bg-[radial-gradient(ellipse_60%_50%_at_15%_12%,_rgba(255,255,255,0.06)_0%,_transparent_70%)]">
          <div className="flex flex-col items-center gap-6 w-full">
            {/* QR Code */}
            <div className="w-full max-w-[280px] mx-auto flex justify-center">
              <div className="p-3 rounded-2xl bg-white">
                <QRCodeSVG
                  value={QR_URL}
                  size={148}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="w-full max-w-[280px] mx-auto flex flex-col items-center gap-2">
              {supportsShare && (
                <button
                  onClick={handleNativeShare}
                  className="cta-share w-full !min-h-[44px]"
                >
                  <span className="cta-content text-white">
                    <Share2 className="w-4 h-4" />
                    Share
                  </span>
                </button>
              )}
              <button
                onClick={handleCopyLink}
                className="cta-secondary w-full !min-h-[44px]"
              >
                <span className="cta-content text-foreground/90 dark:text-white/90">
                  {copied ? "Copied ✓" : <><Link className="w-4 h-4" />Copy link</>}
                </span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}