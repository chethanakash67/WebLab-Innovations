interface AgencyMarkProps {
  className?: string;
  label?: boolean;
}

export default function AgencyMark({
  className = "",
  label = false,
}: AgencyMarkProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span className="agency-mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      {label && (
        <span className="font-display text-sm font-semibold tracking-[-0.04em] text-white">
          AigleOn Labs
        </span>
      )}
      <span className="sr-only">AigleOn Labs</span>
    </div>
  );
}
