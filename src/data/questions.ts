export interface Question {
  id: number;
  text: string;
  category: string;
  economicWeight: number;
  authorityWeight: number;
}

export const questions: Question[] = [
  // ─── Economy (1–10) ───
  {
    id: 1,
    text: "O governo deve redistribuir riqueza dos mais ricos para os mais pobres.",
    category: "Economia",
    economicWeight: -1.0,
    authorityWeight: 0.3,
  },
  {
    id: 2,
    text: "Os mercados livres geralmente produzem melhores resultados para a sociedade.",
    category: "Economia",
    economicWeight: 1.0,
    authorityWeight: 0.0,
  },
  {
    // ALTERAÇÃO: Foco específico no caso TAP/Efacec/Empresas Estratégicas vs Privatização total.
    id: 3,
    text: "O Estado deve manter a posse de empresas estratégicas (ex: TAP, Energia) mesmo que dêem prejuízo.",
    category: "Economia",
    economicWeight: -1.0,
    authorityWeight: 0.5,
  },
  {
    id: 4,
    text: "Impostos elevados sobre as empresas prejudicam o crescimento económico.",
    category: "Economia",
    economicWeight: 1.0,
    authorityWeight: 0.0,
  },
  {
    // ALTERAÇÃO: Substituição do UBI (teórico) pelo RSI (tema quente em PT).
    id: 5,
    text: "Subsídios como o RSI (Rendimento Social de Inserção) desincentivam o trabalho e promovem a dependência.",
    category: "Economia",
    economicWeight: 1.0,
    authorityWeight: 0.2,
  },
  {
    id: 6,
    text: "Os sindicatos e a contratação coletiva são essenciais para proteger os trabalhadores.",
    category: "Economia",
    economicWeight: -1.0,
    authorityWeight: -0.2,
  },
  {
    id: 7,
    text: "O governo deve regular os preços de bens essenciais em tempos de inflação.",
    category: "Economia",
    economicWeight: -0.8,
    authorityWeight: -0.5,
  },
  {
    id: 8,
    text: "As empresas privadas são mais eficientes do que as públicas.",
    category: "Economia",
    economicWeight: 1.0,
    authorityWeight: 0.0,
  },
  {
    id: 9,
    text: "Aumentos do salário mínimo melhoram a qualidade de vida em geral.",
    category: "Economia",
    economicWeight: -0.8,
    authorityWeight: 0.0,
  },
  {
    id: 10,
    text: "A desigualdade económica é uma consequência natural do mérito individual.",
    category: "Economia",
    economicWeight: 1.0,
    authorityWeight: 0.0,
  },

  // ─── Healthcare (11–20) ───
  {
    id: 11,
    text: "O Serviço Nacional de Saúde (SNS) deve ser tendencialmente gratuito e universal.",
    category: "Saúde",
    economicWeight: -1.0,
    authorityWeight: 0.0,
  },
  {
    id: 12,
    text: "O Estado deve financiar os utentes para irem ao privado quando o público falha (Cheque-Saúde).",
    category: "Saúde",
    economicWeight: 0.8,
    authorityWeight: 0.0,
  },
  {
    id: 13,
    text: "O governo deve regular os preços dos medicamentos.",
    category: "Saúde",
    economicWeight: -0.7,
    authorityWeight: -0.4,
  },
  {
    // ALTERAÇÃO: Q14 (Prevenção) removida. Entra a Eutanásia aqui (já que a Q19 volta ao original).
    id: 14,
    text: "A eutanásia e o suicídio medicamente assistido devem ser direitos legais.",
    category: "Saúde",
    economicWeight: 0.0,
    authorityWeight: -1.0,
  },
  {
    id: 15,
    text: "Os indivíduos devem ser responsáveis pelos seus próprios custos de saúde.",
    category: "Saúde",
    economicWeight: 1.0,
    authorityWeight: 0.3,
  },
  {
    id: 16,
    text: "A saúde mental deve receber a mesma prioridade e financiamento que a saúde física.",
    category: "Saúde",
    economicWeight: -0.3,
    authorityWeight: 0.0,
  },
  {
    // ALTERAÇÃO: Foco nas PPP (Parcerias Público-Privadas) na saúde (ex: Hospital de Braga).
    id: 17,
    text: "As Parcerias Público-Privadas (PPP) nos hospitais devem ser recuperadas.",
    category: "Saúde",
    economicWeight: 0.8,
    authorityWeight: 0.0,
  },
  {
    id: 18,
    text: "O investimento em tecnologia deve ser priorizado na saúde.",
    category: "Saúde",
    economicWeight: 0.3,
    authorityWeight: 0.0,
  },
  {
    // REVERSÃO: Q19 Original restaurada a pedido do utilizador.
    id: 19,
    text: "As escolhas de estilo de vida (tabaco, álcool, obesidade) devem afetar a prioridade ou custos no acesso à saúde.",
    category: "Saúde",
    economicWeight: 0.5,
    authorityWeight: -0.3,
  },
  {
    id: 20,
    text: "Os sistemas de saúde devem priorizar a eficiência em vez da universalidade.",
    category: "Saúde",
    economicWeight: 0.8,
    authorityWeight: 0.0,
  },

  // ─── Education (21–30) ───
  {
    id: 21,
    text: "A educação deve ser totalmente gratuita, incluindo o Ensino Superior.",
    category: "Educação",
    economicWeight: -1.0,
    authorityWeight: 0.0,
  },
  {
    id: 22,
    text: "O Estado deve financiar escolas privadas através de contratos de associação.",
    category: "Educação",
    economicWeight: 0.8,
    authorityWeight: 0.0,
  },
  {
    id: 23,
    text: "O governo deve controlar rigorosamente o currículo nacional.",
    category: "Educação",
    economicWeight: -0.3,
    authorityWeight: -0.8,
  },
  {
    id: 24,
    text: "O pensamento crítico é mais importante do que a memorização.",
    category: "Educação",
    economicWeight: 0.0,
    authorityWeight: 0.3,
  },
  {
    // ALTERAÇÃO: Substituir Q25 (Vocacional) pelo debate das Propinas (Esquerda vs Direita).
    id: 25,
    text: "As propinas no ensino superior devem ser abolidas.",
    category: "Educação",
    economicWeight: -0.8,
    authorityWeight: 0.0,
  },
  {
    id: 26,
    text: "A disciplina de Cidadania deve ser obrigatória para formar valores democráticos.",
    category: "Educação",
    economicWeight: -0.5,
    authorityWeight: -0.5,
  },
  {
    id: 27,
    text: "Os professores devem ter mais autoridade para disciplinar os alunos.",
    category: "Educação",
    economicWeight: 0.0,
    authorityWeight: -0.6,
  },
  {
    id: 28,
    text: "Os rankings das escolas são uma ferramenta útil para os pais escolherem.",
    category: "Educação",
    economicWeight: 0.7,
    authorityWeight: 0.0,
  },
  {
    id: 29,
    text: "O financiamento público deve priorizar os alunos desfavorecidos (Ação Social).",
    category: "Educação",
    economicWeight: -0.8,
    authorityWeight: 0.0,
  },
  {
    id: 30,
    text: "A educação deve adaptar-se principalmente às necessidades do mercado de trabalho.",
    category: "Educação",
    economicWeight: 0.7,
    authorityWeight: 0.0,
  },

  // ─── Environment (31–40) ───
  {
    id: 31,
    text: "Projetos económicos importantes (ex: minas de lítio, aeroportos) devem avançar mesmo com impacto ambiental local.",
    category: "Ambiente",
    economicWeight: 0.6,
    authorityWeight: 0.0,
  },
  {
    id: 32,
    text: "O preço dos combustíveis deve incluir taxas pesadas de carbono para desincentivar o uso.",
    category: "Ambiente",
    economicWeight: -0.5,
    authorityWeight: -0.5,
  },
  {
    id: 33,
    text: "As alterações climáticas exigem mudanças radicais no nosso estilo de vida.",
    category: "Ambiente",
    economicWeight: -0.7,
    authorityWeight: 0.0,
  },
  {
    id: 34,
    text: "Os indivíduos devem assumir a responsabilidade pelo impacto ambiental.",
    category: "Ambiente",
    economicWeight: 0.3,
    authorityWeight: 0.3,
  },
  {
    id: 35,
    text: "As energias renováveis devem substituir completamente os combustíveis fósseis.",
    category: "Ambiente",
    economicWeight: -0.8,
    authorityWeight: 0.0,
  },
  {
    id: 36,
    text: "A agricultura intensiva é necessária para garantir preços baixos na alimentação.",
    category: "Ambiente",
    economicWeight: 0.6,
    authorityWeight: 0.2,
  },
  {
    id: 37,
    text: "Portugal deve apostar na energia nuclear.",
    category: "Ambiente",
    economicWeight: 0.3,
    authorityWeight: 0.0,
  },
  {
    id: 38,
    text: "As tradições rurais (ex: caça, touradas) são património cultural e devem ser protegidas.",
    category: "Ambiente",
    economicWeight: 0.2,
    authorityWeight: -0.7, // Authoritarian/Conservative regarding tradition
  },
  {
    id: 39,
    text: "O transporte individual (carros) deve ser restringido nos centros das cidades.",
    category: "Ambiente",
    economicWeight: -0.6,
    authorityWeight: -0.6,
  },
  {
    id: 40,
    text: "A tecnologia resolverá a crise climática sem necessidade de decrescimento económico.",
    category: "Ambiente",
    economicWeight: 0.5,
    authorityWeight: 0.0,
  },

  // ─── Social Issues (41–50) ───
  {
    id: 41,
    text: "O Estado deve intervir no mercado para limitar o valor das rendas.",
    category: "Questões Sociais",
    economicWeight: -1.0,
    authorityWeight: 0.4,
  },
  {
    id: 42,
    text: "O conceito tradicional de família deve ser preservado.",
    category: "Questões Sociais",
    economicWeight: 0.0,
    authorityWeight: -0.9,
  },
  {
    id: 43,
    text: "A diversidade multicultural fortalece a sociedade portuguesa.",
    category: "Questões Sociais",
    economicWeight: 0.0,
    authorityWeight: 0.6,
  },
  {
    id: 44,
    text: "O consumo de drogas leves deve ser legalizado e regulado (ex: Canábis).",
    category: "Questões Sociais",
    economicWeight: 0.3,
    authorityWeight: 0.8,
  },
  {
    id: 45,
    text: "A liberdade de expressão está ameaçada pelo 'politicamente correto'.",
    category: "Questões Sociais",
    economicWeight: 0.0,
    authorityWeight: -0.6,
  },
  {
    id: 46,
    text: "A ocupação de casas vazias é uma forma legítima de protesto contra a crise na habitação.",
    category: "Questões Sociais",
    economicWeight: -1.0,
    authorityWeight: 0.7, // Anarchist/Left direction
  },
  {
    id: 47,
    text: "A prostituição deve ser legalizada e regulamentada como uma profissão.",
    category: "Questões Sociais",
    economicWeight: 0.2,
    authorityWeight: 0.7,
  },
  {
    id: 48,
    text: "As pessoas trans devem ter acesso facilitado à mudança de sexo legal e cirúrgica.",
    category: "Questões Sociais",
    economicWeight: -0.2,
    authorityWeight: 0.8,
  },
  {
    id: 49,
    text: "A Igreja e as instituições religiosas têm demasiada influência na política.",
    category: "Questões Sociais",
    economicWeight: 0.0,
    authorityWeight: 0.5,
  },
  {
    id: 50,
    text: "Casais do mesmo sexo devem ter exatamente os mesmos direitos de adoção que casais heterossexuais.",
    category: "Questões Sociais",
    economicWeight: 0.0,
    authorityWeight: 0.9,
  },

  // ─── Government Role (51–60) ───
  {
    id: 51,
    text: "A justiça em Portugal é branda demais com os criminosos.",
    category: "Papel do Estado",
    economicWeight: 0.0,
    authorityWeight: -0.8,
  },
  {
    id: 52,
    text: "A carga fiscal em Portugal é excessiva e asfixia a economia.",
    category: "Papel do Estado",
    economicWeight: 1.0,
    authorityWeight: 0.0,
  },
  {
    id: 53,
    text: "O Estado deve garantir habitação pública para a classe média, não apenas para os pobres.",
    category: "Papel do Estado",
    economicWeight: -0.9,
    authorityWeight: 0.0,
  },
  {
    id: 54,
    text: "A burocracia do Estado justifica a fuga aos impostos (economia paralela).",
    category: "Papel do Estado",
    economicWeight: 0.6,
    authorityWeight: 0.5, // Anti-state authority
  },
  {
    // ALTERAÇÃO: Q55 removida. Entra a questão da Banca.
    id: 55,
    text: "O dinheiro dos contribuintes nunca deve ser usado para salvar bancos privados.",
    category: "Papel do Estado",
    economicWeight: 0.5, // Free market stance (let them fail)
    authorityWeight: 0.2,
  },
  {
    id: 56,
    text: "Portugal precisa de um líder forte que não tenha medo de quebrar regras para pôr o país na ordem.",
    category: "Papel do Estado",
    economicWeight: 0.0,
    authorityWeight: -1.0,
  },
  {
    id: 57,
    text: "Os deputados devem representar os interesses do seu círculo eleitoral e não a disciplina partidária.",
    category: "Papel do Estado",
    economicWeight: 0.0,
    authorityWeight: 0.6,
  },
  {
    id: 58,
    text: "O número de deputados no Parlamento e de assessores deve ser reduzido.",
    category: "Papel do Estado",
    economicWeight: 0.3,
    authorityWeight: -0.5, // Populist/Anti-establishment
  },
  {
    id: 59,
    text: "O enriquecimento ilícito (posse de riqueza inexplicável) deve ser criminalizado.",
    category: "Papel do Estado",
    economicWeight: 0.0,
    authorityWeight: -0.7,
  },
  {
    id: 60,
    text: "Portugal deve avançar para a Regionalização administrativa para combater o centralismo.",
    category: "Papel do Estado",
    economicWeight: -0.2,
    authorityWeight: 0.6, // Decentralization
  },

  // ─── Immigration (61–70) ───
  {
    id: 61,
    text: "A imigração é essencial para a sustentabilidade da Segurança Social.",
    category: "Imigração",
    economicWeight: -0.5,
    authorityWeight: 0.3,
  },
  {
    // ALTERAÇÃO: Fusão da Q62 e Q66 para criar uma pergunta de "fronteiras fechadas".
    id: 62,
    text: "Portugal deve fechar as portas à imigração não qualificada.",
    category: "Imigração",
    economicWeight: 0.2,
    authorityWeight: -0.9,
  },
  {
    id: 63,
    text: "Os imigrantes devem ter acesso imediato ao SNS e Segurança Social.",
    category: "Imigração",
    economicWeight: -0.8,
    authorityWeight: 0.5,
  },
  {
    id: 64,
    text: "Devemos acolher refugiados, mas com quotas estritas.",
    category: "Imigração",
    economicWeight: 0.0,
    authorityWeight: -0.3,
  },
  {
    id: 65,
    text: "O aumento da imigração é responsável pelo aumento da insegurança.",
    category: "Imigração",
    economicWeight: 0.0,
    authorityWeight: -0.9,
  },
  {
    // ALTERAÇÃO: Nova pergunta sobre o acordo CPLP (tema atual).
    id: 66,
    text: "Cidadãos de países de língua portuguesa (CPLP) devem ter facilidade total de entrada e residência.",
    category: "Imigração",
    economicWeight: 0.0,
    authorityWeight: 0.4,
  },
  {
    id: 67,
    text: "A lei da nacionalidade (Jus Soli) é demasiado permissiva e deve ser restringida.",
    category: "Imigração",
    economicWeight: 0.0,
    authorityWeight: -0.9,
  },
  {
    id: 68,
    text: "A cultura portuguesa está em risco de desaparecer devido à imigração.",
    category: "Imigração",
    economicWeight: 0.0,
    authorityWeight: -1.0,
  },
  {
    id: 69,
    text: "Os imigrantes vêm fazer os trabalhos que os portugueses não querem.",
    category: "Imigração",
    economicWeight: -0.4,
    authorityWeight: 0.3,
  },
  {
    // ALTERAÇÃO: Q70 (Dúbia) substituída por Serviço Militar Obrigatório (Tema defesa/sociedade).
    id: 70,
    text: "O Serviço Militar Obrigatório deve ser reintroduzido para os jovens.",
    category: "Imigração", // Mantido na faixa de ID, mas tematicamente é soberania/sociedade
    economicWeight: 0.0,
    authorityWeight: -0.8,
  },

  // ─── Security and Defense (71–80) ───
  {
    id: 71,
    text: "As forças de segurança (PSP/GNR) devem ter mais autoridade e meios, e direito à greve.",
    category: "Segurança e Defesa",
    economicWeight: -0.3,
    authorityWeight: -0.6, // Complex: Strike is Left, Authority is Right. Leans populist right currently.
  },
  {
    id: 72,
    text: "Portugal deve aumentar o investimento na Defesa para cumprir as metas da NATO.",
    category: "Segurança e Defesa",
    economicWeight: 0.4,
    authorityWeight: -0.4,
  },
  {
    id: 73,
    text: "Portugal deve manter uma postura de neutralidade em conflitos internacionais.",
    category: "Segurança e Defesa",
    economicWeight: 0.0,
    authorityWeight: 0.3, // Pacifism
  },
  {
    id: 74,
    text: "O uso de videovigilância nas ruas deve ser massificado para combater o crime.",
    category: "Segurança e Defesa",
    economicWeight: 0.0,
    authorityWeight: -0.8,
  },
  {
    id: 75,
    text: "A posse de armas para defesa pessoal deve ser facilitada aos cidadãos comuns.",
    category: "Segurança e Defesa",
    economicWeight: 0.0,
    authorityWeight: 0.5, // Libertarian right approach usually
  },
  {
    id: 76,
    text: "Penas de prisão perpétua devem ser introduzidas para crimes hediondos.",
    category: "Segurança e Defesa",
    economicWeight: 0.0,
    authorityWeight: -1.0,
  },
  {
    id: 77,
    text: "A castração química deve ser uma opção para abusadores sexuais de menores.",
    category: "Segurança e Defesa",
    economicWeight: 0.0,
    authorityWeight: -1.0,
  },
  {
    id: 78,
    text: "O combate à violência doméstica deve ser uma prioridade absoluta das forças policiais.",
    category: "Segurança e Defesa",
    economicWeight: -0.2,
    authorityWeight: 0.3,
  },
  {
    id: 79,
    text: "A polícia é estruturalmente racista.",
    category: "Segurança e Defesa",
    economicWeight: -0.5,
    authorityWeight: 0.7,
  },
  {
    id: 80,
    text: "A diplomacia é sempre preferível ao envio de armas para zonas de guerra.",
    category: "Segurança e Defesa",
    economicWeight: 0.0,
    authorityWeight: 0.5,
  },

  // ─── Technology and Context (81–90) ───
  {
    // ALTERAÇÃO: Q81 (Tech genérica) substituída por Teletrabalho (Relevante legislação PT).
    id: 81,
    text: "As empresas devem ser proibidas de contactar trabalhadores fora do horário (Direito a desligar).",
    category: "Tecnologia e Privacidade",
    economicWeight: -0.8,
    authorityWeight: 0.0,
  },
  {
    id: 82,
    text: "O acesso à internet deve ser considerado um direito humano básico garantido pelo Estado.",
    category: "Tecnologia e Privacidade",
    economicWeight: -0.6,
    authorityWeight: 0.0,
  },
  {
    id: 83,
    text: "As redes sociais devem ser responsabilizadas judicialmente pelo discurso de ódio nas suas plataformas.",
    category: "Tecnologia e Privacidade",
    economicWeight: -0.4,
    authorityWeight: -0.6,
  },
  {
    id: 84,
    text: "A Inteligência Artificial ameaça o emprego e deve pagar impostos (Taxa Robô).",
    category: "Tecnologia e Privacidade",
    economicWeight: -0.7,
    authorityWeight: -0.2,
  },
  {
    id: 85,
    text: "O Estado deve ter acesso a dados encriptados (ex: WhatsApp) para combater o terrorismo.",
    category: "Tecnologia e Privacidade",
    economicWeight: 0.0,
    authorityWeight: -0.9,
  },
  {
    id: 86,
    text: "O Alojamento Local trouxe mais benefícios do que prejuízos às cidades portuguesas.",
    category: "Tecnologia e Privacidade",
    economicWeight: 0.8,
    authorityWeight: 0.0,
  },
  {
    id: 87,
    text: "As criptomoedas devem ser fortemente reguladas e taxadas.",
    category: "Tecnologia e Privacidade",
    economicWeight: -0.6,
    authorityWeight: -0.3,
  },
  {
    id: 88,
    text: "O sistema de voto eletrónico deve ser implementado em Portugal.",
    category: "Tecnologia e Privacidade",
    economicWeight: 0.0,
    authorityWeight: 0.0, // Neutral modernization topic
  },
  {
    id: 89,
    text: "A censura online é necessária para proteger a democracia de desinformação (Fake News).",
    category: "Tecnologia e Privacidade",
    economicWeight: 0.0,
    authorityWeight: -0.7,
  },
  {
    // ALTERAÇÃO: Q90 (Tech opps - repetida) substituída por Interior/Desertificação.
    id: 90,
    text: "O interior do país deve ter benefícios fiscais exclusivos para atrair pessoas e empresas.",
    category: "Tecnologia e Privacidade", // Categoria mantida por ID, mas tema é Regional/Econ
    economicWeight: -0.5,
    authorityWeight: 0.0,
  },

  // ─── International Relations (91–100) ───
  {
    id: 91,
    text: "As leis portuguesas devem estar sempre subordinadas às diretivas da União Europeia.",
    category: "Relações Internacionais",
    economicWeight: 0.0,
    authorityWeight: 0.5,
  },
  {
    // ALTERAÇÃO: Q92 (Vago) substituído por Herança Colonial (Tema fraturante).
    id: 92,
    text: "Portugal deve pedir desculpa e assumir reparações históricas pelo seu passado colonial.",
    category: "Relações Internacionais",
    economicWeight: -0.5,
    authorityWeight: 0.8, // Progressive view
  },
  {
    id: 93,
    text: "Portugal deve sair da Zona Euro e recuperar a sua moeda (Escudo) para ter soberania económica.",
    category: "Relações Internacionais",
    economicWeight: -0.5, // Usually associated with PCP (left) but implies protectionism
    authorityWeight: -0.5,
  },
  {
    id: 94,
    text: "A globalização destruiu a indústria nacional e a soberania alimentar.",
    category: "Relações Internacionais",
    economicWeight: -0.6,
    authorityWeight: -0.4,
  },
  {
    id: 95,
    text: "Portugal deve reconhecer o Estado da Palestina imediatamente.",
    category: "Relações Internacionais",
    economicWeight: -0.4,
    authorityWeight: 0.4,
  },
  {
    id: 96,
    text: "A União Europeia deve evoluir para uma Federação Europeia (Estados Unidos da Europa).",
    category: "Relações Internacionais",
    economicWeight: 0.0,
    authorityWeight: 0.6,
  },
  {
    // ALTERAÇÃO: Q97 (Ajuda externa) substituído por Dependência de Fundos.
    id: 97,
    text: "Portugal é demasiado dependente dos fundos europeus e devia focar-se em criar riqueza própria.",
    category: "Relações Internacionais",
    economicWeight: 0.8,
    authorityWeight: 0.0,
  },
  {
    id: 98,
    text: "Devemos impor taxas a produtos importados de países que não respeitam direitos humanos.",
    category: "Relações Internacionais",
    economicWeight: -0.3,
    authorityWeight: 0.3,
  },
  {
    id: 99,
    text: "O alinhamento com os EUA é fundamental para a política externa portuguesa.",
    category: "Relações Internacionais",
    economicWeight: 0.5,
    authorityWeight: -0.2,
  },
  {
    // ALTERAÇÃO: Q100 (Gov global - repetido) substituído pela Guerra Ucrânia/Rússia (Postura).
    id: 100,
    text: "As sanções económicas à Rússia prejudicam mais os europeus do que o regime russo.",
    category: "Relações Internacionais",
    economicWeight: -0.3, // Often a PCP/Anti-NATO talking point
    authorityWeight: -0.3,
  },
];
