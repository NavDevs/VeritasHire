"use client";

import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { BlobBackground } from "@/components/layout/BlobBackground";
import { Section } from "@/components/layout/Section";
import { JobInputForm } from "@/components/features/JobInputForm";
import { HowItWorks } from "@/components/features/HowItWorks";
import { StatsSection } from "@/components/features/StatsSection";
import { FeaturesGrid } from "@/components/features/FeaturesGrid";
import { Button } from "@/components/ui/Button";
import { ArrowDown, Shield, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <GrainOverlay />

      {/* Navbar */}
      <nav className="bg-background/80 border-border/50 fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="VeritasHire Logo"
                width={32}
                height={32}
                className="sm:h-10 sm:w-10"
              />
              <span className="font-heading text-foreground text-lg font-bold sm:text-xl">
                VeritasHire
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden gap-3 md:flex">
              <Link href="/recent">
                <Button variant="outline" size="sm">
                  Recent Analysis
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Try It Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="hover:bg-muted rounded-lg p-2 transition-colors md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="border-border/50 animate-in slide-in-from-top-2 space-y-3 border-t py-4 md:hidden">
              <Link href="/recent" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="default" className="w-full justify-center">
                  Recent Analysis
                </Button>
              </Link>
              <Button
                variant="outline"
                size="default"
                className="w-full justify-center"
                onClick={() => {
                  document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" });
                  setMobileMenuOpen(false);
                }}
              >
                Try It Now
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <Section
        maxWidth="4xl"
        className="relative flex min-h-screen items-center justify-center pt-16"
      >
        <BlobBackground
          color="moss"
          shapeIndex={0}
          className="-left-40 -top-20 opacity-50 md:opacity-100"
        />
        <BlobBackground
          color="terracotta"
          shapeIndex={1}
          className="-bottom-20 -right-40 opacity-50 md:opacity-100"
        />

        <div className="relative z-10 space-y-6 px-4 text-center sm:space-y-8">
          <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold sm:px-6 sm:py-3 sm:text-sm">
            <Shield size={14} className="sm:h-4 sm:w-4" />
            AI-Powered Career Protection
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">
            Detect Fake Job
            <span className="text-primary block">Postings</span>
          </h1>

          <p className="text-muted-foreground mx-auto max-w-2xl px-2 text-base leading-relaxed sm:px-0 sm:text-xl">
            Protect yourself from employment scams. VeritasHire uses advanced AI to analyze job
            descriptions and identify fraudulent postings, keeping your career journey safe.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-4 sm:px-0">
            <Button
              size="lg"
              onClick={() =>
                document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full sm:w-auto"
            >
              <ArrowDown className="mr-2" size={20} />
              Start Analyzing
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section maxWidth="7xl" variant="muted">
        <StatsSection />
      </Section>

      {/* How It Works */}
      <Section maxWidth="6xl">
        <div className="mb-8 space-y-4 px-4 text-center sm:mb-16">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl">How It Works</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
            Three simple steps to verify any job posting
          </p>
        </div>
        <HowItWorks />
      </Section>

      {/* Job Analyzer */}
      <Section maxWidth="3xl" variant="accent" id="analyzer">
        <div className="mb-8 space-y-4 px-4 text-center sm:mb-12">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            Analyze a Job Posting
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl text-base sm:text-lg">
            Paste the job description below and get instant results
          </p>
        </div>
        <JobInputForm />
      </Section>

      {/* Features */}
      <Section maxWidth="7xl" variant="muted">
        <div className="mb-8 space-y-4 px-4 text-center sm:mb-16">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            Why Use Our Detector?
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
            Advanced protection powered by cutting-edge technology
          </p>
        </div>
        <FeaturesGrid />
      </Section>

      {/* About / Final CTA */}
      <Section maxWidth="5xl" variant="primary">
        <div className="space-y-6 px-4 text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            Stay Safe Online
          </h2>
          <p className="text-primary-foreground/90 mx-auto max-w-2xl text-lg leading-relaxed sm:text-xl">
            Every day, thousands of people fall victim to job scams. Our tool helps you identify
            fraudulent postings before it&apos;s too late.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="mt-8 w-full border-white text-white hover:bg-white/10 sm:w-auto"
            onClick={() =>
              document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Try It Now - It&apos;s Free
          </Button>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid grid-cols-1 gap-8 sm:mb-12 sm:gap-12 md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="VeritasHire Logo"
                  width={28}
                  height={28}
                  className="sm:h-8 sm:w-8"
                />
                <h3 className="font-heading text-xl font-bold sm:text-2xl">VeritasHire</h3>
              </div>
              <p className="text-primary-foreground/70 text-sm leading-relaxed sm:text-base">
                Protecting job seekers from employment fraud through machine learning and AI
                technology.
              </p>
            </div>

            <div>
              <h4 className="font-heading mb-4 text-base font-semibold sm:text-lg">Project</h4>
              <ul className="text-primary-foreground/70 space-y-2 text-sm sm:text-base">
                <li>
                  <a href="#" className="py-1 transition-colors hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="py-1 transition-colors hover:text-white">
                    Methodology
                  </a>
                </li>
                <li>
                  <a href="#" className="py-1 transition-colors hover:text-white">
                    Dataset
                  </a>
                </li>
                <li>
                  <a href="#" className="py-1 transition-colors hover:text-white">
                    Research
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading mb-4 text-base font-semibold sm:text-lg">Connect</h4>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="#"
                  className="bg-primary-foreground/10 hover:bg-primary-foreground/20 flex h-11 w-11 items-center justify-center rounded-full transition-colors sm:h-12 sm:w-12"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:h-6 sm:w-6"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-primary-foreground/20 text-primary-foreground/60 border-t px-2 pt-6 text-center text-xs sm:pt-8 sm:text-sm">
            <p>
              &copy; {new Date().getFullYear()} VeritasHire. College Project - Built with Next.js
              and Machine Learning.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
