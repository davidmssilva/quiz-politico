import { useI18n } from "@/i18n/i18nContext";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(locale === 'pt' ? 'en' : 'pt')}
      className="text-xs font-medium hover:bg-primary/10 hover:text-primary transition-all duration-200"
      aria-label={locale === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      {locale === 'pt' ? 'EN' : 'PT'}
    </Button>
  );
}
