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
  
  const blob = new Blob([vcfContent], { type: "text/vcard;charset=utf-8" });
  const file = new File([blob], "Salvatore-Musella.vcf", { 
    type: "text/vcard;charset=utf-8" 
  });

  // 1. Try Web Share API (works on Android Chrome)
  try {
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: "Salvatore Musella" });
      return;
    }
  } catch (err) {
    if ((err as Error).name === "AbortError") return;
    // Share failed, continue to fallback
  }

  // 2. iOS/Safari: Use Data URL redirect
  // This triggers the native "Add to Contacts" UI
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
  if (isIOS || isSafari) {
    const base64 = btoa(unescape(encodeURIComponent(vcfContent)));
    window.location.href = `data:text/x-vcard;base64,${base64}`;
    return;
  }

  // 3. Fallback: Open blob URL without download attribute
  // Let the browser/OS handle the file natively
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  // NO download attribute - allows OS to open native handler
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }, 100);
}
