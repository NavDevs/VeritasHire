"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SkillSuggestions } from "./SkillSuggestions";
import {
  AlertCircle,
  Loader2,
  Shield,
  ShieldAlert,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import type { PredictionResult, HistoryEntry } from "@/types/prediction";

const SAMPLE_JOBS = {
  fake: `Work From Home – Earn ₹5 Lakh Per Month!

Earn ₹5 lakh per month from home with NO EXPERIENCE required!

We are URGENTLY hiring candidates for our global expansion project.
No skills needed. Complete training will be provided.

Amazing Benefits:
- ₹50,000 instant joining bonus
- Weekly payments directly to your bank
- Work only 2 hours per day
- Be your own boss!

Requirements:
- Must have active bank account
- Must share personal details immediately
- Pay ₹2,999 registration fee

⚠️ HURRY! Only 5 positions left!
Contact HR on WhatsApp immediately!

Apply NOW before it's too late!`,
  real: `Software Engineer - Backend (Python)

Company: Infosys
Location: Bangalore (Hybrid)

We are looking for a Backend Software Engineer with experience in Python and REST APIs.

Responsibilities:
- Develop scalable backend systems
- Work with databases like MySQL and MongoDB
- Build REST APIs using Flask or Django
- Collaborate with frontend teams
- Write clean, maintainable code with proper documentation

Requirements:
- 2+ years experience in Python
- Knowledge of APIs and databases
- Strong problem-solving skills
- Bachelor's degree in Computer Science or related field
- Experience with version control (Git)

Benefits:
- Competitive salary
- Health insurance
- Professional development opportunities
- Flexible working hours

Application Process:
Please submit your resume through our careers portal.
Shortlisted candidates will be contacted for a technical interview.`,
};

export function JobInputForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [suspiciousPhrases, setSuspiciousPhrases] = useState<string[]>([]);

  // Load history from localStorage (for saving new entries, not displaying)
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("job-analysis-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history:", e);
      }
    }
  }, []);

  // Live suspicious phrase detection
  useEffect(() => {
    const text = jobDescription.toLowerCase();
    const phrases: string[] = [];

    if (text.includes("no experience")) phrases.push("No experience required");
    if (text.includes("urgent") || text.includes("immediately")) phrases.push("Urgent hiring");
    if (text.includes("guaranteed")) phrases.push("Guaranteed income");
    if (text.includes("click here")) phrases.push("Aggressive CTA");
    if (text.includes("$") && (text.includes("week") || text.includes("daily")))
      phrases.push("Unrealistic salary");

    setSuspiciousPhrases(phrases);
  }, [jobDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    console.log("Starting fresh analysis, cleared previous result");

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze job posting");
      }

      const data: PredictionResult = await response.json();
      console.log("Raw API Response:", data);
      console.log("isFake:", data.isFake);
      console.log("risk_level:", data.risk_level);
      console.log("riskFactors:", data.riskFactors);
      setResult(data);
      console.log("Result set in state");

      // Save to history
      const newEntry: HistoryEntry = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        jobDescription,
        preview: jobDescription.slice(0, 100) + "...",
        result: data,
      };

      const updatedHistory = [newEntry, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("job-analysis-history", JSON.stringify(updatedHistory));
    } catch (err) {
      setError("Something went wrong 🌿 Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSampleJob = (type: "fake" | "real") => {
    setJobDescription(SAMPLE_JOBS[type]);
    setResult(null);
    setError(null);
  };

  const charCount = jobDescription.length;
  const minChars = 50;

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "HIGH":
        return "text-destructive";
      case "MEDIUM":
        return "text-secondary";
      case "LOW":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  const getRiskLevelBg = (level: string) => {
    switch (level) {
      case "HIGH":
        return "bg-destructive/10 text-destructive";
      case "MEDIUM":
        return "bg-secondary/10 text-secondary";
      case "LOW":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Input Card */}
      <Card asymmetric shapeIndex={0} className="p-6 sm:p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="job-description"
              className="font-heading text-foreground mb-2 block text-base font-bold sm:mb-3 sm:text-lg"
            >
              Paste Job Description
            </label>
            <p className="text-muted-foreground mb-3 text-xs sm:mb-4 sm:text-sm">
              Copy and paste the job posting text below to analyze if it&apos;s legitimate or
              potentially fake.
            </p>
            <textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Example: We are looking for a motivated individual to join our team as a Remote Data Entry Specialist..."
              className="border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/30 min-h-[200px] w-full resize-y rounded-[2rem] border bg-white/50 p-4 text-base leading-relaxed transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:min-h-[250px] sm:p-6"
              aria-describedby="char-count"
            />

            {/* Character Count & Live Warnings */}
            <div className="mt-3 space-y-2">
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>
                  {charCount < minChars ? (
                    <span className="text-destructive">
                      Minimum {minChars} characters required ({charCount}/{minChars})
                    </span>
                  ) : (
                    <span className="text-primary flex items-center gap-1">
                      <CheckCircle size={14} /> Sufficient text for analysis
                    </span>
                  )}
                </span>
                <span>{charCount} characters</span>
              </div>

              {/* Live Suspicious Phrase Warnings */}
              {suspiciousPhrases.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  <span className="text-secondary flex items-center gap-1 text-xs font-semibold">
                    <AlertTriangle size={12} /> Warnings detected:
                  </span>
                  {suspiciousPhrases.map((phrase, i) => (
                    <Badge key={i} variant="destructive">
                      {phrase}
                    </Badge>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Sample Job Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadSampleJob("fake")}
              className="flex-1 text-xs sm:flex-none"
            >
              <ShieldAlert size={14} className="mr-2" />
              Try Fake Job
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadSampleJob("real")}
              className="flex-1 text-xs sm:flex-none"
            >
              <Shield size={14} className="mr-2" />
              Try Real Job
            </Button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-destructive/10 text-destructive flex items-center gap-3 rounded-2xl p-4"
              role="alert"
            >
              <AlertCircle size={20} />
              <span className="text-sm font-medium">{error}</span>
            </motion.div>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={loading || charCount < minChars}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={20} />
                Analyzing...
              </>
            ) : (
              <>
                <TrendingUp className="mr-2 hidden sm:inline" size={20} />
                <span className="text-sm sm:text-base">Analyze Job Posting</span>
              </>
            )}
          </Button>
        </form>
      </Card>

      {result && (
        <>
          {console.log("Rendering result:", result)}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Main Result Card */}
            <Card
              asymmetric
              shapeIndex={2}
              className={`p-6 sm:p-8 md:p-10 ${
                result.isFake ? "border-destructive/30" : "border-primary/30"
              }`}
            >
              <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                  {result.isFake ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="bg-destructive/10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full sm:h-20 sm:w-20"
                    >
                      <ShieldAlert size={32} className="text-destructive sm:h-10 sm:w-10" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="bg-primary/10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full sm:h-20 sm:w-20"
                    >
                      <Shield size={32} className="text-primary sm:h-10 sm:w-10" />
                    </motion.div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading mb-1 text-2xl font-bold sm:text-3xl">
                      {result.isFake ? "Potentially Fake" : "Likely Legitimate"}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <Badge
                        variant={result.isFake ? "destructive" : "success"}
                        className="text-sm sm:text-base"
                      >
                        Confidence: {(result.confidence * 100).toFixed(1)}%
                      </Badge>
                      <Badge className={getRiskLevelBg(result.risk_level)}>
                        <AlertTriangle size={12} className="mr-1" />
                        {result.risk_level} Risk
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Confidence Bars */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  {/* Real Probability */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-semibold sm:text-base">
                        <Shield size={16} className="text-primary" />
                        Legitimate
                      </span>
                      <span className="font-heading text-primary text-xl font-bold sm:text-2xl">
                        {(result.confidence_real * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="bg-muted h-4 overflow-hidden rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence_real * 100}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="from-primary to-primary/80 h-full rounded-full bg-gradient-to-r"
                      />
                    </div>
                  </div>

                  {/* Fake Probability */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm font-semibold sm:text-base">
                        <ShieldAlert size={16} className="text-destructive" />
                        Fake
                      </span>
                      <span className="font-heading text-destructive text-xl font-bold sm:text-2xl">
                        {(result.confidence_fake * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="bg-muted h-4 overflow-hidden rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence_fake * 100}%` }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        className="from-destructive to-destructive/80 h-full rounded-full bg-gradient-to-r"
                      />
                    </div>
                  </div>
                </div>

                {/* Risk Factors */}
                {result.riskFactors && result.riskFactors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-destructive/5 border-destructive/20 space-y-3 rounded-2xl border p-4 sm:p-6"
                  >
                    <h4 className="font-heading flex items-center gap-2 text-base font-semibold sm:text-lg">
                      <AlertTriangle size={18} className="text-destructive sm:h-5 sm:w-5" />
                      Red Flags Detected ({result.riskFactors.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.riskFactors.map((factor, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.05 }}
                        >
                          <Badge variant="destructive">{factor}</Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* No Risk Factors */}
                {!result.riskFactors || result.riskFactors.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Badge variant="success" className="px-6 py-3 text-base">
                      <CheckCircle size={16} className="mr-2" />
                      No significant red flags detected
                    </Badge>
                  </motion.div>
                ) : null}
              </div>
            </Card>

            {/* Skill Suggestions (Only for Real Jobs) */}
            {!result.isFake && result.skills && result.skills.length > 0 && (
              <SkillSuggestions skills={result.skills} />
            )}
          </motion.div>
        </>
      )}
    </div>
  );
}
