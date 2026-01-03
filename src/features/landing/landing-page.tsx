"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Languages, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Languages,
    title: "Taglish Support",
    description: "Recognizes mixed Filipino-English (Taglish) conversations without “cleaning it up”."
  },
  {
    icon: Users,
    title: "All-in-One Meeting Toolkit",
    description: "Preparation, execution, and follow-up — stitched into a single workflow."
  },
  {
    icon: FileText,
    title: "Formal Report Generator",
    description: "Turn raw meetings into structured outputs that look ready for stakeholders."
  }
] as const;

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = React.useState<number | null>(null);

  return (
    <div className="min-h-dvh bg-background">
      <section className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover blur-[2px]"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect fill='%230b0b10' width='1200' height='800'/%3E%3C/svg%3E"
        >
          <source src="/media/stock-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.30),transparent_55%)]" />

        <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
          <div className="mx-auto mb-8 w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur">
            IMMS • Real-time transcription • Post-meeting intelligence
          </div>

          <h1 className="animate-fade-in text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
            Synthia
          </h1>
          <p className="mx-auto mt-4 max-w-2xl animate-fade-in text-pretty text-base text-white/85 sm:text-lg">
            Meetings that remember. Taglish-first transcription + summaries, action items, and knowledge retrieval — without
            breaking the flow.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="shadow-lg shadow-black/20">
              <Link href="/login">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/15"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {["Client-direct audio", "Taglish preserved", "RAG-ready transcripts"].map((t) => (
              <div key={t} className="glass rounded-xl px-4 py-3 text-xs text-white/80">
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-background px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Built for real meetings</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
              No “demo-only” gimmicks. A clean, fast UI that can evolve into production-grade meeting intelligence.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === index;

              return (
                <Card
                  key={feature.title}
                  onMouseEnter={() => setActiveFeature(index)}
                  onMouseLeave={() => setActiveFeature(null)}
                  className={cn(
                    "group cursor-pointer overflow-hidden transition-all duration-300 h-full",
                    isActive ? "border-primary/40 shadow-lg shadow-primary/10" : "hover:shadow-md"
                  )}
                >
                  <CardContent className="px-8 py-6 h-full">
                    <div
                      className={cn(
                        "mb-6 flex h-12 w-12 items-center justify-center rounded-xl border bg-muted text-muted-foreground transition-colors",
                        isActive && "border-primary/30 bg-primary/10 text-primary"
                      )}
                    >
                      <Icon className={cn("h-6 w-6", isActive && "animate-float-soft")} />
                    </div>
                    <div className="text-lg font-semibold">{feature.title}</div>
                    <div className="mt-2 text-sm text-muted-foreground">{feature.description}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border bg-muted/30 p-6">
            <div className="text-sm font-semibold">Architecture note</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Live audio stays in the browser (AudioWorklet → Google STT WebSocket). The backend only receives finalized
              transcript segments for storage and intelligence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

