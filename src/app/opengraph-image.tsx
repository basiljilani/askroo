import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";
import { markDataUri } from "@/lib/logo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.seoTitle;

// Satori-safe: flexbox only, no CSS grid, no CSS variables, hex colours.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: 72,
          fontFamily: "sans-serif",
          color: "#f7f8f8",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markDataUri({ rx: 16 })} width={58} height={58} alt="" />
          <div style={{ fontSize: 32, fontWeight: 600 }}>AskRoo</div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 20,
              color: "#F0B36B",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Shopify app · Australian built
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 66,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 940,
            }}
          >
            It reads your orders. Then it answers.
          </div>
        </div>

        {/* Footer meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#a1a8b3",
          }}
        >
          <div>Answers with receipts.</div>
          <div>askroo.com.au</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
