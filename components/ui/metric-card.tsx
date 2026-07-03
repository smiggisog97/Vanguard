export default function MetricCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="bg-warm-sand p-[31px]" style={{ borderRadius: "16px" }}>
      <p className="font-display text-[53px] leading-none text-ink">
        {value}
      </p>
      <p className="mt-3 text-[15px] text-driftwood">{label}</p>
    </div>
  );
}
