import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "@/data/questions";
import { Answer, saveSession, loadSession, clearSession } from "@/lib/scoring";
import { testProfiles } from "@/data/testProfiles";
import QuizProgress from "@/components/QuizProgress";
import EarlyFinishModal from "@/components/EarlyFinishModal";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const LIKERT: { label: string; value: Answer }[] = [
  { label: "Concordo totalmente", value: 2 },
  { label: "Concordo", value: 1 },
  { label: "Neutro", value: 0 },
  { label: "Discordo", value: -1 },
  { label: "Discordo totalmente", value: -2 },
];

const IMPORTANCE_OPTIONS = [
  { label: "Muito menos", value: -2 },
  { label: "Menos", value: -1 },
  { label: "Normal", value: 0 },
  { label: "Mais", value: 1 },
  { label: "Muito mais", value: 2 },
];

const IS_DEV = import.meta.env.DEV;
const ALL_CATEGORIES = [...new Set(questions.map((q) => q.category))];

export default function Quiz() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // current: 0 = Ad Inicial, 1 a N = Perguntas, N+1 = Ad Final
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [importanceWeights, setImportanceWeights] = useState<
    Record<number, number>
  >({});
  const [direction, setDirection] = useState(1);
  const [showTestMenu, setShowTestMenu] = useState(false);
  const [showEarlyFinish, setShowEarlyFinish] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();

  const totalSteps = questions.length + 2;
  const isStartAd = current === 0;
  const isEndAd = current === questions.length + 1;
  const questionIndex = current - 1;
  const q = questions[questionIndex];

  useEffect(() => {
    const session = loadSession();
    if (session) {
      setCurrent(session.currentQuestionIndex);
      setAnswers(session.answers);
      if (session.importanceWeights) {
        setImportanceWeights(session.importanceWeights);
      }
    }
  }, []);

  const debouncedSave = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveSession({
        currentQuestionIndex: current,
        answers,
        importanceWeights,
        timestamp: Date.now(),
      });
    }, 200);
  }, [current, answers, importanceWeights]);

  useEffect(() => {
    debouncedSave();
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [debouncedSave]);

  const selectAnswer = (value: Answer) =>
    setAnswers((p) => ({ ...p, [q.id]: value }));
  const selectImportance = (value: number) =>
    setImportanceWeights((p) => ({ ...p, [q.id]: value }));

  const next = useCallback(() => {
    if (current < totalSteps - 1) {
      setDirection(1);
      setCurrent((c) => c + 1);
    } else {
      clearSession();
      navigate("/resultados", { state: { answers, importanceWeights } });
    }
  }, [current, answers, importanceWeights, navigate, totalSteps]);

  const prev = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((c) => c - 1);
    }
  }, [current]);

  const handleEarlyFinish = useCallback(() => {
    setShowEarlyFinish(false);
    clearSession();
    navigate("/resultados", { state: { answers, importanceWeights } });
  }, [answers, importanceWeights, navigate]);

  const handleTestProfile = (profileName: string) => {
    const profile = testProfiles.find((p) => p.name === profileName);
    if (!profile) return;
    clearSession();
    navigate("/resultados", {
      state: { answers: profile.generateAnswers(), importanceWeights: {} },
    });
  };

  // --- RENDERING LOGIC ---

  const renderAdContent = (
    title: string,
    description: string,
    btnText: string,
  ) => (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">
          Patrocinado
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="aspect-video w-full bg-card border border-dashed border-border rounded-xl flex items-center justify-center overflow-hidden">
        <div className="text-center p-4">
          <div className="w-full h-[250px] bg-muted/50 rounded flex items-center justify-center">
            {
              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-1926080014819451"
                data-ad-slot="1839039008"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            }
          </div>
        </div>
      </div>

      <Button
        className="w-full py-7 text-lg shadow-lg shadow-primary/20"
        onClick={next}
      >
        {btnText}
      </Button>
    </div>
  );

  const renderQuestion = () => (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug min-h-[4rem]">
        {q.text}
      </h2>
      <div className="space-y-2">
        {LIKERT.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => selectAnswer(value)}
            className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-medium transition-all
              ${
                answers[q.id] === value
                  ? "bg-primary text-primary-foreground border-primary shadow-md scale-[1.01]"
                  : "bg-card text-card-foreground border-border hover:border-primary/40"
              }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-2 pt-2 border-t border-border/50">
        <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">
          Importância desta questão:
        </p>
        <div className="flex gap-1.5">
          {IMPORTANCE_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => selectImportance(value)}
              className={`flex-1 text-center px-1 py-2.5 rounded-lg border text-[10.5px] font-bold transition-colors
                ${
                  (importanceWeights[q.id] ?? 0) === value
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-card text-muted-foreground border-border hover:border-accent/40"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-serif text-lg text-primary">
            Bússola Política
          </span>
          <div className="flex gap-2">
            {IS_DEV && (
              <div className="relative">
                <button
                  onClick={() => setShowTestMenu(!showTestMenu)}
                  className="text-sm text-accent font-medium hover:text-accent/80 transition-colors px-2 py-1 rounded border border-accent/30"
                >
                  🧪 Teste
                </button>
                {showTestMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg p-2 z-50 min-w-[180px] space-y-1">
                    {testProfiles.map((profile) => (
                      <button
                        key={profile.name}
                        onClick={() => handleTestProfile(profile.name)}
                        className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors"
                      >
                        <div className="font-medium text-card-foreground">
                          {profile.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {profile.description}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEarlyFinish(true)}
            >
              Terminar Agora
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/bussola")}
            >
              Bússola
            </Button>

            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl space-y-8">
          {/* Só mostra o progresso se estiver nas perguntas reais */}
          {!isStartAd && !isEndAd && (
            <QuizProgress
              current={questionIndex}
              total={questions.length}
              category={q.category}
            />
          )}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {isStartAd &&
                renderAdContent(
                  "Bem-vindo à Bússola Política 2026",
                  "Antes de começarmos, veja esta sugestão dos nossos parceiros.",
                  "Começar Questionário",
                )}

              {isEndAd &&
                renderAdContent(
                  "Quase a terminar!",
                  "Antes de terminar, veja esta sugestão dos nossos parceiros.",
                  "Ver os Meus Resultados",
                )}

              {!isStartAd && !isEndAd && renderQuestion()}
            </motion.div>
          </AnimatePresence>

          {!isStartAd && !isEndAd && (
            <div className="flex items-center justify-between pt-4">
              <Button variant="outline" onClick={prev}>
                Anterior
              </Button>
              <Button onClick={next} disabled={answers[q.id] === undefined}>
                {current === questions.length ? "Último Passo" : "Seguinte"}
              </Button>
            </div>
          )}
        </div>
      </main>

      <EarlyFinishModal
        open={showEarlyFinish}
        onClose={() => setShowEarlyFinish(false)}
        onFinish={handleEarlyFinish}
        completedCategories={[]} // Simplificado para o exemplo
        totalCategories={ALL_CATEGORIES.length}
      />
    </div>
  );
}
