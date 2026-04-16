"use client";

import { useState, useEffect } from "react";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { BlobBackground } from "@/components/layout/BlobBackground";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Clock,
  Shield,
  ShieldAlert,
  ArrowRight,
  Trash2,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import type { HistoryEntry } from "@/types/prediction";
import Link from "next/link";

export default function RecentAnalysis() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [sortBy, setSortBy] = useState<"recent" | "risk">("recent");

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

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("job-analysis-history");
  };

  const deleteEntry = (id: string) => {
    const updatedHistory = history.filter((entry) => entry.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("job-analysis-history", JSON.stringify(updatedHistory));
  };

  const getSortedHistory = () => {
    const sorted = [...history];
    if (sortBy === "recent") {
      return sorted.sort((a, b) => b.timestamp - a.timestamp);
    } else {
      return sorted.sort((a, b) => {
        const riskOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
        return riskOrder[a.result.risk_level] - riskOrder[b.result.risk_level];
      });
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getStats = () => {
    const total = history.length;
    const fake = history.filter((entry) => entry.result.isFake).length;
    const real = total - fake;
    const highRisk = history.filter((entry) => entry.result.risk_level === "HIGH").length;

    return { total, fake, real, highRisk };
  };

  const stats = getStats();

  return (
    <>
      <GrainOverlay />

      {/* Navbar */}
      <nav className="bg-background/80 border-border/50 fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <img
                  src="/logo.svg"
                  alt="VeritasHire Logo"
                  width={36}
                  height={36}
                  className="h-9 w-9 sm:h-10 sm:w-10"
                />
                <span className="font-heading text-foreground text-xl font-bold sm:text-2xl">
                  VeritasHire
                </span>
              </Link>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section
        maxWidth="4xl"
        className="relative flex min-h-[50vh] items-center justify-center pt-16 sm:min-h-[60vh]"
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
            <Clock size={14} className="sm:h-4 sm:w-4" />
            Analysis History
          </div>

          <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">
            Recent
            <span className="text-primary block">Analysis</span>
          </h1>

          <p className="text-muted-foreground mx-auto max-w-2xl text-base leading-relaxed sm:text-xl">
            View and manage your job posting analysis history
          </p>
        </div>
      </Section>

      {/* Stats Section */}
      {history.length > 0 && (
        <Section maxWidth="7xl" variant="muted">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
            <Card className="p-4 text-center sm:p-6">
              <div className="font-heading text-foreground mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
                {stats.total}
              </div>
              <div className="text-muted-foreground text-xs font-medium sm:text-sm">
                Total Analyses
              </div>
            </Card>
            <Card className="p-4 text-center sm:p-6">
              <div className="font-heading text-destructive mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
                {stats.fake}
              </div>
              <div className="text-muted-foreground text-xs font-medium sm:text-sm">Fake Jobs</div>
            </Card>
            <Card className="p-4 text-center sm:p-6">
              <div className="font-heading text-primary mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
                {stats.real}
              </div>
              <div className="text-muted-foreground text-xs font-medium sm:text-sm">Real Jobs</div>
            </Card>
            <Card className="p-4 text-center sm:p-6">
              <div className="font-heading text-secondary mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
                {stats.highRisk}
              </div>
              <div className="text-muted-foreground text-xs font-medium sm:text-sm">High Risk</div>
            </Card>
          </div>
        </Section>
      )}

      {/* History Section */}
      <Section maxWidth="5xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div>
              <h2 className="font-heading mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl md:text-4xl">
                Analysis History
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                {history.length === 0
                  ? "No analyses yet"
                  : `${history.length} job posting${history.length === 1 ? "" : "s"} analyzed`}
              </p>
            </div>

            {history.length > 0 && (
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
                <div className="bg-muted flex flex-1 rounded-full p-1 sm:flex-none">
                  <Button
                    variant={sortBy === "recent" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("recent")}
                    className="flex-1 rounded-full text-xs sm:text-sm"
                  >
                    <Clock size={14} className="mr-1" />
                    Recent
                  </Button>
                  <Button
                    variant={sortBy === "risk" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy("risk")}
                    className="flex-1 rounded-full text-xs sm:text-sm"
                  >
                    <BarChart3 size={14} className="mr-1" />
                    Risk Level
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearHistory}
                  className="text-destructive border-destructive hover:bg-destructive/10 w-full text-xs sm:w-auto sm:text-sm"
                >
                  <Trash2 size={14} className="mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>

          {/* History List */}
          {history.length === 0 ? (
            <Card className="p-8 text-center sm:p-12">
              <div className="mx-auto max-w-md space-y-4">
                <div className="bg-muted/50 mx-auto flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20">
                  <Clock size={32} className="text-muted-foreground sm:h-10 sm:w-10" />
                </div>
                <h3 className="font-heading text-lg font-semibold sm:text-xl">
                  No Analysis History
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Start analyzing job postings to see your history here
                </p>
                <Link href="/">
                  <Button size="lg" className="mt-4">
                    <TrendingUp className="mr-2" size={20} />
                    Start Analyzing
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid gap-4">
              {getSortedHistory().map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4 transition-all duration-300 hover:shadow-lg sm:p-6">
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2 sm:mb-3 sm:gap-3">
                          {entry.result.isFake ? (
                            <ShieldAlert
                              size={18}
                              className="text-destructive flex-shrink-0 sm:h-5 sm:w-5"
                            />
                          ) : (
                            <Shield
                              size={18}
                              className="text-primary flex-shrink-0 sm:h-5 sm:w-5"
                            />
                          )}
                          <span className="text-sm font-semibold sm:text-lg">
                            {entry.result.isFake ? "Fake Job" : "Legitimate Job"}
                          </span>
                          <Badge
                            variant={entry.result.isFake ? "destructive" : "success"}
                            className="text-xs"
                          >
                            {(entry.result.confidence * 100).toFixed(0)}% Confidence
                          </Badge>
                          <Badge
                            variant={
                              entry.result.risk_level === "HIGH"
                                ? "destructive"
                                : entry.result.risk_level === "MEDIUM"
                                  ? "warning"
                                  : "success"
                            }
                            className="text-xs"
                          >
                            {entry.result.risk_level} Risk
                          </Badge>
                          <span className="text-muted-foreground ml-auto text-xs">
                            {formatDate(entry.timestamp)}
                          </span>
                        </div>

                        <p className="text-muted-foreground mb-2 line-clamp-2 text-xs sm:mb-3 sm:line-clamp-3 sm:text-sm">
                          {entry.preview}
                        </p>

                        {entry.result.skills && entry.result.skills.length > 0 && (
                          <div className="mb-3 flex flex-wrap gap-2">
                            {entry.result.skills.slice(0, 5).map((skill, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {entry.result.skills.length > 5 && (
                              <Badge variant="outline" className="text-xs">
                                +{entry.result.skills.length - 5} more
                              </Badge>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          <Link href={`/analysis/${entry.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                              <ArrowRight size={14} className="ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteEntry(entry.id)}
                        className="text-muted-foreground hover:text-destructive flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
