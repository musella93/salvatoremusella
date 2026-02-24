import { useState } from "react";
import { Share2, Link } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const SHARE_URL = "https://go.salvatoremusella.com/hello";

export function ShareButton() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const supportsShare = typeof navigator !== "undefined" && !!navigator.share;

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: "Salvatore Musella - Digital Product Manager",
        url: SHARE_URL,
      });
    } catch (e) {
      // user cancelled or error
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
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
        <DialogContent className="max-w-[min(92vw,420px)] p-5 rounded-3xl backdrop-blur-xl border
                         bg-[hsl(0_0%_100%/0.62)] border-[hsl(220_20%_20%/0.10)]
                         dark:bg-[hsl(0_0%_100%/0.07)] dark:border-[hsl(0_0%_100%/0.10)]
                         shadow-[0_8px_40px_hsl(220_30%_50%/0.08),0_1px_3px_hsl(220_30%_50%/0.04)]
                         dark:shadow-none">
          <div className="flex flex-col items-center gap-3">
            {/* QR Code */}
            <div className="p-3 rounded-2xl bg-white">
              <QRCodeSVG
                value={SHARE_URL}
                size={148}
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
                  className="cta-primary w-full"
                >
                  <span className="cta-content">
                    <Share2 className="w-4 h-4" />
                    Share via…
                  </span>
                </button>
              )}
              <button
                onClick={handleCopyLink}
                className="cta-secondary w-full"
              >
                <span className="cta-content text-foreground/90 dark:text-white/90">
                  <Link className="w-4 h-4" />
                  Copy link
                </span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
