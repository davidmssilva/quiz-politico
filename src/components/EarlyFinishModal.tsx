import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TYPOGRAPHY } from "@/lib/typography";

interface Props {
  open: boolean;
  onClose: () => void;
  onFinish: () => void;
  completedCategories: string[];
  totalCategories: number;
}

export default function EarlyFinishModal({
  open,
  onClose,
  onFinish,
  completedCategories,
  totalCategories,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className={TYPOGRAPHY.heading.h2}>Terminar Agora?</DialogTitle>
          <DialogDescription asChild>
            <div className="pt-2 space-y-4">
              <p className="text-sm font-medium text-foreground">
                Completaste <strong>{completedCategories.length}</strong> de{" "}
                <strong>{totalCategories}</strong> categorias.
              </p>

              {completedCategories.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                    Categorias respondidas:
                  </p>
                  <ul className="text-sm font-medium text-foreground space-y-1">
                    {completedCategories.map((cat) => (
                      <li key={cat} className="flex items-center gap-2">
                        <span className="text-accent">✓</span> {cat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs font-medium text-muted-foreground bg-secondary/50 rounded-lg p-3">
                <strong>Atenção:</strong> Ao terminar agora, receberás um resultado estimado baseado nas respostas fornecidas. 
                Não poderás continuar este questionário depois de confirmar.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 hover:bg-primary/10 hover:text-primary hover:border-primary/30 dark:hover:bg-primary/20 dark:hover:border-primary/50 transition-all duration-200" onClick={onClose}>
            Continuar
          </Button>
          <Button className="flex-1" onClick={onFinish}>
            Terminar Agora
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
