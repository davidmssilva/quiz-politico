import { Question } from "@/data/questions";
import { Party } from "@/data/parties";

export type Answer = -2 | -1 | 0 | 1 | 2;

export interface QuizResult {
  economicScore: number;
  authorityScore: number;
  socialScore: number;
  sovereigntyScore: number;
}

export interface StoredResult extends QuizResult {
  id: string;
  date: string;
  answers: Record<number, Answer>;
  importanceWeights?: Record<number, number>;
  closestParties: string[];
}

export function calculateResult(
  answers: Record<number, Answer>,
  questions: Question[],
  importanceWeights: Record<number, number> = {},
): QuizResult {
  let raw = { econ: 0, auth: 0, soc: 0, sov: 0 };
  let max = { econ: 0, auth: 0, soc: 0, sov: 0 };

  for (const q of questions) {
    const a = answers[q.id] ?? 0;
    const iw = importanceWeights[q.id] ?? 0;
    const effectiveMultiplier = Math.max(0, 1 + iw);

    raw.econ += a * (q.economicWeight || 0) * effectiveMultiplier;
    raw.auth += a * (q.authorityWeight || 0) * effectiveMultiplier;
    raw.soc += a * (q.socialWeight || 0) * effectiveMultiplier;
    raw.sov += a * (q.sovereigntyWeight || 0) * effectiveMultiplier;

    max.econ += 2 * Math.abs(q.economicWeight || 0) * effectiveMultiplier;
    max.auth += 2 * Math.abs(q.authorityWeight || 0) * effectiveMultiplier;
    max.soc += 2 * Math.abs(q.socialWeight || 0) * effectiveMultiplier;
    max.sov += 2 * Math.abs(q.sovereigntyWeight || 0) * effectiveMultiplier;
  }

  return {
    economicScore: max.econ > 0 ? (raw.econ / max.econ) * 10 : 0,
    authorityScore: max.auth > 0 ? (raw.auth / max.auth) * 10 : 0,
    socialScore: max.soc > 0 ? (raw.soc / max.soc) * 10 : 0,
    sovereigntyScore: max.sov > 0 ? (raw.sov / max.sov) * 10 : 0,
  };
}

export function partyDistance(result: QuizResult, party: Party): number {
  return Math.sqrt(
    Math.pow(result.economicScore - party.x, 2) +
      Math.pow(result.authorityScore - party.y, 2) +
      Math.pow(result.socialScore - party.z, 2) +
      Math.pow(result.sovereigntyScore - party.s, 2),
  );
}

export function rankParties(
  result: QuizResult,
  parties: Party[],
): (Party & { distance: number; affinity: number })[] {
  return parties
    .map((p) => {
      const dist = partyDistance(result, p);
      const affinity = Math.max(0, Math.min(100, 100 - dist * 2.5));
      return { ...p, distance: dist, affinity };
    })
    .sort((a, b) => b.affinity - a.affinity);
}

const SESSION_KEY = "compassQuizSession";
const RESULTS_KEY = "compassQuizResults";

export interface QuizSession {
  currentQuestionIndex: number;
  answers: Record<number, Answer>;
  importanceWeights: Record<number, number>;
  timestamp: number;
}

export function saveSession(session: QuizSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function loadSession(): QuizSession | null {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveResult(result: StoredResult) {
  const history = loadHistory();
  history.push(result);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(history.slice(-10)));
}

export function loadHistory(): StoredResult[] {
  const raw = localStorage.getItem(RESULTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function clearHistory() {
  localStorage.removeItem(RESULTS_KEY);
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}
