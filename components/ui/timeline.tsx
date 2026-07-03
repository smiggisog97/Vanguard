export default function Timeline({
  steps,
}: {
  steps: { step: string; description: string }[];
}) {
  return (
    <ol className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
      {steps.map((s, i) => (
        <li
          key={s.step}
          className="bg-warm-sand p-6"
          style={{ borderRadius: "16px" }}
        >
          <span className="font-mono text-xs text-driftwood">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-2 font-display text-[20px] text-ink">{s.step}</p>
          <p className="mt-2 text-[15px] leading-[1.5] text-driftwood">
            {s.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
