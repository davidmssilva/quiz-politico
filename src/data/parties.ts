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
}

export const parties: Party[] = [
  {
    id: 1,
    name: "Partido Comunista dos Trabalhadores Portugueses",
    shortName: "MRPP",
    x: -9.5,
    y: -9.0,
    z: -3.0,
    s: 9.5,
    color: "#ff0000",
    description:
      "Maoismo revolucionário, economia totalmente planificada, partido de vanguarda, anti-capitalismo e soberania nacional absoluta.",
  },
  {
    id: 2,
    name: "Movimento Alternativa Socialista",
    shortName: "MAS",
    x: -8.0,
    y: -2.0,
    z: -9.5,
    s: 6.0,
    color: "#a32424",
    description:
      "Trotskismo, socialismo internacionalista, democracia operária, forte progressismo social e crítica estrutural ao capitalismo.",
  },
  {
    id: 3,
    name: "Partido Comunista Português",
    shortName: "PCP",
    x: -8.0,
    y: -6.0,
    z: -2.0,
    s: 9.0,
    color: "#d11d10",
    description:
      "Marxismo-leninismo, controlo estatal da economia, soberania nacional e oposição estrutural ao federalismo europeu.",
  },
  {
    id: 4,
    name: "Partido Ecologista Os Verdes",
    shortName: "PEV",
    x: -6.5,
    y: -1.5,
    z: -6.5,
    s: 7.5,
    color: "#008000",
    description:
      "Ecossocialismo, economia sustentável planeada, progressismo ambiental e soberanismo crítico europeu.",
  },
  {
    id: 5,
    name: "Bloco de Esquerda",
    shortName: "BE",
    x: -8.0,
    y: 4.0,
    z: -9.5,
    s: 4.0,
    color: "#e51d1d",
    description:
      "Socialismo libertário, redistribuição económica, democracia participativa e progressismo social avançado.",
  },
  {
    id: 6,
    name: "LIVRE",
    shortName: "L",
    x: -5.5,
    y: 5.5,
    z: -10.0,
    s: -10.0,
    color: "#adc526",
    description:
      "Ecossocialismo democrático, progressismo social radical e federalismo europeu completo.",
  },
  {
    id: 7,
    name: "Partido Trabalhista Português",
    shortName: "PTP",
    x: -5.0,
    y: -0.5,
    z: -3.0,
    s: 2.0,
    color: "#ed1c24",
    description:
      "Socialismo reformista, defesa dos trabalhadores, economia mista e soberania moderada.",
  },
  {
    id: 8,
    name: "Partido Socialista",
    shortName: "PS",
    x: -2.0,
    y: -1.0,
    z: -5.5,
    s: -7.0,
    color: "#ff1a6e",
    description:
      "Social-democracia, economia de mercado regulada, Estado social forte e integração europeia.",
  },
  {
    id: 9,
    name: "Pessoas-Animais-Natureza",
    shortName: "PAN",
    x: -0.5,
    y: 2.5,
    z: -8.5,
    s: -4.0,
    color: "#00703c",
    description:
      "Progressismo ambiental, economia sustentável e defesa dos direitos dos animais.",
  },
  {
    id: 10,
    name: "Volt Portugal",
    shortName: "Volt",
    x: -1.0,
    y: 3.5,
    z: -8.5,
    s: -10.0,
    color: "#502379",
    description: "Liberalismo social progressista e federalismo europeu total.",
  },
  {
    id: 11,
    name: "Juntos pelo Povo",
    shortName: "JPP",
    x: 0.0,
    y: 0.5,
    z: -1.0,
    s: 0.0,
    color: "#00a19a",
    description:
      "Centrismo pragmático, regionalismo democrático e governação local.",
  },
  {
    id: 12,
    name: "Reagir Incluir Reciclar",
    shortName: "R.I.R.",
    x: 0.0,
    y: -4.0,
    z: 1.0,
    s: 3.5,
    color: "#00b2a9",
    description:
      "Populismo social moderado, defesa das comunidades e soberania económica.",
  },
  {
    id: 13,
    name: "Partido da Terra",
    shortName: "MPT",
    x: 1.5,
    y: 1.5,
    z: 3.0,
    s: -2.0,
    color: "#00a651",
    description:
      "Ecologia humanista, economia de mercado sustentável e conservadorismo moderado.",
  },
  {
    id: 14,
    name: "Nós, Cidadãos!",
    shortName: "NC",
    x: 3.5,
    y: 2.0,
    z: -2.0,
    s: -4.5,
    color: "#f39200",
    description:
      "Liberalismo social, reforma institucional e europeísmo democrático.",
  },
  {
    id: 15,
    name: "(A)TUA",
    shortName: "AT",
    x: 0.5,
    y: -0.5,
    z: 4.0,
    s: 1.5,
    color: "#06052e",
    description:
      "Distributismo social, defesa dos pensionistas e conservadorismo moderado.",
  },
  {
    id: 16,
    name: "Partido Social Democrata",
    shortName: "PPD/PSD",
    x: 4.0,
    y: -2.0,
    z: 2.0,
    s: -6.0,
    color: "#f26522",
    description:
      "Liberalismo-conservador, economia de mercado e integração europeia.",
  },
  {
    id: 17,
    name: "Partido Liberal Social",
    shortName: "PLS",
    x: 3.0,
    y: 3.0,
    z: -6.5,
    s: -5.0,
    color: "#f7d40e",
    description:
      "Liberalismo social, economia de mercado e progressismo moderado.",
  },
  {
    id: 18,
    name: "Iniciativa Liberal",
    shortName: "IL",
    x: 6.5,
    y: 6.0,
    z: -7.5,
    s: -5.0,
    color: "#00aeef",
    description: "Liberalismo clássico, Estado mínimo e liberdade económica.",
  },
  {
    id: 19,
    name: "CDS - Partido Popular",
    shortName: "CDS-PP",
    x: 3.5,
    y: -4.5,
    z: 8.5,
    s: 4.0,
    color: "#0066ad",
    description:
      "Democracia cristã, conservadorismo social e economia de mercado.",
  },
  {
    id: 20,
    name: "Partido Popular Monárquico",
    shortName: "PPM",
    x: 4.5,
    y: -6.0,
    z: 9.0,
    s: 7.5,
    color: "#003366",
    description:
      "Monarquismo, tradicionalismo conservador e soberanismo nacional.",
  },
  {
    id: 21,
    name: "NOVA DIREITA",
    shortName: "ND",
    x: 6.5,
    y: -5,
    z: 9.5,
    s: 9.0,
    color: "#1d3354",
    description:
      "Nacional-conservadorismo, autoridade estatal e soberania nacional.",
  },
  {
    id: 22,
    name: "Alternativa Democrática Nacional",
    shortName: "ADN",
    x: 4.5,
    y: -7.5,
    z: 10.0,
    s: 10.0,
    color: "#002e5d",
    description:
      "Conservadorismo radical, soberania nacional e autoridade do Estado.",
  },
  {
    id: 23,
    name: "CHEGA",
    shortName: "CH",
    x: 6.0,
    y: -7.0,
    z: 10.0,
    s: 10.0,
    color: "#202056",
    description:
      "Nacional-conservadorismo populista, autoridade estatal e soberanismo.",
  },
];
