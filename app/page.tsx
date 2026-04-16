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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Image 
                src="/logo.svg" 
                alt="VeritasHire Logo" 
                width={32} 
                height={32} 
                className="sm:w-10 sm:h-10"
              />
              <span className="font-heading font-bold text-lg sm:text-xl text-foreground">VeritasHire</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-3">
              <Link href="/recent">
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  Recent Analysis
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" })}
              >
                Try It Now
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-border/50 animate-in slide-in-from-top-2">
              <Link href="/recent" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  variant="outline" 
                  size="default"
                  className="w-full justify-center"
                >
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
      <Section maxWidth="4xl" className="relative min-h-screen flex items-center justify-center pt-16">
        <BlobBackground color="moss" shapeIndex={0} className="-top-20 -left-40 opacity-50 md:opacity-100" />
        <BlobBackground color="terracotta" shapeIndex={1} className="-bottom-20 -right-40 opacity-50 md:opacity-100" />
        
        <div className="text-center space-y-6 sm:space-y-8 relative z-10 px-4">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-primary/10 text-primary font-semibold text-xs sm:text-sm">
            <Shield size={14} className="sm:w-4 sm:h-4" />
            AI-Powered Career Protection
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold leading-tight">
            Detect Fake Job
            <span className="block text-primary">Postings</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-muted-foreground leading-relaxed px-2 sm:px-0">
            Protect yourself from employment scams. VeritasHire uses advanced AI to analyze job descriptions
            and identify fraudulent postings, keeping your career journey safe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
            <Button size="lg" onClick={() => document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" })} className="w-full sm:w-auto">
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
        <div className="text-center space-y-4 mb-8 sm:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to verify any job posting
          </p>
        </div>
        <HowItWorks />
      </Section>

      {/* Job Analyzer */}
      <Section maxWidth="3xl" variant="accent" id="analyzer">
        <div className="text-center space-y-4 mb-8 sm:mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold">
            Analyze a Job Posting
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Paste the job description below and get instant results
          </p>
        </div>
        <JobInputForm />
      </Section>

      {/* Features */}
      <Section maxWidth="7xl" variant="muted">
        <div className="text-center space-y-4 mb-8 sm:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold">
            Why Use Our Detector?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced protection powered by cutting-edge technology
          </p>
        </div>
        <FeaturesGrid />
      </Section>

      {/* About / Final CTA */}
      <Section maxWidth="5xl" variant="primary">
        <div className="text-center space-y-6 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold">
            Stay Safe Online
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Every day, thousands of people fall victim to job scams. Our tool helps
            you identify fraudulent postings before it&apos;s too late.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10 mt-8 w-full sm:w-auto"
            onClick={() => document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" })}
          >
            Try It Now - It&apos;s Free
          </Button>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image 
                  src="/logo.svg" 
                  alt="VeritasHire Logo" 
                  width={28} 
                  height={28} 
                  className="sm:w-8 sm:h-8"
                />
                <h3 className="text-xl sm:text-2xl font-heading font-bold">VeritasHire</h3>
              </div>
              <p className="text-primary-foreground/70 leading-relaxed text-sm sm:text-base">
                Protecting job seekers from employment fraud through
                machine learning and AI technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-base sm:text-lg mb-4">Project</h4>
              <ul className="space-y-2 text-primary-foreground/70 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors py-1">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors py-1">Methodology</a></li>
                <li><a href="#" className="hover:text-white transition-colors py-1">Dataset</a></li>
                <li><a href="#" className="hover:text-white transition-colors py-1">Research</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-base sm:text-lg mb-4">Connect</h4>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="#"
                  className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label="GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-6 sm:pt-8 text-center text-primary-foreground/60 text-xs sm:text-sm px-2">
            <p>
              &copy; {new Date().getFullYear()} VeritasHire. College Project - Built with Next.js and Machine Learning.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
