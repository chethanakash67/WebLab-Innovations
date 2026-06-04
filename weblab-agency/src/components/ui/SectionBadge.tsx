"use client";

interface SectionBadgeProps {
  label: string;
  number: string;
}

export default function SectionBadge({ label, number }: SectionBadgeProps) {
  return (
    <div className="section-marker">
      <span className="section-marker-number">[{number}]</span>
      <span className="section-marker-line" aria-hidden="true" />
      <span className="section-marker-label">{label}</span>
    </div>
  );
}
