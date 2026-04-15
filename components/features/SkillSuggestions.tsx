"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ChevronDown, BookOpen, Video, Code, GraduationCap, ExternalLink } from "lucide-react";

interface SkillSuggestionsProps {
  skills: string[];
}

// Comprehensive skill learning data
const SKILL_LEARNING_DATA: Record<string, {
  description: string;
  roadmap: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
  resources: {
    name: string;
    type: "course" | "documentation" | "video" | "practice";
    url: string;
  }[];
}> = {
  Python: {
    description: "A versatile programming language essential for data science, web development, and automation.",
    roadmap: {
      beginner: ["Variables & Data Types", "Loops & Conditionals", "Functions", "Basic Data Structures"],
      intermediate: ["OOP Concepts", "File Handling", "Error Handling", "Modules & Packages"],
      advanced: ["Decorators", "Generators", "Context Managers", "Metaclasses"]
    },
    resources: [
      { name: "Python Official Docs", type: "documentation", url: "https://docs.python.org/3/" },
      { name: "FreeCodeCamp Python Course", type: "video", url: "https://www.freecodecamp.org/news/learn-python-basics-in-4-hours/" },
      { name: "LeetCode Python Practice", type: "practice", url: "https://leetcode.com/" }
    ]
  },
  JavaScript: {
    description: "The language of the web, crucial for frontend and backend development.",
    roadmap: {
      beginner: ["Variables & Types", "Functions", "DOM Manipulation", "Events"],
      intermediate: ["ES6+ Features", "Promises & Async/Await", "Closures", "Prototypes"],
      advanced: ["Design Patterns", "Memory Management", "Performance Optimization", "TypeScript"]
    },
    resources: [
      { name: "MDN Web Docs", type: "documentation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "JavaScript.info", type: "course", url: "https://javascript.info/" },
      { name: "Traversy Media JS Tutorials", type: "video", url: "https://www.youtube.com/c/TraversyMedia" }
    ]
  },
  React: {
    description: "A powerful UI library for building interactive web applications.",
    roadmap: {
      beginner: ["Components", "Props & State", "JSX", "Event Handling"],
      intermediate: ["Hooks", "Context API", "React Router", "Forms"],
      advanced: ["Performance Optimization", "Custom Hooks", "Server Components", "State Management"]
    },
    resources: [
      { name: "React Official Docs", type: "documentation", url: "https://react.dev/" },
      { name: "Full Stack Open", type: "course", url: "https://fullstackopen.com/en/" },
      { name: "Codecademy React", type: "practice", url: "https://www.codecademy.com/learn/react-101" }
    ]
  },
  SQL: {
    description: "Essential for database management and data analysis.",
    roadmap: {
      beginner: ["SELECT Statements", "WHERE Clauses", "JOINs", "Aggregations"],
      intermediate: ["Subqueries", "Views", "Stored Procedures", "Indexes"],
      advanced: ["Query Optimization", "Window Functions", "Database Design", "Transactions"]
    },
    resources: [
      { name: "SQLZoo Practice", type: "practice", url: "https://sqlzoo.net/" },
      { name: "Mode Analytics SQL Tutorial", type: "course", url: "https://mode.com/sql-tutorial/" },
      { name: "PostgreSQL Docs", type: "documentation", url: "https://www.postgresql.org/docs/" }
    ]
  },
  "Machine Learning": {
    description: "Building intelligent systems that learn from data.",
    roadmap: {
      beginner: ["Linear Regression", "Classification", "Train/Test Split", "Evaluation Metrics"],
      intermediate: ["Random Forests", "SVM", "Feature Engineering", "Cross-Validation"],
      advanced: ["Deep Learning", "Neural Networks", "Model Deployment", "MLOps"]
    },
    resources: [
      { name: "Andrew Ng's ML Course", type: "course", url: "https://www.coursera.org/learn/machine-learning" },
      { name: "Scikit-learn Docs", type: "documentation", url: "https://scikit-learn.org/" },
      { name: "Kaggle Learn", type: "practice", url: "https://www.kaggle.com/learn" }
    ]
  },
  Git: {
    description: "Version control system essential for collaborative development.",
    roadmap: {
      beginner: ["git init", "git add", "git commit", "git push"],
      intermediate: ["Branching", "Merging", "Rebasing", "Pull Requests"],
      advanced: ["Git Hooks", "Cherry-picking", "Bisect", "Custom Workflows"]
    },
    resources: [
      { name: "Pro Git Book", type: "documentation", url: "https://git-scm.com/book/en/v2" },
      { name: "GitHub Learning Lab", type: "practice", url: "https://lab.github.com/" },
      { name: "Learn Git Branching", type: "practice", url: "https://learngitbranching.js.org/" }
    ]
  }
};

// Generic template for skills not in database
const getGenericSkillData = (skillName: string) => ({
  description: `Essential skill for modern professionals: ${skillName}`,
  roadmap: {
    beginner: ["Fundamentals & Basics", "Core Concepts", "Simple Projects", "Best Practices"],
    intermediate: ["Advanced Techniques", "Real-world Applications", "Optimization", "Integration"],
    advanced: ["Expert-Level Mastery", "Architecture Design", "Performance Tuning", "Teaching Others"]
  },
  resources: [
    { name: "Official Documentation", type: "documentation", url: "#" },
    { name: "YouTube Tutorials", type: "video", url: "https://www.youtube.com/results?search_query=" + encodeURIComponent(skillName) },
    { name: "Practice Platforms", type: "practice", url: "#" }
  ]
});

export function SkillSuggestions({ skills }: SkillSuggestionsProps) {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  if (skills.length === 0) return null;

  const toggleSkill = (skill: string) => {
    setExpandedSkill(expandedSkill === skill ? null : skill);
  };

  const getSkillData = (skill: string) => {
    return SKILL_LEARNING_DATA[skill] || getGenericSkillData(skill);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "course": return <GraduationCap size={16} />;
      case "video": return <Video size={16} />;
      case "documentation": return <BookOpen size={16} />;
      case "practice": return <Code size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card asymmetric shapeIndex={3} className="p-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-heading font-bold mb-2">
              🌱 Grow Your Skills for This Job
            </h3>
            <p className="text-muted-foreground">
              We found {skills.length} required skill{skills.length > 1 ? "s" : ""}. Click to explore learning paths.
            </p>
          </div>

          {/* Skills Badges */}
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.button
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleSkill(skill)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 ${
                  expandedSkill === skill
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {skill}
              </motion.button>
            ))}
          </div>

          {/* Expanded Skill Details */}
          <AnimatePresence>
            {expandedSkill && (
              <motion.div
                key={expandedSkill}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-border/50 space-y-6">
                  {(() => {
                    const skillData = getSkillData(expandedSkill);
                    return (
                      <>
                        <div>
                          <h4 className="text-xl font-heading font-semibold mb-3">
                            {expandedSkill}
                          </h4>
                          <p className="text-muted-foreground mb-4">
                            {skillData.description}
                          </p>
                        </div>

                        {/* Learning Roadmap */}
                        <div className="space-y-4">
                          <h5 className="font-heading font-semibold">Learning Roadmap</h5>
                          
                          {/* Beginner */}
                          <div className="bg-muted/30 rounded-2xl p-4">
                            <Badge variant="success" className="mb-3">Beginner</Badge>
                            <div className="grid grid-cols-2 gap-2">
                              {skillData.roadmap.beginner.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Intermediate */}
                          <div className="bg-muted/30 rounded-2xl p-4">
                            <Badge variant="warning" className="mb-3">Intermediate</Badge>
                            <div className="grid grid-cols-2 gap-2">
                              {skillData.roadmap.intermediate.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  <div className="w-2 h-2 rounded-full bg-secondary" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Advanced */}
                          <div className="bg-muted/30 rounded-2xl p-4">
                            <Badge variant="destructive" className="mb-3">Advanced</Badge>
                            <div className="grid grid-cols-2 gap-2">
                              {skillData.roadmap.advanced.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  <div className="w-2 h-2 rounded-full bg-destructive" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Learning Resources */}
                        <div className="space-y-3">
                          <h5 className="font-heading font-semibold">Recommended Resources</h5>
                          <div className="grid gap-3">
                            {skillData.resources.map((resource, i) => (
                              <a
                                key={i}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all duration-300 group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    {getResourceIcon(resource.type)}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-sm">{resource.name}</div>
                                    <div className="text-xs text-muted-foreground capitalize">{resource.type}</div>
                                  </div>
                                </div>
                                <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}
