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
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="group text-center"
        >
          <Card className="flex h-full flex-col items-center justify-center p-4 sm:p-6">
            <div className="bg-primary/10 group-hover:bg-primary mb-3 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 sm:mb-4 sm:h-14 sm:w-14">
              <stat.icon
                size={24}
                className="text-primary transition-colors duration-300 group-hover:text-white sm:h-7 sm:w-7"
              />
            </div>
            <div className="font-heading text-foreground mb-1 text-2xl font-bold transition-transform duration-300 group-hover:scale-110 sm:mb-2 sm:text-3xl md:text-4xl">
              {stat.value}
            </div>
            <div className="text-muted-foreground text-xs font-medium sm:text-sm">{stat.label}</div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
