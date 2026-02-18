import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Question } from "@/data/questions";
import { Answer } from "@/lib/scoring";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCompletedCategories(
  answers: Record<number, Answer>,
  questions: Question[]
): string[] {
  const categorySet = new Set<string>();
  
  for (const questionId in answers) {
    const question = questions.find(q => q.id === parseInt(questionId));
    if (question) {
      categorySet.add(question.category);
    }
  }
  
  return Array.from(categorySet);
}

export function getTotalCategories(questions: Question[]): number {
  return new Set(questions.map(q => q.category)).size;
}

export function getIdeologyLabels(x: number, y: number): {
  econ: string;
  auth: string;
} {
  const safeX = isNaN(x) || x === undefined ? 0 : x;
  const safeY = isNaN(y) || y === undefined ? 0 : y;
  
  const econ = safeX < 0 ? "Esquerda" : safeX > 0 ? "Direita" : "Centrismo";
  const auth = safeY > 0 ? "Libertário" : safeY < 0 ? "Autoritário" : "Eixo Social Neutro";
  
  return { econ, auth };
}

export function getLikertActiveColor(value: Answer): string {
  switch (value) {
    case 2:
      return "bg-emerald-600 border-emerald-600 text-white";
    case 1:
      return "bg-emerald-100 border-emerald-200 text-emerald-800";
    case 0:
      return "bg-slate-200 border-slate-300 text-slate-800";
    case -1:
      return "bg-red-100 border-red-200 text-red-800";
    case -2:
      return "bg-red-600 border-red-600 text-white";
  }
}

export function generateShareUrl(
  economicScore: number,
  authorityScore: number,
  socialScore: number,
  sovereigntyScore: number
): string {
  const baseUrl = `${window.location.origin}/quiz-politico/#/resultados`;
  const params = new URLSearchParams({
    econ: economicScore.toFixed(1),
    auth: authorityScore.toFixed(1),
    soc: socialScore.toFixed(1),
    sov: sovereigntyScore.toFixed(1),
  });
  return `${baseUrl}?${params.toString()}`;
}
