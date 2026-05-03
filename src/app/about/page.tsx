import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "The theoretical foundation of the Telecom Economy Continuum framework and its author.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">Framework</p>
        <h1 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] mb-4">About</h1>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">The Theoretical Foundation</h2>
        <div className="prose-sm text-[var(--muted)] leading-relaxed space-y-3">
          <p>
            The Telecom Economy Continuum emerged from a straightforward observation: the telecom industry has extensive standards for network architecture (3GPP), operations (TMF), and measurement (ETSI, GSMA), but no coherent framework that explains <em>why</em> certain observability functions are economically necessary — not just technically desirable.
          </p>
          <p>
            The six laws are derived from first principles of network economics: the relationship between capacity, demand, revenue stratification, technology transitions, competitive markets, and information asymmetry. They are not normative recommendations. They are structural conditions that exist regardless of operator strategy or vendor choice.
          </p>
          <p>
            The ten observability functions follow deductively from the laws. If a law holds — and the evidence suggests all six do — then certain measurement functions are theoretically necessary. An operator that lacks them is not making a strategic choice; it is operating with incomplete information about its own economic position.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">Distinction from Existing Frameworks</h2>
        <div className="space-y-3">
          {[
            { name: "TMF (TM Forum)", diff: "TMF provides operational process frameworks (eTOM, TAM). The Continuum provides economic grounding for why certain measurement capabilities are non-optional. They are complementary, not competing." },
            { name: "ETSI / 3GPP", diff: "Technical standards define what the network can do. The Continuum explains what must be observed given what the network does. The independence principle — that observation must come from outside the measured system — is absent from technical standards." },
            { name: "GSMA", diff: "GSMA guidelines are industry consensus documents. The Continuum makes falsifiable theoretical claims: if Law II holds, then F2 is necessary. If that prediction is wrong, the framework should be revised." },
          ].map(({ name, diff }) => (
            <div key={name} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
              <p className="text-sm font-sans font-semibold text-[var(--foreground)] mb-1">{name}</p>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{diff}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">The Author</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[var(--muted-bg)] border border-[var(--card-border)] flex items-center justify-center shrink-0">
              <span className="text-xl font-serif text-[var(--muted)]">V</span>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-sans font-semibold text-[var(--foreground)] mb-1">Vugar Aliyev</h3>
              <p className="text-xs text-[var(--muted)] mb-3">Telecom Strategy &amp; Network Observability</p>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
                Telecom industry professional with experience across MNO strategy, network quality management, and the commercial application of observability tools. The Continuum framework synthesises that experience into a theoretical model intended to be useful to operators, vendors, and consultants working on network quality economics.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/-vugaraliyev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-brand-blue hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <a
                  href="mailto:boss@vaitechpro.com"
                  className="inline-flex items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  <Mail className="w-3.5 h-3.5" /> boss@vaitechpro.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">How to Cite This Work</h2>
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
          <p className="text-xs font-mono text-[var(--muted)] leading-relaxed">
            Aliyev, V. ({new Date().getFullYear()}). <em>Telecom Economy Continuum: The Laws of Network Observability</em>. Retrieved from telecomcontinuum.com
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-serif text-[var(--foreground)] mb-4">Contribute</h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
          Use cases and tool mappings can be contributed via GitHub. Each use case is a JSON file with a defined schema. The author reviews and publishes contributions that meet the quality standard — grounded in the framework, with a quantified economic outcome.
        </p>
        <Link
          href="/use-cases"
          className="inline-flex items-center gap-2 border border-[var(--card-border)] text-[var(--foreground)] px-4 py-2 rounded-lg text-sm font-sans font-medium hover:bg-[var(--muted-bg)] transition-colors"
        >
          Browse use cases <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
