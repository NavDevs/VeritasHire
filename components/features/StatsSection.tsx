"use client";

import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Database, Shield, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    icon: Database,
    value: "80K+",
    label: "Job Postings Analyzed",
  },
  {
    icon: Shield,
    value: "95%",
    label: "Detection Accuracy",
  },
  {
    icon: TrendingUp,
    value: "23%",
    label: "Fake Jobs in Dataset",
  },
  {
    icon: Users,
    value: "10K+",
    label: "Users Protected",
  },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="group text-center"
        >
          <Card className="p-6 h-full flex flex-col items-center justify-center">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary">
              <stat.icon
                size={28}
                className="text-primary transition-colors duration-300 group-hover:text-white"
              />
            </div>
            <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2 transition-transform duration-300 group-hover:scale-110">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              {stat.label}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
