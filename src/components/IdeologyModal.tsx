import { Ideology } from "@/data/ideologies";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getIdeologyLabels } from "@/lib/utils";

interface Props {
  ideology: Ideology | null;
  open: boolean;
  onClose: () => void;
}

export default function IdeologyModal({ ideology, open, onClose }: Props) {
  if (!ideology) return null;

  const labels = getIdeologyLabels(ideology.x, ideology.y);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] border-none bg-background/95 backdrop-blur-md shadow-2xl">
        <DialogHeader className="space-y-4">
          <div className="space-y-1">
            <DialogTitle className="text-2xl font-light tracking-tight">
              {ideology.name.replace(/\n/g, " ")}
            </DialogTitle>
            <div className="flex gap-2">
              <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                {labels.econ}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                {labels.auth}
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed italic">
            "{ideology.description}"
          </p>

          <div className="grid grid-cols-2 gap-px bg-border/50 rounded-lg overflow-hidden border border-border/50 mt-4">
            <div className="bg-background p-3 text-center">
              <p className="text-[10px] uppercase text-muted-foreground mb-1">
                Económico
              </p>
              <p className="text-lg font-mono tracking-tighter">
                {ideology.x > 0 ? "+" : ""}
                {ideology.x.toFixed(1)}
              </p>
            </div>
            <div className="bg-background p-3 text-center">
              <p className="text-[10px] uppercase text-muted-foreground mb-1">
                Social
              </p>
              <p className="text-lg font-mono tracking-tighter">
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
