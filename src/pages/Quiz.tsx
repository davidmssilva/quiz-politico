import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "@/data/questions";
import { Answer, saveSession, loadSession, clearSession } from "@/lib/scoring";
import { testProfiles } from "@/data/testProfiles";
import QuizProgress from "@/components/QuizProgress";
import EarlyFinishModal from "@/components/EarlyFinishModal";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Button } from "@/components/ui/button";
import { getCompletedCategories, getTotalCategories, getLikertActiveColor } from "@/lib/utils";
import { LIKERT_SCALE, IMPORTANCE_OPTIONS, EARLY_FINISH_THRESHOLD } from "@/lib/constants";
import { TYPOGRAPHY } from "@/lib/typography";
import { updateMetaTags, SEO_CONFIGS } from "@/lib/seo";

const IS_DEV = import.meta.env.DEV;

const getInitialState = () => {
  const session = loadSession();
  if (session && Date.now() - session.timestamp < 24 * 60 * 60 * 1000) {
    return {
      current: session.currentQuestionIndex,
      answers: session.answers,
      importanceWeights: session.importanceWeights || {},
    };
  }
  return {
    current: 0,
    answers: {},
    importanceWeights: {},
  };
};

export default function Quiz() {
  const navigate = useNavigate();
  const initialState = getInitialState();
  const [current, setCurrent] = useState(initialState.current);
  const [answers, setAnswers] = useState<Record<number, Answer>>(initialState.answers);
  const [importanceWeights, setImportanceWeights] = useState<
    Record<number, number>
  >(initialState.importanceWeights);
  const [direction, setDirection] = useState(1);
  const [showTestMenu, setShowTestMenu] = useState(false);
  const [showEarlyFinish, setShowEarlyFinish] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const saveTimer = useRef<NodeJS.Timeout>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const totalSteps = questions.length + 2;
  const isStartAd = current === 0;
  const isEndAd = current === questions.length + 1;
  const questionIndex = current - 1;
  const q = questions[questionIndex];

  // SEO
  useEffect(() => {
    updateMetaTags(SEO_CONFIGS.quiz);
  }, []);

  const handleTestProfile = (profileName: string) => {
    const profile = testProfiles.find((p) => p.name === profileName);
    if (!profile) return;
    clearSession();
    const generatedAnswers = profile.generateAnswers();
    const defaultWeights: Record<number, number> = {};
    questions.forEach((q) => {
      defaultWeights[q.id] = 0;
    });
    navigate("/resultados", {
      state: { answers: generatedAnswers, importanceWeights: defaultWeights },
    });
  };

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    // Only save if there are actual changes
    if (Object.keys(answers).length > 0 || current > 0) {
      setIsSaving(true);
      saveTimer.current = setTimeout(() => {
        saveSession({
          currentQuestionIndex: current,
          answers,
          importanceWeights,
          timestamp: Date.now(),
        });
        setLastSavedTime(new Date());
        setIsSaving(false);
      }, 15000);
    }
    return () => clearTimeout(saveTimer.current);
  }, [current, answers, importanceWeights]);

  // Save on page visibility change or window blur
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, save immediately
        if (saveTimer.current) clearTimeout(saveTimer.current);
        if (Object.keys(answers).length > 0 || current > 0) {
          saveSession({
            currentQuestionIndex: current,
            answers,
            importanceWeights,
            timestamp: Date.now(),
          });
          setLastSavedTime(new Date());
          setIsSaving(false);
        }
      }
    };

    const handleWindowBlur = () => {
      // Window lost focus, save immediately
      if (saveTimer.current) clearTimeout(saveTimer.current);
      if (Object.keys(answers).length > 0 || current > 0) {
        saveSession({
          currentQuestionIndex: current,
          answers,
          importanceWeights,
          timestamp: Date.now(),
        });
        setLastSavedTime(new Date());
        setIsSaving(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [current, answers, importanceWeights]);

  const formatLastSavedTime = (date: Date | null): string => {
    if (!date) return "";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    
    if (diffSecs < 60) return "há uns segundos";
    if (diffMins < 60) return `há ${diffMins}m`;
    return "há pouco";
  };

  const next = useCallback(() => {
    if (current < totalSteps - 1) {
      setDirection(1);
      setCurrent((c) => c + 1);
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "instant" });
    } else {
      // Save immediately before navigating to results
      saveSession({
        currentQuestionIndex: current,
        answers,
        importanceWeights,
        timestamp: Date.now(),
      });
      clearSession();
      navigate("/resultados", { state: { answers, importanceWeights } });
    }
  }, [current, answers, importanceWeights, navigate, totalSteps]);

  const selectAnswer = useCallback((value: Answer) => {
    setAnswers((p) => ({ ...p, [q.id]: value }));
    
    // Auto-advance after a short delay to allow user to see their selection
    setTimeout(() => {
      next();
    }, 400);
  }, [q?.id, next]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!q) return;
    
    // Arrow keys for Likert scale
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const currentIndex = LIKERT_SCALE.findIndex(opt => opt.value === answers[q.id]);
      if (currentIndex > 0) {
        selectAnswer(LIKERT_SCALE[currentIndex - 1].value);
      }
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const currentIndex = LIKERT_SCALE.findIndex(opt => opt.value === answers[q.id]);
      if (currentIndex < LIKERT_SCALE.length - 1) {
        selectAnswer(LIKERT_SCALE[currentIndex + 1].value);
      } else if (currentIndex === -1) {
        selectAnswer(LIKERT_SCALE[0].value);
      }
    }
  }, [q, answers, selectAnswer]);

  const prev = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((c) => c - 1);
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [current]);

  const handleHistoricoClick = useCallback(() => {
    // Force save immediately before navigating
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setIsSaving(true);
    
    saveSession({
      currentQuestionIndex: current,
      answers,
      importanceWeights,
      timestamp: Date.now(),
    });
    setLastSavedTime(new Date());
    setIsSaving(false);
    
    // Navigate after a brief delay to show the save happened
    setTimeout(() => {
      navigate("/histórico");
    }, 300);
  }, [current, answers, importanceWeights, navigate]);

  const handleEarlyFinish = useCallback(() => {
    // Save immediately before navigating to results
    saveSession({
      currentQuestionIndex: current,
      answers,
      importanceWeights,
      timestamp: Date.now(),
    });
    clearSession();
    navigate("/resultados", { state: { answers, importanceWeights } });
  }, [answers, importanceWeights, navigate, current]);

  const renderAd = (title: string, desc: string, btn: string) => (
    <div className="w-full max-w-xl mx-auto space-y-4 sm:space-y-6">
      <div className="space-y-1 text-center sm:text-left">
        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-full">
          Patrocinado
        </span>
        <h2 className="font-sans text-xl sm:text-3xl md:text-4xl text-foreground font-bold leading-tight">
          {title}
        </h2>
        <p className="text-muted-foreground text-xs sm:text-base">{desc}</p>
      </div>
      <div className="aspect-video w-full bg-card border-2 border-dashed border-border rounded-2xl flex items-center justify-center p-4">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1926080014819451"
          data-ad-slot="1839039008"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      <Button
        className="w-full h-12 sm:h-16 text-base sm:text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 transition-transform active:scale-95"
        onClick={next}
      >
        {btn}
      </Button>
    </div>
  );

  return (
    <div className="h-screen max-h-screen bg-background flex flex-col font-sans antialiased overflow-hidden">
      <AppHeader showNewQuiz={false} onHistoricoClick={handleHistoricoClick} />

      {/* Save Status Indicator */}
      {(Object.keys(answers).length > 0 || current > 0) && (
        <div className="px-4 py-2 bg-card/50 border-b border-border/50 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          {isSaving ? (
            <>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <span>{lastSavedTime ? `Guardado ${formatLastSavedTime(lastSavedTime)}` : "Por guardar..."}</span>
            </>
          ) : lastSavedTime ? (
            <>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span>Guardado Agora</span>
            </>
          ) : null}
        </div>
      )}

      {IS_DEV && (
        <div className="relative z-[60] px-4 py-1">
          <button
            onClick={() => setShowTestMenu(!showTestMenu)}
            className="text-[10px] text-accent font-medium hover:text-accent/80 px-2 py-0.5 rounded border border-accent/30"
          >
            🧪 Teste
          </button>
          {showTestMenu && (
            <div className="absolute left-4 top-full mt-1 bg-card border border-border rounded-lg p-1 z-50 min-w-[180px] space-y-0.5 shadow-xl">
              {testProfiles.map((profile) => (
                <button
                  key={profile.name}
                  onClick={() => handleTestProfile(profile.name)}
                  className="w-full text-left px-2 py-1.5 text-xs rounded-md hover:bg-secondary transition-colors"
                >
                  <div className="font-medium text-card-foreground">
                    {profile.label}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <main
        ref={scrollContainerRef}
        className="flex-1 flex flex-col overflow-y-auto px-4 py-2 sm:py-4 md:py-6 touch-pan-y"
      >
        <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col justify-center">
          {!isStartAd && !isEndAd && (
            <div className="mb-3 sm:mb-4 md:mb-6">
              <QuizProgress
                current={questionIndex}
                total={questions.length}
                category={q.category}
              />
            </div>
          )}

          <div className="relative flex-1 sm:flex-initial min-h-0">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-full"
              >
                {isStartAd &&
                  renderAd(
                    "Bem-vindo à Bússola 2026",
                    "O maior teste de afinidade política em Portugal.",
                    "Começar Questionário",
                  )}
                {isEndAd &&
                  renderAd(
                    "Resultados Prontos",
                    "Concluímos a análise do seu perfil ideológico.",
                    "Ver os Meus Resultados",
                  )}

                {!isStartAd && !isEndAd && (
                  <div className="space-y-3 sm:space-y-4" onKeyDown={handleKeyDown}>
                    <h2 className={TYPOGRAPHY.question.lg}>
                      {q.text}
                    </h2>

                    <div className="grid gap-1.5 sm:gap-2" role="radiogroup" aria-label="Resposta">
                      {LIKERT_SCALE.map((opt, idx) => {
                        const isSelected = answers[q.id] === opt.value;
                        const activeColor = getLikertActiveColor(opt.value);

                        return (
                          <button
                            key={opt.value}
                            onClick={() => selectAnswer(opt.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                selectAnswer(opt.value);
                              }
                            }}
                            role="radio"
                            aria-checked={isSelected}
                            tabIndex={0}
                            className={`w-full text-left px-4 py-3 sm:py-4 rounded-xl border-2 transition-all flex items-center justify-between group tap-highlight-transparent focus:ring-2 focus:ring-primary focus:ring-offset-2
                              ${
                                isSelected
                                  ? `${activeColor} shadow-md scale-[1.01] z-10`
                                  : `bg-card border-border text-foreground/80 ${opt.color}`
                              }`}
                          >
                            <span className="text-xs sm:text-sm md:text-base font-medium">
                              {opt.label}
                            </span>
                            {isSelected && (
                              <div
                                className={`h-1.5 w-1.5 rounded-full ${Math.abs(opt.value) === 2 ? "bg-white" : "bg-current"}`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex bg-secondary/40 p-1.5 rounded-xl gap-2 w-full max-w-md mx-auto" role="group" aria-label="Importância da pergunta">
                      {IMPORTANCE_OPTIONS.map((opt, idx) => {
                        const isSelected =
                          (importanceWeights[q.id] ?? 0) === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() =>
                              setImportanceWeights((p) => ({
                                ...p,
                                [q.id]: opt.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "ArrowLeft" && idx > 0) {
                                e.preventDefault();
                                setImportanceWeights((p) => ({
                                  ...p,
                                  [q.id]: IMPORTANCE_OPTIONS[idx - 1].value,
                                }));
                              } else if (e.key === "ArrowRight" && idx < IMPORTANCE_OPTIONS.length - 1) {
                                e.preventDefault();
                                setImportanceWeights((p) => ({
                                  ...p,
                                  [q.id]: IMPORTANCE_OPTIONS[idx + 1].value,
                                }));
                              }
                            }}
                            role="radio"
                            aria-checked={isSelected}
                            aria-label={`Importância: ${opt.label}`}
                            tabIndex={0}
                            title={opt.label}
                            className={`flex-1 flex flex-col items-center justify-center py-1.5 sm:py-2 rounded-lg transition-all duration-200 border-2 focus:ring-2 focus:ring-primary focus:ring-offset-2
                              ${
                                isSelected
                                  ? "bg-background border-primary shadow-md text-primary scale-[1.02] z-10"
                                  : "bg-transparent border-transparent text-muted-foreground hover:bg-background/40 hover:border-border"
                              }`}
                          >
                            <span className="text-sm sm:text-base font-bold leading-none">
                              {opt.short}
                            </span>
                            <span className="text-[8px] font-black uppercase mt-0.5 tracking-wider">
                              {opt.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {!isStartAd && !isEndAd && (
            <div className="flex items-center justify-between mt-4 sm:mt-6 pt-4 border-t border-border/40">
              <Button
                variant="ghost"
                onClick={prev}
                aria-label="Pergunta anterior"
                className="px-4 h-10 text-xs sm:text-sm font-bold text-muted-foreground"
              >
                Anterior
              </Button>
              <div className="flex items-center gap-2">
                {questionIndex >= EARLY_FINISH_THRESHOLD && (
                  <Button
                    variant="outline"
                    onClick={() => setShowEarlyFinish(true)}
                    aria-label="Terminar questionário agora"
                    className="px-4 h-10 text-xs sm:text-sm font-bold"
                  >
                    Terminar Agora
                  </Button>
                )}
                <div className="text-[10px] font-bold text-muted-foreground/40 hidden sm:block uppercase tracking-widest" aria-live="polite">
                  {current} / {questions.length}
                </div>
              </div>
              <Button
                onClick={next}
                disabled={answers[q.id] === undefined}
                aria-label={current === questions.length ? "Ver resultados" : "Próxima pergunta"}
                className="px-6 h-10 text-xs sm:text-sm font-bold rounded-lg shadow-lg"
              >
                {current === questions.length ? "Finalizar" : "Seguinte"}
              </Button>
            </div>
          )}
        </div>
      </main>
      <AppFooter />
      <EarlyFinishModal
        open={showEarlyFinish}
        onClose={() => setShowEarlyFinish(false)}
        onFinish={handleEarlyFinish}
        completedCategories={getCompletedCategories(answers, questions)}
        totalCategories={getTotalCategories(questions)}
      />
    </div>
  );
}
