export interface Ideology {
  name: string;
  x: number;
  y: number;
  color: string;
  opacity: number;
  description: string;
}

// Y convention: negative = authoritarian (top), positive = libertarian (bottom)
// Display: toPixel inverts Y so top=authoritarian, bottom=libertarian
export const ideologies: Ideology[] = [
  // ═══ AUTHORITARIAN LEFT (top-left) ═══
  //{ name: "Estalinismo", x: -9, y: -9, color: "#dc2626", opacity: 0.15, description: "Sistema político totalitário baseado no controlo centralizado do Estado sobre a economia e a sociedade, com supressão de dissidência política." },
  //{ name: "Maoísmo", x: -8, y: -8, color: "#b91c1c", opacity: 0.15, description: "Variante do comunismo que enfatiza a revolução camponesa, a luta de classes contínua e a mobilização das massas sob liderança do partido." },
  {
    name: "Marxismo-\nLeninismo",
    x: -8.5,
    y: -8.5,
    color: "#dc2626",
    opacity: 0.13,
    description:
      "Ideologia revolucionária que defende a tomada do poder por um partido de vanguarda para construir uma sociedade socialista através de planeamento centralizado.",
  },
  //{ name: "Juche", x: -7, y: -9.5, color: "#991b1b", opacity: 0.12, description: "Ideologia oficial da Coreia do Norte que combina autossuficiência nacional, controlo estatal absoluto e culto de personalidade do líder supremo." },
  {
    name: "Socialismo\nde Estado",
    x: -7,
    y: -7,
    color: "#ef4444",
    opacity: 0.12,
    description:
      "Sistema em que o Estado é proprietário dos meios de produção e dirige a economia centralmente, mantendo controlo político significativo.",
  },
  //{ name: "Comunismo\nde Vanguarda", x: -8, y: -7, color: "#c0392b", opacity: 0.11, description: "Modelo leninista onde um partido de elite guia as massas rumo à revolução, justificando o controlo centralizado como necessidade histórica." },

  // ═══ AUTHORITARIAN RIGHT (top-right) ═══
  {
    name: "Fascismo",
    x: 6,
    y: -8,
    color: "#1f2937",
    opacity: 0.15,
    description:
      "Ideologia ultranacionalista que combina autoritarismo, corporativismo económico e supressão da oposição sob um líder carismático.",
  },
  {
    name: "Nazismo",
    x: 7,
    y: -9,
    color: "#111827",
    opacity: 0.15,
    description:
      "Forma extrema de fascismo que incorpora supremacia racial, expansionismo militar e controlo totalitário do Estado.",
  },
  //{ name: "Monarquia\nAbsoluta", x: 9, y: -9, color: "#374151", opacity: 0.12, description: "Sistema de governo em que o monarca detém poder absoluto, sem limitações constitucionais ou parlamentares significativas." },
  {
    name: "Conservadorismo\nReacionário",
    x: 7,
    y: -6,
    color: "#4a2511",
    opacity: 0.11,
    description:
      "Movimento que procura restaurar estruturas sociais tradicionais, rejeitando o progresso moderno e defendendo hierarquias naturais.",
  },
  {
    name: "Ditadura\nMilitar",
    x: 5,
    y: -9,
    color: "#2d3748",
    opacity: 0.12,
    description:
      "Regime onde as forças armadas controlam o governo, priorizando ordem e segurança sobre direitos civis e processos democráticos.",
  },

  // ═══ AUTHORITARIAN CENTER ═══
  {
    name: "Tecnocracia",
    x: 0,
    y: -5,
    color: "#6b7280",
    opacity: 0.1,
    description:
      "Sistema de governação baseado na tomada de decisões por especialistas técnicos e científicos em vez de representantes eleitos.",
  },
  {
    name: "Capitalismo\nAutoritário",
    x: 5,
    y: -7,
    color: "#4b5563",
    opacity: 0.12,
    description:
      "Combinação de economia de mercado com governo autoritário que restringe liberdades civis enquanto permite atividade económica privada.",
  },
  {
    name: "Capitalismo\nde Estado",
    x: -3,
    y: -6,
    color: "#7f1d1d",
    opacity: 0.1,
    description:
      "Sistema onde o Estado controla empresas-chave e dirige a economia mantendo estruturas capitalistas, combinando planeamento central com mercado.",
  },
  // { name: "Autocracia\nCorporativa", x: 8, y: -6, color: "#6b7280", opacity: 0.10, description: "Sistema onde grandes corporações exercem influência dominante sobre o governo, moldando políticas em benefício dos interesses empresariais." },

  // ═══ CENTER LEFT ═══
  {
    name: "Social-\nDemocracia",
    x: -3,
    y: 2,
    color: "#f87171",
    opacity: 0.1,
    description:
      "Sistema que combina economia de mercado regulada com Estado social forte, redistribuição e proteção dos direitos dos trabalhadores.",
  },
  {
    name: "Socialismo\nDemocrático",
    x: -5,
    y: 3,
    color: "#ef4444",
    opacity: 0.1,
    description:
      "Defende a transição democrática para uma economia socialista, mantendo liberdades civis e pluralismo político.",
  },
  {
    name: "Progressismo",
    x: -2,
    y: 3,
    color: "#a855f7",
    opacity: 0.1,
    description:
      "Movimento que defende reformas sociais progressivas, igualdade de direitos e modernização através de políticas baseadas em evidências.",
  },
  {
    name: "Populismo\nde Esquerda",
    x: -6,
    y: -1,
    color: "#e74c3c",
    opacity: 0.09,
    description:
      "Movimento que mobiliza as classes populares contra as elites económicas, defendendo redistribuição radical e democracia participativa.",
  },

  // ═══ CENTER ═══
  {
    name: "Centrismo",
    x: 0,
    y: 0,
    color: "#6b7280",
    opacity: 0.1,
    description:
      "Posição política moderada que procura equilíbrio entre esquerda e direita, favorecendo pragmatismo sobre ideologia.",
  },
  {
    name: "Liberalismo",
    x: 2,
    y: 3,
    color: "#3b82f6",
    opacity: 0.1,
    description:
      "Defende a liberdade individual, a democracia representativa, os direitos civis e uma economia de mercado com alguma regulação.",
  },

  // ═══ CENTER RIGHT ═══
  {
    name: "Conservadorismo",
    x: 4,
    y: -2,
    color: "#1e3a5f",
    opacity: 0.1,
    description:
      "Filosofia política que valoriza a tradição, a ordem social, a responsabilidade individual e a mudança gradual em vez de reformas radicais.",
  },
  {
    name: "Neoliberalismo",
    x: 7,
    y: 0,
    color: "#06b6d4",
    opacity: 0.1,
    description:
      "Abordagem económica que favorece a desregulamentação, a privatização, o livre comércio e a redução dos gastos públicos.",
  },

  // ═══ LIBERTARIAN LEFT (bottom-left) ═══
  {
    name: "Anarco-\nComunismo",
    x: -9,
    y: 9,
    color: "#111827",
    opacity: 0.12,
    description:
      "Visão de uma sociedade sem Estado nem classes, com propriedade coletiva e decisões tomadas por assembleias comunitárias diretas.",
  },
  {
    name: "Socialismo\nLibertário",
    x: -7,
    y: 8,
    color: "#dc2626",
    opacity: 0.1,
    description:
      "Combinação de propriedade social dos meios de produção com democracia direta e descentralização do poder político.",
  },
  // {
  //   name: "Anarco-\nSindicalismo",
  //   x: -8,
  //   y: 8.5,
  //   color: "#b91c1c",
  //   opacity: 0.11,
  //   description:
  //     "Movimento que defende sindicatos revolucionários como base da organização social, eliminando Estado e capitalismo através de ação direta.",
  // },
  {
    name: "Mutualismo",
    x: -5,
    y: 7,
    color: "#d97706",
    opacity: 0.09,
    description:
      "Teoria económica anarquista baseada na reciprocidade, onde trabalhadores trocam produtos pelo seu valor-trabalho sem lucro nem exploração.",
  },
  //{ name: "Comunismo\nde Conselhos", x: -7, y: 7, color: "#e11d48", opacity: 0.09, description: "Variante do comunismo que rejeita partidos de vanguarda, defendendo conselhos de trabalhadores eleitos como forma de autogoverno." },
  {
    name: "Política\nVerde",
    x: -4,
    y: 6,
    color: "#22c55e",
    opacity: 0.1,
    description:
      "Movimento político que prioriza a sustentabilidade ambiental, a justiça social e a democracia participativa.",
  },

  // ═══ LIBERTARIAN RIGHT (bottom-right) ═══
  {
    name: "Libertarismo",
    x: 7,
    y: 7,
    color: "#eab308",
    opacity: 0.1,
    description:
      "Filosofia política que defende a máxima liberdade individual, governo mínimo e mercados livres sem intervenção estatal.",
  },
  {
    name: "Anarco-\nCapitalismo",
    x: 9,
    y: 9,
    color: "#ca8a04",
    opacity: 0.12,
    description:
      "Visão de uma sociedade sem Estado onde todas as funções governamentais são substituídas por serviços privados e contratos voluntários.",
  },
  {
    name: "Minarquismo",
    x: 8,
    y: 8,
    color: "#d97706",
    opacity: 0.1,
    description:
      "Defende um Estado mínimo limitado à proteção contra agressão, roubo e violação de contratos, sem outras funções.",
  },
  {
    name: "Liberalismo\nClássico",
    x: 6,
    y: 5,
    color: "#0ea5e9",
    opacity: 0.1,
    description:
      "Tradição política que enfatiza a liberdade individual, o governo limitado, o Estado de direito e a economia de livre mercado.",
  },
  {
    name: "Capitalismo\nLibertário",
    x: 8,
    y: 6,
    color: "#f59e0b",
    opacity: 0.09,
    description:
      "Defesa radical do capitalismo de mercado livre com mínima intervenção estatal, priorizando direitos de propriedade e liberdade contratual.",
  },

  // ═══ ADDITIONAL SPREAD ═══
  {
    name: "Trotskismo",
    x: -8,
    y: -5,
    color: "#dc2626",
    opacity: 0.09,
    description:
      "Variante do marxismo que defende revolução permanente e internacionalismo proletário, opondo-se ao estalinismo e ao socialismo num só país.",
  },
  {
    name: "Socialismo\nde Mercado",
    x: -4,
    y: -2,
    color: "#ef4444",
    opacity: 0.09,
    description:
      "Sistema que combina propriedade pública dos meios de produção com mecanismos de mercado para alocação de recursos e preços.",
  },
  {
    name: "Ordoliberalismo",
    x: 5,
    y: 1,
    color: "#2563eb",
    opacity: 0.09,
    description:
      "Escola económica que defende mercados livres dentro de um forte quadro legal e institucional mantido pelo Estado.",
  },
  {
    name: "Democracia\nCristã",
    x: 3,
    y: -1,
    color: "#1e40af",
    opacity: 0.09,
    description:
      "Movimento político que aplica princípios cristãos à política pública, combinando economia social de mercado com valores tradicionais.",
  },
  {
    name: "Feminismo\nPolítico",
    x: -3,
    y: 4,
    color: "#c026d3",
    opacity: 0.08,
    description:
      "Movimento que integra a igualdade de género na ação política, defendendo mudanças estruturais contra a discriminação e o patriarcado.",
  },
  {
    name: "Ecossocialismo",
    x: -6,
    y: 5,
    color: "#16a34a",
    opacity: 0.09,
    description:
      "Fusão de ecologia e socialismo que argumenta que a crise ambiental é inseparável do capitalismo e requer transformação sistémica.",
  },
  {
    name: "Georgismo",
    x: 2,
    y: 5,
    color: "#0d9488",
    opacity: 0.08,
    description:
      "Filosofia económica centrada no imposto sobre o valor da terra como principal fonte de receita pública, permitindo livre mercado nos restantes setores.",
  },
  {
    name: "Distributismo",
    x: -1,
    y: 2,
    color: "#7c3aed",
    opacity: 0.08,
    description:
      "Filosofia económica que defende a distribuição ampla da propriedade produtiva, opondo-se tanto ao capitalismo concentrado como ao socialismo estatal.",
  },
  {
    name: "Nacional-\nSindicalismo",
    x: 3,
    y: -7,
    color: "#44403c",
    opacity: 0.09,
    description:
      "Ideologia corporativista que organiza a sociedade em sindicatos nacionais sob controlo estatal, rejeitando luta de classes e liberalismo.",
  },
  {
    name: "Populismo\nde Direita",
    x: 5,
    y: -4,
    color: "#78350f",
    opacity: 0.09,
    description:
      "Movimento que mobiliza sentimento popular contra imigração e elites culturais, combinando nacionalismo com economia mista.",
  },
  //{ name: "Agorismo", x: 9, y: 7, color: "#a16207", opacity: 0.08, description: "Estratégia libertária que defende a contra-economia e mercados paralelos como meio de minar o Estado sem confronto direto." },
];
