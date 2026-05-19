import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Mountain,
  Leaf,
  Heart,
  Compass,
  MapPin,
  Phone,
  Instagram,
  ArrowRight,
  Sparkles,
  Home,
  Wifi,
  Coffee,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { treks } from "@/lib/treks";

export const Route = createFileRoute("/")({
  component: Index,
});

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

function Hero() {
  return (
    <section id="top" className="relative min-h-screen pt-28 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-32 h-96 w-96 rounded-full bg-[oklch(0.85_0.09_165_/_0.5)] blur-3xl" />
        <div className="absolute bottom-10 -right-32 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.85_0.07_180_/_0.45)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-primary/80">
            <Leaf className="h-3.5 w-3.5" /> Western Ghats · Karnataka
          </span>
          <h1 className="mt-6 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] text-primary">
            Where the <span className="text-gradient-nature italic">mist</span>
            <br /> meets the mountain.
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Chikkamagaluru Mountain Trek is a soulful journey into the heart of the Western Ghats —
            misty peaks, hidden waterfalls, and trails known only to locals. Authentic.
            Affordable. Unforgettable.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#treks"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:shadow-primary/30"
            >
              Explore Treks
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/50 px-6 py-3 text-sm font-medium text-primary backdrop-blur hover:bg-white/80 transition"
            >
              Our Story
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16"
        >
          <MediaPlaceholder
            aspect="wide"
            variant="image"
            label="Hero photograph"
            hint="A wide, atmospheric shot of misty peaks at sunrise"
          />
        </motion.div>

        <div className="mt-10 grid grid-cols-3 gap-4 text-center">
          {[
            { k: "10+", v: "Curated trails" },
            { k: "6,330 ft", v: "Highest peak" },
            { k: "All", v: "Skill levels welcome" },
          ].map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className="glass rounded-2xl p-5"
            >
              <div className="font-serif text-2xl sm:text-3xl text-primary">{s.k}</div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp} className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-primary/70">Our Story</span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-primary leading-tight">
            Not just another trekking group — a way of life.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16 items-center">
          <motion.div {...fadeUp} className="space-y-5 text-foreground/80 leading-relaxed">
            <p>
              Chikkamagaluru Mountain Trek is a journey into the heart of the Western Ghats, where
              misty mountains, lush green forests, and hidden waterfalls await those who seek real
              adventure and inner peace. Whether you are an experienced trekker or a nature-loving
              beginner, this is the perfect escape from the noise of city life.
            </p>
            <p>
              Unlike commercial operators who focus only on profits, our mission is to connect
              people with nature — through soulful experiences offered at a minimal cost. We
              believe nature should be accessible to everyone, and that time in the wild can heal,
              refresh, and inspire your life.
            </p>
            <p>
              Every trek is carefully planned and guided — from the mighty peaks of Kudremukh and
              Netravati to serene forests and secret trails known only to locals.
            </p>
          </motion.div>

          <MediaPlaceholder
            aspect="portrait"
            label="Forest trail photograph"
            hint="A vertical image of a misty forest path or canopy"
          />
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "Soulful, not commercial",
              body: "We exist to share nature, not to sell it. Treks at minimal cost, always.",
            },
            {
              icon: Compass,
              title: "Guided by locals",
              body: "Routes mapped by people who grew up in these hills — safety and wonder first.",
            },
            {
              icon: Leaf,
              title: "Leave no trace",
              body: "We protect the forests and peaks we love. Respect is part of every trek.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="glass rounded-3xl p-7"
            >
              <f.icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
              <h3 className="mt-4 font-serif text-xl text-primary">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-[1fr_1.2fr] items-center">
        <MediaPlaceholder
          aspect="portrait"
          label="Portrait of Sushanth Gowda"
          hint="A warm portrait of the founder on a trail"
        />
        <motion.div {...fadeUp}>
          <span className="text-xs uppercase tracking-[0.2em] text-primary/70">Led by passion</span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-primary leading-tight">
            Sushanth Gowda
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Founder & Lead Guide</p>
          <p className="mt-6 text-foreground/80 leading-relaxed">
            A passionate trekker with years of experience in the Chikkamagaluru region, Sushanth
            personally leads most treks. His goal isn't only to guide — it's to build a community
            of nature lovers who respect and preserve our forests and mountains.
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            Every visitor leaves with more than photographs — they leave with a deeper connection
            to the land.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span className="italic font-serif text-base">
              "Nature is not a destination — it's a way of life."
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Treks() {
  return (
    <section id="treks" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp} className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-primary/70">Trek highlights</span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-primary leading-tight">
            Chikkamagaluru's most beautiful trails.
          </h2>
          <p className="mt-4 text-muted-foreground">
            From iconic summits to hidden waterfalls — each route is crafted for safety, wonder,
            and a deep connection with the wild.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treks.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group glass rounded-3xl overflow-hidden flex flex-col"
            >
              <MediaPlaceholder
                aspect="video"
                label={`${t.name} photo`}
                hint="Trek summit, trail or landscape image"
                className="rounded-none rounded-t-3xl border-0"
              />
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-2xl text-primary">{t.name}</h3>
                  {t.tag && (
                    <span className="shrink-0 rounded-full bg-accent/40 px-3 py-1 text-[10px] uppercase tracking-wider text-primary">
                      {t.tag}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  {t.altitude && (
                    <span className="inline-flex items-center gap-1">
                      <Mountain className="h-3 w-3" /> {t.altitude}
                    </span>
                  )}
                  {t.start && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {t.start}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm text-foreground/75 leading-relaxed flex-1">{t.blurb}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          {...fadeUp}
          className="mt-14 glass rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-primary">Custom treks, your way.</h3>
            <p className="mt-2 text-muted-foreground max-w-xl">
              Tell us your interests, fitness level and schedule. We'll craft a route through
              offbeat trails, hidden waterfalls, and local stories.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 transition"
          >
            Plan with us <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp} className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-primary/70">Gallery</span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-primary leading-tight">
            Moments from the mountains.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Photos and videos coming soon — replace the placeholders below with shots from your
            own treks.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-6 grid-rows-2">
          <MediaPlaceholder aspect="square" className="sm:col-span-2" label="Landscape photo" />
          <MediaPlaceholder aspect="video" variant="video" className="sm:col-span-4" label="Trek video" hint="Short cinematic clip of a trail or summit" />
          <MediaPlaceholder aspect="video" className="sm:col-span-3" label="Sunrise / sunset photo" />
          <MediaPlaceholder aspect="video" className="sm:col-span-3" label="Group at summit" />
        </div>
      </div>
    </section>
  );
}

function Stay() {
  return (
    <section id="stay" className="relative py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp} className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-primary/70">Where to stay</span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl text-primary leading-tight">
            Rest where the hills sing.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Chikkamagaluru welcomes every budget — from high-end resorts to warm, family-run
            homestays. The most memorable way to stay is with a local family, sharing meals and
            stories of the land.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Home,
              title: "Homestays",
              body: "Live with locals. Eat home-cooked Malnad meals. Wake to birdsong instead of horns.",
              tag: "Most loved",
            },
            {
              icon: Coffee,
              title: "Coffee Estate Stays",
              body: "Sleep amongst coffee plantations and silver-oak shade — a Chikkamagaluru classic.",
            },
            {
              icon: Wifi,
              title: "Resorts & Hotels",
              body: "Comfortable mid-range and luxury options for those who prefer modern amenities.",
            },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="glass rounded-3xl p-7 relative"
            >
              {s.tag && (
                <span className="absolute top-5 right-5 rounded-full bg-accent/40 px-3 py-1 text-[10px] uppercase tracking-wider text-primary">
                  {s.tag}
                </span>
              )}
              <s.icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
              <h3 className="mt-4 font-serif text-xl text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-28 px-4">
      <div className="mx-auto max-w-5xl">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-[2.5rem] p-10 sm:p-16 text-center"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[oklch(0.42_0.08_155)] via-[oklch(0.45_0.07_175)] to-[oklch(0.5_0.09_140)]" />
          <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_40%)]" />

          <span className="text-xs uppercase tracking-[0.25em] text-white/70">
            Your call to adventure
          </span>
          <h2 className="mt-4 font-serif text-4xl sm:text-6xl text-white leading-tight">
            Ready to feel alive?
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-white/80">
            Let's plan your escape into the wild. Reach out — we'll craft a journey that fits you.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/919448817562"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-primary shadow-lg hover:shadow-xl transition"
            >
              <Phone className="h-4 w-4" /> 94488 17562
            </a>
            <a
              href="https://instagram.com/sushanth_ckm"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/20 transition"
            >
              <Instagram className="h-4 w-4" /> @sushanth_ckm
            </a>
          </div>

          <p className="mt-10 font-serif italic text-white/80 text-lg">
            🌿 Explore. Trek. Discover. Feel Alive.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-10 pt-4">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Mountain className="h-4 w-4" />
          <span>Chikkamagaluru Mountain Trek</span>
        </div>
        <p>© {new Date().getFullYear()} — Nature is a way of life.</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="relative">
      <SiteNav />
      <Hero />
      <About />
      <Founder />
      <Treks />
      <Gallery />
      <Stay />
      <Contact />
      <Footer />
    </main>
  );
}
