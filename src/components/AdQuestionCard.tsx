// components/AdQuestionCard.tsx
import { Button } from "@/components/ui/button";
import { TYPOGRAPHY } from "@/lib/typography";

export default function AdQuestionCard({
  onNext,
  isLast = false,
}: {
  onNext: () => void;
  isLast?: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-bold text-primary uppercase tracking-wider">
          Conteúdo Patrocinado
        </span>
        <h2 className={TYPOGRAPHY.heading.h2}>
          Visite os nossos parceiros para apoiar este projeto gratuito.
        </h2>
      </div>

      <div className="min-h-[250px] w-full bg-muted/30 rounded-xl flex flex-col items-center justify-center border border-dashed border-border p-4">
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
          Publicidade
        </span>
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
        <div id="adsense-slot">
          <p className="text-sm text-muted-foreground">
            Publicidade AdSense aqui
          </p>
        </div>
      </div>

      <div className="pt-4">
        <Button className="w-full py-6 text-lg" onClick={onNext}>
          {isLast ? "Ver os meus Resultados" : "Começar o Quiz"}
        </Button>
      </div>
    </div>
  );
}
