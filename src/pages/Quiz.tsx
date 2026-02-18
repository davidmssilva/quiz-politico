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

const LIKERT: { label: string; value: Answer; color: string }[] = [
  {
    label: "Concordo totalmente",
    value: 2,
    color: "hover:border-emerald-500 hover:bg-emerald-50 active:bg-emerald-100",
  },
  {
    label: "Concordo",
    value: 1,
    color:
      "hover:border-emerald-200 hover:bg-emerald-50/50 active:bg-emerald-50/80",
  },
  {
    label: "Neutro",
    value: 0,
    color: "hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100",
  },
  {
    label: "Discordo",
    value: -1,
    color: "hover:border-red-200 hover:bg-red-50/50 active:bg-red-50/80",
  },
  {
    label: "Discordo totalmente",
    value: -2,
    color: "hover:border-red-500 hover:bg-red-50 active:bg-red-100",
  },
];

const IMPORTANCE_OPTIONS = [
  { label: "Mínima", value: -2, short: "—" },
  { label: "Baixa", value: -1, short: "-" },
  { label: "Normal", value: 0, short: "•" },
  { label: "Alta", value: 1, short: "+" },
  { label: "Máxima", value: 2, short: "++" },
];

const IS_DEV = import.meta.env.DEV;

export default function Quiz() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [importanceWeights, setImportanceWeights] = useState<
    Record<number, number>
  >({});
  const [direction, setDirection] = useState(1);
  const [showTestMenu, setShowTestMenu] = useState(false);
  const [showEarlyFinish, setShowEarlyFinish] = useState(false);
  const saveTimer = useRef<NodeJS.Timeout>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const totalSteps = questions.length + 2;
  const isStartAd = current === 0;
  const isEndAd = current === questions.length + 1;
  const questionIndex = current - 1;
  const q = questions[questionIndex];

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
    const session = loadSession();
    if (session) {
      setCurrent(session.currentQuestionIndex);
      setAnswers(session.answers);
      setImportanceWeights(session.importanceWeights || {});
    }
  }, []);

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveSession({
        currentQuestionIndex: current,
        answers,
        importanceWeights,
        timestamp: Date.now(),
      });
    }, 1000); // Aumentado para 1s para diminuir escrita no disco em mobile
    return () => clearTimeout(saveTimer.current);
  }, [current, answers, importanceWeights]);

  const selectAnswer = (value: Answer) => {
    setAnswers((p) => ({ ...p, [q.id]: value }));
  };

  const next = useCallback(() => {
    if (current < totalSteps - 1) {
      setDirection(1);
      setCurrent((c) => c + 1);
      // "instant" é vital para mobile não engasgar durante a transição
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "instant" });
    } else {
      clearSession();
      navigate("/resultados", { state: { answers, importanceWeights } });
    }
  }, [current, answers, importanceWeights, navigate, totalSteps]);

  const prev = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((c) => c - 1);
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [current]);

  const renderAd = (title: string, desc: string, btn: string) => (
    <div className="w-full max-w-xl mx-auto space-y-4 sm:space-y-6">
      <div className="space-y-1 text-center sm:text-left">
        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-full">
          Patrocinado
        </span>
        <h2 className="font-serif text-xl sm:text-3xl md:text-4xl text-foreground font-bold leading-tight">
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
      <AppHeader showNewQuiz={false} />

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
            <div className="mb-4 sm:mb-6 md:mb-8">
              <QuizProgress
                current={questionIndex}
                total={questions.length}
                category={q.category}
              />
            </div>
          )}

          <div className="relative flex-1 sm:flex-initial">
            {/* initial={false} evita animação na primeira carga, poupando CPU */}
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 20 }}
                /* Transição simplificada para performance mobile */
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
                  <div className="space-y-4 sm:space-y-6">
                    <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-snug text-center sm:text-left">
                      {q.text}
                    </h2>

                    <div className="grid gap-1.5 sm:gap-2">
                      {LIKERT.map((opt) => {
                        const isSelected = answers[q.id] === opt.value;
                        const activeColor =
                          opt.value === 2
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : opt.value === 1
                              ? "bg-emerald-100 border-emerald-200 text-emerald-800"
                              : opt.value === 0
                                ? "bg-slate-200 border-slate-300 text-slate-800"
                                : opt.value === -1
                                  ? "bg-red-100 border-red-200 text-red-800"
                                  : "bg-red-600 border-red-600 text-white";

                        return (
                          <button
                            key={opt.value}
                            onClick={() => selectAnswer(opt.value)}
                            className={`w-full text-left px-4 py-3 sm:py-4 rounded-xl border-2 transition-all flex items-center justify-between group tap-highlight-transparent
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

                    <div className="flex bg-secondary/40 p-1.5 rounded-xl gap-2 w-full max-w-md mx-auto">
                      {IMPORTANCE_OPTIONS.map((opt) => {
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
                            className={`flex-1 flex flex-col items-center justify-center py-1.5 sm:py-2 rounded-lg transition-all duration-200 border-2
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
            <div className="flex items-center justify-between mt-6 sm:mt-8 pt-4 border-t border-border/40">
              <Button
                variant="ghost"
                onClick={prev}
                className="px-4 h-10 text-xs sm:text-sm font-bold text-muted-foreground"
              >
                Anterior
              </Button>
              <div className="text-[10px] font-bold text-muted-foreground/40 hidden sm:block uppercase tracking-widest">
                {current} / {questions.length}
              </div>
              <Button
                onClick={next}
                disabled={answers[q.id] === undefined}
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
        onFinish={() =>
          navigate("/resultados", { state: { answers, importanceWeights } })
        }
        completedCategories={[]}
        totalCategories={10}
      />
    </div>
  );
}
