import { profile } from "@/data/profile";

export function generateVCard(): string {
  const [firstName, ...lastNameParts] = profile.fullName.split(" ");
  const lastName = lastNameParts.join(" ");
  
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.fullName}`,
    `N:${lastName};${firstName};;;`,
    `TITLE:${profile.title}`,
    `TEL;TYPE=CELL:${profile.whatsappE164}`,
    `EMAIL;TYPE=INTERNET:${profile.email}`,
    `URL:${profile.website}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${profile.linkedinUrl}`,
    `NOTE:Added from salvatoremusella.com`,
    "END:VCARD",
  ];
  
  // Use CRLF line endings as per vCard spec
  return lines.join("\r\n");
}

export async function addToContacts(): Promise<void> {
  const vcfContent = generateVCard();
  
  // Create blob with vCard MIME type
  const blob = new Blob([vcfContent], { type: "text/vcard;charset=utf-8" });
  const file = new File([blob], "Salvatore-Musella.vcf", { 
    type: "text/vcard;charset=utf-8" 
  });

  // 1. Android-first: try native share sheet with VCF file
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
      await navigator.share({ 
        files: [file], 
        title: "Salvatore Musella Contact" 
      });
      return;
    }
  } catch (err) {
    // User cancelled or share failed, continue to fallback
    if ((err as Error).name === "AbortError") {
      return; // User cancelled, don't proceed
    }
    console.log("Share API failed, trying fallback:", err);
  }

  // 2. iOS-friendly fallback: open blob URL in new tab
  // This often triggers the iOS contact import UI
  const blobUrl = URL.createObjectURL(blob);
  
  try {
    const newWindow = window.open(blobUrl, "_blank");
    
    if (!newWindow || newWindow.closed) {
      // Popup blocked, try location redirect
      window.location.href = blobUrl;
    }
  } catch {
    // 3. Final fallback: trigger normal download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "Salvatore-Musella.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Clean up blob URL after a delay (give time for download/open)
  setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
}
