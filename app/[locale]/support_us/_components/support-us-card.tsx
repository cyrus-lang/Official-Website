"use client";

import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SupportUsCardType } from "@/content/support-us/type";

export const SupportUsCard = ({
  index,
  ...item
}: SupportUsCardType & { index: number }) => {
  return (
    <motion.div
      key={"support-us-card-" + index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
      className="h-full" // Ensure the motion container fills the grid height
    >
      <Card className="shadow-lg border rounded-2xl transition-all duration-200 h-full flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {item.icon}
            {item.title}
          </CardTitle>
          <CardDescription>{item.desc}</CardDescription>
        </CardHeader>
        {/* flex-1 makes the content area expand to fill the card */}
        <CardContent className="flex-1 flex flex-col">
          {item.content}
        </CardContent>
      </Card>
    </motion.div>
  );
};