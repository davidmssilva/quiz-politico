import { Answer } from "@/lib/scoring";
import { questions } from "./questions";

export interface TestProfile {
  name: string;
  label: string;
  description: string;
  generateAnswers: () => Record<number, Answer>;
}

function fillAll(value: Answer): Record<number, Answer> {
  const answers: Record<number, Answer> = {};
  for (const q of questions) {
    answers[q.id] = value;
  }
  return answers;
}

function fillByWeights(
  econBias: number,
  authBias: number
): Record<number, Answer> {
  const answers: Record<number, Answer> = {};
  for (const q of questions) {
    let score = 0;
    if (q.economicWeight !== 0) {
      score += econBias * Math.sign(q.economicWeight);
    }
    if (q.authorityWeight !== 0) {
      score += authBias * Math.sign(q.authorityWeight);
    }
    // Clamp to valid Likert values
    const clamped = Math.max(-2, Math.min(2, Math.round(score))) as Answer;
    answers[q.id] = clamped;
  }
  return answers;
}

function fillRandom(): Record<number, Answer> {
  const values: Answer[] = [-2, -1, 0, 1, 2];
  const answers: Record<number, Answer> = {};
  for (const q of questions) {
    answers[q.id] = values[Math.floor(Math.random() * values.length)];
  }
  return answers;
}

export const testProfiles: TestProfile[] = [
  {
    name: "centrist",
    label: "Centrista",
    description: "Posição neutra em todos os eixos",
    generateAnswers: () => fillAll(0),
  },
  {
    name: "left",
    label: "Esquerda",
    description: "Economia socialista, libertário moderado",
    generateAnswers: () => fillByWeights(-2, 1),
  },
  {
    name: "right",
    label: "Direita",
    description: "Economia de mercado, autoritário moderado",
    generateAnswers: () => fillByWeights(2, -1),
  },
  {
    name: "libertarian",
    label: "Libertário",
    description: "Máxima liberdade pessoal, economia mista",
    generateAnswers: () => fillByWeights(0, 2),
  },
  {
    name: "authoritarian",
    label: "Autoritário",
    description: "Máximo controlo estatal",
    generateAnswers: () => fillByWeights(0, -2),
  },
  {
    name: "random",
    label: "Aleatório",
    description: "Respostas aleatórias",
    generateAnswers: fillRandom,
  },
];
