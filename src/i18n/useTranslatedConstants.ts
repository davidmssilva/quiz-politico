import { useI18n } from './i18nContext';
import { Answer } from '@/lib/scoring';

export function useTranslatedLikertScale() {
  const { t } = useI18n();
  
  return [
    {
      label: t('likert.stronglyAgree'),
      value: 2 as Answer,
      color: "hover:border-emerald-500 hover:bg-emerald-50 active:bg-emerald-100 dark:hover:bg-emerald-950/50 dark:hover:border-emerald-600 dark:active:bg-emerald-950/70",
    },
    {
      label: t('likert.agree'),
      value: 1 as Answer,
      color: "hover:border-emerald-200 hover:bg-emerald-50/50 active:bg-emerald-50/80 dark:hover:bg-emerald-950/30 dark:hover:border-emerald-700 dark:active:bg-emerald-950/50",
    },
    {
      label: t('likert.neutral'),
      value: 0 as Answer,
      color: "hover:border-slate-400 hover:bg-slate-100 active:bg-slate-150 dark:hover:bg-slate-800/50 dark:hover:border-slate-600 dark:active:bg-slate-800/70",
    },
    {
      label: t('likert.disagree'),
      value: -1 as Answer,
      color: "hover:border-red-200 hover:bg-red-50/50 active:bg-red-50/80 dark:hover:bg-red-950/30 dark:hover:border-red-700 dark:active:bg-red-950/50",
    },
    {
      label: t('likert.stronglyDisagree'),
      value: -2 as Answer,
      color: "hover:border-red-500 hover:bg-red-50 active:bg-red-100 dark:hover:bg-red-950/50 dark:hover:border-red-600 dark:active:bg-red-950/70",
    },
  ];
}

export function useTranslatedImportanceOptions() {
  const { t } = useI18n();
  
  return [
    { label: t('importance.veryLow'), value: -2, short: "—" },
    { label: t('importance.low'), value: -1, short: "-" },
    { label: t('importance.medium'), value: 0, short: "•" },
    { label: t('importance.high'), value: 1, short: "+" },
    { label: t('importance.veryHigh'), value: 2, short: "++" },
  ];
}
