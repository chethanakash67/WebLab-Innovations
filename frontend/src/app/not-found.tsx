import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Home } from "lucide-react";
import AgencyMark from "@/components/ui/AgencyMark";
import notFoundArtwork from "../../public/art/standing-human-reflection.png";

const pageStyles = {
  main: {
    minHeight: "100dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(18px, 2.4vw, 36px)",
  },
  shell: {
    width: "100%",
    maxWidth: "1320px",
    minHeight: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
    alignItems: "center",
    gap: "clamp(32px, 5vw, 76px)",
    padding: "clamp(24px, 3.2vw, 48px)",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(0, 0, 0, 0.28)",
    boxShadow: "0 24px 120px rgba(0, 0, 0, 0.34)",
    backdropFilter: "blur(10px)",
  },
  copy: {
    width: "100%",
    maxWidth: "540px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    padding: "clamp(4px, 1vw, 12px)",
  },
  primaryFlag: {
    display: "inline-flex",
    alignItems: "stretch",
    overflow: "hidden",
    marginTop: "clamp(28px, 3.2vw, 44px)",
    borderRadius: "8px",
    border: "1px solid rgba(54, 184, 255, 0.48)",
    background: "rgba(6, 16, 23, 0.92)",
    boxShadow: "0 0 34px rgba(54, 184, 255, 0.16)",
  },
  primaryFlagNumber: {
    minWidth: "clamp(132px, 11vw, 170px)",
    minHeight: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 18px",
    background: "#36b8ff",
    color: "#000",
  },
  primaryFlagLabel: {
    minHeight: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "0 18px",
    lineHeight: 1,
  },
  headline: {
    marginTop: "clamp(22px, 2.2vw, 32px)",
    maxWidth: "520px",
    fontSize: "clamp(40px, 4vw, 68px)",
    lineHeight: 1.03,
    letterSpacing: "0",
  },
  bodyText: {
    marginTop: "clamp(16px, 1.6vw, 24px)",
    maxWidth: "520px",
    fontSize: "clamp(15px, 1vw, 18px)",
    lineHeight: 1.6,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap" as const,
    alignItems: "center",
    gap: "16px",
    marginTop: "clamp(24px, 2.4vw, 34px)",
  },
  actionButton: {
    minHeight: "48px",
    paddingInline: "22px",
  },
  visualWrap: {
    position: "relative" as const,
    width: "100%",
    maxWidth: "520px",
    marginInline: "auto",
    padding: "clamp(6px, 1vw, 12px)",
  },
  card: {
    position: "relative" as const,
    overflow: "hidden",
    minHeight: "clamp(390px, 52vh, 520px)",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.13)",
    background: "#05080a",
    boxShadow: "0 32px 100px rgba(0, 0, 0, 0.45)",
  },
  cardFlag: {
    position: "absolute" as const,
    left: "clamp(24px, 3vw, 36px)",
    top: "clamp(56px, 7vh, 74px)",
    zIndex: 20,
    minWidth: "clamp(220px, 21vw, 290px)",
    minHeight: "74px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 36px 0 22px",
    background: "#36b8ff",
    color: "#000",
    fontSize: "clamp(36px, 3.7vw, 58px)",
    fontWeight: 800,
    lineHeight: 1,
    clipPath: "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)",
    boxShadow: "0 0 34px rgba(54, 184, 255, 0.36)",
  },
  cardHeader: {
    minHeight: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "0 24px",
    lineHeight: 1,
  },
  navBadge: {
    minHeight: "38px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 16px",
    lineHeight: 1.15,
  },
  signalMeta: {
    minHeight: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    paddingTop: "6px",
    lineHeight: 1,
  },
  bottomTabs: {
    minHeight: "42px",
  },
  bottomTab: {
    minHeight: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 14px",
    lineHeight: 1,
  },
};

export default function NotFound() {
  return (
    <main
      className="relative overflow-hidden bg-background text-foreground"
      style={pageStyles.main}
    >
      <div className="animated-grid absolute inset-0 opacity-35" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_28%_26%,rgba(54,184,255,0.2),transparent_32%),radial-gradient(circle_at_76%_38%,rgba(255,255,255,0.07),transparent_28%),linear-gradient(180deg,rgba(2,3,3,0.08),#020303_88%)]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-light/15 sm:h-[42rem] sm:w-[42rem]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-light/10 sm:h-[28rem] sm:w-[28rem]"
        aria-hidden="true"
      />

      <section className="relative z-10 w-full" style={pageStyles.shell}>
          <div style={pageStyles.copy}>
            <AgencyMark label />

            <div style={pageStyles.primaryFlag}>
              <span
                className="font-display text-4xl font-extrabold"
                style={pageStyles.primaryFlagNumber}
              >
                404
              </span>
              <span
                className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-light"
                style={pageStyles.primaryFlagLabel}
              >
                <span className="signal-dot" />
                Error flag
              </span>
            </div>

            <h1 className="font-display font-bold text-white" style={pageStyles.headline}>
              Route not found.
            </h1>

            <p className="text-white/68" style={pageStyles.bodyText}>
              The page you tried to reach does not exist, or the link has
              moved. Head back to the main hero and restart from the studio
              signal.
            </p>

            <div style={pageStyles.actions}>
              <Link
                href="/#home"
                className="button button-primary"
                style={pageStyles.actionButton}
              >
                <Home className="h-4 w-4" />
                Go to home
              </Link>
              <Link
                href="/#work"
                className="button button-muted"
                style={pageStyles.actionButton}
              >
                Explore work
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div style={pageStyles.visualWrap}>
            <div style={pageStyles.card}>
              <div className="font-display" style={pageStyles.cardFlag}>
                404
              </div>

              <div className="grid h-full min-h-[inherit] grid-rows-[auto_1fr_auto]">
                <div
                  className="border-b border-white/10 bg-white/[0.03] text-[11px] uppercase tracking-[0.14em] text-white/58"
                  style={pageStyles.cardHeader}
                >
                  <span>Route diagnostics</span>
                  <span className="text-primary-light">Missing page</span>
                </div>

                <div className="relative min-h-[285px]">
                  <Image
                    src={notFoundArtwork}
                    alt="Reflective digital figure for the missing page"
                    fill
                    priority
                    placeholder="blur"
                    className="object-cover opacity-75"
                    sizes="(max-width: 1024px) 86vw, 520px"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,3,3,0.9),rgba(2,3,3,0.08)_48%,rgba(2,3,3,0.82)),radial-gradient(circle_at_50%_36%,transparent,rgba(2,3,3,0.42))]" />
                  <div className="absolute left-6 right-6 top-40 flex items-center justify-between gap-5">
                    <span
                      className="rounded-full border border-white/12 bg-black/35 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/62 backdrop-blur-md"
                      style={pageStyles.navBadge}
                    >
                      Navigation error
                    </span>
                    <span className="font-display text-7xl font-extrabold leading-none text-white/10">
                      404
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[72%] bg-primary-light shadow-[0_0_24px_rgba(54,184,255,0.7)]" />
                    </div>
                    <div
                      className="text-[11px] uppercase tracking-[0.14em] text-white/50"
                      style={pageStyles.signalMeta}
                    >
                      <span>Signal scan</span>
                      <span className="text-primary-light">No route match</span>
                    </div>
                  </div>
                </div>

                <div
                  className="grid grid-cols-3 border-t border-white/10 text-center text-[10px] uppercase tracking-[0.12em] text-white/48 sm:text-[11px]"
                  style={pageStyles.bottomTabs}
                >
                  <span className="border-r border-white/10" style={pageStyles.bottomTab}>
                    Wrong URL
                  </span>
                  <span className="border-r border-white/10" style={pageStyles.bottomTab}>
                    Moved link
                  </span>
                  <span className="text-primary-light" style={pageStyles.bottomTab}>
                    404
                  </span>
                </div>
              </div>
            </div>
          </div>
      </section>
    </main>
  );
}
