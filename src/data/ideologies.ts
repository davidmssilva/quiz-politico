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
      "Revolução camponesa e mobilização de massas. Adapta o marxismo às sociedades agrárias, defendendo a luta de classes contínua, o combate ao 'revisionismo' interno e a subordinação total da vida civil ao Partido e ao Líder.",
  },
  {
    name: "Marxismo-\nLeninismo",
    x: -8.0,
    y: -6.0,
    color: "#dc2626",
    opacity: GLOBAL_OPACITY,
    description:
      "Vanguarda partidária e centralismo democrático. Defende a conquista do poder por um partido revolucionário profissional, o estabelecimento da ditadura do proletariado e a gestão estatal centralizada de todos os meios de produção.",
  },
  {
    name: "Capitalismo\nde Estado",
    x: -4.5,
    y: -5.5,
    color: "#7f1d1d",
    opacity: GLOBAL_OPACITY,
    description:
      "O Estado como patrão absoluto. Um sistema onde o governo controla os meios de produção e opera empresas como entidades comerciais, mantendo a exploração da mais-valia e as hierarquias laborais típicas do capitalismo privado.",
  },
  {
    name: "Trotskismo",
    x: -8.0,
    y: -2.0,
    color: "#991b1b",
    opacity: GLOBAL_OPACITY,
    description:
      "Revolução permanente e internacionalismo. Opõe-se ao estalinismo e à teoria do 'socialismo num só país', defendendo que a revolução deve espalhar-se globalmente e que a democracia operária deve prevalecer sobre a burocracia partidária.",
  },

  // ═══ AUTHORITARIAN RIGHT (top-right: Y negativo) ═══
  {
    name: "Fascismo",
    x: 7.5,
    y: -9.0,
    color: "#1f2937",
    opacity: GLOBAL_OPACITY,
    description:
      "Ultranacionalismo totalitário e corporativismo. Defende a submissão absoluta do indivíduo ao Estado, a unidade nacional forçada através de um líder forte, o militarismo agressivo e uma economia organizada em corporações de classes.",
  },
  {
    name: "Nacional-\nConservadorismo",
    x: 6.0,
    y: -7.0,
    color: "#1e3a8a",
    opacity: GLOBAL_OPACITY,
    description:
      "Soberania nacional e valores tradicionais. Combina o conservadorismo social e moral com um forte sentido de identidade nacional, defendendo fronteiras rígidas, protecionismo cultural e a primazia dos interesses da nação sobre o globalismo.",
  },
  {
    name: "Reacionarismo",
    x: 4.5,
    y: -6.0,
    color: "#4a2511",
    opacity: GLOBAL_OPACITY,
    description:
      "Rejeição da modernidade e regresso ao passado. Defende a restauração de ordens sociais, políticas e religiosas antigas (como a monarquia absoluta ou o feudalismo), opondo-se ao iluminismo, à democracia liberal e ao progressismo.",
  },
  {
    name: "Democracia\nCristã",
    x: 3.0,
    y: -3.0,
    color: "#2563eb",
    opacity: GLOBAL_OPACITY,
    description:
      "Humanismo cristão e economia social de mercado. Procura aplicar princípios cristãos à política pública, equilibrando a liberdade individual com a responsabilidade social, a solidariedade comunitária e o papel subsidiário do Estado.",
  },

  // ═══ AUTHORITARIAN CENTER (top-center) ═══
  {
    name: "Tecnocracia",
    x: 0.0,
    y: -7.0,
    color: "#475569",
    opacity: GLOBAL_OPACITY,
    description:
      "Governação baseada na competência técnica. Defende que as decisões políticas devem ser tomadas por especialistas, cientistas e engenheiros com base em dados objetivos e eficiência, em detrimento da política partidária ou da vontade popular.",
  },

  // ═══ LIBERTARIAN LEFT (bottom-left: Y positivo) ═══
  {
    name: "Anarco-\nComunismo",
    x: -9.0,
    y: 9.0,
    color: "#111827",
    opacity: GLOBAL_OPACITY,
    description:
      "Abolição total do Estado, do dinheiro e das classes. Propõe uma sociedade baseada na propriedade comum dos meios de produção, na ajuda mútua e na organização horizontal em comunas livres, eliminando todas as hierarquias coercivas.",
  },
  {
    name: "Ecossocialismo",
    x: -6.5,
    y: 6.0,
    color: "#16a34a",
    opacity: GLOBAL_OPACITY,
    description:
      "Fusão da ecologia com o socialismo. Argumenta que a preservação ambiental é incompatível com a lógica de lucro do capitalismo, defendendo uma economia focada nas necessidades humanas e nos limites físicos do planeta.",
  },
  {
    name: "Socialismo\nLibertário",
    x: -6.0,
    y: 3.0,
    color: "#b91c1c",
    opacity: GLOBAL_OPACITY,
    description:
      "Autogestão operária sem Estado. Combina o objetivo socialista de propriedade comum com a rejeição da autoridade centralizada, promovendo a democracia direta, conselhos de trabalhadores e o federalismo descentralizado.",
  },
  {
    name: "Progressismo",
    x: -2.5,
    y: 4.5,
    color: "#a855f7",
    opacity: GLOBAL_OPACITY,
    description:
      "Reforma social e avanço dos direitos civis. Defende a utilização da ação política para melhorar a condição humana, focando-se na igualdade económica, na justiça social, na inclusão de minorias e na modernização constante das instituições.",
  },

  // ═══ LIBERTARIAN RIGHT (bottom-right: Y positivo) ═══
  {
    name: "Anarco-\nCapitalismo",
    x: 9.0,
    y: 9.0,
    color: "#ca8a04",
    opacity: GLOBAL_OPACITY,
    description:
      "Capitalismo de mercado livre sem Estado. Defende a soberania individual absoluta e a privatização de todas as funções estatais, incluindo justiça e segurança, acreditando que o mercado pode regular todas as interações humanas.",
  },
  {
    name: "Minarquismo",
    x: 8.0,
    y: 7.0,
    color: "#d97706",
    opacity: GLOBAL_OPACITY,
    description:
      "Estado mínimo e vigilante noturno. Defende que a única função legítima do governo é proteger os indivíduos contra a agressão, roubo e fraude, deixando todas as outras funções (educação, saúde, infraestruturas) para a iniciativa privada.",
  },
  {
    name: "Liberalismo\nClássico",
    x: 6.5,
    y: 5.0,
    color: "#0ea5e9",
    opacity: GLOBAL_OPACITY,
    description:
      "Liberdade individual e governo limitado. Enfatiza a liberdade civil, o Estado de Direito e a liberdade económica (laissez-faire), defendendo que o governo deve interferir o mínimo possível na vida dos cidadãos e no funcionamento dos mercados.",
  },
  {
    name: "Liberalismo\nSocial",
    x: 2.5,
    y: 3.0,
    color: "#eab308",
    opacity: GLOBAL_OPACITY,
    description:
      "Liberdade com responsabilidade social. Acredita que a liberdade individual requer uma base mínima de igualdade de oportunidades, justificando a intervenção estatal na educação, saúde e segurança social para corrigir falhas de mercado.",
  },

  // ═══ LIBERTARIAN CENTER (bottom-center) ═══
  {
    name: "Georgismo",
    x: 1.0,
    y: 7.5,
    color: "#0d9488",
    opacity: GLOBAL_OPACITY,
    description:
      "Terra comum, trabalho privado. Defende que os indivíduos devem possuir integralmente o valor que produzem, mas que o valor económico derivado da terra e dos recursos naturais deve pertencer igualmente a todos os membros da sociedade.",
  },

  // ═══ CENTER ═══
  {
    name: "Social-\nDemocracia",
    x: -2.0,
    y: -1.0,
    color: "#f43f5e",
    opacity: GLOBAL_OPACITY,
    description:
      "Reformismo dentro do capitalismo. Defende uma intervenção estatal robusta na economia e um Estado Social forte para redistribuir riqueza e garantir justiça social, mantendo contudo a estrutura fundamental da economia de mercado.",
  },
  {
    name: "Centrismo",
    x: 0.0,
    y: 0.0,
    color: "#6b7280",
    opacity: GLOBAL_OPACITY,
    description:
      "Moderação e rejeição de extremos. Procura soluções pragmáticas e baseadas no consenso, combinando políticas de esquerda e direita conforme necessário, e valorizando a estabilidade institucional acima de ideologias rígidas.",
  },
  {
    name: "Neoliberalismo",
    x: 4.0,
    y: -0.5,
    color: "#06b6d4",
    opacity: GLOBAL_OPACITY,
    description:
      "Mercados globais e Estado regulador mínimo. Enfatiza o livre comércio, a desregulação financeira, a privatização de empresas estatais e a austeridade fiscal, vendo a competição de mercado como o melhor organizador da sociedade.",
  },
  {
    name: "Nacional-\nSindicalismo",
    x: 2.0,
    y: -8.5,
    color: "#44403c",
    opacity: GLOBAL_OPACITY,
    description:
      "Corporativismo e unidade nacional. Rejeita tanto o liberalismo como a luta de classes, propondo uma organização da sociedade em sindicatos verticais (patrões e operários) controlados pelo Estado, sob uma forte matriz católica e nacionalista.",
  },
  {
    name: "Euroceticismo",
    x: 4.5,
    y: -7.5,
    color: "#1e293b",
    opacity: GLOBAL_OPACITY,
    description:
      "Defesa da soberania nacional contra Bruxelas. Opõe-se ao federalismo europeu e à transferência de poderes para instituições supranacionais, defendendo o regresso do controlo fronteiriço, legislativo e monetário ao Estado-nação.",
  },
  {
    name: "Populismo\nSincrético",
    x: 0.0,
    y: -4.0,
    color: "#f59e0b",
    opacity: GLOBAL_OPACITY,
    description:
      "O povo contra as elites. Uma ideologia flexível e anti-sistema que mistura políticas económicas de esquerda (apoios sociais) com valores sociais de direita (ordem e segurança), unidas por uma retórica de defesa do 'homem comum'.",
  },

  // ═══ NOVAS ENTRADAS (LIBERTÁRIO / PROGRESSISTA) ═══
  {
    name: "Federalismo\nEuropeu",
    x: -1.0,
    y: 3.5,
    color: "#5b21b6",
    opacity: GLOBAL_OPACITY,
    description:
      "Estados Unidos da Europa. Defende a transformação da UE numa federação democrática completa, com um governo central, exército e constituição comuns, superando o Estado-nação como unidade política principal.",
  },
  {
    name: "Ecologia\nHumanista",
    x: 1.5,
    y: 1.5,
    color: "#16a34a",
    opacity: GLOBAL_OPACITY,
    description:
      "Sustentabilidade e mercado. Promove a proteção ambiental através da inovação tecnológica, incentivos de mercado e responsabilidade individual, rejeitando o decrescimento económico e procurando conciliar o capitalismo com a ecologia.",
  },
  {
    name: "Municipalismo",
    x: -3.0,
    y: 7.5,
    color: "#0369a1",
    opacity: GLOBAL_OPACITY,
    description:
      "Poder local e democracia de proximidade. Defende que a política deve ser feita de baixo para cima, dando máxima autonomia às cidades e comunidades locais para gerir os seus recursos e tomar decisões, reduzindo o poder central.",
  },
  {
    name: "Radicalismo\nDemocrático",
    x: -7.5,
    y: 1.5,
    color: "#be123c",
    opacity: GLOBAL_OPACITY,
    description:
      "Aprofundamento da democracia. Exige mais do que o voto periódico, lutando por mecanismos de participação direta, transparência total, referendos constantes e a extensão dos princípios democráticos à esfera económica e laboral.",
  },

  // ═══ NOVAS ENTRADAS (ECONOMIA MISTA / TRANSIÇÃO) ═══
  {
    name: "Distributismo",
    x: -1.0,
    y: 1.5,
    color: "#7c3aed",
    opacity: GLOBAL_OPACITY,
    description:
      "Propriedade para todos. Baseado na doutrina social cristã, opõe-se tanto à concentração de capital do capitalismo como à concentração estatal do socialismo, defendendo que os meios de produção devem pertencer ao maior número possível de famílias.",
  },
  {
    name: "Ordoliberalismo",
    x: 5.5,
    y: 1.5,
    color: "#2563eb",
    opacity: GLOBAL_OPACITY,
    description:
      "Mercado livre sob regras fortes. O Estado não deve planear a economia, mas tem o dever de criar e manter um quadro legal rigoroso que impeça monopólios e cartéis, garantindo que a concorrência permanece livre, justa e funcional.",
  },
  {
    name: "Mutualismo",
    x: -5.0,
    y: 8.5,
    color: "#d97706",
    opacity: GLOBAL_OPACITY,
    description:
      "Mercado socialista e cooperativo. Propõe uma sociedade baseada na ocupação e uso da propriedade, onde o crédito é gratuito (banco do povo) e os trabalhadores trocam produtos de forma justa, sem exploração ou lucro capitalista.",
  },
  {
    name: "Socialismo\nReformista",
    x: -5.0,
    y: -0.5,
    color: "#e11d48",
    opacity: GLOBAL_OPACITY,
    description:
      "Transformação gradual do sistema. Acredita que o socialismo pode ser alcançado através das instituições democráticas existentes, utilizando o parlamento para implementar reformas que socializem progressivamente a economia sem rutura violenta.",
  },
  {
    name: "Eurocomunismo",
    x: -6.0,
    y: -1.5,
    color: "#991b1b",
    opacity: GLOBAL_OPACITY,
    description:
      "Comunismo democrático e ocidental. Uma adaptação do comunismo à realidade da Europa democrática, rejeitando a ditadura do proletariado soviética e aceitando o pluralismo político, as liberdades civis e a via parlamentar para o socialismo.",
  },

  // ═══ ENTRE GEORGISMO E EXTREMO DIREITA LIBERAL (Transição Libertária) ═══
  {
    name: "Agorismo",
    x: 7.5,
    y: 8.5,
    color: "#a16207",
    opacity: GLOBAL_OPACITY,
    description:
      "Contra-economia revolucionária. Defende que a melhor forma de atingir uma sociedade livre não é a política, mas a ação direta através do mercado negro e cinzento, boicotando o Estado e os impostos até este se tornar obsoleto.",
  },
  {
    name: "Paleolibertarismo",
    x: 6.0,
    y: 7.5,
    color: "#854d0e",
    opacity: GLOBAL_OPACITY,
    description:
      "Liberdade radical e valores conservadores. Une a defesa do mercado livre total e anti-estatismo com a promoção de normas culturais tradicionais, autoridade familiar e religião, opondo-se frequentemente ao progressismo cultural moderno.",
  },
  {
    name: "Liberalismo de\nRecursos",
    x: 4.5,
    y: 8.0,
    color: "#15803d",
    opacity: GLOBAL_OPACITY,
    description:
      "Compensação pelo uso do planeta. Aceita o capitalismo de mercado livre, mas argumenta que aqueles que extraem recursos finitos ou poluem o ambiente comum devem compensar financeiramente a sociedade, aproximando-se da ecologia de mercado.",
  },
  {
    name: "Estratocracia",
    x: 3.5,
    y: -9.0,
    color: "#374151",
    opacity: GLOBAL_OPACITY,
    description:
      "Governo militar direto. O Estado é controlado pelas forças armadas, que governam em nome da ordem, estabilidade e segurança nacional, subordinando completamente a autoridade civil ao poder militar.",
  },
  {
    name: "Socialismo de\nEstado",
    x: -2.5,
    y: -6.5,
    color: "#b91c1c",
    opacity: GLOBAL_OPACITY,
    description:
      "Economia totalmente estatal. Defende que o Estado deve possuir e gerir diretamente os principais meios de produção, planificando a economia de forma centralizada para garantir igualdade e eliminar o capitalismo.",
  },
  {
    name: "Totalitarismo",
    x: 0.0,
    y: -9.5,
    color: "#1f2937",
    opacity: GLOBAL_OPACITY,
    description:
      "Controlo total da sociedade. O Estado exerce autoridade absoluta sobre todos os aspetos da vida pública e privada, eliminando oposição, liberdade política e autonomia individual.",
  },
  {
    name: "Anarquismo\nIndividualista",
    x: 0.0,
    y: 9.5,
    color: "#a16207",
    opacity: GLOBAL_OPACITY,
    description:
      "Soberania total do indivíduo. Rejeita todas as formas de autoridade coerciva, defendendo que cada pessoa deve ser livre para agir sem interferência estatal ou coletiva imposta.",
  },
  {
    name: "Socialismo de\nMercado",
    x: -3.5,
    y: 2.0,
    color: "#ef4444",
    opacity: GLOBAL_OPACITY,
    description:
      "Mercado com propriedade social. Combina mercados livres com propriedade cooperativa ou pública das empresas, permitindo concorrência mas eliminando capitalistas privados.",
  },
  {
    name: "Autoritarismo\nCapitalista",
    x: 7.5,
    y: -4.0,
    color: "#1e40af",
    opacity: GLOBAL_OPACITY,
    description:
      "Mercado livre sob controlo político. Permite capitalismo e propriedade privada, mas com forte controlo político e repressão da oposição para manter estabilidade e crescimento económico.",
  },
  {
    name: "Libertarianismo\nModerado",
    x: 3.5,
    y: 6.5,
    color: "#eab308",
    opacity: GLOBAL_OPACITY,
    description:
      "Liberdade com Estado mínimo funcional. Defende mercados livres e liberdades civis fortes, mas aceita um pequeno Estado para funções essenciais como tribunais, polícia e defesa.",
  },
  {
    name: "Cooperativismo",
    x: -4.5,
    y: 4.5,
    color: "#9333ea",
    opacity: GLOBAL_OPACITY,
    description:
      "Economia baseada em cooperativas. Defende que empresas devem ser propriedade e geridas pelos trabalhadores, promovendo democracia económica e reduzindo desigualdades.",
  },
];
