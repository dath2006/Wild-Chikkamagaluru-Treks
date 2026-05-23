import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { frame } from "motion";
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

// JSON-LD Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://wildchikkamagalurutreks.com/#business",
      name: "Wild Chikkamagaluru Treks",
      description:
        "Guided trekking tours across Chikkamagaluru's Western Ghats — Mullayanagiri, Kudremukh, Netravati and more.",
      url: "https://wildchikkamagalurutreks.com",
      telephone: "+919448817562",
      email: "sushanthgowda44@gmail.com",
      founder: {
        "@type": "Person",
        name: "Sushanth Gowda",
        sameAs: "https://www.instagram.com/sushanth_ckm",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chikkamagaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 13.3161,
        longitude: 75.772,
      },
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 13.3161,
          longitude: 75.772,
        },
        geoRadius: "100000",
      },
      image: "https://media.wildchikkamagalurutreks.com/chikkamagaluru%20treks/poster.jpeg",
      sameAs: ["https://www.instagram.com/sushanth_ckm"],
      hasMap: "https://maps.google.com/?q=Chikkamagaluru,Karnataka",
      openingHours: "Mo-Su 06:00-20:00",
    },
    {
      "@type": "TouristDestination",
      name: "Chikkamagaluru Western Ghats Treks",
      description:
        "Trekking in Chikkamagaluru, Karnataka — home to Karnataka's highest peaks including Mullayanagiri (6330 ft) and Kudremukh (6207 ft).",
      touristType: ["Hikers", "NatureLovers", "AdventureEnthusiasts"],
      geo: {
        "@type": "GeoCoordinates",
        latitude: 13.3161,
        longitude: 75.772,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the highest peak in Chikkamagaluru?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mullayanagiri at 6,330 ft is the highest peak in Karnataka and Chikkamagaluru, featuring the ancient Mullayana Swamy temple and panoramic views of the Western Ghats.",
          },
        },
        {
          "@type": "Question",
          name: "Which treks are available in Chikkamagaluru?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Wild Chikkamagaluru Treks offers guided treks to Mullayanagiri, Kudremukh Peak, Netravati Peak, Kurinjal Peak, Ettina Bhuja, Gangadikkal Peak, Narasimha Parvatha, Bandaje Falls, and more.",
          },
        },
        {
          "@type": "Question",
          name: "How to contact Wild Chikkamagaluru Treks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Contact Sushanth Gowda on WhatsApp at +91 94488 17562 or on Instagram @sushanth_ckm to book a guided trek in Chikkamagaluru.",
          },
        },
        {
          "@type": "Question",
          name: "Is Kudremukh open for trekking?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Kudremukh is open for guided trekking. It's the second-highest peak in Karnataka at 6,207 ft, best experienced during the monsoon season. Permits are required and our guides handle all arrangements.",
          },
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Chikkamagaluru Trek Routes",
      description: "Popular trekking routes in Chikkamagaluru guided by Wild Chikkamagaluru Treks",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Mullayanagiri Trek",
          url: "https://wildchikkamagalurutreks.com/#treks",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Kudremukh Peak Trek",
          url: "https://wildchikkamagalurutreks.com/#treks",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Netravati Peak Trek",
          url: "https://wildchikkamagalurutreks.com/#treks",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Kurinjal Peak Trek",
          url: "https://wildchikkamagalurutreks.com/#treks",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Ettina Bhuja Trek",
          url: "https://wildchikkamagalurutreks.com/#treks",
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Bandaje Falls Trek",
          url: "https://wildchikkamagalurutreks.com/#treks",
        },
      ],
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Primary SEO Tags
      {
        title: "Trekking in Chikkamagaluru | Mullayanagiri, Kudremukh — Wild Chikkamagaluru Treks",
      },
      {
        name: "description",
        content:
          "Guided treks in Chikkamagaluru, Karnataka. Mullayanagiri (6330ft), Kudremukh, Netravati Peak, Bandaje Falls & more. Book with local expert Sushanth Gowda. ☎ +91 94488 17562",
      },
      {
        name: "keywords",
        content:
          "trekking in Chikkamagaluru, Mullayanagiri trek, Kudremukh peak trek, Western Ghats trekking Karnataka, best treks near Chikkamagaluru, guided trek Karnataka, Netravati peak, Ettina Bhuja trek, Kurinjal Peak, Bandaje Falls",
      },
      { name: "author", content: "Wild Chikkamagaluru Treks" },
      { name: "robots", content: "index, follow" },
      { name: "language", content: "English" },
      // Canonical URL
      { rel: "canonical", href: "https://wildchikkamagalurutreks.com" },
      // Open Graph
      { property: "og:title", content: "Trekking in Chikkamagaluru | Wild Chikkamagaluru Treks" },
      {
        property: "og:description",
        content:
          "Explore. Trek. Discover. Feel Alive. Authentic guided treks in the Western Ghats. Book with Sushanth Gowda.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://wildchikkamagalurutreks.com" },
      { property: "og:site_name", content: "Wild Chikkamagaluru Treks" },
      { property: "og:locale", content: "en_IN" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Trekking in Chikkamagaluru | Wild Chikkamagaluru Treks" },
      {
        name: "twitter:description",
        content:
          "Guided treks in Chikkamagaluru, Karnataka. Mullayanagiri, Kudremukh, Netravati Peak & more. Book with local expert Sushanth Gowda.",
      },
      { name: "twitter:creator", content: "@sushanth_ckm" },
      // Images
      {
        property: "og:image",
        content: "https://media.wildchikkamagalurutreks.com/chikkamagaluru%20treks/poster.jpeg",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Chikkamagaluru Western Ghats trekking landscape" },
      {
        name: "twitter:image",
        content: "https://media.wildchikkamagalurutreks.com/chikkamagaluru%20treks/poster.jpeg",
      },
      { name: "twitter:image:alt", content: "Chikkamagaluru Western Ghats trekking landscape" },
      // Geo Tags for Local SEO
      { name: "geo.region", content: "IN-KA" },
      { name: "geo.placename", content: "Chikkamagaluru, Karnataka" },
      { name: "geo.position", content: "13.3161;75.7720" },
      { name: "ICBM", content: "13.3161, 75.7720" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://picsum.photos" },
      { rel: "dns-prefetch", href: "https://fastly.picsum.photos" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Rye&family=Oswald:wght@600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Rye&family=Oswald:wght@600;700&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/icon.png" },
      { rel: "icon", type: "image/x-icon", href: "/icon_32.ico", sizes: "32x32" },
      { rel: "icon", type: "image/x-icon", href: "/icon_16.ico", sizes: "16x16" },
      { rel: "icon", type: "image/x-icon", href: "/icon_48.ico", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/icon.png" },
      { rel: "shortcut icon", href: "/icon_32.ico" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Mobile: lighter settings for smoother touch scrolling
    // Desktop: standard smooth scroll
    const lenis = new Lenis({
      lerp: isMobile ? 0.15 : 0.1,
      duration: isMobile ? 0.8 : 1.2,
      smoothWheel: true,
      touchMultiplier: isMobile ? 1.5 : 2, // More responsive on mobile
    });
    lenisRef.current = lenis;

    // Sync Lenis to Motion's frame scheduler instead of running its own RAF loop
    // This merges all animation work into one RAF loop instead of competing loops
    const update = (data: { timestamp: number }) => {
      lenis.raf(data.timestamp);
    };
    frame.update(update, true); // true = runs on every frame, synced with Motion

    return () => {
      lenis.destroy();
      // Motion's frame.cancel is not exposed, but lenis.destroy() stops the animation
    };
  }, [isMobile]);

  return <>{children}</>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll>
        <Outlet />
      </SmoothScroll>
    </QueryClientProvider>
  );
}
