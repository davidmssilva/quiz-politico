import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { TYPOGRAPHY } from "@/lib/typography";
import { useEffect } from "react";
import { updateMetaTags, SEO_CONFIGS } from "@/lib/seo";

export default function Privacy() {
  useEffect(() => {
    updateMetaTags(SEO_CONFIGS.privacy);
  }, []);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showBussola={true} showNewQuiz={true} />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-slate max-w-none">
          <h1 className={TYPOGRAPHY.heading.h1}>Política de Privacidade</h1>
          <p className="text-muted-foreground text-lg">Última atualização: 19 de fevereiro de 2026</p>
          
          <section className="mt-8 space-y-6">
            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>A Sua Privacidade</h2>
              <p className="text-base leading-relaxed">
                Este é um projeto educacional gratuito. Levamos a sua privacidade a sério 
                e mantemos tudo o mais simples possível.
              </p>
            </div>

            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>Os Seus Dados Ficam Consigo</h2>
              <p className="text-base leading-relaxed">
                As suas respostas e resultados do questionário são guardados apenas no seu navegador 
                (localStorage). Nunca enviamos estes dados para nenhum servidor. Pode apagar tudo a 
                qualquer momento limpando os dados do navegador.
              </p>
            </div>

            {/* Uncomment when AdSense is approved */}
            {/* <div>
              <h2 className={TYPOGRAPHY.heading.h2}>Publicidade (Google AdSense)</h2>
              <p className="text-base leading-relaxed">
                Exibimos anúncios através do Google AdSense. 
                O Google pode usar cookies para personalizar os anúncios que vê.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Pode saber mais sobre como o Google trata os seus dados na 
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> Política de Privacidade do Google</a>.
              </p>
            </div> */}

            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>Partilha de Resultados</h2>
              <p className="text-base leading-relaxed">
                Quando partilha os seus resultados, apenas as suas pontuações políticas são incluídas 
                no URL. Nenhuma informação pessoal é partilhada.
              </p>
            </div>

            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>Questões?</h2>
              <p className="text-base leading-relaxed">
                Se tiver dúvidas sobre privacidade, pode contactar-nos através da 
                <a href="/#/contacto" className="text-primary hover:underline"> página de contacto</a>.
              </p>
            </div>
          </section>
        </article>
      </main>
      
      <AppFooter />
    </div>
  );
}
