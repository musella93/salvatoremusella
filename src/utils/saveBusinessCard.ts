import { toPng } from "html-to-image";
import { downloadVCard } from "./generateVCard";

export async function saveBusinessCard(cardElement: HTMLElement): Promise<void> {
  try {
    // Generate high-quality PNG (3x scale)
    const dataUrl = await toPng(cardElement, {
      quality: 1,
      pixelRatio: 3,
      cacheBust: true,
    });

    // Convert data URL to blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], "Salvatore-Musella-Business-Card.png", { type: "image/png" });

    // Try native share with file support
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Salvatore Musella - Business Card",
        });
        // Also download VCF after successful share
        downloadVCard();
        return;
      } catch (err) {
        // User cancelled or share failed, fall through to download
        if ((err as Error).name === "AbortError") {
          return; // User cancelled, don't download
        }
      }
    }

    // Fallback: download PNG
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "Salvatore-Musella-Business-Card.png";
    
    // iOS Safari fallback - open in new tab
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      window.open(dataUrl, "_blank");
    } else {
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Also download VCF
    downloadVCard();
  } catch (error) {
    console.error("Error generating business card:", error);
    // Fallback: just download VCF
    downloadVCard();
  }
}
