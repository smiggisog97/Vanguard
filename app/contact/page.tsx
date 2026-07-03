import SectionHeader from "@/components/ui/section-header";
import InquiryForm from "@/components/inquiry-form";

export const metadata = { title: "Contact | Vanguard" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[61px]">
      <section className="reveal-section">
        <SectionHeader
          eyebrow="Contact"
          title="Talk to our team"
          description="Whether it's a research question, an advisory mandate, or an incubator application, tell us what you need."
        />
      </section>

      <section className="reveal-section mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_460px]">
        <div>
          <h2 className="font-display text-[20px] text-ink">
            Reach us directly
          </h2>
          <ul className="mt-4 space-y-3 text-[16px] text-ink">
            <li>hello@vanguard-research.com</li>
            <li>+880 2 XXX XXXX</li>
            <li>Dhaka · Singapore</li>
          </ul>

          <h2 className="mt-10 font-display text-[20px] text-ink">
            What happens next
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-[1.5] text-driftwood">
            Our team reviews every inquiry within two business days and routes
            it to the right service line: research, advisory, bespoke, or
            incubator.
          </p>
        </div>
        <InquiryForm title="Send an inquiry" submitLabel="Send Inquiry" />
      </section>
    </div>
  );
}
