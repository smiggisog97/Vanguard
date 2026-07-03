export default function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "gold" | "royal";
}) {
  const tones = {
    default: "text-ink",
    gold: "text-gold",
    royal: "text-royal",
  };
  return (
    <span
      className={`font-mono text-xs font-semibold uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
