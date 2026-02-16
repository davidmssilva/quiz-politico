export interface Party {
  name: string;
  shortName: string;
  x: number;
  y: number;
  color: string;
  description: string;
}

export const parties: Party[] = [
  {
    name: "Partido Comunista Português",
    shortName: "PCP",
    x: -9.0,
    y: -2.0,
    color: "#cc0000",
    description: "Partido marxista-leninista que defende a propriedade estatal e o controlo pelos trabalhadores.",
  },
  {
    name: "Bloco de Esquerda",
    shortName: "BE",
    x: -8.0,
    y: 4.0,
    color: "#cc0000",
    description: "Partido socialista democrático de esquerda que defende a justiça social e as liberdades civis.",
  },
  {
    name: "Livre",
    shortName: "L",
    x: -6.5,
    y: 6.0,
    color: "#00a86b",
    description: "Partido eco-socialista e pró-europeu progressista.",
  },
  {
    name: "Pessoas-Animais-Natureza",
    shortName: "PAN",
    x: -5.5,
    y: 7.0,
    color: "#00cc66",
    description: "Partido progressista focado no ambiente e nos direitos dos animais.",
  },
  {
    name: "Partido Socialista",
    shortName: "PS",
    x: -4.0,
    y: 2.0,
    color: "#ff6666",
    description: "Partido social-democrata de centro-esquerda que defende o estado social e a economia mista.",
  },
  {
    name: "Volt Portugal",
    shortName: "Volt",
    x: -2.0,
    y: 7.5,
    color: "#7c4dff",
    description: "Partido liberal progressista e pró-europeu.",
  },
  {
    name: "Partido Social Democrata",
    shortName: "PSD",
    x: 3.0,
    y: -1.0,
    color: "#ff8c00",
    description: "Partido liberal-conservador de centro-direita que defende a economia de mercado.",
  },
  {
    name: "CDS – Partido Popular",
    shortName: "CDS-PP",
    x: 6.5,
    y: -3.0,
    color: "#0000cc",
    description: "Partido conservador que defende o mercado livre e os valores tradicionais.",
  },
  {
    name: "Iniciativa Liberal",
    shortName: "IL",
    x: 9.0,
    y: 5.0,
    color: "#00aaff",
    description: "Partido liberal clássico que defende mercados livres e liberdade individual.",
  },
  {
    name: "Chega",
    shortName: "CH",
    x: 7.5,
    y: -8.0,
    color: "#000080",
    description: "Partido populista de direita que defende uma aplicação rigorosa da lei e a soberania nacional.",
  },
  {
    name: "Ergue-te",
    shortName: "Ergue-te",
    x: 8.5,
    y: -9.0,
    color: "#444444",
    description: "Partido conservador nacionalista que defende forte autoridade estatal.",
  },
  {
    name: "ADN",
    shortName: "ADN",
    x: 5.5,
    y: -6.5,
    color: "#0066cc",
    description: "Partido conservador nacional que enfatiza a soberania e o conservadorismo social.",
  },
  {
    name: "RIR",
    shortName: "RIR",
    x: 0.5,
    y: 1.0,
    color: "#ffaa00",
    description: "Partido populista anti-corrupção com posições económicas mistas.",
  },
];
