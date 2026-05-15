"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  Gauge,
  Home,
  Layers,
  Lightbulb,
  LineChart as LineIcon,
  Menu,
  Network,
  Timer,
  X,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { benchmarkData, importedUsageData, rateData, sourceNotes } from "./data/energy";

const OEB_URL = "https://www.oeb.ca/consultations-and-projects/policy-initiatives-and-consultations/defining-ontarios-typical";
const TORONTO_HYDRO_RATES_URL = "https://www.torontohydro.com/for-home/rates";
const IESO_PEAK_URL = "https://www.ieso.ca/Sector-Participants/Settlements/Peak-Tracker";
const IESO_DEMAND_URL = "https://www.ieso.ca/power-data/demand-overview/real-time-demand-reports";
const NOCTIS_URL = "https://noctis-lake.vercel.app/";
const LUMEN_SHIFT_URL = "https://lumen-shift.vercel.app/";
const SMARTENERGY_URL = "https://smart-energy-dashboard-nine.vercel.app/";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const navItems = [
  ["Home", "home"],
  ["Data", "data"],
  ["Field", "field"],
  ["Research", "research"],
  ["Solutions", "solutions"],
  ["Links", "constellation"],
  ["Report", "report"],
];

const demandCurve = [
  { hour: "12 AM", demand: 52 },
  { hour: "3 AM", demand: 44 },
  { hour: "6 AM", demand: 56 },
  { hour: "9 AM", demand: 73 },
  { hour: "12 PM", demand: 68 },
  { hour: "3 PM", demand: 76 },
  { hour: "6 PM", demand: 94 },
  { hour: "9 PM", demand: 70 },
  { hour: "12 AM", demand: 54 },
];

const observationRows = [
  ["Daytime", "Room lights", "Natural light available", "Avoidable lighting", "Turn off lights"],
  ["Evening peak", "Laundry / dishwasher", "Used during high-price time", "Shiftable load", "Move to off-peak"],
  ["Night", "Chargers / standby", "Left plugged in", "Standby load", "Smart plug / timer"],
];

const photos = [
  {
    title: "Empty Light, Active Grid",
    tag: "Urban Lighting / Nighttime / Over-illumination",
    image: "/case-study-1.jpg",
    note: "Lighting intensity appears higher than visible occupancy, suggesting a mismatch between illumination and actual use.",
  },
  {
    title: "Closed Storefront, Open Circuit",
    tag: "Commercial Lighting / After-hours",
    image: "/case-study-2.jpg",
    note: "Commercial lighting remains bright after visible activity decreases, pointing to scheduling and control-system inefficiency.",
  },
  {
    title: "Street Corridor Glow",
    tag: "Street Lighting / Adaptive Control",
    image: "/case-study-3.jpg",
    note: "A fixed lighting pattern may support safety, but adaptive brightness could reduce unnecessary demand during low-use periods.",
  },
  {
    title: "Residential Standby Pattern",
    tag: "Household / Standby Load",
    image: "/case-study-4.jpg",
    note: "Small devices left connected create repeated standby loads that accumulate over time.",
  },
];

const fieldSignals = [
  ["Peak risk", "6-9 PM"],
  ["Control layer", "Timer / sensor"],
  ["Waste type", "Standby load"],
  ["Action", "Shift + shutoff"],
];

const solutionMatrix = [
  { name: "Turn off lights", cost: 1, impact: 2, difficulty: 1 },
  { name: "Shift appliances", cost: 1, impact: 3, difficulty: 2 },
  { name: "Smart plugs", cost: 2, impact: 3, difficulty: 1 },
  { name: "Motion sensors", cost: 2, impact: 4, difficulty: 2 },
  { name: "Smart thermostat", cost: 3, impact: 5, difficulty: 2 },
  { name: "Adaptive lighting", cost: 5, impact: 5, difficulty: 5 },
];

const findings = [
  ["Household Habits Matter", "Repeated behaviors such as unnecessary lighting and standby loads create avoidable consumption."],
  ["Timing Is Critical", "Electricity pricing strongly suggests that when electricity is used can matter as much as how much is used."],
  ["Peak Demand Is a System Problem", "Even moderate residential demand can become costly when concentrated in peak hours."],
  ["Urban Systems Are Often Static", "Many lighting systems appear designed around fixed schedules rather than adaptive use."],
  ["Low-Cost Controls Offer High Value", "Timers, sensors, and scheduling can create meaningful gains without major infrastructure spending."],
  ["Optimization Matters", "The opportunity is not only producing more energy, but operating existing systems more intelligently."],
];

const reportIncludes = [
  "Abstract",
  "Introduction",
  "Project motivation",
  "Research questions",
  "Methodology",
  "Household case study",
  "Ontario pricing analysis",
  "Grid context",
  "Urban lighting observations",
  "Key findings",
  "Control ideas",
  "Discussion",
  "Limitations",
  "Future work",
  "Conclusion",
  "References",
];

const tooltipStyle = {
  backgroundColor: "#11100d",
  border: "1px solid rgba(212, 180, 112, 0.28)",
  borderRadius: "8px",
  color: "#f8f5ee",
};

type ChartPayloadItem = {
  name?: string;
  value?: number | string;
  payload?: Record<string, unknown>;
};

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  return mounted;
}

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-10 items-center gap-2 border border-stone-700/80 bg-stone-950/60 px-4 text-sm text-stone-300 transition hover:border-amber-300/60 hover:bg-amber-300/10 hover:text-amber-100"
    >
      {children}
      <ExternalLink size={14} />
    </a>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative border-t border-stone-800/80 px-5 py-20 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <p className="font-mono text-[11px] uppercase text-amber-200/80">{eyebrow}</p>
          <div>
            <h2 className="max-w-4xl text-4xl font-semibold leading-none text-stone-50 sm:text-6xl">{title}</h2>
            {subtitle && <p className="mt-5 max-w-3xl text-base leading-8 text-stone-400">{subtitle}</p>}
          </div>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.25 }}
      className={`border border-stone-800 bg-[#11100d]/85 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ChartPanel({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <Card className="overflow-hidden">
      <div className="-mx-6 -mt-6 mb-6 flex items-center justify-between border-b border-stone-800 bg-stone-950/55 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center border border-amber-200/25 bg-amber-200/10 text-amber-100">
            <Icon size={19} />
          </span>
          <h3 className="text-base font-semibold text-stone-100">{title}</h3>
        </div>
        <span className="font-mono text-[10px] uppercase text-stone-500">Measured model</span>
      </div>
      {children}
    </Card>
  );
}

function ChartShell({ children, className = "h-80" }: { children: React.ReactNode; className?: string }) {
  const mounted = useMounted();

  return (
    <div className={`${className} min-h-72 border border-stone-800 bg-stone-950/50 p-4`}>
      {mounted ? (
        children
      ) : (
        <div className="flex h-full items-center justify-center font-mono text-xs uppercase text-stone-600">Loading chart</div>
      )}
    </div>
  );
}

function MatrixTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: ChartPayloadItem[];
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0]?.payload;

  if (!item) {
    return null;
  }

  return (
    <div className="rounded-lg border border-amber-200/30 bg-[#11100d] px-4 py-3 text-sm text-stone-200 shadow-2xl">
      <p className="font-semibold text-amber-100">{String(item.name)}</p>
      <p className="mt-2 font-mono text-xs uppercase text-stone-400">Cost {String(item.cost)}/5</p>
      <p className="font-mono text-xs uppercase text-stone-400">Impact {String(item.impact)}/5</p>
      <p className="font-mono text-xs uppercase text-stone-400">Difficulty {String(item.difficulty)}/5</p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card className="min-h-40">
      <p className="font-mono text-[11px] uppercase text-stone-500">{label}</p>
      <p className="mt-5 text-4xl font-semibold text-stone-50">{value}</p>
      <p className="mt-4 text-sm leading-6 text-stone-400">{detail}</p>
    </Card>
  );
}

function CircuitBackdrop() {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrollOffset(window.scrollY * -0.08));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#090806]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,6,.22),#090806_78%)]" />
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 900 1200"
        preserveAspectRatio="xMidYMid slice"
        className="absolute bottom-[-8%] right-[-7%] h-[132vh] w-[58vw] min-w-[620px] opacity-[0.36] mix-blend-screen"
        style={{ y: scrollOffset }}
      >
        <defs>
          <filter id="circuit-glow">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {[
            "M760 20 V190 H680 V310 H590 V420 H720 V560 H610 V690 H760 V860 H690 V1030 H800 V1180",
            "M830 120 H720 V230 H650",
            "M720 310 H820 V430 H760",
            "M590 420 H480 V540 H560",
            "M610 690 H500 V770 H420",
            "M690 1030 H560 V930 H470",
            "M800 1180 H640 V1100 H560",
            "M760 560 H850 V640 H790 V720",
            "M680 190 H560 V260 H480",
            "M720 860 H590 V820 H520",
          ].map((path) => (
            <path key={path} d={path} stroke="rgba(255,255,255,.18)" strokeWidth="2" />
          ))}
          {[
            "M760 20 V190 H680 V310 H590 V420 H720 V560 H610 V690 H760 V860 H690 V1030 H800 V1180",
            "M830 120 H720 V230 H650",
            "M590 420 H480 V540 H560",
            "M610 690 H500 V770 H420",
            "M760 560 H850 V640 H790 V720",
          ].map((path, index) => (
            <motion.path
              key={path}
              d={path}
              stroke="rgba(255,255,255,.78)"
              strokeWidth={index === 0 ? 3 : 2.2}
              strokeDasharray={index === 0 ? "44 190" : "28 150"}
              filter="url(#circuit-glow)"
              animate={{ strokeDashoffset: [0, -360] }}
              transition={{ duration: index === 0 ? 5.5 : 4.2 + index * 0.45, repeat: Infinity, ease: "linear" }}
            />
          ))}
          {[
            [760, 190],
            [680, 310],
            [590, 420],
            [720, 560],
            [610, 690],
            [760, 860],
            [690, 1030],
            [720, 230],
            [850, 640],
            [500, 770],
          ].map(([cx, cy], index) => (
            <motion.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={index % 3 === 0 ? 5 : 3.5}
              fill="rgba(255,255,255,.82)"
              filter="url(#circuit-glow)"
              animate={{ opacity: [0.18, 0.95, 0.18], scale: [0.75, 1.45, 0.75] }}
              transition={{ duration: 2.4, delay: index * 0.18, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </g>
      </motion.svg>
    </div>
  );
}

export default function PowerInPracticeWebsite() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [shiftedKwh, setShiftedKwh] = useState(50);
  const monthlySavings = (shiftedKwh * (39.1 - 3.9)) / 100;
  const weeklyKwh = importedUsageData.reduce((sum, day) => sum + day.total, 0);
  const projectedMonthlyKwh = (weeklyKwh / importedUsageData.length) * 30;
  const peakKwh = importedUsageData.reduce((sum, day) => sum + day.eveningPeak, 0);
  const peakShare = (peakKwh / weeklyKwh) * 100;
  const overnightKwh = importedUsageData.reduce((sum, day) => sum + day.overnight, 0);
  const importedUloCost =
    importedUsageData.reduce(
      (sum, day) =>
        sum +
        day.overnight * 0.039 +
        (day.morning + day.midday + day.lateEvening) * 0.098 +
        day.eveningPeak * 0.391,
      0,
    ) * 4.33;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent text-stone-100 selection:bg-amber-200 selection:text-black">
      <CircuitBackdrop />

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-stone-800 bg-[#090806]/88 px-5 py-3 backdrop-blur-xl sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#home" className="flex items-center gap-3 text-sm font-semibold uppercase text-stone-100">
            <span className="flex h-9 w-9 items-center justify-center border border-amber-200/40 bg-amber-200/10 text-amber-100">
              <Zap size={18} />
            </span>
            Power in Practice
          </a>
          <div className="hidden items-center gap-1 font-mono text-[11px] uppercase text-stone-400 lg:flex">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="px-3 py-2 transition hover:bg-stone-900 hover:text-amber-100">
                {label}
              </a>
            ))}
          </div>
          <button
            type="button"
            aria-label={isMobileNavOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMobileNavOpen}
            onClick={() => setIsMobileNavOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center border border-stone-700 text-stone-100 transition hover:border-amber-200/70 hover:bg-stone-900 lg:hidden"
          >
            {isMobileNavOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {isMobileNavOpen && (
          <div className="mx-auto mt-3 grid max-w-7xl grid-cols-2 gap-2 border-t border-stone-800 pt-3 font-mono text-[11px] uppercase text-stone-400 sm:grid-cols-3 lg:hidden">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setIsMobileNavOpen(false)}
                className="border border-stone-800 bg-stone-950/70 px-3 py-3 transition hover:border-amber-200/50 hover:text-amber-100"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <header id="home" className="relative px-5 pb-16 pt-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-end gap-8 lg:grid-cols-[1.04fr_.96fr]">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="pb-8">
            <motion.div variants={fadeUp} className="mb-7 inline-flex items-center gap-2 border border-stone-700 bg-stone-950/70 px-4 py-2 font-mono text-[11px] uppercase text-amber-100">
              <Layers size={15} /> Personal field study / Toronto
            </motion.div>
            <motion.h1 variants={fadeUp} className="max-w-5xl text-5xl font-semibold leading-[0.94] text-stone-50 sm:text-7xl md:text-8xl lg:text-[8.5rem]">
              Everyday Power,
              <span className="block text-amber-100">Observed.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-xl leading-8 text-stone-300 sm:text-2xl">
              Power in Practice: Notes on Electricity in Everyday Systems
            </motion.p>
            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-8 text-stone-500">
              A curiosity-led study connecting nighttime field observation, Ontario pricing data, and small practical ways to understand everyday power use.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#data" className="group inline-flex min-h-12 items-center justify-center gap-2 bg-amber-100 px-6 font-semibold text-black transition hover:bg-stone-50">
                Explore Data <ArrowRight className="transition group-hover:translate-x-1" size={18} />
              </a>
              <a href="#field" className="inline-flex min-h-12 items-center justify-center border border-stone-700 px-6 font-semibold text-stone-100 transition hover:border-amber-200/70 hover:bg-stone-900">
                View Field Notes
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }} className="relative">
            <div className="relative h-[580px] overflow-hidden border border-stone-800 bg-stone-950">
              <Image
                src="/case-study-1.jpg"
                alt="Nighttime urban lighting observation"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,6,.12),rgba(9,8,6,.88))]" />
              <div className="absolute left-0 top-0 border-b border-r border-stone-700 bg-[#090806]/80 px-4 py-3 font-mono text-[11px] uppercase text-stone-300">
                Field image 01
              </div>
              <div className="absolute inset-x-0 bottom-0 grid gap-0 border-t border-stone-700 bg-[#090806]/88 sm:grid-cols-3">
                {[
                  ["750", "kWh/month", "Ontario typical home"],
                  ["39.1c", "/kWh", "ULO on-peak"],
                  ["3.9c", "/kWh", "ULO overnight"],
                ].map(([value, unit, label]) => (
                  <div key={label} className="border-t border-stone-800 p-5 sm:border-r sm:border-t-0">
                    <p className="text-3xl font-semibold text-amber-100">{value}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase text-stone-500">{unit}</p>
                    <p className="mt-4 text-xs leading-5 text-stone-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <Section id="abstract" eyebrow="Field note premise" title="Abstract" subtitle="Electricity often feels invisible until it shows up as light, heat, cost, or routine. This page follows those traces through ordinary spaces.">
        <Card>
          <div className="grid gap-8 lg:grid-cols-[.55fr_1fr]">
            <p className="font-mono text-xs uppercase leading-6 text-amber-100/80">Personal observation / repeated patterns / public data</p>
            <div className="space-y-5 text-lg leading-8 text-stone-300">
              <p>
                Electricity is easy to ignore because it usually works quietly in the background. This page started from noticing light, appliances, signs, and timing habits, then comparing those observations with local utility pricing data and public electricity system information.
              </p>
              <p className="text-stone-400">
                The project began through photography-based observation of Toronto&apos;s nighttime environment, where office towers, streets, and commercial spaces sometimes looked more active than they felt. The notes are exploratory: part visual diary, part data check, part question about how everyday systems could behave more thoughtfully.
              </p>
            </div>
          </div>
        </Card>
      </Section>

      <Section id="data" eyebrow="Live Dashboard" title="Imported Energy Summary" subtitle="A dashboard view combines public Ontario electricity rates with an imported household usage profile, making peak timing, cost exposure, and load shifting visible at a glance.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Imported week" value={`${weeklyKwh.toFixed(1)} kWh`} detail={`${((overnightKwh / weeklyKwh) * 100).toFixed(1)}% of usage is already shifted into the overnight window.`} />
          <MetricCard label="Monthly projection" value={`${Math.round(projectedMonthlyKwh)} kWh`} detail="Projected from the imported week and compared against the OEB 750 kWh benchmark." />
          <MetricCard label="Evening peak share" value={`${peakShare.toFixed(1)}%`} detail="Portion of weekly usage landing in the highest-cost ULO period." />
          <MetricCard label="Estimated ULO cost" value={`$${importedUloCost.toFixed(2)}`} detail="Energy-charge estimate using Toronto Hydro published ULO prices." />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
          <ChartPanel title="Imported Daily Usage Profile" icon={BarChart3}>
            <ChartShell className="h-[430px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={importedUsageData}>
                  <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                  <XAxis dataKey="day" stroke="#a8a29e" tickLine={false} axisLine={false} />
                  <YAxis stroke="#a8a29e" tickLine={false} axisLine={false} label={{ value: "kWh", angle: -90, position: "insideLeft", fill: "#a8a29e" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="overnight" name="Overnight" stackId="usage" fill="#7dd3fc" />
                  <Bar dataKey="morning" name="Morning" stackId="usage" fill="#a7f3d0" />
                  <Bar dataKey="midday" name="Midday" stackId="usage" fill="#fef08a" />
                  <Bar dataKey="eveningPeak" name="Evening peak" stackId="usage" fill="#d6ad60" />
                  <Bar dataKey="lateEvening" name="Late evening" stackId="usage" fill="#c4b5fd" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartShell>
          </ChartPanel>

          <div className="grid gap-6">
            <Card>
              <p className="font-mono text-[11px] uppercase text-stone-500">Current Rate Spread</p>
              <h3 className="mt-5 text-6xl font-semibold text-amber-100">3.9c</h3>
              <p className="mt-2 text-stone-400">ULO overnight rate per kWh.</p>
              <div className="my-6 h-px bg-stone-800" />
              <h3 className="text-6xl font-semibold text-stone-50">39.1c</h3>
              <p className="mt-2 text-stone-400">ULO on-peak rate per kWh.</p>
            </Card>
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase text-stone-500">Peak Shift Calculator</p>
                  <h3 className="mt-3 text-4xl font-semibold text-amber-100">${monthlySavings.toFixed(2)}</h3>
                </div>
                <p className="font-mono text-[11px] uppercase text-stone-500">{shiftedKwh} kWh / month</p>
              </div>
              <label htmlFor="shifted-kwh" className="mt-6 block text-sm text-stone-400">
                Monthly electricity shifted from ULO on-peak to overnight
              </label>
              <input
                id="shifted-kwh"
                type="range"
                min="0"
                max="120"
                step="5"
                value={shiftedKwh}
                onChange={(event) => setShiftedKwh(Number(event.target.value))}
                className="mt-4 w-full accent-amber-100"
              />
              <div className="mt-3 flex justify-between font-mono text-[10px] uppercase text-stone-600">
                <span>0 kWh</span>
                <span>120 kWh</span>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <Card>
            <h3 className="mb-5 text-xl font-semibold">Imported Data Sources</h3>
            <div className="space-y-4">
              {sourceNotes.map((source) => (
                <div key={source.label} className="border border-stone-800 bg-stone-950/45 p-4">
                  <p className="font-semibold text-stone-100">{source.label}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-400">{source.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <SourceLink href={TORONTO_HYDRO_RATES_URL}>Toronto Hydro rates</SourceLink>
              <SourceLink href={OEB_URL}>OEB benchmark</SourceLink>
            </div>
          </Card>

          <ChartPanel title="Published Rate Comparison" icon={Gauge}>
            <ChartShell>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rateData}>
                  <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                  <XAxis dataKey="label" stroke="#a8a29e" interval={0} angle={-12} textAnchor="end" height={65} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a8a29e" tickLine={false} axisLine={false} label={{ value: "c / kWh", angle: -90, position: "insideLeft", fill: "#a8a29e" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" fill="#d6ad60" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartShell>
          </ChartPanel>
        </div>
      </Section>

      <Section id="field" eyebrow="Field Observation" title="Photography as Field Notes" subtitle="The gallery treats each photo as a visible pattern: not proof by itself, but a reason to ask what the light is doing and why it stays on.">
        <div className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-4">
          {photos.map((photo, index) => (
            <motion.article
              key={photo.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`group border border-stone-800 bg-[#11100d] ${index === 0 ? "md:col-span-2 xl:col-span-2" : ""} ${index === 3 ? "xl:col-span-2" : ""}`}
            >
              <div className={`relative overflow-hidden bg-stone-950 ${index === 3 ? "h-[420px] xl:h-[360px]" : "h-[420px]"}`}>
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  sizes={index === 0 || index === 3 ? "(min-width: 1280px) 50vw, 100vw" : "(min-width: 1280px) 25vw, 50vw"}
                  className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.78))]" />
                <div className="absolute bottom-0 left-0 right-0 border-t border-stone-700 bg-[#090806]/90 p-5 opacity-100 transition duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
                  <p className="mb-2 font-mono text-[10px] uppercase text-amber-100">Observation Notes</p>
                  <p className="text-sm leading-6 text-stone-200">{photo.note}</p>
                </div>
              </div>
              <div className="border-t border-stone-800 p-5">
                <h3 className="text-xl font-semibold text-stone-100">{photo.title}</h3>
                <p className="mt-2 text-sm leading-6 text-amber-100/75">{photo.tag}</p>
              </div>
            </motion.article>
          ))}
          <Card className="relative overflow-hidden xl:col-span-2">
            <div className="absolute inset-0 opacity-35">
              <svg aria-hidden="true" viewBox="0 0 680 420" className="h-full w-full">
                <g fill="none" stroke="rgba(255,255,255,.28)" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M30 84 H170 V140 H270 V78 H390 V126 H620" strokeWidth="2" />
                  <path d="M70 230 H210 V184 H330 V250 H490 V206 H640" strokeWidth="2" />
                  <path d="M130 348 H260 V310 H380 V350 H570" strokeWidth="2" />
                  <path d="M390 126 V206" strokeWidth="2" />
                  <path d="M490 206 V310" strokeWidth="2" />
                </g>
                <g fill="rgba(255,255,255,.5)">
                  {[170, 270, 390, 490, 570].map((cx, index) => (
                    <circle key={cx} cx={cx} cy={[84, 140, 126, 206, 348][index]} r="4" />
                  ))}
                </g>
              </svg>
            </div>
            <div className="relative flex h-full min-h-[360px] flex-col justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase text-stone-500">Field Signal Summary</p>
                <h3 className="mt-5 max-w-xl text-3xl font-semibold leading-tight text-stone-50">Standby Load Control Board</h3>
                <p className="mt-5 max-w-2xl text-base leading-8 text-stone-400">
                  The residential case connects small standby loads with the same system logic seen in commercial lighting: repeated patterns become meaningful when they stack across time.
                </p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {fieldSignals.map(([label, value]) => (
                  <div key={label} className="border border-stone-800 bg-black/35 p-4">
                    <p className="font-mono text-[10px] uppercase text-stone-500">{label}</p>
                    <p className="mt-3 text-xl font-semibold text-stone-100">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section id="research" eyebrow="Research Architecture" title="From Observation to Model" subtitle="The page moves from observation to benchmark, comparison, system context, and practical control ideas without pretending the photos alone measure everything.">
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartPanel title="Ontario Household Benchmark" icon={Home}>
            <ChartShell>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarkData} layout="vertical" margin={{ left: 35 }}>
                  <CartesianGrid stroke="rgba(255,255,255,.08)" horizontal={false} />
                  <XAxis type="number" stroke="#a8a29e" tickLine={false} axisLine={false} />
                  <YAxis dataKey="label" type="category" stroke="#a8a29e" width={150} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" fill="#d6ad60" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartShell>
            <p className="mt-4 text-sm leading-6 text-stone-500">The Ontario Energy Board benchmark is 750 kWh/month. 620 kWh and 900 kWh are scenario examples, not official averages.</p>
          </ChartPanel>

          <ChartPanel title="Peak Demand Concept Curve" icon={LineIcon}>
            <ChartShell>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={demandCurve}>
                  <defs>
                    <linearGradient id="demand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d6ad60" stopOpacity={0.82} />
                      <stop offset="95%" stopColor="#d6ad60" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,.08)" />
                  <XAxis dataKey="hour" stroke="#a8a29e" tickLine={false} axisLine={false} />
                  <YAxis stroke="#a8a29e" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="demand" stroke="#d6ad60" fill="url(#demand)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartShell>
            <p className="mt-4 text-sm leading-6 text-stone-500">Peak demand matters because the grid must be built to handle the highest-demand hours, not just average demand.</p>
          </ChartPanel>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Card>
            <h3 className="mb-5 text-xl font-semibold">Household Observation Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="font-mono text-[11px] uppercase text-amber-100/80">
                  <tr>{["Time", "Device", "Pattern", "Waste Type", "Improvement"].map((h) => <th key={h} className="border-b border-stone-700 px-4 py-3">{h}</th>)}</tr>
                </thead>
                <tbody className="text-stone-300">
                  {observationRows.map((row) => (
                    <tr key={row.join("-")} className="border-b border-stone-800">
                      {row.map((cell) => <td key={cell} className="px-4 py-4">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card>
            <h3 className="mb-4 text-xl font-semibold">Official Sources</h3>
            <p className="mb-6 leading-7 text-stone-400">The project uses official Ontario electricity context to connect local observation with a larger energy system.</p>
            <div className="flex flex-wrap gap-3">
              <SourceLink href={OEB_URL}>Ontario Energy Board</SourceLink>
              <SourceLink href={TORONTO_HYDRO_RATES_URL}>Toronto Hydro Rates</SourceLink>
              <SourceLink href={IESO_PEAK_URL}>IESO Peak Tracker</SourceLink>
              <SourceLink href={IESO_DEMAND_URL}>IESO Demand Reports</SourceLink>
            </div>
          </Card>
        </div>
      </Section>

      <Section id="urban" eyebrow="Urban Lighting Observations" title="Static Systems in a Dynamic City" subtitle="Observation alone cannot confirm occupancy or exact electricity load, but it can reveal where smarter controls may be valuable.">
        <div className="grid gap-4 lg:grid-cols-3">
          {["Empty office floors still illuminated", "Decorative facade lighting long after business hours", "Public spaces lit uniformly regardless of occupancy"].map((item) => (
            <Card key={item}>
              <Lightbulb className="mb-5 text-amber-100" size={32} />
              <p className="text-xl font-semibold leading-8">{item}</p>
            </Card>
          ))}
        </div>
        <Card className="mt-6">
          <p className="text-lg leading-8 text-stone-300">Possible reasons include static timer systems, security policies, lack of occupancy sensing, legacy design standards, and convenience over optimization.</p>
        </Card>
      </Section>

      <Section id="solutions" eyebrow="Control Ideas" title="Control the System, Not Just the Light Switch" subtitle="The strongest short-term improvements come from low-cost controls, better scheduling, and systems that respond to actual use.">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            [Cpu, "Smart Automation", "Smart plugs, timers, occupancy sensors, adaptive lighting, and thermostats reduce waste without requiring constant manual attention."],
            [Timer, "Behavioral Shift", "Appliance scheduling and awareness help households move flexible loads away from high-price periods."],
            [Network, "Grid Stability", "Reducing peak demand supports system reliability because the grid must be prepared for the highest-demand hours."],
          ].map(([Icon, title, body]) => {
            const TypedIcon = Icon as React.ElementType;
            return (
              <Card key={title as string}>
                <TypedIcon className="mb-6 text-amber-100" size={36} />
                <h3 className="mb-4 text-2xl font-semibold">{title as string}</h3>
                <p className="leading-8 text-stone-400">{body as string}</p>
              </Card>
            );
          })}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <ChartPanel title="Cost vs Impact Matrix" icon={Gauge}>
            <ChartShell className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid stroke="rgba(255,255,255,.08)" />
                  <XAxis type="number" dataKey="cost" name="Cost" domain={[0, 6]} stroke="#a8a29e" tickLine={false} axisLine={false} />
                  <YAxis type="number" dataKey="impact" name="Impact" domain={[0, 6]} stroke="#a8a29e" tickLine={false} axisLine={false} />
                  <ZAxis type="number" dataKey="difficulty" range={[120, 520]} />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<MatrixTooltip />} />
                  <Scatter data={solutionMatrix} fill="#d6ad60" />
                </ScatterChart>
              </ResponsiveContainer>
            </ChartShell>
          </ChartPanel>
          <Card>
            <h3 className="mb-5 text-xl font-semibold">Solution Matrix</h3>
            <div className="space-y-3">
              {solutionMatrix.map((s) => (
                <div key={s.name} className="grid grid-cols-[1fr_auto] gap-4 border border-stone-800 bg-stone-950/45 p-4">
                  <div>
                    <p className="font-semibold text-stone-100">{s.name}</p>
                    <p className="mt-1 font-mono text-xs uppercase text-stone-500">Cost {s.cost}/5 / Difficulty {s.difficulty}/5</p>
                  </div>
                  <p className="text-amber-100">Impact {s.impact}/5</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section id="findings" eyebrow="Findings" title="Six Research Takeaways" subtitle="The analysis shows that electricity waste is behavioral, spatial, economic, and systemic at the same time.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {findings.map(([title, body], index) => (
            <Card key={title}>
              <p className="mb-8 font-mono text-[11px] uppercase text-amber-100/80">Finding 0{index + 1}</p>
              <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
              <p className="leading-7 text-stone-400">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="discussion" eyebrow="Discussion & Limitations" title="Optimization, Not Just Innovation" subtitle="The project suggests that inefficiency is usually the result of many small decisions repeated over time.">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="mb-4 text-2xl font-semibold">Discussion</h3>
            <p className="leading-8 text-stone-300">Modern cities already possess vast electricity infrastructure. The challenge is operating it intelligently. Examples include leaving systems on because adjustment is inconvenient, using electricity at expensive peak times out of habit, and designing infrastructure around worst-case assumptions rather than actual demand.</p>
          </Card>
          <Card>
            <h3 className="mb-4 text-2xl font-semibold">Limitations</h3>
            <ul className="space-y-3 text-stone-300">
              <li>Household analysis used benchmark comparisons rather than direct smart-meter data.</li>
              <li>Urban lighting observations were qualitative rather than instrument-measured lux readings.</li>
              <li>Household scenarios vary by heating source, occupancy, and dwelling type.</li>
              <li>Some illuminated buildings may have legitimate operational reasons.</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section id="future" eyebrow="Future Notes" title="Next Version of the Study" subtitle="Future versions could add more direct measurements, more photographs, and richer interactive tools.">
        <div className="grid gap-4 md:grid-cols-3">
          {["Real smart meter household data", "Light intensity sensor measurements", "Multiple Toronto neighborhoods", "Predictive demand models", "Ontario live data dashboard", "Rule-based scheduling reminders"].map((item) => (
            <Card key={item}><p className="text-lg font-semibold leading-8">{item}</p></Card>
          ))}
        </div>
      </Section>

      <Section id="constellation" eyebrow="Connected Notes" title="The Same Curiosity, Different Interfaces" subtitle="These projects share a visual language, but each one looks at a different scale: household cost, night photography, and responsive light.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [NOCTIS_URL, "NOCTIS", "A black-and-white night photography map for Toronto light conditions.", "Photo map"],
            [SMARTENERGY_URL, "SmartEnergy", "A dashboard for trying household usage scenarios with Ontario electricity rates.", "Dashboard"],
            [LUMEN_SHIFT_URL, "Lumen Shift", "An interactive lighting prototype that responds to motion and street activity.", "Prototype"],
          ].map(([href, title, body, label]) => (
            <motion.a
              key={title}
              href={href}
              target="_blank"
              rel="noreferrer"
              variants={fadeUp}
              whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
              className="group relative min-h-72 overflow-hidden border border-stone-800 bg-[#11100d] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)]"
            >
              <div className="absolute inset-0 opacity-35 transition duration-500 group-hover:opacity-70">
                <svg aria-hidden="true" viewBox="0 0 520 320" className="h-full w-full">
                  <motion.path
                    d="M24 210 C110 90 184 260 258 150 C332 42 408 100 492 50"
                    fill="none"
                    stroke="rgba(246,220,166,.72)"
                    strokeWidth="2"
                    strokeDasharray="18 44"
                    animate={{ strokeDashoffset: [0, -220] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.circle cx="258" cy="150" r="5" fill="rgba(246,220,166,.9)" animate={{ scale: [1, 2.1, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.4, repeat: Infinity }} />
                </svg>
              </div>
              <div className="relative flex h-full flex-col justify-between">
                <p className="font-mono text-[11px] uppercase text-amber-100/80">{label}</p>
                <div>
                  <h3 className="text-3xl font-semibold text-stone-50">{title}</h3>
                  <p className="mt-4 leading-7 text-stone-400">{body}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-100">
                    Open project <ExternalLink size={15} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </Section>

      <Section id="report" eyebrow="Report" title="Download Full Report" subtitle="A final section for the PDF report, documentation, and source list.">
        <div className="grid items-stretch gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <Card className="flex flex-col items-center justify-center text-center">
            <div className="flex h-44 w-36 items-center justify-center border border-amber-200/25 bg-amber-100/10">
              <FileText size={54} className="text-amber-100" />
            </div>
            <h3 className="mt-8 text-2xl font-semibold">Power in Practice Full Formal Research Report</h3>
            <p className="mx-auto mt-3 max-w-md text-stone-400">Rethinking Electricity Use in Everyday Systems: A Household and Urban Electricity Efficiency Study in Toronto, Ontario.</p>
            <a
              href="/power-in-practice-report.pdf"
              download
              className="mt-8 inline-flex min-h-12 items-center gap-2 bg-amber-100 px-6 font-semibold text-black transition hover:bg-stone-50"
            >
              <Download size={18} /> Download Report
            </a>
          </Card>
          <Card>
            <h3 className="mb-5 text-xl font-semibold">Report Includes</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {reportIncludes.map((item) => (
                <div key={item} className="border border-stone-800 bg-stone-950/45 px-4 py-3 text-stone-300">{item}</div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <footer className="border-t border-stone-800 px-5 py-10 text-center text-sm text-stone-500 sm:px-10 lg:px-20">
        <p>Power in Practice / Personal Electricity Field Notes</p>
        <p className="mt-2">Everyday Power, Observed.</p>
      </footer>
    </main>
  );
}
