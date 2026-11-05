import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

// Share image for LinkedIn and messaging apps (generated at build time).
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = async (file: string, type: string) =>
  `data:${type};base64,${(await readFile(join(process.cwd(), "public/brand", file))).toString("base64")}`;

export default async function Image() {
  const [hs, itt] = await Promise.all([asset("hs-logo-long-white.svg", "image/svg+xml"), asset("itt-logo.png", "image/png")]);
  const { title } = site.hero;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#fff",
          background: "radial-gradient(circle at 80% 30%, #0f2a52 0%, #05070b 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs plain img */}
          <img src={hs} width={265} height={48} alt="" />
          <span style={{ fontSize: 34, opacity: 0.6 }}>×</span>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs plain img */}
          <img src={itt} width={234} height={48} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
          <span>{title[0]}</span>
          <span style={{ color: "#5b9bff" }}>{title[1]}</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{title[2]}</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#8be8ff" }}>{site.description}</div>
      </div>
    ),
    size,
  );
}
