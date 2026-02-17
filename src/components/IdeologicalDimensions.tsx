export function IdeologicalDimensions({ result }: { result: any }) {
  const axes = [
    {
      label: "Economia",
      left: "Intervenção",
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
      <h3 className="font-serif text-xl font-bold border-b pb-2">
        Profundidade Ideológica
      </h3>
      {axes.map((axis) => (
        <div key={axis.label} className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
            <span>{axis.label}</span>
            <span className="text-muted-foreground">{axis.val.toFixed(1)}</span>
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
