export interface Party {
  id: number;
  name: string;
  shortName: string;
  x: number;
  y: number;
  z: number;
  s: number;
  color: string;
  description: string;
  longDescription: string;
}

export const parties: Party[] = [
  {
    id: 1,
    name: "Partido Comunista Trabalhadores Portugueses",
    shortName: "MRPP",
    x: -9.5,
    y: 9.0, // Invertido: Era -9.0 (Auth agora é +)
    z: -3.0,
    s: 9.5,
    color: "#ff0000",
    description:
      "Maoismo revolucionário, economia totalmente planificada, partido de vanguarda, anti-capitalismo e soberania nacional absoluta.",
    longDescription:
      "Fundado em 1970, o MRPP foi um dos principais movimentos de oposição à ditadura do Estado Novo. Historicamente alinhado com o maoísmo, defende a revolução proletária e a ditadura do proletariado. O partido vê-se a si próprio como a única e verdadeira vanguarda da classe operária, rejeitando o 'revisionismo' do PCP e posicionando-se como o autêntico defensor do comunismo puro, lutando por uma sociedade sem classes e o fim da exploração capitalista."
  },
  {
    id: 2,
    name: "Movimento Alternativa Socialista",
    shortName: "MAS",
    x: -8.0,
    y: 2.0, // Invertido: Era -2.0
    z: -9.5,
    s: 6.0,
    color: "#a32424",
    description:
      "Trotskismo, socialismo internacionalista, democracia operária, forte progressismo social e crítica estrutural ao capitalismo.",
    longDescription:
      "O MAS é um partido político português de esquerda radical, enraizado na tradição trotskista. Resultou de uma cisão do Bloco de Esquerda e procura representar os trabalhadores e a juventude precária. O partido vê-se como a verdadeira voz anticapitalista e revolucionária, recusando alianças com a esquerda institucional (como o PS) e focando-se na mobilização das bases, greves e movimentos sociais para alcançar um governo gerido pelos próprios trabalhadores."
  },
  {
    id: 3,
    name: "Partido Comunista Português",
    shortName: "PCP",
    x: -8.0,
    y: 6.0, // Invertido: Era -6.0
    z: -2.0,
    s: 9.0,
    color: "#d11d10",
    description:
      "Marxismo-leninismo, controlo estatal da economia, soberania nacional e oposição estrutural ao federalismo europeu.",
    longDescription:
      "Com mais de um século de história, o PCP é um partido marxista-leninista com forte base sindical, especialmente na CGTP. Teve um papel fundamental na resistência anti-fascista e na Revolução dos Cravos. O partido orgulha-se de ser o 'partido dos trabalhadores', mantendo uma organização centralizada e disciplinada. Vê-se como uma força patriótica e internacionalista incontornável para a defesa dos direitos laborais, rejeitando a submissão aos ditames da União Europeia e do grande capital."
  },
  {
    id: 4,
    name: "Partido Ecologista Os Verdes",
    shortName: "PEV",
    x: -6.5,
    y: 1.5, // Invertido: Era -1.5
    z: -6.5,
    s: 7.5,
    color: "#008000",
    description:
      "Ecossocialismo, economia sustentável planeada, progressismo ambiental e soberanismo crítico europeu.",
    longDescription:
      "Criado em 1982, o PEV é o partido ecologista mais antigo de Portugal e atua frequentemente em coligação com o PCP através da CDU. Foca-se na intersecção entre a justiça social e a proteção ambiental. Os Verdes veem-se como a voz coerente da ecologia política em Portugal, defendendo que não há verdadeiro ambientalismo sem o fim da exploração capitalista e sem o combate às desigualdades sociais e regionais."
  },
  {
    id: 5,
    name: "Bloco de Esquerda",
    shortName: "BE",
    x: -8.0,
    y: -4.0, // Invertido: Era 4.0 (Libertário agora é -)
    z: -9.5,
    s: 4.0,
    color: "#e51d1d",
    description:
      "Socialismo libertário, redistribuição económica, democracia participativa e progressismo social avançado.",
    longDescription:
      "O Bloco de Esquerda foi fundado em 1999 pela convergência de várias forças da esquerda radical (trotskistas, ex-PCP e maoístas). Ao longo dos anos, tornou-se a principal força à esquerda do PS, defendendo fortes políticas de Estado social, feminismo, direitos LGBTQ+ e sustentabilidade. O BE vê-se como uma esquerda moderna, plural e transformadora, capaz de combinar o socialismo democrático com os novos movimentos sociais, sendo a principal alternativa contra a austeridade e a precariedade."
  },
  {
    id: 6,
    name: "LIVRE",
    shortName: "L",
    x: -5.5,
    y: -5.5, // Invertido: Era 5.5
    z: -10.0,
    s: -10.0,
    color: "#adc526",
    description:
      "Ecossocialismo democrático, progressismo social radical e federalismo europeu completo.",
    longDescription:
      "O LIVRE foi fundado em 2014 em torno de figuras do mundo académico e ativista, com o objetivo de unir a esquerda ecologista e europeísta. Destaca-se pelas suas primárias abertas. O partido vê-se como a 'esquerda verde europeísta', posicionando-se como uma ponte de diálogo construtivo entre as várias forças políticas progressistas. Assume-se como pragmático, utópico e profundamente focado numa transição ecológica justa, no rendimento básico incondicional e numa Europa federal solidária."
  },
  {
    id: 7,
    name: "Partido Trabalhista Português",
    shortName: "PTP",
    x: -5.0,
    y: 0.5, // Invertido: Era -0.5
    z: -3.0,
    s: 2.0,
    color: "#ed1c24",
    description:
      "Socialismo reformista, defesa dos trabalhadores, economia mista e soberania moderada.",
    longDescription:
      "Criado para defender os interesses da classe trabalhadora de forma mais centrista que os partidos comunistas tradicionais, o PTP teve alguma projeção, sobretudo na Madeira. Vê-se como o partido do 'povo trabalhador', focando-se na denúncia da corrupção, nos direitos dos pensionistas e na luta contra as elites políticas instaladas. Assume uma postura anti-sistema dentro da esquerda moderada, utilizando muitas vezes uma retórica populista para defender a transparência pública."
  },
  {
    id: 8,
    name: "Partido Socialista",
    shortName: "PS",
    x: -2.0,
    y: 1.0, // Invertido: Era -1.0
    z: -5.5,
    s: -7.0,
    color: "#ff1a6e",
    description:
      "Social-democracia, economia de mercado regulada, Estado social forte e integração europeia.",
    longDescription:
      "O Partido Socialista, fundado em 1973 na Alemanha, é um dos dois pilares do sistema partidário português pós-25 de Abril. De raízes marxistas originais, evoluiu para a social-democracia tradicional de centro-esquerda. O partido vê-se como o 'partido do Estado Social' e da modernização do país, auto-intitulando-se o grande motor da integração europeia de Portugal, do desenvolvimento económico com justiça social e da estabilidade governativa."
  },
  {
    id: 9,
    name: "Pessoas-Animais-Natureza",
    shortName: "PAN",
    x: -0.5,
    y: -2.5, // Invertido: Era 2.5
    z: -8.5,
    s: -4.0,
    color: "#00703c",
    description:
      "Progressismo ambiental, economia sustentável e defesa dos direitos dos animais.",
    longDescription:
      "O Pessoas-Animais-Natureza surgiu em 2009, introduzindo o bem-estar animal e o biocentrismo na agenda política nacional. O PAN foca-se na superação da visão antropocêntrica da sociedade. Vê-se como um partido de vanguarda e pós-ideológico (nem de esquerda, nem de direita), cuja missão é ser a voz daqueles que não têm representação política (animais e natureza), promovendo uma transição para uma economia verde, pacífica e altamente sensível aos equilíbrios ecológicos."
  },
  {
    id: 10,
    name: "Volt Portugal",
    shortName: "Volt",
    x: 0.0,
    y: -3.5, // Invertido: Era 3.5
    z: -8.5,
    s: -10.0,
    color: "#502379",
    description: "Liberalismo social progressista e federalismo europeu total.",
    longDescription:
      "A secção portuguesa do movimento pan-europeu Volt Europa, foca-se em políticas baseadas em evidências e boas práticas partilhadas entre países europeus. O partido vê-se como o primeiro partido verdadeiramente europeu, focado em pragmatismo, inovação e resolução de problemas estruturais. Rejeitando os velhos dogmas esquerda-direita, o Volt define-se pelo seu compromisso com a criação de uns Estados Unidos da Europa, o combate ao populismo e o progresso tecnológico e social."
  },
  {
    id: 11,
    name: "Juntos pelo Povo",
    shortName: "JPP",
    x: 0.0,
    y: -0.5, // Invertido: Era 0.5
    z: -1.0,
    s: 0.0,
    color: "#00a19a",
    description:
      "Centrismo pragmático, regionalismo democrático e governação local.",
    longDescription:
      "O Juntos pelo Povo nasceu como um movimento independente de cidadãos na ilha da Madeira, focado na resolução de problemas concretos ao nível local, expandindo-se depois a partido nacional. O partido vê-se como a expressão máxima da cidadania ativa e do municipalismo, afastando-se das grandes disputas ideológicas nacionais para se focar na transparência da governação, no combate aos monopólios (especialmente regionais) e na resposta rápida e pragmática às necessidades da população."
  },
  {
    id: 12,
    name: "Reagir Incluir Reciclar",
    shortName: "R.I.R.",
    x: 0.0,
    y: 4.0, // Invertido: Era -4.0
    z: 1.0,
    s: 3.5,
    color: "#00b2a9",
    description:
      "Populismo social moderado, defesa das comunidades e soberania económica.",
    longDescription:
      "Fundado pela popular figura Vitorino Silva (Tino de Rans), o R.I.R. é um partido com uma forte componente humanista e popular. Foca-se em temas do quotidiano e no senso comum. O partido vê-se como a verdadeira 'voz do povo' genuíno, longe das elites de Lisboa e dos políticos tradicionais. A sua identidade assenta numa política de proximidade, simplicidade na linguagem e no contacto direto com as pessoas, apelando a um voto de protesto positivo e afável."
  },
  {
    id: 13,
    name: "Partido da Terra",
    shortName: "MPT",
    x: 1.5,
    y: -1.5, // Invertido: Era 1.5
    z: 3.0,
    s: -2.0,
    color: "#00a651",
    description:
      "Ecologia humanista, economia de mercado sustentável e conservadorismo moderado.",
    longDescription:
      "O Partido da Terra foi fundado em 1993 e distingue-se pelo seu ecologismo de centro-direita. Combina preocupações com o ordenamento do território com princípios liberais e conservadores. O MPT vê-se como a voz do 'ecologismo humanista e realista', defendendo que o desenvolvimento económico e a livre iniciativa não são incompatíveis com a defesa do meio ambiente, apelando a políticas baseadas na gestão equilibrada dos recursos naturais sem a componente radical anticapitalista."
  },
  {
    id: 14,
    name: "Nós, Cidadãos!",
    shortName: "NC",
    x: 3.5,
    y: -2.0, // Invertido: Era 2.0
    z: -2.0,
    s: -4.5,
    color: "#f39200",
    description:
      "Liberalismo social, reforma institucional e europeísmo democrático.",
    longDescription:
      "Nós, Cidadãos! surgiu no seguimento da intervenção da Troika, impulsionado por académicos e profissionais liberais, apelando à reforma do sistema eleitoral e político. O partido vê-se como um movimento de cidadania indignada e cívica que transitou para a política formal. Posiciona-se como uma força anticorrupção, pró-europeia e defensora acérrima da renovação das instituições democráticas, focando-se na redução do peso do Estado e na meritocracia."
  },
  {
    id: 15,
    name: "(A)TUA",
    shortName: "AT",
    x: 0.0,
    y: 1.5,
    z: 4.0,
    s: 1.5,
    color: "#06052e",
    description:
      "Distributismo social, defesa dos pensionistas e conservadorismo moderado.",
    longDescription:
      "Anteriormente conhecido como Partido Unido dos Reformados e Pensionistas (PURP), reorganizou-se mais tarde. Foi inicialmente desenhado para combater a perda de poder de compra e dignidade dos mais velhos após a crise de austeridade. O partido vê-se como o escudo de proteção da geração que construiu o país, rejeitando clivagens ideológicas convencionais para exigir o fim da corrupção, melhorias na saúde e pensões justas para todos aqueles que consideram ter sido abandonados pelo sistema."
  },
  {
    id: 16,
    name: "Partido Social Democrata",
    shortName: "PPD/PSD",
    x: 4.0,
    y: 2.0, // Invertido: Era -2.0
    z: 2.0,
    s: -6.0,
    color: "#f26522",
    description:
      "Liberalismo-conservador, economia de mercado e integração europeia.",
    longDescription:
      "Fundado em 1974, o Partido Social Democrata (apesar do nome, que remonta às suas raízes reformistas) é o grande pilar do centro-direita português. Juntamente com o PS, dominou a governação do país em democracia. O partido vê-se a si mesmo como a força interclassista da liberdade, do humanismo personalista e do progresso económico. Auto-intitula-se como o partido das reformas estruturais, da responsabilidade financeira e do apoio inequívoco à iniciativa privada e às empresas."
  },
  {
    id: 17,
    name: "Partido Liberal Social",
    shortName: "PLS",
    x: 3.0,
    y: -3.0, // Invertido: Era 3.0
    z: -6.5,
    s: -5.0,
    color: "#f7d40e",
    description:
      "Liberalismo social, economia de mercado e progressismo moderado.",
    longDescription:
      "O Partido Liberal Social apresenta propostas do espectro liberal moderado, procurando espaço entre o PS e o PSD. Defende uma abordagem moderna que reconcilia a liberdade económica com uma forte rede de segurança social. O partido vê-se como o representante do liberalismo equilibrado, focado num Estado eficiente, transparente e pequeno, mas capaz de garantir a igualdade de oportunidades e o desenvolvimento social sem preconceitos dogmáticos."
  },
  {
    id: 18,
    name: "Iniciativa Liberal",
    shortName: "IL",
    x: 6.5,
    y: -6.0, // Invertido: Era 6.0
    z: -7.5,
    s: -5.0,
    color: "#00aeef",
    description: "Liberalismo clássico, Estado mínimo e liberdade económica.",
    longDescription:
      "A Iniciativa Liberal, fundada em 2017, trouxe o liberalismo económico e político clássico de forma contundente para o debate parlamentar português. Assume uma visão marcadamente anti-estatista e reformadora. A IL vê-se a si mesma como a única força capaz de retirar Portugal da 'cauda da Europa' através da diminuição radical de impostos, fim de monopólios estatais e defesa incondicional da liberdade de escolha no ensino e na saúde, criticando duramente o 'socialismo' que domina o sistema político."
  },
  {
    id: 19,
    name: "CDS - Partido Popular",
    shortName: "CDS-PP",
    x: 4.0,
    y: 4.0, // Invertido: Era -4.5
    z: 8.5,
    s: 4.0,
    color: "#0066ad",
    description:
      "Democracia cristã, conservadorismo social e economia de mercado.",
    longDescription:
      "Fundado em 1974, o Centro Democrático e Social (hoje CDS - Partido Popular) tem fortes raízes na democracia cristã europeia. Historicamente posicionado à direita do PSD, com quem governa frequentemente em coligação. O partido vê-se a si mesmo como o grande bastião conservador e da direita tradicional portuguesa, assente na defesa intransigente da família, na promoção da vida, no patriotismo, no mundo rural, no apoio às forças de segurança e no princípio da subsidiariedade económica."
  },
  {
    id: 20,
    name: "Partido Popular Monárquico",
    shortName: "PPM",
    x: 4.5,
    y: 6.0, // Invertido: Era -6.0
    z: 9.0,
    s: 7.5,
    color: "#003366",
    description:
      "Monarquismo, tradicionalismo conservador e soberanismo nacional.",
    longDescription:
      "O Partido Popular Monárquico, fundado em 1974, junta a defesa da causa monárquica e a restauração da coroa a um profundo conservadorismo e ecologismo incipiente (historicamente introduzido por Gonçalo Ribeiro Telles). O partido vê-se como o herdeiro autêntico da tradição e História de Portugal, defendendo o Rei como figura máxima de isenção institucional, opondo-se à República e valorizando a descentralização, o respeito pela terra e as matrizes socioculturais católicas."
  },
  {
    id: 21,
    name: "NOVA DIREITA",
    shortName: "ND",
    x: 6.5,
    y: 5.0, // Invertido: Era -5
    z: 9.5,
    s: 9.0,
    color: "#1d3354",
    description:
      "Nacional-conservadorismo, autoridade estatal e soberania nacional.",
    longDescription:
      "A NOVA DIREITA, um partido de fundação recente, apresenta-se como uma força conservadora e soberanista no panorama nacional. Foca-se em colmatar o espaço entre a direita democrática tradicional (PSD/CDS) e a direita populista radical. O partido vê-se como uma direita 'forte, descomplexada e construtiva', valorizando imensamente a identidade nacional, a integração exigente e controlada de imigrantes, e uma presença do Estado autoritária mas cirúrgica para repor a ordem e os valores tradicionais."
  },
  {
    id: 22,
    name: "Alternativa Democrática Nacional",
    shortName: "ADN",
    x: 4.5,
    y: 7.5, // Invertido: Era -7.5
    z: 10.0,
    s: 10.0,
    color: "#002e5d",
    description:
      "Conservadorismo radical, soberania nacional e autoridade do Estado.",
    longDescription:
      "A Alternativa Democrática Nacional, anteriormente o Partido Democrático Republicano (PDR) fundado por Marinho e Pinto, sofreu uma guinada radical à direita nos últimos anos. Tem ganho tração através do ceticismo acentuado face às instituições globais. O partido vê-se a si próprio como o último reduto de defesa dos valores cristãos e da soberania inegociável de Portugal contra agendas globalistas ('woke' e de género), assumindo uma forte postura anti-sistema e, em várias instâncias, negacionista sanitária."
  },
  {
    id: 23,
    name: "CHEGA",
    shortName: "CH",
    x: 6.0,
    y: 7.0, // Invertido: Era -7.0
    z: 10.0,
    s: 10.0,
    color: "#202056",
    description:
      "Nacional-conservadorismo populista, autoridade estatal e soberanismo.",
    longDescription:
      "O CHEGA foi fundado em 2019 e rapidamente se afirmou como a terceira maior força política em Portugal, rompendo a dinâmica de blocos de décadas. Caracteriza-se por um discurso nacional-populista e fortemente securitário. O partido vê-se como a voz corajosa da 'maioria silenciosa' e dos portugueses de bem que estão cansados da corrupção, da impunidade do sistema (o 'regime') e do 'laxismo' nas fronteiras e na justiça, assumindo-se abertamente como a verdadeira e única direita patriótica antissistema."
  }
];