"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "./RobotStudio.css";

const RobotHead = dynamic(() => import("@/components/three/RobotHead"), {
  ssr: false,
  loading: () => <div className="robot-studio-loading">Booting assistant…</div>,
});

export default function RobotStudio() {
  return (
    <section className="robot-studio section-rhythm" id="assistant">
      <div className="robot-studio-inner">
        <div className="robot-studio-copy">
          <p className="robot-studio-eyebrow">Always-on assistant</p>
          <h2 className="robot-studio-title">
            Intelligence that stays <span>awake</span> for your brand.
          </h2>
          <p className="robot-studio-lead">
            Every site we build ships with automations and agents that watch,
            respond, and follow up around the clock. Move your cursor — it&apos;s
            already tracking you.
          </p>
          <Link href="/lab" className="robot-studio-btn">
            Step inside the Lab
            <ArrowUpRight />
          </Link>
        </div>

        <div className="robot-studio-stage">
          <div className="robot-studio-glow" />
          <div className="robot-studio-canvas">
            <RobotHead />
          </div>
        </div>
      </div>
    </section>
  );
}
