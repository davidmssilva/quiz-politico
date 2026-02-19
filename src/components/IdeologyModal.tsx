import { Ideology } from "@/data/ideologies";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TYPOGRAPHY } from "@/lib/typography";

interface Props {
  ideology: Ideology | null;
  open: boolean;
  onClose: () => void;
}

export default function IdeologyModal({ ideology, open, onClose }: Props) {
  if (!ideology) return null;

  const getLabels = (x: number, y: number) => {
    const econ = x < 0 ? "Esquerda" : x > 0 ? "Direita" : "Centrismo";
    const auth = y < 0 ? "Autoritário" : y > 0 ? "Libertário" : "Eixo Social Neutro";
    return { econ, auth };
  };

  const labels = getLabels(ideology.x, ideology.y);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] md:max-w-[600px] lg:max-w-[700px] border-2 border-border bg-card shadow-2xl">
        <DialogHeader className="space-y-4 md:space-y-6">
          <div className="space-y-2 md:space-y-3">
            <DialogTitle className={`${TYPOGRAPHY.heading.h2} md:text-3xl lg:text-4xl`}>
              {ideology.name.replace(/\n/g, " ")}
            </DialogTitle>
            <div className="flex gap-2 md:gap-3">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-2 py-0.5 md:px-3 md:py-1 rounded bg-primary/10 text-primary">
                {labels.econ}
              </span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-2 py-0.5 md:px-3 md:py-1 rounded bg-primary/10 text-primary">
                {labels.auth}
              </span>
            </div>
          </div>

          <p className="text-sm md:text-base lg:text-lg font-medium text-muted-foreground leading-relaxed antialiased">
            "{ideology.description}"
          </p>

          <div className="grid grid-cols-2 gap-px bg-border/50 rounded-lg overflow-hidden border border-border/50 mt-4 md:mt-6">
            <div className="bg-background p-3 md:p-5 lg:p-6 text-center">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 md:mb-2">
                Económico
              </p>
              <p className="text-lg md:text-2xl lg:text-3xl font-mono font-bold tracking-tighter">
                {ideology.x > 0 ? "+" : ""}
                {ideology.x.toFixed(1)}
              </p>
            </div>
            <div className="bg-background p-3 md:p-5 lg:p-6 text-center">
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1 md:mb-2">
                Social
              </p>
              <p className="text-lg md:text-2xl lg:text-3xl font-mono font-bold tracking-tighter">
                {ideology.y > 0 ? "+" : ""}
                {ideology.y.toFixed(1)}
              </p>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
