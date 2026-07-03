export default function AuthorCard() {
  return (
    <div
      className="flex items-start gap-4 bg-warm-sand p-[31px]"
      style={{ borderRadius: "16px" }}
    >
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center bg-ink"
        style={{ borderRadius: "16px" }}
      >
        <span className="font-display text-[16px] text-parchment">SA</span>
      </div>
      <div>
        <p className="font-display text-[20px] text-ink">Sajid Amit</p>
        <p className="mt-1 text-[14px] text-driftwood">
          Executive Director, Water.org South Asia · Columbia University · Asian
          Institute of Technology
        </p>
        <p className="mt-2 text-[14px] text-driftwood">
          100+ published research papers · Business Standard columnist · Host,
          CES Markets and Economy
        </p>
      </div>
    </div>
  );
}
