const GLOBAL_OPACITY = 0.2;

export interface Ideology {
  name: string;
  x: number;
  y: number;
  color: string;
  opacity: number;
  description: string;
}

export const ideologies: Ideology[] = [
  // ═══ AUTHORITARIAN LEFT (top-left: Y negativo) ═══
  {
    name: "Maoísmo",
    x: -9.5,
    y: -9.0,
    color: "#b91c1c",
    opacity: GLOBAL_OPACITY,
    description:
      "Revolução camponesa e luta de classes contínua sob controlo estatal rígido.",
  },
  {
    name: "Marxismo-\nLeninismo",
    x: -8.0,
    y: -6.0,
    color: "#dc2626",
    opacity: GLOBAL_OPACITY,
    description: "Controlo centralizado e planeamento estatal da economia.",
  },
  {
    name: "Capitalismo\nde Estado",
    x: -4.5,
    y: -5.5,
    color: "#7f1d1d",
    opacity: GLOBAL_OPACITY,
    description:
      "O Estado atua como a principal entidade económica, mantendo lucros e hierarquias.",
  },
  {
    name: "Trotskismo",
    x: -8.0,
    y: -2.0,
    color: "#991b1b",
    opacity: GLOBAL_OPACITY,
    description:
      "Revolução internacionalista com forte organização de vanguarda.",
  },

  // ═══ AUTHORITARIAN RIGHT (top-right: Y negativo) ═══
  {
    name: "Fascismo",
    x: 7.5,
    y: -9.0,
    color: "#1f2937",
    opacity: GLOBAL_OPACITY,
    description: "Estado totalitário, nacionalismo extremo e corporativismo.",
  },
  {
    name: "Nacional-\nConservadorismo",
    x: 6.0,
    y: -7.0,
    color: "#1e3a8a",
    opacity: GLOBAL_OPACITY,
    description: "Foco na autoridade, lei e ordem, e identidade nacional.",
  },
  {
    name: "Reacionarismo",
    x: 4.5,
    y: -6.0,
    color: "#4a2511",
    opacity: GLOBAL_OPACITY,
    description:
      "Desejo de regressar a estados sociais e políticos anteriores, rejeitando a modernidade.",
  },
  {
    name: "Democracia\nCristã",
    x: 3.0,
    y: -3.0,
    color: "#2563eb",
    opacity: GLOBAL_OPACITY,
    description:
      "Ordem social baseada em valores cristãos e economia de mercado.",
  },

  // ═══ AUTHORITARIAN CENTER (top-center) ═══
  {
    name: "Tecnocracia",
    x: 0.0,
    y: -7.0,
    color: "#475569",
    opacity: GLOBAL_OPACITY,
    description:
      "Governo por especialistas técnicos e cientistas em vez de políticos eleitos.",
  },

  // ═══ LIBERTARIAN LEFT (bottom-left: Y positivo) ═══
  {
    name: "Anarco-\nComunismo",
    x: -9.0,
    y: 9.0,
    color: "#111827",
    opacity: GLOBAL_OPACITY,
    description:
      "Sociedade sem classes ou Estado baseada em comunas voluntárias.",
  },
  {
    name: "Ecossocialismo",
    x: -6.5,
    y: 6.0,
    color: "#16a34a",
    opacity: GLOBAL_OPACITY,
    description:
      "Justiça ambiental e social através da descentralização democrática.",
  },
  {
    name: "Socialismo\nLibertário",
    x: -6.0,
    y: 3.0,
    color: "#b91c1c",
    opacity: GLOBAL_OPACITY,
    description: "Propriedade coletiva com rejeição do autoritarismo estatal.",
  },
  {
    name: "Progressismo",
    x: -2.5,
    y: 4.5,
    color: "#a855f7",
    opacity: GLOBAL_OPACITY,
    description:
      "Foco na justiça social, reforma institucional e direitos civis avançados.",
  },

  // ═══ LIBERTARIAN RIGHT (bottom-right: Y positivo) ═══
  {
    name: "Anarco-\nCapitalismo",
    x: 9.0,
    y: 9.0,
    color: "#ca8a04",
    opacity: GLOBAL_OPACITY,
    description:
      "Soberania individual total e eliminação do Estado via mercado livre.",
  },
  {
    name: "Minarquismo",
    x: 8.0,
    y: 7.0,
    color: "#d97706",
    opacity: GLOBAL_OPACITY,
    description: "Estado mínimo limitado apenas à proteção, justiça e defesa.",
  },
  {
    name: "Liberalismo\nClássico",
    x: 6.5,
    y: 5.0,
    color: "#0ea5e9",
    opacity: GLOBAL_OPACITY,
    description: "Defesa das liberdades civis e do governo limitado.",
  },
  {
    name: "Liberalismo\nSocial",
    x: 2.5,
    y: 3.0,
    color: "#eab308",
    opacity: GLOBAL_OPACITY,
    description:
      "Liberdade individual com ênfase na igualdade de oportunidades.",
  },

  // ═══ LIBERTARIAN CENTER (bottom-center) ═══
  {
    name: "Georgismo",
    x: 1.0,
    y: 7.5,
    color: "#0d9488",
    opacity: GLOBAL_OPACITY,
    description:
      "Liberdade individual máxima, mas a renda da terra deve pertencer à comunidade.",
  },

  // ═══ CENTER ═══
  {
    name: "Social-\nDemocracia",
    x: -2.0,
    y: -1.0,
    color: "#f43f5e",
    opacity: GLOBAL_OPACITY,
    description: "Equilíbrio entre mercado e bem-estar social estatal.",
  },
  {
    name: "Centrismo",
    x: 0.0,
    y: 0.0,
    color: "#6b7280",
    opacity: GLOBAL_OPACITY,
    description: "Moderação política e pragmatismo.",
  },
  {
    name: "Neoliberalismo",
    x: 4.0,
    y: -0.5,
    color: "#06b6d4",
    opacity: GLOBAL_OPACITY,
    description:
      "Privatização, desregulação e mercados livres como motor social.",
  },
  {
    name: "Nacional-\nSindicalismo",
    x: 2.0,
    y: -8.5,
    color: "#44403c",
    opacity: GLOBAL_OPACITY,
    description:
      "Ideologia corporativista que rejeita o liberalismo e a luta de classes, focada na unidade nacional e organização sindical do Estado.",
  },
  {
    name: "Euroceticismo",
    x: 4.5,
    y: -7.5,
    color: "#1e293b",
    opacity: GLOBAL_OPACITY,
    description:
      "Oposição à integração europeia e defesa da soberania nacional plena frente a instituições supranacionais.",
  },
  {
    name: "Populismo\nSincrético",
    x: 0.0,
    y: -4.0,
    color: "#f59e0b",
    opacity: GLOBAL_OPACITY,
    description:
      "Combina elementos de esquerda e direita sob uma retórica anti-elite, focada no 'homem comum' (zona do RIR).",
  },

  // ═══ NOVAS ENTRADAS (LIBERTÁRIO / PROGRESSISTA) ═══
  {
    name: "Federalismo\nEuropeu",
    x: -1.0,
    y: 3.5,
    color: "#5b21b6",
    opacity: GLOBAL_OPACITY,
    description:
      "Defesa de uma união política europeia mais profunda, com soberania partilhada e instituições democráticas federais (zona do Volt).",
  },
  {
    name: "Ecologia\nHumanista",
    x: 1.5,
    y: 1.5,
    color: "#16a34a",
    opacity: GLOBAL_OPACITY,
    description:
      "Ambientalismo focado na harmonia entre o desenvolvimento humano e a natureza, sem a carga anticapitalista radical (zona do MPT).",
  },
  {
    name: "Municipalismo",
    x: -3.0,
    y: 7.5,
    color: "#0369a1",
    opacity: GLOBAL_OPACITY,
    description:
      "Sistema de governação que privilegia a autonomia local e decisões comunitárias descentralizadas sobre o poder central.",
  },
  {
    name: "Radicalismo\nDemocrático",
    x: -7.5,
    y: 1.5,
    color: "#be123c",
    opacity: GLOBAL_OPACITY,
    description:
      "Foco na extensão máxima dos direitos democráticos e civis, com reformas estruturais profundas no sistema político.",
  },

  // ═══ NOVAS ENTRADAS (ECONOMIA MISTA / TRANSIÇÃO) ═══
  {
    name: "Distributismo",
    x: -1.0,
    y: 1.5,
    color: "#7c3aed",
    opacity: GLOBAL_OPACITY,
    description:
      "Defende a propriedade privada o mais amplamente difundida possível, opondo-se tanto ao socialismo estatal como ao capitalismo concentrado.",
  },
  {
    name: "Ordoliberalismo",
    x: 5.5,
    y: 1.5,
    color: "#2563eb",
    opacity: GLOBAL_OPACITY,
    description:
      "Variante do liberalismo que defende que o Estado deve garantir um quadro legal para que a concorrência funcione de forma justa.",
  },
  {
    name: "Mutualismo",
    x: -5.0,
    y: 8.5,
    color: "#d97706",
    opacity: GLOBAL_OPACITY,
    description:
      "Anarquismo económico baseado na reciprocidade, trocas justas e cooperativismo sem lucro exploratório.",
  },
  {
    name: "Socialismo\nReformista",
    x: -5.0,
    y: -0.5,
    color: "#e11d48",
    opacity: GLOBAL_OPACITY,
    description:
      "Defende a superação do capitalismo através de reformas parlamentares graduais, situando-se entre a gestão do sistema e a revolução.",
  },
  {
    name: "Eurocomunismo",
    x: -6.0,
    y: -1.5,
    color: "#991b1b",
    opacity: GLOBAL_OPACITY,
    description:
      "Tendência comunista que rejeita o modelo soviético, aceitando a democracia parlamentar mas mantendo o objetivo de uma economia socialista.",
  },

  // ═══ ENTRE GEORGISMO E EXTREMO DIREITA LIBERAL (Transição Libertária) ═══
  {
    name: "Agorismo",
    x: 7.5,
    y: 8.5,
    color: "#a16207",
    opacity: GLOBAL_OPACITY,
    description:
      "Estratégia libertária que defende a criação de economias paralelas (mercado negro/cinzento) para tornar o Estado obsoleto.",
  },
  {
    name: "Paleolibertarismo",
    x: 6.0,
    y: 7.5,
    color: "#854d0e",
    opacity: GLOBAL_OPACITY,
    description:
      "Combina a filosofia política libertária (anti-Estado) com valores sociais conservadores e tradicionais.",
  },
  {
    name: "Liberalismo de\nRecursos",
    x: 4.5,
    y: 8.0,
    color: "#15803d",
    opacity: GLOBAL_OPACITY,
    description:
      "Variante que defende a propriedade privada radical, mas reconhece compensações pela ocupação de espaço ou uso de recursos finitos.",
  },
];
