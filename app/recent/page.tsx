"use client";

import { useState, useEffect } from "react";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { BlobBackground } from "@/components/layout/BlobBackground";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Clock, Shield, ShieldAlert, ArrowRight, Trash2, BarChart3, TrendingUp } from "lucide-react";
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
    const updatedHistory = history.filter(entry => entry.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("job-analysis-history", JSON.stringify(updatedHistory));
  };

  const getSortedHistory = () => {
    const sorted = [...history];
    if (sortBy === "recent") {
      return sorted.sort((a, b) => b.timestamp - a.timestamp);
    } else {
      return sorted.sort((a, b) => {
        const riskOrder = { "HIGH": 0, "MEDIUM": 1, "LOW": 2 };
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
    const fake = history.filter(entry => entry.result.isFake).length;
    const real = total - fake;
    const highRisk = history.filter(entry => entry.result.risk_level === "HIGH").length;
    
    return { total, fake, real, highRisk };
  };

  const stats = getStats();

  return (
    <>
      <GrainOverlay />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <img 
                  src="/logo.svg" 
                  alt="VeritasHire Logo" 
                  width={32} 
                  height={32} 
                  className="sm:w-10 sm:h-10"
                />
                <span className="font-heading font-bold text-lg sm:text-xl text-foreground">VeritasHire</span>
              </Link>
            </div>
            <div className="flex gap-2 sm:gap-3">
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
      <Section maxWidth="4xl" className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center pt-16">
        <BlobBackground color="moss" shapeIndex={0} className="-top-20 -left-40 opacity-50 md:opacity-100" />
        <BlobBackground color="terracotta" shapeIndex={1} className="-bottom-20 -right-40 opacity-50 md:opacity-100" />
        
        <div className="text-center space-y-6 sm:space-y-8 relative z-10 px-4">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-primary/10 text-primary font-semibold text-xs sm:text-sm">
            <Clock size={14} className="sm:w-4 sm:h-4" />
            Analysis History
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-extrabold leading-tight">
            Recent
            <span className="block text-primary">Analysis</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-muted-foreground leading-relaxed">
            View and manage your job posting analysis history
          </p>
        </div>
      </Section>

      {/* Stats Section */}
      {history.length > 0 && (
        <Section maxWidth="7xl" variant="muted">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            <Card className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-1 sm:mb-2">
                {stats.total}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                Total Analyses
              </div>
            </Card>
            <Card className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-heading font-bold text-destructive mb-1 sm:mb-2">
                {stats.fake}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                Fake Jobs
              </div>
            </Card>
            <Card className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-1 sm:mb-2">
                {stats.real}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                Real Jobs
              </div>
            </Card>
            <Card className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-heading font-bold text-secondary mb-1 sm:mb-2">
                {stats.highRisk}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                High Risk
              </div>
            </Card>
          </div>
        </Section>
      )}

      {/* History Section */}
      <Section maxWidth="5xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-1 sm:mb-2">
                Analysis History
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {history.length === 0 ? "No analyses yet" : `${history.length} job posting${history.length === 1 ? "" : "s"} analyzed`}
              </p>
            </div>
            
            {history.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <div className="flex bg-muted rounded-full p-1 flex-1 sm:flex-none">
                    <Button
                      variant={sortBy === "recent" ? "primary" : "ghost"}
                      size="sm"
                      onClick={() => setSortBy("recent")}
                      className="rounded-full text-xs sm:text-sm flex-1"
                    >
                      <Clock size={14} className="mr-1" />
                      Recent
                    </Button>
                    <Button
                      variant={sortBy === "risk" ? "primary" : "ghost"}
                      size="sm"
                      onClick={() => setSortBy("risk")}
                      className="rounded-full text-xs sm:text-sm flex-1"
                    >
                    <BarChart3 size={14} className="mr-1" />
                    Risk Level
                  </Button>
                </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearHistory}
                    className="text-destructive border-destructive hover:bg-destructive/10 text-xs sm:text-sm w-full sm:w-auto"
                  >
                  <Trash2 size={14} className="mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>

          {/* History List */}
          {history.length === 0 ? (
            <Card className="p-8 sm:p-12 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
                  <Clock size={32} className="sm:w-10 sm:h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-semibold">No Analysis History</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
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
                  <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          {entry.result.isFake ? (
                            <ShieldAlert size={18} className="sm:w-5 sm:h-5 text-destructive flex-shrink-0" />
                          ) : (
                            <Shield size={18} className="sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                          )}
                          <span className="font-semibold text-sm sm:text-lg">
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
                              entry.result.risk_level === "HIGH" ? "destructive" :
                              entry.result.risk_level === "MEDIUM" ? "warning" : "success"
                            }
                            className="text-xs"
                          >
                            {entry.result.risk_level} Risk
                          </Badge>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {formatDate(entry.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 mb-2 sm:mb-3">
                          {entry.preview}
                        </p>
                        
                        {entry.result.skills && entry.result.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
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
