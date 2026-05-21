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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Wild Chikkamagaluru Treks — Soulful Treks in the Western Ghats" },
      {
        name: "description",
        content:
          "Soulful, affordable treks across Chikkamagaluru's misty peaks — Mullayanagiri, Kudremukh, Netravati and more. Led by Sushanth Gowda.",
      },
      { name: "author", content: "Wild Chikkamagaluru Treks" },
      {
        property: "og:title",
        content: "Wild Chikkamagaluru Treks — Soulful Treks in the Western Ghats",
      },
      {
        property: "og:description",
        content:
          "Explore. Trek. Discover. Feel Alive. Authentic guided treks in the Western Ghats.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Wild Chikkamagaluru Treks — Soulful Treks in the Western Ghats",
      },
      {
        name: "twitter:description",
        content:
          "Soulful, affordable treks across Chikkamagaluru's misty peaks — Mullayanagiri, Kudremukh, Netravati and more. Led by Sushanth Gowda.",
      },
      { property: "og:image", content: "/icon.png" },
      { name: "twitter:image", content: "/icon.png" },
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
    <html lang="en">
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
