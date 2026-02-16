export interface Party {
  name: string;
  shortName: string;
  x: number; // -10 (Extrema Esquerda) a 10 (Extrema Direita)
  y: number; // -10 (Libertário) a 10 (Autoritário)
  color: string;
  description: string;
}
export const parties: Party[] = [
  // --- Quadrante Superior Esquerdo (Autoritário-Esquerda) ---
  {
    name: "Partido Comunista Português",
    shortName: "PCP",
    x: -8.0,
    y: -5.0,
    color: "#cc0000",
    description:
      "Marxismo-leninismo, economia planificada e estrutura centralizada.",
  },
  {
    name: "PCTP/MRPP",
    shortName: "MRPP",
    x: -9.0,
    y: -7.0,
    color: "#ff0000",
    description: "Maoismo ortodoxo e rotura revolucionária com o sistema.",
  },
  {
    name: "Partido Ecologista Os Verdes",
    shortName: "PEV",
    x: -7.0,
    y: -4.0,
    color: "#008000",
    description: "Ecossocialismo ligado ao coletivismo estatal.",
  },

  // --- Quadrante Superior Direito (Autoritário-Direita) ---
  {
    name: "CHEGA",
    shortName: "CH",
    x: 6.0,
    y: -8.0,
    color: "#202056",
    description:
      "Populismo nacional-conservador e reforço da autoridade do Estado.",
  },
  {
    name: "ADN",
    shortName: "ADN",
    x: 5.5,
    y: -7.5,
    color: "#1e4d2b",
    description: "Conservadorismo tradicionalista e soberanismo radical.",
  },
  {
    name: "CDS – Partido Popular",
    shortName: "CDS-PP",
    x: 5.0,
    y: -4.5,
    color: "#00008b",
    description: "Democracia cristã e conservadorismo social.",
  },
  {
    name: "NOVA DIREITA",
    shortName: "ND",
    x: 6.5,
    y: -3.5,
    color: "#1a1a1a",
    description: "Direita identitária e valores tradicionais europeus.",
  },
  {
    name: "Partido Popular Monárquico",
    shortName: "PPM",
    x: 4.0,
    y: -3.5,
    color: "#0055a5",
    description: "Monarquismo e defesa das instituições tradicionais.",
  },

  // --- Centro e Centro-Direita (Estatismo Moderado) ---
  {
    name: "Partido Socialista",
    shortName: "PS",
    x: -2.0,
    y: -1.0,
    color: "#ff007f",
    description: "Social-democracia com foco na regulação estatal.",
  },
  {
    name: "Partido Social Democrata",
    shortName: "PSD",
    x: 3.0,
    y: -2.0,
    color: "#ff9900",
    description: "Reformismo de centro-direita e economia social de mercado.",
  },

  // --- Quadrante Inferior Esquerdo (Libertário-Esquerda) ---
  {
    name: "LIVRE",
    shortName: "L",
    x: -5.5,
    y: 6.0,
    color: "#a4d65e",
    description:
      "Ecologia política, europeísmo e liberdade individual progressista.",
  },
  {
    name: "Bloco de Esquerda",
    shortName: "BE",
    x: -7.0,
    y: 4.0,
    color: "#bf0000",
    description: "Socialismo democrático e causas sociais libertárias.",
  },
  {
    name: "Volt Portugal",
    shortName: "Volt",
    x: -1.0,
    y: 5.0,
    color: "#502379",
    description: "Progressismo social e federalismo europeu.",
  },
  {
    name: "PAN",
    shortName: "PAN",
    x: -3.0,
    y: 1.0,
    color: "#008080",
    description: "Direitos dos animais e ambientalismo descentralizado.",
  },

  // --- Quadrante Inferior Direito (Libertário-Direita) ---
  {
    name: "Iniciativa Liberal",
    shortName: "IL",
    x: 7.5,
    y: 7.0,
    color: "#00aeff",
    description:
      "Liberalismo clássico: máxima liberdade económica e individual.",
  },
  {
    name: "Partido Liberal Social",
    shortName: "PLS",
    x: 4.0,
    y: 3.5,
    color: "#e2cc09",
    description: "Liberalismo moderado com foco na autonomia do indivíduo.",
  },
  {
    name: "Nós, Cidadãos!",
    shortName: "NC",
    x: 2.0,
    y: 2.0,
    color: "#e6b400",
    description: "Liberalismo social e democracia participativa.",
  },
  {
    name: "Juntos pelo Povo",
    shortName: "JPP",
    x: 0.0,
    y: 2.0,
    color: "#009e49",
    description: "Regionalismo e transparência contra o centralismo.",
  },
];
