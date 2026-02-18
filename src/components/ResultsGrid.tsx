import { QuizResult } from "@/lib/scoring";
import { Party } from "@/data/parties";
import { Ideology } from "@/data/ideologies";
import PartyResults from "@/components/PartyResults";
import IdeologyResults from "@/components/IdeologyResults";
import { IdeologicalDimensions } from "@/components/IdeologicalDimensions";

interface Props {
  result: QuizResult;
  rankedParties: (Party & { distance: number; match?: number })[];
  ideologies: Ideology[];
}

export default function ResultsGrid({
  result,
  rankedParties,
  ideologies,
}: Props) {
  const userCoords = {
    economicScore: result.economicScore,
    authorityScore: result.authorityScore,
    socialScore: result.socialScore,
    sovereigntyScore: result.sovereigntyScore,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Coluna 1: Afinidade Partidária */}
      <div className="space-y-8 w-full overflow-hidden">
        <h2 className="font-sans text-2xl font-bold border-b pb-4">
          Afinidade Partidária
        </h2>
        <PartyResults rankedParties={rankedParties} />
      </div>

      {/* Coluna 2: Dimensões e Ideologias */}
      <div className="space-y-12 w-full overflow-hidden">
        <section className="space-y-8">
          <h2 className="font-sans text-2xl font-bold border-b pb-4">
            Profundidade Ideológica
          </h2>
          <IdeologicalDimensions result={result} />
        </section>

        <section className="space-y-8">
          <h2 className="font-sans text-2xl font-bold border-b pb-4">
            Espectro Ideológico
          </h2>
          <IdeologyResults userCoords={userCoords} ideologies={ideologies} />
        </section>
      </div>
    </div>
  );
}
