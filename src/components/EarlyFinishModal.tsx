import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
          <DialogTitle className="font-serif text-xl">Terminar Agora?</DialogTitle>
          <DialogDescription asChild>
            <div className="pt-2 space-y-4">
              <p className="text-sm text-foreground">
                Completaste <strong>{completedCategories.length}</strong> de{" "}
                <strong>{totalCategories}</strong> categorias.
              </p>

              {completedCategories.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-medium">
                    Categorias respondidas:
                  </p>
                  <ul className="text-sm text-foreground space-y-1">
                    {completedCategories.map((cat) => (
                      <li key={cat} className="flex items-center gap-2">
                        <span className="text-accent">✓</span> {cat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs text-muted-foreground bg-secondary/50 rounded-lg p-3">
                <strong>Atenção:</strong> Ao terminar agora, receberás um resultado estimado baseado nas respostas fornecidas. 
                Não poderás continuar este questionário depois de confirmar.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
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
