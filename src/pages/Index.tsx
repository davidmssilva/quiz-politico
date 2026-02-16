import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { loadSession, loadHistory } from "@/lib/scoring";
import { useMemo } from "react";

const Index = () => {
  const navigate = useNavigate();
  const session = useMemo(() => loadSession(), []);
  const history = useMemo(() => loadHistory(), []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-serif text-lg text-primary">Bússola Política</span>
          <Button variant="outline" size="sm" onClick={() => navigate("/bussola")}>
            Bússola
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <motion.div
          className="max-w-2xl text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
              Bússola Política de Portugal
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Descubra a sua posição no espectro político português com 100 perguntas sobre economia, saúde, educação, ambiente e muito mais.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="text-base px-8 py-6 rounded-xl"
              onClick={() => navigate("/quiz")}
            >
              {session ? "Continuar Questionário" : "Começar Questionário"}
            </Button>
            {session && (
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 rounded-xl"
                onClick={() => {
                  navigate("/quiz");
                }}
              >
                Recomeçar
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
            {[
              { n: "100", label: "Perguntas" },
              { n: "13", label: "Partidos" },
              { n: "4", label: "Eixos" },
              { n: "10", label: "Categorias" },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-lg p-4">
                <div className="font-serif text-2xl text-primary">{s.n}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        Baseado nos programas oficiais dos partidos portugueses. Apenas para fins informativos.
      </footer>
    </div>
  );
};

export default Index;
