export interface Party {
  id: number;
  name: string;
  shortName: string;
  x: number; // -10 (Extrema Esquerda) a 10 (Extrema Direita)
  y: number; // -10 (Autoritário) a 10 (Libertário)
  z: number; // -10 (Progressista) a 10 (Conservador)
  s: number; // -10 (Globalista/Federalista) a 10 (Soberanista)
  color: string;
  description: string;
}

export const parties: Party[] = [
  // --- Quadrante Superior Esquerdo (Autoritário-Esquerda) ---
  {
    id: 1,
    name: "Partido Comunista Português",
    shortName: "PCP",
    x: -8.0,
    y: -5.0,
    z: 2.0, // Conservadorismo social clássico/operário
    s: 9.0, // Soberanismo forte (Anti-Euro/UE)
    color: "#cc0000",
    description:
      "Marxismo-leninismo, economia planificada e estrutura centralizada.",
  },
  {
    id: 2,
    name: "PCTP/MRPP",
    shortName: "MRPP",
    x: -9.0,
    y: -7.0,
    z: 0.0, // Foco puramente classista
    s: 9.5, // Soberania total e rotura com o estrangeiro
    color: "#ff0000",
    description: "Maoismo ortodoxo e rotura revolucionária com o sistema.",
  },
  {
    id: 3,
    name: "Partido Ecologista Os Verdes",
    shortName: "PEV",
    x: -7.0,
    y: -4.0,
    z: -2.0, // Progressismo ecológico moderado
    s: 8.0, // Soberanismo (alinhado com PCP)
    color: "#008000",
    description: "Ecossocialismo ligado ao coletivismo estatal.",
  },

  // --- Quadrante Superior Direito (Autoritário-Direita) ---
  {
    id: 4,
    name: "CHEGA",
    shortName: "CH",
    x: 6.0,
    y: -8.0,
    z: 8.5, // Conservadorismo social e identitário
    s: 8.0, // Soberanismo nacionalista
    color: "#202056",
    description:
      "Populismo nacional-conservador e reforço da autoridade do Estado.",
  },
  {
    id: 5,
    name: "ADN",
    shortName: "ADN",
    x: 5.5,
    y: -7.5,
    z: 9.5, // Tradicionalismo radical
    s: 9.5, // Anti-globalismo radical
    color: "#1e4d2b",
    description: "Conservadorismo tradicionalista e soberanismo radical.",
  },
  {
    id: 6,
    name: "CDS – Partido Popular",
    shortName: "CDS-PP",
    x: 5.0,
    y: -4.5,
    z: 7.5, // Democracia Cristã / Conservador
    s: 3.5, // Soberanismo moderado / Europeísmo crítico
    color: "#00008b",
    description: "Democracia cristã e conservadorismo social.",
  },
  {
    id: 7,
    name: "NOVA DIREITA",
    shortName: "ND",
    x: 6.5,
    y: -3.5,
    z: 8.0, // Direita identitária
    s: 7.0, // Soberanismo europeu de nações
    color: "#1a1a1a",
    description: "Direita identitária e values tradicionais europeus.",
  },
  {
    id: 8,
    name: "Partido Popular Monárquico",
    shortName: "PPM",
    x: 4.0,
    y: -3.5,
    z: 8.5, // Tradicionalismo institucional
    s: 6.0, // Soberanismo monárquico
    color: "#0055a5",
    description: "Monarquismo e defesa das instituições tradicionais.",
  },

  // --- Centro e Centro-Direita (Estatismo Moderado) ---
  {
    id: 9,
    name: "Partido Socialista",
    shortName: "PS",
    x: -2.0,
    y: -1.0,
    z: -4.0, // Progressismo social moderado
    s: -7.0, // Europeísmo/Federalismo forte
    color: "#ff007f",
    description: "Social-democracia com foco na regulação estatal.",
  },
  {
    id: 10,
    name: "Partido Social Democrata",
    shortName: "PSD",
    x: 3.0,
    y: -2.0,
    z: 2.0, // Conservadorismo reformista / Centro
    s: -5.5, // Europeísmo institucional
    color: "#ff9900",
    description: "Reformismo de centro-direita e economia social de mercado.",
  },

  // --- Quadrante Inferior Esquerdo (Libertário-Esquerda) ---
  {
    id: 11,
    name: "LIVRE",
    shortName: "L",
    x: -5.5,
    y: 6.0,
    z: -9.0, // Progressismo radical / Liberdades
    s: -9.5, // Federalismo Europeu total
    color: "#a4d65e",
    description:
      "Ecologia política, europeísmo e liberdade individual progressista.",
  },
  {
    id: 12,
    name: "Bloco de Esquerda",
    shortName: "BE",
    x: -7.0,
    y: 4.0,
    z: -8.5, // Progressismo social / Causas fraturantes
    s: -2.0, // Crítico da UE, mas internacionalista
    color: "#bf0000",
    description: "Socialismo democrático e causas sociais libertárias.",
  },
  {
    id: 13,
    name: "Volt Portugal",
    shortName: "Volt",
    x: -1.0,
    y: 5.0,
    z: -7.5, // Progressismo social liberal
    s: -10.0, // Federalismo Europeu (Estado Único)
    color: "#502379",
    description: "Progressismo social e federalismo europeu.",
  },
  {
    id: 14,
    name: "PAN",
    shortName: "PAN",
    x: -3.0,
    y: 1.0,
    z: -6.5, // Causas civilizacionais progressistas
    s: -5.0, // Europeísmo moderado
    color: "#008080",
    description: "Direitos dos animais e ambientalismo descentralizado.",
  },

  // --- Quadrante Inferior Direito (Libertário-Direita) ---
  {
    id: 15,
    name: "Iniciativa Liberal",
    shortName: "IL",
    x: 7.5,
    y: 7.0,
    z: -7.0, // Progressismo social (Liberdade individual)
    s: -5.0, // Europeísmo liberal
    color: "#00aeff",
    description:
      "Liberalismo clássico: máxima liberdade económica e individual.",
  },
  {
    id: 16,
    name: "Partido Liberal Social",
    shortName: "PLS",
    x: 4.0,
    y: 3.5,
    z: -4.0, // Social-liberalismo
    s: -4.0, // Europeísmo
    color: "#e2cc09",
    description: "Liberalismo moderado com foco na autonomia do indivíduo.",
  },
  {
    id: 17,
    name: "Nós, Cidadãos!",
    shortName: "NC",
    x: 2.0,
    y: 2.0,
    z: -2.0, // Liberalismo cívico
    s: -3.0, // Europeísmo institucional
    color: "#e6b400",
    description: "Liberalismo social e democracia participativa.",
  },
  {
    id: 18,
    name: "Juntos pelo Povo",
    shortName: "JPP",
    x: 0.0,
    y: 2.0,
    z: 0.0, // Pragmatismo regionalista
    s: -2.0, // Foco local, mas enquadrado na UE
    color: "#009e49",
    description: "Regionalismo e transparência contra o centralismo.",
  },
];
