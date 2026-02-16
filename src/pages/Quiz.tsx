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

// Get all unique categories
const ALL_CATEGORIES = [...new Set(questions.map((q) => q.category))];

export default function Quiz() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [importanceWeights, setImportanceWeights] = useState<
    Record<number, number>
  >({});
  const [direction, setDirection] = useState(1);
  const [showTestMenu, setShowTestMenu] = useState(false);
  const [showEarlyFinish, setShowEarlyFinish] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();

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

  const q = questions[current];

  const completedCategories = useMemo(() => {
    const answeredIds = new Set(Object.keys(answers).map(Number));
    return ALL_CATEGORIES.filter((cat) => {
      const catQuestions = questions.filter((q) => q.category === cat);
      return catQuestions.every((q) => answeredIds.has(q.id));
    });
  }, [answers]);

  const selectAnswer = useCallback(
    (value: Answer) => {
      setAnswers((prev) => ({ ...prev, [q.id]: value }));
    },
    [q.id],
  );

  const selectImportance = useCallback(
    (value: number) => {
      setImportanceWeights((prev) => ({ ...prev, [q.id]: value }));
    },
    [q.id],
  );

  const next = useCallback(() => {
    if (current < questions.length - 1) {
      setDirection(1);
      setCurrent((c) => c + 1);
    } else {
      clearSession();
      navigate("/resultados", { state: { answers, importanceWeights } });
    }
  }, [current, answers, importanceWeights, navigate]);

  const prev = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((c) => c - 1);
    }
  }, [current]);

  const handleReset = useCallback(() => {
    clearSession();
    setCurrent(0);
    setAnswers({});
    setImportanceWeights({});
  }, []);

  const handleEarlyFinish = useCallback(() => {
    setShowEarlyFinish(false);
    clearSession();
    navigate("/resultados", { state: { answers, importanceWeights } });
  }, [answers, importanceWeights, navigate]);

  const handleTestProfile = useCallback(
    (profileName: string) => {
      const profile = testProfiles.find((p) => p.name === profileName);
      if (!profile) return;
      const testAnswers = profile.generateAnswers();
      clearSession();
      navigate("/resultados", {
        state: { answers: testAnswers, importanceWeights: {} },
      });
    },
    [navigate],
  );

  const selected = answers[q.id];
  const currentImportance = importanceWeights[q.id] ?? 0;

  const questionContent = (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug min-h-[4rem]">
        {q.text}
      </h2>

      <div className="space-y-2">
        {LIKERT.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => selectAnswer(value)}
            className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-medium transition-colors
              ${
                selected === value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-card-foreground border-border hover:border-primary/40"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2 pt-2">
        <p className="text-xs text-muted-foreground font-medium">
          Importância desta questão para ti:
        </p>
        <div className="flex gap-1.5">
          {IMPORTANCE_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => selectImportance(value)}
              className={`flex-1 text-center px-1 py-2 rounded-lg border text-xs font-medium transition-colors
                ${
                  currentImportance === value
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
      <header className="border-b border-border bg-card/50">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-serif text-lg text-primary">
            Bússola Política
          </span>
          <div className="flex gap-2 flex-wrap">
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
          <QuizProgress
            current={current}
            total={questions.length}
            category={q.category}
          />

          {isMobile ? (
            <div key={q.id}>{questionContent}</div>
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={q.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.2 }}
              >
                {questionContent}
              </motion.div>
            </AnimatePresence>
          )}

          <div className="flex items-center justify-between pt-4">
            <Button variant="outline" onClick={prev} disabled={current === 0}>
              Anterior
            </Button>
            <Button onClick={next} disabled={selected === undefined}>
              {current === questions.length - 1 ? "Ver Resultados" : "Seguinte"}
            </Button>
          </div>
        </div>
      </main>

      <EarlyFinishModal
        open={showEarlyFinish}
        onClose={() => setShowEarlyFinish(false)}
        onFinish={handleEarlyFinish}
        completedCategories={completedCategories}
        totalCategories={ALL_CATEGORIES.length}
      />
    </div>
  );
}
