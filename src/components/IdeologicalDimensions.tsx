export function IdeologicalDimensions({ result }: { result: any }) {
  // Utilitário de mapeamento qualitativo
  const getQualitativeLabel = (val: number, left: string, right: string) => {
    const abs = Math.abs(val);
    let prefix = "";

    if (abs >= 7) prefix = "Muito ";
    else if (abs >= 3.5) prefix = " ";
    else if (abs >= 1.5) prefix = "Ligeiramente ";
    else return "Equilibrado / Neutro";

    return `${prefix}${val < 0 ? left : right}`;
  };

  const axes = [
    {
      label: "Economia",
      left: "Intervencionista",
      right: "Mercado Livre",
      val: result.economicScore,
      color: "bg-blue-500",
    },
    {
      label: "Autoridade",
      left: "Libertário",
      right: "Autoritário",
      val: result.authorityScore,
      color: "bg-red-500",
    },
    {
      label: "Sociedade",
      left: "Progressista",
      right: "Conservador",
      val: result.socialScore,
      color: "bg-purple-500",
    },
    {
      label: "Soberania",
      left: "Globalista",
      right: "Nacionalista",
      val: result.sovereigntyScore,
      color: "bg-amber-600",
    },
  ];

  return (
    <div className="space-y-6 bg-card p-6 rounded-2xl border border-border">
      {axes.map((axis) => (
        <div key={axis.label} className="space-y-2">
          <div className="flex justify-between text-xs font-bold tracking-tighter">
            <span className="uppercase">{axis.label}:</span>
            {/* Mapeamento qualitativo em vez de raw float */}
            <span className="font-semibold text-card-foreground ">
              {getQualitativeLabel(axis.val, axis.left, axis.right)}
            </span>
          </div>
          <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={`absolute h-full ${axis.color} transition-all duration-1000`}
              style={{
                left: axis.val < 0 ? `${50 + axis.val * 5}%` : "50%",
                right: axis.val > 0 ? `${50 - axis.val * 5}%` : "50%",
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-medium text-muted-foreground">
            <span>{axis.left}</span>
            <span>{axis.right}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
