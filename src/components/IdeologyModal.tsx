import { Ideology } from "@/data/ideologies";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Props {
  ideology: Ideology | null;
  open: boolean;
  onClose: () => void;
}

export default function IdeologyModal({ ideology, open, onClose }: Props) {
  if (!ideology) return null;

  const econLabel = ideology.x < -3 ? "Esquerda" : ideology.x > 3 ? "Direita" : "Centro";
  const authLabel = ideology.y < -3 ? "Autoritário" : ideology.y > 3 ? "Libertário" : "Moderado";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            {ideology.name.replace(/\n/g, " ")}
          </DialogTitle>
          <DialogDescription className="pt-2 space-y-3">
            <p className="text-sm text-foreground leading-relaxed">
              {ideology.description}
            </p>
            <div className="flex gap-4 pt-1">
              <div className="bg-secondary rounded-lg px-3 py-2 text-center flex-1">
                <div className="text-xs text-muted-foreground">Económico</div>
                <div className="text-sm font-semibold text-foreground">
                  {ideology.x > 0 ? "+" : ""}{ideology.x} ({econLabel})
                </div>
              </div>
              <div className="bg-secondary rounded-lg px-3 py-2 text-center flex-1">
                <div className="text-xs text-muted-foreground">Autoridade</div>
                <div className="text-sm font-semibold text-foreground">
                  {ideology.y > 0 ? "+" : ""}{ideology.y} ({authLabel})
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
