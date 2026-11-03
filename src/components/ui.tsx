import Image from "next/image";
import type { Service } from "@/content/services";

/**
 * "hello success × IT Together" lockup: Hello Success wordmark, then IT Together's
 * triangle mark on small phones or its full logo from 420px up.
 */
export function Lockup({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <Image src="/brand/hs-logo-long-white.svg" alt="hello success" width={1911} height={316} unoptimized className="h-6 w-auto sm:h-7" />
      <span className="text-brand-2 text-lg font-light" aria-hidden>
        ×
      </span>
      <Image src="/brand/itt-mark.png" alt="IT Together" width={538} height={384} className="h-6 w-auto min-[420px]:hidden" />
      <Image src="/brand/itt-logo.png" alt="IT Together" width={1355} height={278} className="hidden h-5 w-auto min-[420px]:block sm:h-6" />
    </span>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`label text-glow ${className}`}>{children}</p>;
}

const paths: Record<Service["icon"] | "arrow" | "check" | "phone" | "mail", React.ReactNode> = {
  agent: <><rect x="5" y="8" width="14" height="11" rx="3" /><path d="M12 4v4M9 13h.01M15 13h.01M2 13h3M19 13h3" /></>,
  crm: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 6" /></>,
  flow: <><rect x="3" y="3" width="6" height="6" rx="1.5" /><rect x="15" y="15" width="6" height="6" rx="1.5" /><path d="M9 6h5a3 3 0 0 1 3 3v6" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" /><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" /></>,
  cloud: <path d="M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7Z" />,
  shield: <><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 12 5 5 9-10" />,
  phone: <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
};

export function Icon({ name, className = "size-5" }: { name: keyof typeof paths; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {paths[name]}
    </svg>
  );
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
  const styles =
    variant === "primary"
      ? "bg-brand text-white hover:bg-brand-2 shadow-[0_0_40px_-8px] shadow-brand"
      : "border border-line text-white hover:border-white/40 hover:bg-white/5";
  return (
    <a href={href} className={`group inline-flex items-center gap-2 rounded-full whitespace-nowrap px-7 py-3.5 font-medium transition ${styles}`}>
      {children}
      <Icon name="arrow" className="size-4 transition group-hover:translate-x-0.5" />
    </a>
  );
}
