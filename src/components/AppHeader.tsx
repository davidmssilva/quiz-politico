import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMemo, useCallback } from "react";
import { loadSession, saveSession } from "@/lib/scoring";
import { TYPOGRAPHY } from "@/lib/typography";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useI18n } from "@/i18n/i18nContext";
import { History, Users, Play } from "lucide-react";

interface AppHeaderProps {
  showBussola?: boolean;
  showNewQuiz?: boolean;
  onHistoricoClick?: () => void;
}

export function AppHeader({
  showBussola = true,
  showNewQuiz = true,
  onHistoricoClick,
}: AppHeaderProps) {
  const navigate = useNavigate();
  const { t } = useI18n();

  const session = useMemo(() => loadSession(), []);
  const hasProgress = session && Object.keys(session.answers).length > 0;

  const handleHistoricoClick = useCallback(() => {
    if (onHistoricoClick) {
      onHistoricoClick();
    } else {
      // Pass state to indicate we should select based on ongoing quiz
      navigate("/histórico", { state: { selectOngoing: true } });
    }
  }, [navigate, onHistoricoClick]);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-serif font-bold transition-transform group-hover:scale-105">
            P
          </div>
          <span className="font-serif text-sm sm:text-base md:text-lg font-bold hidden min-[400px]:block">
            Bússola Política
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageToggle />
          <ThemeToggle />
          {showBussola && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 dark:hover:bg-primary/20 dark:hover:border-primary/50 transition-all duration-200 px-2 sm:px-3"
                onClick={handleHistoricoClick}
                title={t('nav.history')}
              >
                <History className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">{t('nav.history')}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 dark:hover:bg-primary/20 dark:hover:border-primary/50 transition-all duration-200 px-2 sm:px-3"
                onClick={() => navigate("/partidos")}
                title={t('nav.parties')}
              >
                <Users className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">{t('nav.parties')}</span>
              </Button>
            </>
          )}
          {showNewQuiz && (
            <Button
              variant={hasProgress ? "default" : "outline"}
              size="sm"
              className={`text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm px-2 sm:px-3
      ${
        hasProgress
          ? "bg-primary text-primary-foreground hover:scale-105 hover:shadow-lg shadow-primary/20 dark:shadow-primary/30"
          : "border-primary/20 bg-primary/5 hover:bg-primary/10 hover:text-primary hover:border-primary/30 dark:bg-primary/10 dark:hover:bg-primary/20 dark:hover:border-primary/50"
      }`}
              onClick={() => navigate("/quiz")}
              title={hasProgress ? t('quiz.continue') : t('nav.quiz')}
            >
              {hasProgress ? (
                <>
                  <span className="relative flex h-2 w-2 sm:mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
                  </span>
                  <span className="hidden sm:inline">{t('quiz.continue')}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 sm:mr-1.5" />
                  <span className="hidden sm:inline">{t('nav.quiz')}</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
