import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumina — A note from the founder" },
      {
        name: "description",
        content:
          "Watch a 90-second note from our founder on why we're building Lumina — and how to be first in line when we open the doors.",
      },
      { property: "og:title", content: "Lumina — A note from the founder" },
      {
        property: "og:description",
        content:
          "Watch a 90-second note from our founder on why we're building Lumina.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const VIDEO_SRC =
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

function Index() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted" | "error">("idle");
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("submitted");
    setEmail("");
  };

  return (
    <main className="grain relative min-h-screen overflow-hidden bg-background">
      {/* Top marquee bar — YC-style */}
      <div className="relative z-10 flex items-center justify-between border-b border-stone/60 bg-background/70 px-5 py-3 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-terracotta text-cream">
            <span className="font-display text-sm font-bold leading-none">L</span>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            Lumina
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-terracotta" />
          </span>
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Batch W26 · Launching soon
          </span>
        </div>
      </div>

      <section className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-16 pb-24 text-center sm:px-8 sm:pt-24">
        <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-stone/60 bg-card px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          <span className="h-1 w-1 rounded-full bg-terracotta" />
          A note from the founder
        </span>

        <h1 className="font-display text-balance text-5xl leading-[0.98] font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[88px]">
          We're building something
          <span className="italic text-terracotta"> worth waiting for.</span>
        </h1>

        <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          Ninety seconds on why this exists, who it's for, and what happens next.
        </p>

        {/* Video card */}
        <div className="relative mt-14 w-full">
          {/* decorative offset frame */}
          <div
            aria-hidden
            className="absolute -inset-2 -z-10 rounded-[28px] bg-terracotta/15 sm:-inset-3"
            style={{ transform: "rotate(-1deg)" }}
          />
          <div
            aria-hidden
            className="absolute -inset-1 -z-10 rounded-[24px] bg-ochre/25"
            style={{ transform: "rotate(0.6deg)" }}
          />

          <div className="group relative overflow-hidden rounded-3xl border border-stone/60 bg-espresso shadow-[0_30px_80px_-30px_rgba(60,30,10,0.35)]">
            <div className="relative aspect-video w-full">
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                poster="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
                playsInline
                preload="metadata"
                onEnded={() => setPlaying(false)}
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
                className="h-full w-full object-cover"
              />

              {!playing && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Play founder note"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-espresso/70 via-espresso/20 to-transparent text-cream transition-all hover:from-espresso/80"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream text-espresso shadow-2xl transition-transform group-hover:scale-105 sm:h-24 sm:w-24">
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-1 h-8 w-8 sm:h-10 sm:w-10"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="font-display text-lg italic sm:text-xl">
                    Play the note — 1:32
                  </span>
                </button>
              )}

              {playing && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Pause"
                  className="absolute inset-0 opacity-0"
                />
              )}
            </div>

            {/* Caption bar */}
            <div className="flex items-center justify-between gap-4 border-t border-cream/10 bg-espresso px-5 py-4 text-cream sm:px-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full border border-cream/20 bg-cream/10">
                  <img
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=founder&backgroundColor=f5f0e8"
                    alt="Founder avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">Maya Chen</p>
                  <p className="text-[11px] tracking-wide text-cream/60 uppercase">
                    Founder & CEO · Recorded in Brooklyn
                  </p>
                </div>
              </div>
              <div className="hidden items-center gap-1.5 text-[11px] tracking-wide text-cream/50 uppercase sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                Unlisted preview
              </div>
            </div>
          </div>
        </div>

        {/* Email capture */}
        <div className="mt-16 w-full max-w-lg">
          {status === "submitted" ? (
            <div className="rounded-2xl border border-terracotta/30 bg-terracotta/5 px-6 py-5">
              <p className="text-sm font-medium text-terracotta">
                You're on the list. We'll write when there's something real to share.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="your@email.com"
                className="flex-1 rounded-xl border border-input bg-card px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-terracotta/60 focus:ring-2 focus:ring-terracotta/20 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-7 py-3.5 text-sm font-medium text-cream transition-all hover:bg-terracotta hover:shadow-lg hover:shadow-terracotta/20 active:scale-[0.98]"
              >
                Get the first look
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                  <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                </svg>
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-3 text-xs text-terracotta">
              Please enter a valid email address.
            </p>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            No launches. No LinkedIn theatrics. One email when it's ready.
          </p>
        </div>
      </section>

      <footer className="relative z-10 flex flex-col items-center justify-between gap-3 border-t border-stone/60 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} Lumina Labs, Inc.</span>
        <span className="font-display italic">Built slowly, on purpose.</span>
      </footer>
    </main>
  );
}
