import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { TYPOGRAPHY } from "@/lib/typography";
import { useEffect } from "react";
import { updateMetaTags, SEO_CONFIGS } from "@/lib/seo";

export default function Terms() {
  useEffect(() => {
    updateMetaTags(SEO_CONFIGS.terms);
  }, []);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showBussola={true} showNewQuiz={true} />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-slate max-w-none">
          <h1 className={TYPOGRAPHY.heading.h1}>Termos de Serviço</h1>
          <p className="text-muted-foreground text-lg">Última atualização: 19 de fevereiro de 2026</p>
          
          <section className="mt-8 space-y-6">
            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>Sobre Este Serviço</h2>
              <p className="text-base leading-relaxed">
                A Bússola Política Portugal é uma ferramenta educacional gratuita que ajuda a compreender 
                a sua posição no espectro político português através de um questionário de 100 perguntas.
              </p>
            </div>

            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>Natureza Educacional</h2>
              <p className="text-base leading-relaxed">
                Este website tem fins puramente educacionais. Os resultados são aproximações baseadas em 
                programas políticos dos partidos e informações recolhidas da internet, não constituem aconselhamento político ou recomendações de voto.
              </p>
            </div>

            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>Imparcialidade</h2>
              <p className="text-base leading-relaxed">
                Comprometemo-nos a manter este projeto imparcial. As perguntas são baseadas em análise 
                objetiva de programas políticos. Sugestões de melhoria são bem-vindas através da nossa 
                <a href="/#/contacto" className="text-primary hover:underline"> página de contacto</a>.
              </p>
            </div>

            {/* Uncomment when AdSense is approved */}
            {/* <div>
              <h2 className={TYPOGRAPHY.heading.h2}>Publicidade</h2>
              <p className="text-base leading-relaxed">
                Este website exibe publicidade através do Google AdSense. 
                A publicidade é gerida pelo Google e está sujeita às suas políticas.
              </p>
            </div> */}

            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>Utilização</h2>
              <p className="text-base leading-relaxed">
                Este é um serviço gratuito fornecido "como está". Por favor, utilize-o de forma responsável 
                e não tente interferir com o seu funcionamento.
              </p>
            </div>

            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>Alterações</h2>
              <p className="text-base leading-relaxed">
                Podemos atualizar estes termos ocasionalmente. A data da última atualização está indicada no topo desta página.
              </p>
            </div>
          </section>
        </article>
      </main>
      
      <AppFooter />
    </div>
  );
}
