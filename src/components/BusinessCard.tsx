import { QRCodeSVG } from "qrcode.react";
import { profile } from "@/data/profile";
import { MapPin, Mail, Globe } from "lucide-react";

const WhatsAppIconSmall = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface BusinessCardProps {
  className?: string;
}

export const BusinessCard = ({ className }: BusinessCardProps) => {
  return (
    <div
      className={className}
      style={{
        width: "400px",
        height: "240px",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#f8fafc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-20%",
          width: "60%",
          height: "150%",
          background: "radial-gradient(ellipse, rgba(99, 102, 241, 0.15) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          right: "-10%",
          width: "50%",
          height: "100%",
          background: "radial-gradient(ellipse, rgba(59, 130, 246, 0.1) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Left side - Photo & QR */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          zIndex: 1,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
          }}
        >
          <img
            src={profile.photoUrl}
            alt={profile.fullName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            crossOrigin="anonymous"
          />
        </div>

        {/* QR Code */}
        <div
          style={{
            background: "#ffffff",
            padding: "6px",
            borderRadius: "8px",
          }}
        >
          <QRCodeSVG
            value={profile.website}
            size={68}
            level="M"
            bgColor="#ffffff"
            fgColor="#0f172a"
          />
        </div>
      </div>

      {/* Right side - Info */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "8px",
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 600,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {profile.fullName}
        </h2>
        <p
          style={{
            fontSize: "14px",
            margin: 0,
            opacity: 0.9,
            fontWeight: 500,
          }}
        >
          {profile.title}
        </p>
        <p
          style={{
            fontSize: "12px",
            margin: 0,
            opacity: 0.6,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <MapPin style={{ width: "12px", height: "12px" }} />
          {profile.location}
        </p>

        {/* Contact details */}
        <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <p
            style={{
              fontSize: "11px",
              margin: 0,
              opacity: 0.7,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Globe style={{ width: "11px", height: "11px" }} />
            {profile.website.replace("https://", "")}
          </p>
          <p
            style={{
              fontSize: "11px",
              margin: 0,
              opacity: 0.7,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <WhatsAppIconSmall className="w-[11px] h-[11px]" />
            {profile.whatsappE164}
          </p>
          <p
            style={{
              fontSize: "11px",
              margin: 0,
              opacity: 0.7,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Mail style={{ width: "11px", height: "11px" }} />
            {profile.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
