import { Question } from "@/data/questions";
import { Party } from "@/data/parties";

export type Answer = -2 | -1 | 0 | 1 | 2;

export interface QuizResult {
  economicScore: number;
  authorityScore: number;
}

export interface StoredResult {
  id: string;
  date: string;
  economicScore: number;
  authorityScore: number;
  answers: Record<number, Answer>;
  importanceWeights?: Record<number, number>;
  closestParties: string[];
}

/**
 * Calculate result with user-controlled importance weights.
 * Formula: score += answerValue × axisWeight × (1 + importanceWeight)
 * importanceWeight range: -2 to +2 (default 0 = normal)
 */
export function calculateResult(
  answers: Record<number, Answer>,
  questions: Question[],
  importanceWeights: Record<number, number> = {}
): QuizResult {
  let rawEconomic = 0;
  let rawAuthority = 0;
  let maxEconomic = 0;
  let maxAuthority = 0;

  for (const q of questions) {
    const a = answers[q.id] ?? 0;
    const iw = importanceWeights[q.id] ?? 0;
    const effectiveMultiplier = Math.max(0, 1 + iw); // clamp to non-negative
    rawEconomic += a * q.economicWeight * effectiveMultiplier;
    rawAuthority += a * q.authorityWeight * effectiveMultiplier;
    maxEconomic += 2 * Math.abs(q.economicWeight) * effectiveMultiplier;
    maxAuthority += 2 * Math.abs(q.authorityWeight) * effectiveMultiplier;
  }

  const economicScore = maxEconomic > 0 ? (rawEconomic / maxEconomic) * 10 : 0;
  const authorityScore = maxAuthority > 0 ? (rawAuthority / maxAuthority) * 10 : 0;

  return { economicScore, authorityScore };
}

export function partyDistance(result: QuizResult, party: Party): number {
  return Math.sqrt(
    Math.pow(result.economicScore - party.x, 2) +
    Math.pow(result.authorityScore - party.y, 2)
  );
}

export function rankParties(result: QuizResult, parties: Party[]): (Party & { distance: number })[] {
  return parties
    .map((p) => ({ ...p, distance: partyDistance(result, p) }))
    .sort((a, b) => a.distance - b.distance);
}

// --- Session persistence ---

const SESSION_KEY = "compassQuizSession";

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
    return JSON.parse(raw) as QuizSession;
  } catch {
    return null;
  }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

// --- Result history ---

const RESULTS_KEY = "compassQuizResults";

export function saveResult(result: StoredResult) {
  const history = loadHistory();
  history.push(result);
  // Keep only last 10
  const trimmed = history.slice(-10);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(trimmed));
}

export function loadHistory(): StoredResult[] {
  const raw = localStorage.getItem(RESULTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as StoredResult[];
    return parsed.slice(-10);
  } catch {
    return [];
  }
}

export function clearHistory() {
  localStorage.removeItem(RESULTS_KEY);
}
