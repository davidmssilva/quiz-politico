// SEO utilities for dynamic meta tags
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

export function updateMetaTags(config: SEOConfig) {
  // Update title
  document.title = config.title;

  // Update or create meta tags
  const metaTags = [
    { name: "description", content: config.description },
    { name: "keywords", content: config.keywords || "" },
    { property: "og:title", content: config.title },
    { property: "og:description", content: config.description },
    { property: "twitter:title", content: config.title },
    { property: "twitter:description", content: config.description },
  ];

  metaTags.forEach(({ name, property, content }) => {
    const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
    let element = document.querySelector(selector);
    
    if (!element) {
      element = document.createElement("meta");
      if (name) element.setAttribute("name", name);
      if (property) element.setAttribute("property", property);
      document.head.appendChild(element);
    }
    
    element.setAttribute("content", content);
  });

  // Update canonical URL
  if (config.canonical) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", config.canonical);
  }

  // Update OG image
  if (config.ogImage) {
    ["og:image", "twitter:image"].forEach((property) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", config.ogImage!);
    });
  }
}

export const SEO_CONFIGS = {
  home: {
    title: "Bússola Política Portugal 2026 - Descubra a Sua Posição Política",
    description: "Descubra onde se situa no espectro político português através de 100 perguntas sobre economia, autoridade, valores sociais e soberania. Compare-se com 23 partidos portugueses.",
    keywords: "bússola política, quiz político, portugal, partidos políticos, espectro político, teste político, ideologia política, eleições portugal",
    canonical: "https://davidmssilva.github.io/quiz-politico/",
  },
  quiz: {
    title: "Questionário - Bússola Política Portugal",
    description: "Responda a 100 perguntas sobre economia, autoridade, valores sociais e soberania para descobrir a sua posição no espectro político português.",
    keywords: "questionário político, quiz portugal, teste político, perguntas políticas",
    canonical: "https://davidmssilva.github.io/quiz-politico/#/quiz",
  },
  results: {
    title: "Os Seus Resultados - Bússola Política Portugal",
    description: "Veja a sua posição no espectro político português e compare-se com os principais partidos políticos.",
    keywords: "resultados políticos, posição política, partidos portugal, espectro político",
    canonical: "https://davidmssilva.github.io/quiz-politico/#/resultados",
  },
  history: {
    title: "Histórico de Resultados - Bússola Política Portugal",
    description: "Consulte o histórico dos seus resultados anteriores e veja como a sua posição política evoluiu ao longo do tempo.",
    keywords: "histórico político, evolução política, resultados anteriores",
    canonical: "https://davidmssilva.github.io/quiz-politico/#/histórico",
  },
  about: {
    title: "Sobre o Projeto - Bússola Política Portugal",
    description: "Conheça a metodologia, objetivos e princípios de imparcialidade da Bússola Política Portugal.",
    keywords: "sobre, metodologia, imparcialidade, projeto político",
    canonical: "https://davidmssilva.github.io/quiz-politico/#/sobre",
  },
  contact: {
    title: "Contacto - Bússola Política Portugal",
    description: "Entre em contacto connosco para sugestões, reportar problemas ou contribuir para o projeto.",
    keywords: "contacto, feedback, sugestões, contribuir",
    canonical: "https://davidmssilva.github.io/quiz-politico/#/contacto",
  },
  privacy: {
    title: "Política de Privacidade - Bússola Política Portugal",
    description: "Saiba como os seus dados são tratados. Os seus dados nunca saem do seu navegador.",
    keywords: "privacidade, proteção de dados, RGPD",
    canonical: "https://davidmssilva.github.io/quiz-politico/#/privacidade",
  },
  terms: {
    title: "Termos de Serviço - Bússola Política Portugal",
    description: "Leia os termos de utilização da Bússola Política Portugal.",
    keywords: "termos, condições, utilização",
    canonical: "https://davidmssilva.github.io/quiz-politico/#/termos",
  },
};
