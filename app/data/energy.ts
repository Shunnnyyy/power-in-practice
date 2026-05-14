export const sourceNotes = [
  {
    label: "Toronto Hydro RPP rates",
    detail: "ULO and TOU electricity prices, effective for the 2025-2026 pricing period.",
  },
  {
    label: "Ontario Energy Board benchmark",
    detail: "Typical Ontario residential electricity customer benchmark remains 750 kWh/month.",
  },
];

export const rateData = [
  { label: "TOU Off", value: 9.8, plan: "TOU", period: "Off-peak" },
  { label: "TOU Mid", value: 15.7, plan: "TOU", period: "Mid-peak" },
  { label: "TOU Peak", value: 20.3, plan: "TOU", period: "On-peak" },
  { label: "ULO Night", value: 3.9, plan: "ULO", period: "Ultra-low overnight" },
  { label: "ULO Peak", value: 39.1, plan: "ULO", period: "On-peak" },
];

export const importedUsageData = [
  { day: "Mon", overnight: 4.8, morning: 3.4, midday: 4.1, eveningPeak: 6.2, lateEvening: 3.1 },
  { day: "Tue", overnight: 4.4, morning: 3.2, midday: 3.9, eveningPeak: 5.8, lateEvening: 2.9 },
  { day: "Wed", overnight: 5.1, morning: 3.7, midday: 4.4, eveningPeak: 6.7, lateEvening: 3.4 },
  { day: "Thu", overnight: 4.6, morning: 3.5, midday: 4.0, eveningPeak: 6.0, lateEvening: 3.0 },
  { day: "Fri", overnight: 5.3, morning: 3.8, midday: 4.6, eveningPeak: 7.4, lateEvening: 3.7 },
  { day: "Sat", overnight: 6.0, morning: 4.5, midday: 5.8, eveningPeak: 5.3, lateEvening: 4.2 },
  { day: "Sun", overnight: 5.7, morning: 4.1, midday: 5.5, eveningPeak: 5.0, lateEvening: 3.9 },
].map((row) => ({
  ...row,
  total: row.overnight + row.morning + row.midday + row.eveningPeak + row.lateEvening,
}));

export const benchmarkData = [
  { label: "Imported Usage Projection", value: Math.round((importedUsageData.reduce((sum, day) => sum + day.total, 0) / importedUsageData.length) * 30) },
  { label: "Ontario Benchmark", value: 750 },
  { label: "High-Use Scenario", value: 900 },
];
