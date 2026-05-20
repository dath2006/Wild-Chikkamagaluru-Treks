import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

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
        name: "description",
        content:
          "Misty Peaks Trek is a website for exploring Chikkamagaluru's natural beauty and booking guided treks.",
      },
      {
        property: "og:description",
        content:
          "Misty Peaks Trek is a website for exploring Chikkamagaluru's natural beauty and booking guided treks.",
      },
      {
        name: "twitter:description",
        content:
          "Misty Peaks Trek is a website for exploring Chikkamagaluru's natural beauty and booking guided treks.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4a2337bf-4de2-469f-95d3-54c54bba9043/id-preview-03d2a45c--ef6496a3-8edf-47ba-8c21-9ae87179bdfb.lovable.app-1779223082935.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4a2337bf-4de2-469f-95d3-54c54bba9043/id-preview-03d2a45c--ef6496a3-8edf-47ba-8c21-9ae87179bdfb.lovable.app-1779223082935.png",
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
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap",
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
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
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
