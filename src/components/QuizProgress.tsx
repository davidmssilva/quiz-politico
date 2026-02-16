import { memo } from "react";

interface Props {
  current: number;
  total: number;
  category: string;
}

function QuizProgress({ current, total, category }: Props) {
  const pct = ((current) / total) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground font-medium">{category}</span>
        <span className="text-muted-foreground">{current + 1} / {total}</span>
      </div>
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default memo(QuizProgress);
