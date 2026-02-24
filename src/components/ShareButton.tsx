import { useState } from "react";
import { Share2, Link, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SHARE_URL = "https://go.salvatoremusella.com/hello";

export function ShareButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
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
      setCopied(true);
      toast({ title: "Copied", description: "Link copied to clipboard" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Error", description: "Could not copy link", variant: "destructive" });
    }
  };

  return (
    <>
      {/* Pill-shaped floating Share button — matches CTA style */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Share"
        className="share-floating-pill"
      >
        <span className="cta-content">
          <Share2 className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium text-sm">Share</span>
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="share-modal-glass max-w-[min(92vw,420px)] rounded-3xl px-5 py-4 sm:px-6 sm:py-5">
          <DialogHeader>
            <DialogTitle className="text-center text-base font-semibold">Share</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-3">
            {/* QR Code — solid white for scanability */}
            <div className="p-3 rounded-2xl bg-white">
              <QRCodeSVG
                value={SHARE_URL}
                size={140}
                level="M"
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>

            {/* Action buttons — pill-shaped, matching CTAs */}
            <div className="w-full space-y-2">
              {supportsShare && (
                <button
                  onClick={handleNativeShare}
                  className="share-modal-btn-primary"
                  aria-label="Share via native sharing"
                >
                  <span className="cta-content">
                    <Share2 className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium">Share via…</span>
                  </span>
                </button>
              )}
              <button
                onClick={handleCopyLink}
                className="share-modal-btn-secondary"
                aria-label="Copy link to clipboard"
              >
                <span className="cta-content">
                  {copied ? <Check className="w-4 h-4 flex-shrink-0" /> : <Link className="w-4 h-4 flex-shrink-0" />}
                  <span className="font-medium">{copied ? "Copied!" : "Copy link"}</span>
                </span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
