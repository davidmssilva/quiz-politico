import { Answer } from "./scoring";

export const LIKERT_SCALE: { label: string; value: Answer; color: string }[] = [
  {
    label: "Concordo totalmente",
    value: 2,
    color: "hover:border-emerald-500 hover:bg-emerald-50 active:bg-emerald-100 dark:hover:bg-emerald-950/50 dark:hover:border-emerald-600 dark:active:bg-emerald-950/70",
  },
  {
    label: "Concordo",
    value: 1,
    color:
      "hover:border-emerald-200 hover:bg-emerald-50/50 active:bg-emerald-50/80 dark:hover:bg-emerald-950/30 dark:hover:border-emerald-700 dark:active:bg-emerald-950/50",
  },
  {
    label: "Neutro",
    value: 0,
    color: "hover:border-slate-400 hover:bg-slate-100 active:bg-slate-150 dark:hover:bg-slate-800/50 dark:hover:border-slate-600 dark:active:bg-slate-800/70",
  },
  {
    label: "Discordo",
    value: -1,
    color: "hover:border-red-200 hover:bg-red-50/50 active:bg-red-50/80 dark:hover:bg-red-950/30 dark:hover:border-red-700 dark:active:bg-red-950/50",
  },
  {
    label: "Discordo totalmente",
    value: -2,
    color: "hover:border-red-500 hover:bg-red-50 active:bg-red-100 dark:hover:bg-red-950/50 dark:hover:border-red-600 dark:active:bg-red-950/70",
  },
];

export const IMPORTANCE_OPTIONS = [
  { label: "Mínima", value: -2, short: "—" },
  { label: "Baixa", value: -1, short: "-" },
  { label: "Normal", value: 0, short: "•" },
  { label: "Alta", value: 1, short: "+" },
  { label: "Máxima", value: 2, short: "++" },
];

export const EARLY_FINISH_THRESHOLD = 50;
