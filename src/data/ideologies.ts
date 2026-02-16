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
      "Revolução camponesa e luta de classes contínua sob controlo estatal rígido.\nBaseia-se na adaptação do marxismo à realidade agrária, onde o campesinato é a força revolucionária central. Defende a mobilização de massas e a economia coletivizada através de planos estatais severos. O Estado detém o poder absoluto sobre a cultura e a política para evitar o ressurgimento de valores burgueses, utilizando a disciplina partidária para moldar a sociedade.",
  },
  {
    name: "Marxismo-\nLeninismo",
    x: -8.0,
    y: -6.0,
    color: "#dc2626",
    opacity: GLOBAL_OPACITY,
    description:
      "Controlo centralizado e planeamento estatal da economia.\nPropõe a vanguarda do partido como guia para derrubar o capitalismo e estabelecer uma ditadura do proletariado. A economia é totalmente planeada pelo centro, eliminando a propriedade privada dos meios de produção. O objetivo é a industrialização rápida e a redistribuição total da riqueza, mantendo um sistema de partido único que supervisiona todos os aspetos da vida civil.",
  },
  {
    name: "Capitalismo\nde Estado",
    x: -4.5,
    y: -5.5,
    color: "#7f1d1d",
    opacity: GLOBAL_OPACITY,
    description:
      "O Estado atua como a principal entidade económica, mantendo lucros e hierarquias.\nNeste sistema, o governo assume o papel de capitalista monopolista, gerindo empresas e recursos como se fossem privados, mas sob tutela pública. Embora mantenha estruturas de mercado e lucro, a direção estratégica é puramente política. É caracterizado por uma forte burocracia estatal que controla os setores estratégicos e a força de trabalho, muitas vezes limitando a liberdade sindical.",
  },
  {
    name: "Trotskismo",
    x: -8.0,
    y: -2.0,
    color: "#991b1b",
    opacity: GLOBAL_OPACITY,
    description:
      "Revolução internacionalista com forte organização de vanguarda.\nDefende a 'revolução permanente', argumentando que o socialismo não pode sobreviver isolado num só país. Opõe-se à burocratização excessiva do Estado, embora mantenha a necessidade de um controlo centralizado na fase de transição. Foca-se na democracia operária dentro do partido, mas mantém uma postura autoritária face à propriedade privada e ao sistema capitalista global.",
  },

  // ═══ AUTHORITARIAN RIGHT (top-right: Y negativo) ═══
  {
    name: "Fascismo",
    x: 7.5,
    y: -9.0,
    color: "#1f2937",
    opacity: GLOBAL_OPACITY,
    description:
      "Estado totalitário, nacionalismo extremo e corporativismo.\nSubmete todos os interesses individuais e de classe à vontade do Estado soberano sob a liderança de um líder supremo. Rejeita tanto o liberalismo como o marxismo, promovendo uma economia corporativista onde o Estado arbitra entre patrões e operários. Utiliza o mito nacionalista e a força militar como pilares de coesão, exigindo obediência absoluta e a supressão de qualquer oposição política.",
  },
  {
    name: "Nacional-\nConservadorismo",
    x: 6.0,
    y: -7.0,
    color: "#1e3a8a",
    opacity: GLOBAL_OPACITY,
    description:
      "Foco na autoridade, lei e ordem, e identidade nacional.\nPrivilegia a preservação das tradições culturais e religiosas como base da estabilidade social. Defende um Estado forte em questões de segurança, fronteiras e moralidade, mantendo uma economia de mercado que serve os interesses da nação. É cético face à globalização e ao multiculturalismo, acreditando que a coesão social depende de uma identidade nacional clara e de instituições tradicionais sólidas.",
  },
  {
    name: "Reacionarismo",
    x: 4.5,
    y: -6.0,
    color: "#4a2511",
    opacity: GLOBAL_OPACITY,
    description:
      "Desejo de regressar a estados sociais e políticos anteriores, rejeitando a modernidade.\nConsidera que as mudanças sociais das últimas décadas foram prejudiciais e defende o restabelecimento de hierarquias tradicionais ou monárquicas. Opõe-se ativamente ao progresso democrático liberal e aos valores iluministas. Propõe uma ordem social rígida onde a autoridade é absoluta e a estrutura da sociedade é ditada por valores históricos, religiosos ou aristocráticos considerados intemporais.",
  },
  {
    name: "Democracia\nCristã",
    x: 3.0,
    y: -3.0,
    color: "#2563eb",
    opacity: GLOBAL_OPACITY,
    description:
      "Ordem social baseada em valores cristãos e economia de mercado.\nProcura aplicar princípios éticos cristãos à política, defendendo a dignidade humana e a solidariedade social. Apoia a 'Economia Social de Mercado', onde o Estado intervém para garantir o bem-estar e a justiça, mas respeita a propriedade privada e a iniciativa individual. Valoriza a família e as comunidades intermédias como pilares da sociedade, equilibrando o conservadorismo moral com a responsabilidade social.",
  },

  // ═══ AUTHORITARIAN CENTER (top-center) ═══
  {
    name: "Tecnocracia",
    x: 0.0,
    y: -7.0,
    color: "#475569",
    opacity: GLOBAL_OPACITY,
    description:
      "Governo por especialistas técnicos e cientistas em vez de políticos eleitos.\nSustenta que as decisões políticas devem ser baseadas em dados, lógica e método científico, minimizando a influência da ideologia ou do voto popular. O Estado é visto como uma máquina que deve ser gerida com máxima eficiência técnica. A economia é planeada para otimizar recursos, priorizando a competência técnica e a produtividade acima de debates democráticos ou liberdades de mercado desreguladas.",
  },

  // ═══ LIBERTARIAN LEFT (bottom-left: Y positivo) ═══
  {
    name: "Anarco-\nComunismo",
    x: -9.0,
    y: 9.0,
    color: "#111827",
    opacity: GLOBAL_OPACITY,
    description:
      "Sociedade sem classes ou Estado baseada em comunas voluntárias.\nPropõe a abolição imediata de todas as hierarquias, incluindo o Estado e o sistema salarial. A economia baseia-se na ajuda mútua e na propriedade comum, onde cada um contribui segundo as suas capacidades e recebe segundo as suas necessidades. As decisões são tomadas por democracia direta em comunidades locais descentralizadas, garantindo a liberdade individual absoluta através da cooperação voluntária.",
  },
  {
    name: "Ecossocialismo",
    x: -6.5,
    y: 6.0,
    color: "#16a34a",
    opacity: GLOBAL_OPACITY,
    description:
      "Justiça ambiental e social através da descentralização democrática.\nArgumenta que a crise ecológica é uma consequência inevitável do capitalismo e que apenas um sistema socialista pode salvar o planeta. Propõe uma produção focada nas necessidades humanas e nos limites da natureza, rejeitando o crescimento infinito. Defende a gestão comunitária de recursos, o fim do extrativismo predatório e a substituição das hierarquias corporativas por cooperativas de trabalhadores.",
  },
  {
    name: "Socialismo\nLibertário",
    x: -6.0,
    y: 3.0,
    color: "#b91c1c",
    opacity: GLOBAL_OPACITY,
    description:
      "Propriedade coletiva com rejeição do autoritarismo estatal.\nDefende que os trabalhadores devem gerir diretamente os meios de produção sem a necessidade de um Estado centralizado ou de uma elite partidária. Combina o desejo socialista de igualdade económica com a desconfiança anarquista face ao poder político. Foca-se na autogestão, no sindicalismo revolucionário e na criação de estruturas horizontais onde o poder flui de baixo para cima.",
  },
  {
    name: "Progressismo",
    x: -2.5,
    y: 4.5,
    color: "#a855f7",
    opacity: GLOBAL_OPACITY,
    description:
      "Foco na justiça social, reforma institucional e direitos civis avançados.\nDefende que o Estado deve ser usado como uma ferramenta para remover desigualdades históricas e promover a inclusão. Apoia políticas de identidade, direitos LGBTQ+, proteção de minorias e reformas ambientais através de processos democráticos. No plano económico, aceita o mercado mas exige regulações fortes e um sistema fiscal progressivo para financiar serviços públicos universais e justiça redistributiva.",
  },

  // ═══ LIBERTARIAN RIGHT (bottom-right: Y positivo) ═══
  {
    name: "Anarco-\nCapitalismo",
    x: 9.0,
    y: 9.0,
    color: "#ca8a04",
    opacity: GLOBAL_OPACITY,
    description:
      "Soberania individual total e eliminação do Estado via mercado livre.\nDefende que todas as funções sociais, incluindo justiça e segurança, devem ser fornecidas por empresas privadas num mercado livre sem restrições. Baseia-se no Princípio da Não-Agressão (PNA) e no direito absoluto à propriedade privada. Considera o Estado uma entidade ilegítima e predatória, acreditando que as trocas voluntárias e os contratos privados são suficientes para organizar uma sociedade pacífica.",
  },
  {
    name: "Minarquismo",
    x: 8.0,
    y: 7.0,
    color: "#d97706",
    opacity: GLOBAL_OPACITY,
    description:
      "Estado mínimo limitado apenas à proteção, justiça e defesa.\nArgumenta que um governo é necessário mas deve restringir-se estritamente à função de 'vigilante noturno', protegendo os cidadãos contra a agressão, roubo e fraude. Todas as outras áreas, como educação, saúde e economia, devem ser deixadas ao setor privado. O objetivo é garantir o máximo de liberdade individual possível, mantendo apenas a estrutura legal mínima necessária para evitar o caos.",
  },
  {
    name: "Liberalismo\nClássico",
    x: 6.5,
    y: 5.0,
    color: "#0ea5e9",
    opacity: GLOBAL_OPACITY,
    description:
      "Defesa das liberdades civis e do governo limitado.\nEnfatiza o primado do indivíduo, o Estado de Direito e a liberdade económica como motores do progresso humano. Apoia o mercado livre com regulação mínima, a defesa da propriedade privada e a separação de poderes. Historicamente ligado ao Iluminismo, acredita que a sociedade se organiza melhor através da iniciativa privada e da cooperação espontânea, com o Estado atuando apenas como garantidor das leis fundamentais.",
  },
  {
    name: "Liberalismo\nSocial",
    x: 2.5,
    y: 3.0,
    color: "#eab308",
    opacity: GLOBAL_OPACITY,
    description:
      "Liberdade individual com ênfase na igualdade de oportunidades.\nAcredita que a liberdade real não é apenas a ausência de coerção estatal, mas também a presença de condições sociais básicas como educação e saúde. Defende uma economia de mercado competitiva, mas com uma rede de segurança estatal que impeça a pobreza extrema. O Estado intervém pontualmente para corrigir falhas de mercado e garantir que todos os indivíduos tenham um ponto de partida justo na vida.",
  },

  // ═══ LIBERTARIAN CENTER (bottom-center) ═══
  {
    name: "Georgismo",
    x: 1.0,
    y: 7.5,
    color: "#0d9488",
    opacity: GLOBAL_OPACITY,
    description:
      "Liberdade individual máxima, mas a renda da terra deve pertencer à comunidade.\nBaseia-se na ideia de que os indivíduos devem possuir o valor que criam com o seu trabalho, mas os recursos naturais e a terra pertencem à humanidade em comum. Propõe um imposto único sobre o valor da terra para financiar as necessidades sociais e eliminar outros impostos. Procura combinar a eficiência económica do mercado livre com a justiça social na distribuição da riqueza natural.",
  },

  // ═══ CENTER ═══
  {
    name: "Social-\nDemocracia",
    x: -2.0,
    y: -1.0,
    color: "#f43f5e",
    opacity: GLOBAL_OPACITY,
    description:
      "Equilíbrio entre mercado e bem-estar social estatal.\nProcura humanizar o capitalismo através de um Estado social forte, sindicatos ativos e uma economia mista. Apoia a democracia parlamentar e utiliza a fiscalidade progressiva para financiar serviços públicos universais, como saúde e educação. O objetivo é reduzir as desigualdades económicas sem abolir a propriedade privada, promovendo uma classe média forte e uma rede de segurança social abrangente para todos os cidadãos.",
  },
  {
    name: "Centrismo",
    x: 0.0,
    y: 0.0,
    color: "#6b7280",
    opacity: GLOBAL_OPACITY,
    description:
      "Moderação política e pragmatismo.\nRejeita os extremos de esquerda e direita, preferindo soluções equilibradas e graduais para os problemas da sociedade. Baseia-se no compromisso, na evidência prática e no respeito pelas instituições democráticas existentes. O centrismo adapta-se conforme o contexto, podendo apoiar políticas de mercado ou sociais dependendo do que for mais eficaz, mantendo sempre o foco na estabilidade e no consenso democrático.",
  },
  {
    name: "Neoliberalismo",
    x: 4.0,
    y: -0.5,
    color: "#06b6d4",
    opacity: GLOBAL_OPACITY,
    description:
      "Privatização, desregulação e mercados livres como motor social.\nDefende que a concorrência de mercado é a forma mais eficiente de organizar a atividade humana. Propõe a redução do gasto público, a abertura comercial e a transferência do controlo económico do Estado para o setor privado. Acredita que o crescimento económico impulsionado pela liberdade empresarial acaba por beneficiar toda a sociedade, focando-se na estabilidade monetária e na eficiência individual.",
  },
  {
    name: "Nacional-\nSindicalismo",
    x: 2.0,
    y: -8.5,
    color: "#44403c",
    opacity: GLOBAL_OPACITY,
    description:
      "Ideologia corporativista que rejeita o liberalismo e a luta de classes.\nPropõe uma organização da sociedade baseada em 'sindicatos verticais' que agrupam trabalhadores e patrões por ramo de produção sob a tutela do Estado. Foca-se na unidade nacional e na abolição do parlamentarismo liberal em favor de uma representação funcional. Procura uma 'terceira via' económica que combine a justiça social com o nacionalismo autoritário e a preservação dos valores tradicionais da nação.",
  },
  {
    name: "Euroceticismo",
    x: 4.5,
    y: -7.5,
    color: "#1e293b",
    opacity: GLOBAL_OPACITY,
    description:
      "Oposição à integração europeia e defesa da soberania nacional.\nAcredita que as instituições da União Europeia são excessivamente burocráticas e retiram o poder de decisão aos cidadãos locais. Defende o regresso das competências políticas e económicas aos parlamentos nacionais. No espectro autoritário, manifesta-se pela proteção das fronteiras e da cultura nacional, vendo a integração supranacional como uma ameaça à identidade e à autodeterminação da pátria.",
  },
  {
    name: "Populismo\nSincrético",
    x: 0.0,
    y: -4.0,
    color: "#f59e0b",
    opacity: GLOBAL_OPACITY,
    description:
      "Combina elementos de esquerda e direita sob uma retórica anti-elite.\nFoca-se na defesa do 'povo comum' contra uma elite política e económica que considera corrupta ou desligada da realidade. Não se prende a dogmas ideológicos rígidos, podendo apoiar medidas de proteção social típicas da esquerda e valores conservadores ou segurança típicos da direita. É pragmático e direto, utilizando uma comunicação simples para mobilizar o descontentamento popular contra o sistema estabelecido.",
  },

  // ═══ NOVAS ENTRADAS (LIBERTÁRIO / PROGRESSISTA) ═══
  {
    name: "Federalismo\nEuropeu",
    x: -1.0,
    y: 3.5,
    color: "#5b21b6",
    opacity: GLOBAL_OPACITY,
    description:
      "Defesa de uma união política europeia mais profunda e democrática.\nPropõe a transformação da União Europeia num Estado federal com soberania partilhada, um exército comum e um governo eleito diretamente. Acredita que os desafios globais apenas podem ser enfrentados por uma Europa unida e forte. No plano social, é progressista e focado na proteção dos direitos fundamentais, transparência institucional e integração económica justa entre todos os estados-membros.",
  },
  {
    name: "Ecologia\nHumanista",
    x: 1.5,
    y: 1.5,
    color: "#16a34a",
    opacity: GLOBAL_OPACITY,
    description:
      "Ambientalismo focado na harmonia entre o desenvolvimento humano e a natureza.\nRejeita a ecologia radical que vê o ser humano como um problema, focando-se em soluções técnicas e éticas para a sustentabilidade. Defende um mercado responsável e o uso da ciência para proteger a biodiversidade enquanto se mantém o progresso económico. É uma visão moderada que procura integrar a proteção do planeta com a dignidade e a liberdade da pessoa humana no centro das políticas.",
  },
  {
    name: "Municipalismo",
    x: -3.0,
    y: 7.5,
    color: "#0369a1",
    opacity: GLOBAL_OPACITY,
    description:
      "Sistema de governação que privilegia a autonomia local e decisões comunitárias.\nDefende que o poder deve ser exercido o mais próximo possível dos cidadãos, nas juntas de freguesia e municípios. Reduz a importância do Estado central em favor de assembleias locais e autarquias com amplos poderes financeiros e legislativos. Acredita que a democracia direta e a gestão de proximidade são mais eficazes e menos propensas à corrupção do que os sistemas nacionais centralizados.",
  },
  {
    name: "Radicalismo\nDemocrático",
    x: -7.5,
    y: 1.5,
    color: "#be123c",
    opacity: GLOBAL_OPACITY,
    description:
      "Foco na extensão máxima dos direitos democráticos e civis.\nPropõe reformas estruturais profundas para aumentar a participação popular, como referendos frequentes e a democratização de todas as instituições sociais. No plano económico, exige uma regulação severa para impedir que o poder financeiro subverta a vontade popular. É uma ideologia combativa que procura remover todos os vestígios de autoritarismo e privilégio herdado do sistema político e económico.",
  },

  // ═══ NOVAS ENTRADAS (ECONOMIA MISTA / TRANSIÇÃO) ═══
  {
    name: "Distributismo",
    x: -1.0,
    y: 1.5,
    color: "#7c3aed",
    opacity: GLOBAL_OPACITY,
    description:
      "Defende a propriedade privada o mais amplamente difundida possível.\nOpõe-se tanto ao socialismo de Estado, que concentra tudo no governo, como ao capitalismo, que concentra tudo em grandes empresas. Propõe uma sociedade de pequenos proprietários, artesãos e cooperativas onde a família é a unidade económica central. Baseia-se na ideia de que a liberdade política é impossível sem independência económica, promovendo a descentralização do capital e da produção.",
  },
  {
    name: "Ordoliberalismo",
    x: 5.5,
    y: 1.5,
    color: "#2563eb",
    opacity: GLOBAL_OPACITY,
    description:
      "Liberalismo que defende que o Estado deve garantir as regras da concorrência.\nAcredita que o mercado livre não se mantém sozinho e que o Estado tem o dever de criar um quadro legal rígido que impeça monopólios e cartéis. Ao contrário do laissez-faire absoluto, exige uma intervenção estatal ativa para preservar a ordem do mercado e garantir funções sociais básicas. É a base do modelo económico alemão, focando-se na estabilidade de preços, responsabilidade fiscal e concorrência justa.",
  },
  {
    name: "Mutualismo",
    x: -5.0,
    y: 8.5,
    color: "#d97706",
    opacity: GLOBAL_OPACITY,
    description:
      "Anarquismo económico baseado na reciprocidade e trocas justas.\nPropõe um sistema onde os indivíduos e cooperativas trocam bens e serviços através de um banco mútuo que fornece crédito a juro zero. Rejeita o lucro obtido sem trabalho e a exploração, mas mantém a posse privada baseada no uso e na ocupação. É uma síntese entre a liberdade individual e a justiça socialista, focando-se na organização voluntária da economia através da reciprocidade federada.",
  },
  {
    name: "Socialismo\nReformista",
    x: -5.0,
    y: -0.5,
    color: "#e11d48",
    opacity: GLOBAL_OPACITY,
    description:
      "Defende a superação do capitalismo através de reformas parlamentares graduais.\nAo contrário dos revolucionários, acredita que as instituições democráticas podem ser transformadas de dentro para fora para alcançar uma economia socialista. Apoia a nacionalização de setores estratégicos e o fortalecimento do poder laboral através da lei. Situa-se numa zona de transição, procurando utilizar o Estado para transferir o poder económico das elites para as classes trabalhadoras de forma pacífica e legal.",
  },
  {
    name: "Eurocomunismo",
    x: -6.0,
    y: -1.5,
    color: "#991b1b",
    opacity: GLOBAL_OPACITY,
    description:
      "Tendência comunista que rejeita o modelo soviético e aceita a democracia.\nSurgiu nos partidos comunistas da Europa Ocidental, defendendo que o socialismo deve ser alcançado respeitando as liberdades civis e o pluralismo político. Rejeita a ditadura do proletariado e a submissão a Moscovo, focando-se em alianças democráticas para transformar a economia. Mantém o objetivo final da abolição do capitalismo, mas através de um caminho democrático, nacional e independente.",
  },

  // ═══ ENTRE GEORGISMO E EXTREMO DIREITA LIBERAL ═══
  {
    name: "Agorismo",
    x: 7.5,
    y: 8.5,
    color: "#a16207",
    opacity: GLOBAL_OPACITY,
    description:
      "Estratégia libertária que defende a criação de economias paralelas.\nPropõe a 'contra-economia' (mercados livres e trocas informais) como forma de retirar o poder financeiro ao Estado até que este se torne irrelevante. Rejeita a participação política tradicional, focando-se na ação direta económica e na desobediência fiscal. Acredita que a liberdade será alcançada quando os indivíduos conseguirem realizar todas as suas transações fora da regulação e vigilância estatal.",
  },
  {
    name: "Paleolibertarismo",
    x: 6.0,
    y: 7.5,
    color: "#854d0e",
    opacity: GLOBAL_OPACITY,
    description:
      "Combina a filosofia política libertária com valores sociais conservadores.\nDefende a abolição do Estado e o mercado livre absoluto, mas acredita que uma sociedade sem Estado só sobrevive se for guiada por tradições, família e moralidade conservadora. Opõe-se ao progressismo social, vendo-o como uma forma de decadência que depende do Estado. Acredita que as instituições naturais (igrejas, comunidades) devem substituir as funções de ordem e apoio que o Estado atualmente usurpa.",
  },
  {
    name: "Liberalismo de\nRecursos",
    x: 4.5,
    y: 8.0,
    color: "#15803d",
    opacity: GLOBAL_OPACITY,
    description:
      "Defende a propriedade privada radical com compensações pelo uso de recursos.\nÉ uma visão libertária que reconhece que o uso de terra ou recursos naturais finitos priva os outros do seu uso original. Por isso, propõe taxas de compensação por poluição ou ocupação de espaço natural, que seriam devolvidas à comunidade. Procura equilibrar o direito absoluto à iniciativa privada com a responsabilidade ética de não esgotar o capital natural que pertence a todos de forma igualitária.",
  },
];
