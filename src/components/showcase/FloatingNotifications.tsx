"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  FileText,
  IndianRupee,
  MessageSquare,
  Bus,
} from "lucide-react";

const NOTIFICATIONS = [
  {
    title: "Attendance updated",
    subtitle: "Class 8A",
    icon: CalendarCheck,
    color: "text-violet-600",
  },
  {
    title: "Parent notification",
    subtitle: "Delivered",
    icon: MessageSquare,
    color: "text-emerald-600",
  },
  {
    title: "Fee payment recorded",
    subtitle: "₹18,500 · UPI",
    icon: IndianRupee,
    color: "text-amber-600",
  },
  {
    title: "Results published",
    subtitle: "Term 2 · Grade 10",
    icon: CheckCircle2,
    color: "text-sky-600",
  },
  {
    title: "New school circular",
    subtitle: "Parent-teacher meeting",
    icon: FileText,
    color: "text-rose-600",
  },
  {
    title: "Homework assigned",
    subtitle: "Mathematics · Class 5",
    icon: Clock,
    color: "text-indigo-600",
  },
  {
    title: "Transport update",
    subtitle: "Route 4 delayed 5 min",
    icon: Bus,
    color: "text-orange-600",
  },
];

interface FloatingCardProps {
  notification: (typeof NOTIFICATIONS)[number];
  x: number;
  y: number;
  delay: number;
  duration: number;
}

function FloatingCard({
  notification,
  x,
  y,
  delay,
  duration,
}: FloatingCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), delay);
    const hide = setTimeout(() => setVisible(false), delay + duration);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [delay, duration]);

  if (!visible) return null;

  const { title, subtitle, icon: Icon, color } = notification;
  return (
    <div
      className="absolute pointer-events-none z-30 flex items-center gap-2 rounded-lg border border-violet-100/90 bg-white/95 px-3 py-2 shadow-[0_14px_35px_-12px_rgba(36,20,96,0.18)] backdrop-blur-md animate-[fadeInUp_0.4s_ease-out]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}ms`,
      }}
    >
      <div className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${color} bg-${color.replace("text-", "")}-50`}>
        <Icon className="h-2.5 w-2.5" />
      </div>
      <div className="min-w-0">
        <p className="text-[8px] font-bold text-navy-900 leading-tight">
          {title}
        </p>
        <p className="text-[7px] text-ink/60 leading-tight">{subtitle}</p>
      </div>
    </div>
  );
}

export function FloatingNotifications() {
  const [cards, setCards] = useState<
    { id: number; x: number; y: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let nextId = 0;

    const spawn = () => {
      nextId++;

      const side = Math.random() > 0.5 ? "left" : "right";
      const x = side === "left" ? 2 + Math.random() * 10 : 78 + Math.random() * 18;
      const y = 20 + Math.random() * 60;
      const delay = Math.random() * 3000;
      const duration = 4000 + Math.random() * 3000;

      setCards((prev) => [...prev, { id: nextId, x, y, delay, duration }]);

      timer = setTimeout(spawn, 3500 + Math.random() * 4000);
    };

    timer = setTimeout(spawn, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {cards.map((card) => (
        <FloatingCard
          key={card.id}
          notification={NOTIFICATIONS[card.id % NOTIFICATIONS.length]}
          x={card.x}
          y={card.y}
          delay={card.delay}
          duration={card.duration}
        />
      ))}
    </div>
  );
}
