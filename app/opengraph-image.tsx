import { ImageResponse } from "next/og";
import { SITE, ADDRESS_LINE } from "@/lib/site";

/* Dynamisch generiertes Open-Graph-/Twitter-Bild (1200×630).
   Über die Next.js-Dateikonvention automatisch als og:image verlinkt. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} – Fine-Dining-Restaurant in ${SITE.address.city}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0b0b",
          backgroundImage:
            "radial-gradient(60% 60% at 50% 35%, rgba(194,164,92,0.18) 0%, transparent 70%)",
          color: "#efe9dd",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 18,
            textTransform: "uppercase",
            color: "#c2a45c",
          }}
        >
          {`Fine Dining · ${SITE.address.city}`}
        </div>
        <div
          style={{
            fontSize: 150,
            letterSpacing: 24,
            fontWeight: 600,
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          {SITE.name}
        </div>
        <div style={{ width: 240, height: 2, backgroundColor: "#c2a45c" }} />
        <div style={{ fontSize: 34, marginTop: 36, color: "#efe9ddcc" }}>
          {`Saisonale Gourmetküche · seit ${SITE.founded}`}
        </div>
        <div style={{ fontSize: 26, marginTop: 14, color: "#efe9dd99" }}>
          {ADDRESS_LINE}
        </div>
      </div>
    ),
    { ...size },
  );
}
