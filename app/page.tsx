"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  ExternalLink,
  Camera,
  LineChart as LineIcon,
  BarChart3,
  Home,
  Lightbulb,
  Cpu,
  Network,
  FileText,
  Download,
  Timer,
  Gauge,
  MapPin,
  Plug,
  Layers,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

const OEB_URL = "https://www.oeb.ca/consultations-and-projects/policy-initiatives-and-consultations/defining-ontarios-typical";
const TORONTO_HYDRO_RATES_URL = "https://www.torontohydro.com/for-home/rates";
const TORONTO_HYDRO_CHOICE_URL = "https://www.torontohydro.com/for-home/customer-choice";
const IESO_PEAK_URL = "https://www.ieso.ca/Sector-Participants/Settlements/Peak-Tracker";
const IESO_DEMAND_URL = "https://www.ieso.ca/power-data/demand-overview/real-time-demand-reports";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const navItems = [
  ["Home", "home"],
  ["Data", "data"],
  ["Field", "field"],
  ["Research", "research"],
  ["Solutions", "solutions"],
  ["Report", "report"],
];

const priceData = [
  { label: "TOU Off", value: 9.8 },
  { label: "TOU Mid", value: 15.7 },
  { label: "TOU Peak", value: 20.3 },
  { label: "ULO Night", value: 3.9 },
  { label: "ULO Peak", value: 39.1 },
];

const benchmarkData = [
  { label: "Efficient Scenario", value: 620 },
  { label: "Ontario Benchmark", value: 750 },
  { label: "High-Use Scenario", value: 900 },
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

const reportSections = [
  ["Abstract", "This project investigates inefficient electricity usage in household and urban environments through direct observation, local utility pricing data, public electricity system information, and engineering analysis. The findings suggest that electricity inefficiency often results from habitual human behavior and static system design."],
  ["Introduction", "Electricity demand continues to grow as cities become larger, more digital, and increasingly electrified. This project asks how inefficient electricity use can be identified and improved through observation, data, and engineering design."],
  ["Project Motivation", "The project began through photography-based observation of Toronto at night, where brightly illuminated office towers, streets, and commercial spaces often appeared active despite low visible occupancy."],
  ["Methodology", "The research combines direct observation, a household case study, public data review, and engineering interpretation to connect local behavior with system-level electricity efficiency."],
  ["Discussion", "Inefficiency is rarely caused by one dramatic failure. More often, it results from many small decisions repeated over time, such as leaving systems on, using electricity at expensive peak times, or designing around worst-case assumptions."],
  ["Limitations", "This project uses benchmark comparisons rather than direct smart-meter data, qualitative lighting observations rather than lux measurements, and scenario examples that vary by household conditions."],
  ["Conclusion", "Meaningful electricity efficiency gains do not always require massive new infrastructure. Many can come from better timing, better controls, better incentives, and better design."],
];

const solutionTables = {
  household: [
    ["LED replacement", "Low", "Medium"],
    ["Smart plugs", "Low", "Medium"],
    ["Shift flexible loads", "Low", "High"],
    ["Smart thermostat", "Medium", "High"],
  ],
  urban: [
    ["Motion sensors", "Medium", "Medium"],
    ["Adaptive brightness", "Medium", "High"],
    ["Zoned lighting", "Medium", "High"],
    ["Updated operating schedules", "Low", "Medium"],
  ],
  grid: [
    ["Dynamic pricing", "Low", "High"],
    ["Demand response", "Medium", "High"],
    ["Smart EV charging", "Medium", "High"],
    ["Real-time dashboards", "Medium", "Medium"],
  ],
};

const tooltipStyle = {
  backgroundColor: "#050505",
  border: "1px solid rgba(34,211,238,0.25)",
  borderRadius: "18px",
  color: "#ffffff",
};

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/60 hover:bg-cyan-300/10 hover:text-cyan-100"
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
    <section id={id} className="relative px-5 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300/90">{eyebrow}</p>
          <h2 className="text-4xl font-semibold tracking-tighter text-white sm:text-6xl">{title}</h2>
          {subtitle && <p className="mt-6 text-lg leading-8 text-slate-400">{subtitle}</p>}
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
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className={`rounded-[24px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_0_50px_rgba(59,130,246,0.10)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

function ChartPanel({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <Card>
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
          <Icon size={22} />
        </span>
        <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
      </div>
      {children}
    </Card>
  );
}

export default function PowerInPracticeWebsite() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white selection:bg-cyan-300 selection:text-black">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.72, 0.45] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[5%] top-[8%] h-[580px] w-[580px] rounded-full bg-[radial-gradient(circle,#3b82f6_0%,rgba(59,130,246,.35)_32%,rgba(34,211,238,.10)_54%,transparent_72%)] blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 24, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[6%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,#22d3ee_0%,rgba(34,211,238,.18)_42%,transparent_72%)] blur-3xl"
        />
      </div>

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/70 px-5 py-4 backdrop-blur-xl sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#home" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-[0_0_35px_rgba(59,130,246,.8)]">
              <Zap size={20} />
            </span>
            Power in Practice
          </a>
          <div className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="transition hover:text-cyan-300">
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <header id="home" className="relative flex min-h-screen items-center px-5 pt-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <Layers size={16} /> Industrial Precision Research Portfolio
            </motion.div>
            <motion.h1 variants={fadeUp} className="max-w-4xl text-6xl font-semibold leading-[0.92] tracking-tighter text-white sm:text-8xl lg:text-9xl">
              Systemic Waste,
              <span className="block bg-gradient-to-r from-white via-cyan-200 to-blue-500 bg-clip-text text-transparent">Measured.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-2xl leading-9 text-slate-200">
              Power in Practice: Rethinking Electricity Use in Everyday Systems
            </motion.p>
            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              Rethinking Electricity Use in Everyday Systems: A Household and Urban Electricity Efficiency Study in Toronto, Ontario.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#data" className="group rounded-full bg-blue-500 px-7 py-4 font-semibold text-white shadow-[0_0_38px_rgba(59,130,246,.55)] transition hover:bg-blue-400">
                Explore Data <ArrowRight className="ml-2 inline transition group-hover:translate-x-1" size={18} />
              </a>
              <a href="#field" className="rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:border-cyan-300/70 hover:bg-white/10">
                View Field Notes
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-blue-500/20 blur-3xl" />
            <Card className="relative overflow-hidden p-5">
              <div className="absolute right-8 top-8 h-44 w-44 rounded-full bg-blue-500/30 blur-3xl" />
              <div className="mb-5 grid grid-cols-3 gap-3">
                {[
                  ["750", "kWh/month", "Ontario typical home"],
                  ["39.1¢", "/kWh", "ULO on-peak"],
                  ["3.9¢", "/kWh", "ULO overnight"],
                ].map(([value, unit, label]) => (
                  <div key={label} className="rounded-3xl border border-white/10 bg-black/35 p-4">
                    <p className="text-3xl font-semibold tracking-tight text-cyan-100">{value}</p>
                    <p className="mt-1 text-xs text-slate-500">{unit}</p>
                    <p className="mt-4 text-xs text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
              <div className="h-80 rounded-[28px] border border-white/10 bg-black/35 p-5">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{ name: "Benchmark", value: 750 }, { name: "Peak", value: 391 }, { name: "Night", value: 39 }]}>
                    <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[18, 18, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <SourceLink href={OEB_URL}>OEB benchmark</SourceLink>
                <SourceLink href={TORONTO_HYDRO_RATES_URL}>Toronto Hydro rates</SourceLink>
              </div>
            </Card>
          </motion.div>
        </div>
      </header>

      <Section id="abstract" eyebrow="Formal Research Report" title="Abstract" subtitle="Electricity efficiency is often discussed through generation and supply. This project studies how electricity is actually used in everyday systems.">
        <Card>
          <p className="text-lg leading-8 text-slate-300">
            Electricity is one of the most essential resources in modern urban life, powering homes, transportation systems, buildings, and digital infrastructure. This project investigates inefficient electricity usage in household and urban environments through direct observation, local utility pricing data, public electricity system information, and engineering analysis.
          </p>
          <p className="mt-5 text-lg leading-8 text-slate-400">
            The project began through photography-based observation of Toronto’s nighttime environment, where brightly illuminated office towers, streets, and commercial spaces often appeared active despite low visible occupancy. The findings suggest that electricity inefficiency often results from two repeated causes: habitual human behavior and static system design.
          </p>
        </Card>
      </Section>

      <Section id="data" eyebrow="Data Synthesis" title="Pricing Creates a Timing Problem" subtitle="The same amount of electricity can have very different cost and grid impact depending on when it is used.">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <ChartPanel title="TOU vs ULO Price Comparison" icon={BarChart3}>
            <div className="h-[430px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceData}>
                  <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                  <XAxis dataKey="label" stroke="#9ca3af" interval={0} angle={-12} textAnchor="end" height={65} />
                  <YAxis stroke="#9ca3af" label={{ value: "¢ / kWh", angle: -90, position: "insideLeft", fill: "#9ca3af" }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" fill="#22d3ee" radius={[18, 18, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartPanel>

          <div className="grid gap-6">
            <Card>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Critical Contrast</p>
              <h3 className="mt-4 text-5xl font-semibold tracking-tighter text-cyan-200">3.9¢</h3>
              <p className="mt-2 text-slate-400">ULO overnight rate per kWh.</p>
              <div className="my-6 h-px bg-white/10" />
              <h3 className="text-5xl font-semibold tracking-tighter text-white">39.1¢</h3>
              <p className="mt-2 text-slate-400">ULO on-peak rate per kWh.</p>
            </Card>
            <Card>
              <p className="text-lg leading-8 text-slate-300">Ontario’s pricing model demonstrates an important engineering principle: demand matters as much as consumption. Running a dishwasher at 1 AM and 6 PM may consume similar energy, but 6 PM usage coincides with peak system demand.</p>
              <p className="mt-4 text-lg leading-8 text-cyan-100">Example: shifting 50 kWh/month from 39.1¢ to 3.9¢ saves about $17.60/month.</p>
              <div className="mt-5"><SourceLink href={TORONTO_HYDRO_RATES_URL}>Official Toronto Hydro rate page</SourceLink></div>
            </Card>
          </div>
        </div>
      </Section>

      <Section id="field" eyebrow="Field Observation" title="Photography as Engineering Evidence" subtitle="The gallery uses a black-and-white default state. Hovering restores color and reveals engineering notes.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
              className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] p-3 backdrop-blur-xl ${index === 0 ? "md:col-span-2 xl:col-span-2" : ""}`}
            >
              <div className="relative h-[420px] overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,.5),transparent_34%),linear-gradient(135deg,#050505,#111827)]">
                <div className="absolute inset-0 bg-cover bg-center grayscale transition duration-700 group-hover:grayscale-0" style={{ backgroundImage: `url(${photo.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <motion.div variants={{ hover: { opacity: 1, y: 0 } }} initial={{ opacity: 0, y: 18 }} className="absolute inset-x-4 bottom-4 rounded-3xl border border-cyan-300/20 bg-black/65 p-5 backdrop-blur-xl">
                  <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-200">Engineering Notes</p>
                  <p className="text-sm leading-6 text-slate-200">{photo.note}</p>
                </motion.div>
              </div>
              <div className="p-3 pt-5">
                <h3 className="text-2xl font-semibold tracking-tight">{photo.title}</h3>
                <p className="mt-2 text-sm text-cyan-200">{photo.tag}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="research" eyebrow="Research Architecture" title="From Observation to Model" subtitle="The project follows the logic of a research paper: observation, benchmark, comparison, system context, and engineering response.">
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartPanel title="Ontario Household Benchmark" icon={Home}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchmarkData} layout="vertical" margin={{ left: 35 }}>
                  <CartesianGrid stroke="rgba(255,255,255,.08)" horizontal={false} />
                  <XAxis type="number" stroke="#9ca3af" />
                  <YAxis dataKey="label" type="category" stroke="#9ca3af" width={150} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 16, 16, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">The Ontario Energy Board benchmark is 750 kWh/month. 620 kWh and 900 kWh are scenario examples, not official averages.</p>
          </ChartPanel>

          <ChartPanel title="Peak Demand Concept Curve" icon={LineIcon}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={demandCurve}>
                  <defs>
                    <linearGradient id="demand" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,.08)" />
                  <XAxis dataKey="hour" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="demand" stroke="#22d3ee" fill="url(#demand)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">Peak demand matters because the grid must be built to handle the highest-demand hours, not just average demand.</p>
          </ChartPanel>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Card>
            <h3 className="mb-5 text-xl font-semibold">Household Observation Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="text-cyan-200">
                  <tr>{["Time", "Device", "Pattern", "Waste Type", "Improvement"].map((h) => <th key={h} className="border-b border-white/10 px-4 py-3">{h}</th>)}</tr>
                </thead>
                <tbody className="text-slate-300">
                  {observationRows.map((row) => (
                    <tr key={row.join("-")} className="border-b border-white/5">
                      {row.map((cell) => <td key={cell} className="px-4 py-4">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card>
            <h3 className="mb-4 text-xl font-semibold">Official Sources</h3>
            <p className="mb-6 leading-7 text-slate-400">The project uses official Ontario electricity context to connect local observation with a larger energy system.</p>
            <div className="flex flex-wrap gap-3">
              <SourceLink href={OEB_URL}>Ontario Energy Board</SourceLink>
              <SourceLink href={TORONTO_HYDRO_RATES_URL}>Toronto Hydro Rates</SourceLink>
              <SourceLink href={IESO_PEAK_URL}>IESO Peak Tracker</SourceLink>
              <SourceLink href={IESO_DEMAND_URL}>IESO Demand Reports</SourceLink>
            </div>
          </Card>
        </div>
      </Section>

      <Section id="urban" eyebrow="Urban Lighting Observations" title="Static Systems in a Dynamic City" subtitle="Observation alone cannot confirm internal occupancy or exact electricity load, but it can identify areas where smarter controls may be valuable.">
        <div className="grid gap-6 lg:grid-cols-3">
          {["Empty office floors still illuminated", "Decorative façade lighting long after business hours", "Public spaces lit uniformly regardless of occupancy"].map((item) => (
            <Card key={item}>
              <Lightbulb className="mb-5 text-cyan-200" size={34} />
              <p className="text-xl font-semibold leading-8">{item}</p>
            </Card>
          ))}
        </div>
        <Card className="mt-6">
          <p className="text-lg leading-8 text-slate-300">Possible reasons include static timer systems, security policies, lack of occupancy sensing, legacy design standards, and convenience over optimization.</p>
        </Card>
      </Section>

      <Section id="solutions" eyebrow="The Engineering Solution" title="Control the System, Not Just the Light Switch" subtitle="The strongest short-term improvements come from low-cost controls, better scheduling, and systems that respond to actual use.">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            [Cpu, "Smart Automation", "Smart plugs, timers, occupancy sensors, adaptive lighting, and thermostats reduce waste without requiring constant manual attention."],
            [Timer, "Behavioral Shift", "Appliance scheduling and awareness help households move flexible loads away from high-price periods."],
            [Network, "Grid Stability", "Reducing peak demand supports system reliability because the grid must be prepared for the highest-demand hours."],
          ].map(([Icon, title, body]) => {
            const TypedIcon = Icon as React.ElementType;
            return (
              <Card key={title as string}>
                <TypedIcon className="mb-6 text-cyan-200" size={38} />
                <h3 className="mb-4 text-2xl font-semibold tracking-tight">{title as string}</h3>
                <p className="leading-8 text-slate-400">{body as string}</p>
              </Card>
            );
          })}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <ChartPanel title="Cost vs Impact Matrix" icon={Gauge}>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid stroke="rgba(255,255,255,.08)" />
                  <XAxis type="number" dataKey="cost" name="Cost" domain={[0, 6]} stroke="#9ca3af" />
                  <YAxis type="number" dataKey="impact" name="Impact" domain={[0, 6]} stroke="#9ca3af" />
                  <ZAxis type="number" dataKey="difficulty" range={[120, 520]} />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={tooltipStyle} />
                  <Scatter data={solutionMatrix} fill="#22d3ee" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </ChartPanel>
          <Card>
            <h3 className="mb-5 text-xl font-semibold">Solution Matrix</h3>
            <div className="space-y-3">
              {solutionMatrix.map((s) => (
                <div key={s.name} className="grid grid-cols-[1fr_auto] gap-4 rounded-2xl border border-white/10 bg-black/35 p-4">
                  <div>
                    <p className="font-semibold text-slate-100">{s.name}</p>
                    <p className="mt-1 text-sm text-slate-500">Cost {s.cost}/5 · Difficulty {s.difficulty}/5</p>
                  </div>
                  <p className="text-cyan-200">Impact {s.impact}/5</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section id="findings" eyebrow="Findings" title="Six Research Takeaways" subtitle="The analysis shows that electricity waste is behavioral, spatial, economic, and systemic at the same time.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {findings.map(([title, body], index) => (
            <Card key={title}>
              <p className="mb-8 text-sm text-cyan-200">Finding 0{index + 1}</p>
              <h3 className="mb-4 text-2xl font-semibold tracking-tight">{title}</h3>
              <p className="leading-7 text-slate-400">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="discussion" eyebrow="Discussion & Limitations" title="Optimization, Not Just Innovation" subtitle="The project suggests that inefficiency is usually the result of many small decisions repeated over time.">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="mb-4 text-2xl font-semibold">Discussion</h3>
            <p className="leading-8 text-slate-300">Modern cities already possess vast electricity infrastructure. The challenge is operating it intelligently. Examples include leaving systems on because adjustment is inconvenient, using electricity at expensive peak times out of habit, and designing infrastructure around worst-case assumptions rather than actual demand.</p>
          </Card>
          <Card>
            <h3 className="mb-4 text-2xl font-semibold">Limitations</h3>
            <ul className="space-y-3 text-slate-300">
              <li>Household analysis used benchmark comparisons rather than direct smart-meter data.</li>
              <li>Urban lighting observations were qualitative rather than instrument-measured lux readings.</li>
              <li>Household scenarios vary by heating source, occupancy, and dwelling type.</li>
              <li>Some illuminated buildings may have legitimate operational reasons.</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section id="future" eyebrow="Future Work" title="Next Version of the Study" subtitle="Future versions could turn this exploratory project into an interactive energy monitoring platform.">
        <div className="grid gap-4 md:grid-cols-3">
          {["Real smart meter household data", "Light intensity sensor measurements", "Multiple Toronto neighborhoods", "Predictive demand models", "Ontario live data dashboard", "AI-based scheduling recommendations"].map((item) => (
            <Card key={item}><p className="text-lg font-semibold leading-8">{item}</p></Card>
          ))}
        </div>
      </Section>

      <Section id="report" eyebrow="Report" title="Download Full Report" subtitle="A clean final section for the PDF report, documentation, and source list.">
        <div className="grid items-center gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <Card className="relative overflow-hidden text-center">
            <div
                className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/25 blur-3xl"/>
            <div
                className="relative mx-auto flex h-48 w-40 items-center justify-center rounded-[28px] border border-cyan-300/20 bg-white/[0.06] shadow-[0_0_60px_rgba(59,130,246,.28)]">
              <FileText size={58} className="text-cyan-100"/>
            </div>
            <h3 className="mt-8 text-2xl font-semibold">Power in Practice Full Formal Research Report</h3>
            <p className="mx-auto mt-3 max-w-md text-slate-400">Rethinking Electricity Use in Everyday Systems: A
              Household and Urban Electricity Efficiency Study in Toronto, Ontario.</p>
            <a
                href="/power-in-practice-report.pdf"
                download
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-500 px-7 py-4 font-semibold text-white transition hover:bg-blue-400"
            >
              <Download size={18}/> Download Report
            </a>
          </Card>
          <Card>
            <h3 className="mb-5 text-xl font-semibold">Report Includes</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Abstract", "Introduction", "Project motivation", "Research questions", "Methodology", "Household case study", "Ontario pricing analysis", "Grid context", "Urban lighting observations", "Key findings", "Engineering solutions", "Discussion", "Limitations", "Future work", "Conclusion", "References"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-slate-300">{item}</div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <footer className="border-t border-white/10 px-5 py-10 text-center text-sm text-slate-500 sm:px-10 lg:px-20">
        <p>Power in Practice — Industrial Precision Engineering Portfolio</p>
        <p className="mt-2">Systemic Waste, Measured.</p>
      </footer>
    </main>
  );
}
