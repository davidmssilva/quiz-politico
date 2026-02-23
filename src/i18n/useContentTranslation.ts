import { useI18n } from './i18nContext';
import { getTranslatedQuestion, getTranslatedParty, getTranslatedIdeology } from './contentTranslations';
import { Question } from '@/data/questions';
import { Party } from '@/data/parties';
import { Ideology } from '@/data/ideologies';

export function useTranslatedQuestions(questions: Question[]): Question[] {
  const { locale } = useI18n();
  
  if (locale === 'pt') return questions;
  
  return questions.map(q => {
    const translated = getTranslatedQuestion(q.id, locale, q.text, q.category);
    return {
      ...q,
      text: translated.text,
      category: translated.category
    };
  });
}

export function useTranslatedParties(parties: Party[]): Party[] {
  const { locale } = useI18n();
  
  if (locale === 'pt') return parties;
  
  return parties.map(p => {
    const translated = getTranslatedParty(p.shortName, locale, p.name, p.description);
    return {
      ...p,
      name: translated.name,
      description: translated.description
    };
  });
}

export function useTranslatedIdeologies(ideologies: Ideology[]): Ideology[] {
  const { locale } = useI18n();
  
  if (locale === 'pt') return ideologies;
  
  return ideologies.map(i => {
    const translated = getTranslatedIdeology(i.name, locale, i.description);
    return {
      ...i,
      name: translated.name,
      description: translated.description
    };
  });
}
