import { useState } from "react";
import { Share2, Link } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CANONICAL_URL = "https://salvatoremusella.lovable.app";

export function ShareButton() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const supportsShare = typeof navigator !== "undefined" && !!navigator.share;

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: "Salvatore Musella",
        url: CANONICAL_URL,
      });
    } catch (e) {
      // user cancelled or error
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(CANONICAL_URL);
      toast({ title: "Copied", description: "Link copied to clipboard" });
    } catch {
      toast({ title: "Error", description: "Could not copy link", variant: "destructive" });
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
        <DialogContent className="sm:max-w-[340px] backdrop-blur-xl border dark:bg-white/5 dark:border-white/10 bg-white/70 border-black/10">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">Share</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-2">
            {/* QR Code */}
            <div className="p-4 rounded-2xl bg-white">
              <QRCodeSVG
                value={CANONICAL_URL}
                size={160}
                level="M"
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>

            {/* Actions */}
            <div className="w-full space-y-2">
              {supportsShare && (
                <button
                  onClick={handleNativeShare}
                  className="w-full flex items-center justify-center gap-2 h-11 rounded-xl
                             bg-primary text-primary-foreground font-medium text-sm
                             hover:bg-primary/90 transition-colors duration-200
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  <Share2 className="w-4 h-4" />
                  Share via…
                </button>
              )}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl
                           border border-foreground/10 bg-foreground/5 text-foreground/80 font-medium text-sm
                           hover:bg-foreground/10 transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                <Link className="w-4 h-4" />
                Copy link
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
