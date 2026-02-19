import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { TYPOGRAPHY } from "@/lib/typography";
import { Target, Shield, Users, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { updateMetaTags, SEO_CONFIGS } from "@/lib/seo";

export default function About() {
  useEffect(() => {
    updateMetaTags(SEO_CONFIGS.about);
  }, []);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showBussola={true} showNewQuiz={true} />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-12">
          <div>
            <h1 className={TYPOGRAPHY.heading.h1}>Sobre a Bússola Política Portugal</h1>
            <p className="text-muted-foreground text-lg mt-4">
              Uma ferramenta educacional para compreender o espectro político português
            </p>
          </div>

          <section className="space-y-6">
            <div className="p-6 border border-border rounded-xl">
              <h2 className={TYPOGRAPHY.heading.h2}>O Nosso Propósito</h2>
              <p className="text-base leading-relaxed mt-4">
                A Bússola Política Portugal nasceu da necessidade de criar uma ferramenta profunda e imparcial 
                que ajude os portugueses a compreender melhor a sua posição no espectro político. Ao contrário 
                de outros quizzes superficiais, analisamos 4 dimensões políticas através de 100 perguntas 
                cuidadosamente elaboradas.
              </p>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-border rounded-xl">
              <Target className="w-10 h-10 text-primary mb-4" />
              <h3 className={TYPOGRAPHY.heading.h3}>Profundidade</h3>
              <p className="text-sm text-muted-foreground mt-2">
                100 perguntas cobrindo 8 categorias temáticas para uma análise completa das suas convicções políticas.
              </p>
            </div>

            <div className="p-6 border border-border rounded-xl">
              <Shield className="w-10 h-10 text-primary mb-4" />
              <h3 className={TYPOGRAPHY.heading.h3}>Imparcialidade</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Análise objetiva baseada em programas políticos oficiais, sem viés ideológico ou partidário.
              </p>
            </div>

            <div className="p-6 border border-border rounded-xl">
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className={TYPOGRAPHY.heading.h3}>Privacidade</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Os seus dados nunca saem do seu navegador. Total privacidade e controlo sobre as suas respostas.
              </p>
            </div>

            <div className="p-6 border border-border rounded-xl">
              <TrendingUp className="w-10 h-10 text-primary mb-4" />
              <h3 className={TYPOGRAPHY.heading.h3}>Atualizado</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Posições dos partidos atualizadas para 2026, refletindo a realidade política portuguesa atual.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className={TYPOGRAPHY.heading.h2}>Como Funciona</h2>
            <div className="space-y-4">
              <div>
                <h3 className={TYPOGRAPHY.heading.h3}>1. Quatro Dimensões Políticas</h3>
                <p className="text-base leading-relaxed">
                  Analisamos a sua posição em 4 eixos fundamentais:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-base">
                  <li><strong>Económico:</strong> Esquerda (intervenção estatal) vs Direita (livre mercado)</li>
                  <li><strong>Autoridade:</strong> Libertário (liberdades individuais) vs Autoritário (ordem e controlo)</li>
                  <li><strong>Social:</strong> Progressista (mudança social) vs Conservador (tradição)</li>
                  <li><strong>Soberania:</strong> Globalista (integração europeia) vs Nacionalista (soberania nacional)</li>
                </ul>
              </div>

              <div>
                <h3 className={TYPOGRAPHY.heading.h3}>2. Metodologia de Pontuação</h3>
                <p className="text-base leading-relaxed">
                  Cada pergunta tem ponderações específicas para cada dimensão, baseadas em análise de programas 
                  políticos. Pode também indicar a importância de cada tema para si, refinando os resultados.
                </p>
              </div>

              <div>
                <h3 className={TYPOGRAPHY.heading.h3}>3. Comparação com Partidos</h3>
                <p className="text-base leading-relaxed">
                  Posicionamos todos os partidos portugueses legalizados ao dia de hoje no mesmo espaço político, permitindo ver quais partidos 
                  estão mais próximos das suas convicções através de cálculo de distância euclidiana 4D.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className={TYPOGRAPHY.heading.h2}>Transparência e Imparcialidade</h2>
            <p className="text-base leading-relaxed">
              Este projeto foi desenvolvido com o auxílio de assistentes de IA generativa, mas todas as 
              ponderações e posicionamentos foram cuidadosamente revisados para garantir imparcialidade. 
              Estamos abertos a sugestões e correções da comunidade.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className={TYPOGRAPHY.heading.h2}>Limitações</h2>
            <p className="text-base leading-relaxed">
              É importante compreender que nenhum questionário pode capturar perfeitamente a complexidade 
              das suas convicções políticas. Os resultados são uma aproximação educacional, não uma 
              recomendação de voto. Encorajamos pensamento crítico e análise independente.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className={TYPOGRAPHY.heading.h2}>Contacto e Sugestões</h2>
            <p className="text-base leading-relaxed">
              Valorizamos o seu feedback. Se encontrou algum erro, tem sugestões de melhoria, ou questões 
              sobre a metodologia, por favor contacte-nos através da nossa 
              <a href="/#/contacto" className="text-primary hover:underline"> página de contacto</a>.
            </p>
          </section>
        </article>
      </main>
      
      <AppFooter />
    </div>
  );
}
