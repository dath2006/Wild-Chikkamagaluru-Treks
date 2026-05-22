import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Calendar,
  Users,
  FileText,
  Search,
  Clock,
  Download,
  ChevronRight,
  Leaf,
  Info,
  AlertCircle,
} from "lucide-react";
import { SiteNav, LogoTitle } from "@/components/site-nav";
import { MobileNav } from "@/components/mobile-nav";
import { SectionReveal, RevealBlock, RevealText } from "@/components/reveal";
import BorderGlow from "@/components/border-glow";

export const Route = createFileRoute("/permits")({
  component: PermitsPage,
  head: () => ({
    meta: [
      { title: "How to Get Trekking Permits — Wild Chikkamagaluru Treks" },
      {
        name: "description",
        content:
          "Step-by-step guide to getting forest trek permits from Karnataka's Aranya Vihaara portal for Netravati, Kudremukha, Bandaje Falls and other Chikkamagaluru treks.",
      },
    ],
  }),
});

const steps = [
  {
    number: "01",
    icon: Globe,
    title: "Visit the Aranya Vihaara Website",
    color: "155 40 60",
    accent: "#6ee7b7",
    content: (
      <div className="space-y-3 text-foreground/80 leading-relaxed text-base">
        <p>
          All permits are issued online through the official portal:{" "}
          <a
            href="https://aranyavihaara.karnataka.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 px-2.5 py-1 text-primary font-semibold underline underline-offset-2 decoration-primary/40 hover:bg-primary/18 hover:decoration-primary transition-all"
          >
            aranyavihaara.karnataka.gov.in
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
          </a>
        </p>
        <p>
          The website is available in both <span className="highlight">English and Kannada</span>.
          First-time users need to create a login ID before proceeding.
        </p>
      </div>
    ),
  },
  {
    number: "02",
    icon: Calendar,
    title: "Know the Booking Rules",
    color: "155 40 60",
    accent: "#fbbf24",
    content: (
      <ul className="space-y-2.5 text-base text-foreground/80">
        {[
          "Bookings must be made at least 2 days in advance.",
          "You can book permits up to 15 days ahead.",
          "Most forest treks are open seasonally, generally from June to February.",
          "Daily quotas are enforced — ranging from 100 to 300 visitors per day depending on the trek.",
          "One login can be used to book permits for up to 3 people.",
          "There is a minimum age requirement for each trek; the cut-off age and permit fee may vary by age group.",
        ].map((rule, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
              {i + 1}
            </span>
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    number: "03",
    icon: Users,
    title: "Keep Trekker Details Ready",
    color: "155 40 60",
    accent: "#86efac",
    content: (
      <div className="space-y-3 text-base text-foreground/80">
        <p>You need the following information for each person in your group:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
          {["Full Name", "Age", "Gender", "Mobile Number", "Government ID", "ID Number"].map(
            (detail) => (
              <div
                key={detail}
                className="flex items-center gap-2 rounded-xl bg-primary/5 border border-primary/10 px-3.5 py-2.5"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                <span className="font-medium text-foreground/90">{detail}</span>
              </div>
            ),
          )}
        </div>
        <p className="text-sm text-muted-foreground pt-1">
          Accepted IDs: Voter ID, PAN, Driving License, Ration Card, or Passport
        </p>
      </div>
    ),
  },
  {
    number: "04",
    icon: Search,
    title: "Search for Availability",
    color: "155 40 60",
    accent: "#6ee7b7",
    content: (
      <div className="space-y-3 text-base text-foreground/80">
        <p>Make sure you are logged in before you search for trek availability.</p>
        <ol className="space-y-2.5">
          {[
            <>
              Go to the <span className="highlight font-medium">"Search Trek Availability"</span>{" "}
              section.
            </>,
            <>
              Select the <strong>District</strong> where your trek is located.
            </>,
            <>
              Choose the <strong>Trek Name</strong> from the dropdown.
            </>,
            <>
              Select your <strong>preferred date</strong>.
            </>,
            <>
              Click <span className="highlight-accent font-medium">"Check Availability."</span>
            </>,
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <ChevronRight className="h-4 w-4 shrink-0 text-primary/70 mt-0.5" />
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-accent/20 border border-accent/30 px-3.5 py-3">
          <Info className="h-4 w-4 shrink-0 text-primary/70 mt-0.5" />
          <p className="text-sm text-foreground/75">
            If slots are available, you will be able to proceed with booking.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "05",
    icon: Clock,
    title: "Book Your Slot",
    color: "155 40 60",
    accent: "#fbbf24",
    content: (
      <ol className="space-y-2.5 text-base text-foreground/80">
        {[
          <>
            Select the available <strong>time slot</strong> (usually morning hours like 6:00 AM to
            10:00 AM).
          </>,
          <>
            Enter <strong>trekker details</strong> one by one.
          </>,
          <>
            Accept the <strong>terms and conditions</strong>.
          </>,
          <>
            Make payment using{" "}
            <span className="highlight font-medium">
              Credit/Debit Card, Net Banking, UPI, or Wallet.
            </span>
          </>,
        ].map((step, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    number: "06",
    icon: Download,
    title: "Download Your Permit",
    color: "155 40 60",
    accent: "#86efac",
    content: (
      <div className="space-y-3 text-base text-foreground/80">
        <ol className="space-y-2.5">
          {[
            <>
              Go to the <span className="highlight font-medium">"My Bookings"</span> section on the
              website.
            </>,
            <>
              Click on <strong>"Upcoming Treks."</strong>
            </>,
            <>Download or print your permit.</>,
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-primary/8 border border-primary/15 px-3.5 py-3">
          <AlertCircle className="h-4 w-4 shrink-0 text-primary mt-0.5" />
          <p className="text-sm text-foreground/75">
            <strong>Important:</strong> Carry your printed/downloaded permit along with the
            Government ID used during booking on the day of the trek.
          </p>
        </div>
      </div>
    ),
  },
];

const districtTable = [
  { trek: "Netravathi Peak", district: "Chikkamagaluru" },
  { trek: "Kudremukha", district: "Chikkamagaluru" },
  { trek: "Bandaje Falls", district: "Dakshina Kannada" },
  { trek: "Ballalarayana Durga", district: "Chikkamagaluru" },
  { trek: "Gangadikala Gudda", district: "Chikkamagaluru" },
  { trek: "Bisle Ghat", district: "Hassan" },
];

function DistrictTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/15 bg-white/60 backdrop-blur-sm">
      <div className="px-5 py-3.5 bg-primary/5 border-b border-primary/10">
        <p className="text-xs uppercase tracking-[0.18em] text-primary/70 font-semibold">
          Trek → District Reference
        </p>
      </div>
      <div className="divide-y divide-primary/8">
        {districtTable.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-5 py-3 text-sm hover:bg-primary/3 transition-colors"
          >
            <span className="text-foreground/85 font-medium text-base">{row.trek}</span>
            <span className="text-muted-foreground text-sm bg-primary/8 rounded-full px-2.5 py-0.5">
              {row.district}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PermitsPage() {
  const reduce = useReducedMotion();

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <SiteNav />

      {/* Hero banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 px-4 overflow-hidden">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 -left-32 h-96 w-96 rounded-full bg-[oklch(0.85_0.09_165/0.5)] blur-3xl" />
          <div className="absolute bottom-0 -right-32 h-112 w-md rounded-full bg-[oklch(0.90_0.12_48/0.4)] blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[oklch(0.92_0.10_38/0.2)] blur-2xl" />
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-primary/60 hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back to Home
            </Link>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-primary/80 mb-5"
          >
            <Leaf className="h-3.5 w-3.5" />
            Karnataka Forest Department
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.12] text-primary max-w-3xl"
          >
            How to Get Permits for{" "}
            <em
              className="not-italic"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.42 0.09 155), oklch(0.55 0.12 175), oklch(0.62 0.15 55))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              Chikkamagaluru Treks
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-foreground/70 max-w-2xl leading-relaxed text-lg sm:text-xl"
          >
            Netravathi, Kudremukha, Bandaje Falls and others — a simple step-by-step guide through
            the Karnataka Forest Department's Aranya Vihaara portal.
          </motion.p>

          {/* Quick CTA chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7"
          >
            <a
              href="https://aranyavihaara.karnataka.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition"
            >
              Open Aranya Vihaara Portal
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 scroll-over-content">
        {/* Intro context strip */}
        <SectionReveal className="relative py-10 md:py-14 px-4 section-blobs">
          <div className="mx-auto max-w-4xl">
            <RevealBlock>
              <BorderGlow
                className="p-7 sm:p-9"
                borderRadius={24}
                colors={["#6ee7b7", "#fbbf24", "#86efac"]}
                glowColor="155 40 60"
                glowIntensity={0.8}
                backgroundColor="oklch(0.99 0.008 130 / 0.55)"
                animated
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-xl bg-primary/10 p-2.5">
                    <FileText className="h-5 w-5 text-primary" strokeWidth={1.6} />
                  </div>
                  <div className="space-y-2 text-base text-foreground/75 leading-relaxed">
                    <p>
                      If you're planning a trek in Karnataka — be it Netravathi, Kudremukha, or any
                      other — there's one important step you can't miss. You need to obtain permits
                      from the{" "}
                      <span className="highlight font-medium">Karnataka Forest Department</span>.
                    </p>
                    <p>
                      These permits are not just a formality. They help the forest department
                      regulate footfall on the trails and protect the ecosystem we are trekking
                      through. Getting a permit can sometimes feel a bit confusing — so here's a
                      simple guide to help you through the process,{" "}
                      <span className="highlight-accent">step by step</span>.
                    </p>
                  </div>
                </div>
              </BorderGlow>
            </RevealBlock>
          </div>
        </SectionReveal>

        {/* Steps */}
        <SectionReveal className="relative py-10 md:py-16 px-4 section-blobs">
          <div className="mx-auto max-w-4xl space-y-6">
            <RevealBlock>
              <span className="text-xs uppercase tracking-[0.2em] text-primary/70">
                Step-by-step guide
              </span>
              <RevealText
                as="h2"
                text="Six steps to your permit."
                className="mt-2 font-serif text-3xl sm:text-4xl leading-tight"
                gradient
              />
            </RevealBlock>

            <div className="mt-8 space-y-5">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <RevealBlock key={step.number} delay={i * 0.07}>
                    <BorderGlow
                      className="p-6 sm:p-8"
                      borderRadius={20}
                      colors={["#6ee7b7", "#fbbf24", "#86efac"]}
                      glowColor={step.color}
                      glowIntensity={0.75}
                      backgroundColor="oklch(0.99 0.008 130 / 0.55)"
                      animated
                    >
                      <div className="flex items-start gap-5">
                        {/* Step number + icon */}
                        <div className="shrink-0 flex flex-col items-center gap-2">
                          <div
                            className="flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm"
                            style={{
                              background: `linear-gradient(135deg, oklch(0.42 0.07 155 / 0.12), oklch(0.82 0.14 55 / 0.15))`,
                              border: "1px solid oklch(0.42 0.07 155 / 0.18)",
                            }}
                          >
                            <Icon className="h-5 w-5 text-primary" strokeWidth={1.6} />
                          </div>
                          <span className="font-condensed text-[11px] font-bold tracking-wider text-primary/40">
                            {step.number}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-2xl sm:text-3xl text-primary mb-4 leading-snug">
                            {step.title}
                          </h3>
                          {step.content}
                        </div>
                      </div>
                    </BorderGlow>
                  </RevealBlock>
                );
              })}
            </div>
          </div>
        </SectionReveal>

        {/* District Reference Table */}
        <SectionReveal className="relative py-10 md:py-16 px-4 section-blobs">
          <div className="mx-auto max-w-4xl">
            <RevealBlock>
              <span className="text-xs uppercase tracking-[0.2em] text-primary/70">Reference</span>
            </RevealBlock>
            <RevealText
              as="h2"
              text="Which district is my trek in?"
              className="mt-2 font-serif text-3xl sm:text-4xl leading-tight mb-8"
              gradient
            />
            <RevealBlock delay={0.1}>
              <DistrictTable />
            </RevealBlock>
          </div>
        </SectionReveal>

        {/* CTA footer strip */}
        <SectionReveal className="relative py-10 md:py-16 px-4">
          <div className="mx-auto max-w-4xl">
            <RevealBlock>
              <div className="relative overflow-hidden rounded-[2rem]">
                <div className="absolute inset-0 -z-10 bg-linear-to-br from-[oklch(0.42_0.08_155)] via-[oklch(0.44_0.08_130)] to-[oklch(0.48_0.12_48)]" />
                <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_40%)]" />
                <div className="p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/25 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 mb-4">
                      <Leaf className="h-3 w-3" />
                      Ready to trek?
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white leading-snug max-w-sm">
                      Got your permit? Now plan your trek with us.
                    </h3>
                    <p className="mt-3 text-white/70 text-base max-w-md leading-relaxed">
                      We'll handle the route, the guide, and every detail — you just show up and
                      breathe in the mountains.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <a
                      href="https://wa.me/919448817562"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-primary shadow-lg hover:shadow-xl transition whitespace-nowrap"
                    >
                      WhatsApp Us
                    </a>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/20 transition whitespace-nowrap"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Explore Treks
                    </Link>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </SectionReveal>

        {/* Footer */}
        <footer className="px-4 pb-10 pt-4">
          <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/icon.png"
                alt="Wild Chikkamagaluru Treks"
                className="h-7 w-7 rounded-full object-cover"
              />
              <LogoTitle className="hidden sm:flex" />
            </Link>
            <p>© {new Date().getFullYear()} — Nature is a way of life.</p>
          </div>
        </footer>
      </div>
      <MobileNav />
    </main>
  );
}
