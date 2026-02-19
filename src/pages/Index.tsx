import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { loadSession, clearSession } from "@/lib/scoring";
import { useMemo } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { TYPOGRAPHY } from "@/lib/typography";
import { Lock } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const session = useMemo(() => loadSession(), []);

  const stats = [
    { n: "100", label: "Perguntas" },
    { n: "13", label: "Partidos" },
    { n: "4", label: "Eixos" },
    { n: "8", label: "Temas" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/10">
      <AppHeader showBussola={true} showNewQuiz={false} />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full text-center space-y-10 sm:space-y-14">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className={TYPOGRAPHY.heading.h1}>
              Bússola Política{" "}
              <span className="text-primary italic">Portugal</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
              Descubra onde se situa no espectro político português de 2026
              através de uma análise profunda de vários indicadores
              programáticos, recolhidos dos programas políticos de cada partido.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto h-16 px-10 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/25 transition-all hover:scale-105 active:scale-95"
              onClick={() => navigate("/quiz")}
            >
              {session ? "Continuar Questionário" : "Começar Agora"}
            </Button>
            {session && (
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-16 px-10 rounded-2xl text-lg font-bold border-2 hover:bg-primary/10 hover:border-primary/50 hover:text-foreground/80 transition-all hover:scale-105 active:scale-95"
                onClick={() => {
                  clearSession();
                  navigate("/quiz");
                }}
              >
                Novo Início
              </Button>
            )}
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-card border border-border/60 rounded-2xl p-4 sm:p-6 transition-colors hover:border-primary/30 group"
              >
                <div className={`${TYPOGRAPHY.heading.h2} text-primary group-hover:scale-110 transition-transform`}>
                  {s.n}
                </div>
                <div className="text-[10px] sm:text-xs font-black tracking-widest text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 py-4 sm:py-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
            <div className="text-center sm:text-left">
              <p className="font-sans text-xs sm:text-sm font-semibold text-emerald-700">
                Privacidade Total
              </p>
              <p className="font-sans text-xs text-emerald-600/80 mt-0.5">
                Os seus dados não saem do seu navegador
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
