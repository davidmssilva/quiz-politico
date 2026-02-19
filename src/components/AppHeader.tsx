import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMemo, useCallback } from "react";
import { loadSession, saveSession } from "@/lib/scoring";
import { TYPOGRAPHY } from "@/lib/typography";
import { ThemeToggle } from "@/components/ThemeToggle";

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

  const session = useMemo(() => loadSession(), []);
  const hasProgress = session && Object.keys(session.answers).length > 0;

  const handleHistoricoClick = useCallback(() => {
    if (onHistoricoClick) {
      onHistoricoClick();
    } else {
      navigate("/histórico");
    }
  }, [navigate, onHistoricoClick]);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold transition-transform group-hover:scale-105">
            P
          </div>
          <span className={TYPOGRAPHY.heading.h4}>
            Bússola Política
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          {showBussola && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/30 dark:hover:bg-primary/20 dark:hover:border-primary/50 transition-all duration-200"
              onClick={handleHistoricoClick}
            >
              Histórico
            </Button>
          )}
          {showNewQuiz && (
            <Button
              variant={hasProgress ? "default" : "outline"}
              size="sm"
              className={`text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm 
      ${
        hasProgress
          ? "bg-primary text-primary-foreground hover:scale-105 hover:shadow-lg shadow-primary/20 dark:shadow-primary/30"
          : "border-primary/20 bg-primary/5 hover:bg-primary hover:text-primary-foreground hover:border-primary dark:bg-primary/10 dark:hover:bg-primary dark:border-primary/30"
      }`}
              onClick={() => navigate("/quiz")}
            >
              {hasProgress ? (
                <>
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
                  </span>
                  Continuar Quiz
                </>
              ) : (
                "Novo Quiz"
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
