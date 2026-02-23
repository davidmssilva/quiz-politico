import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { TYPOGRAPHY } from "@/lib/typography";
import { useEffect } from "react";
import { updateMetaTags, SEO_CONFIGS } from "@/lib/seo";
import { useI18n } from "@/i18n/i18nContext";

export default function Privacy() {
  const { t } = useI18n();
  
  useEffect(() => {
    updateMetaTags(SEO_CONFIGS.privacy);
  }, []);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showBussola={true} showNewQuiz={true} />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-slate max-w-none">
          <h1 className={TYPOGRAPHY.heading.h1}>{t('privacy.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('privacy.lastUpdated')}</p>
          
          <section className="mt-8 space-y-6">
            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>{t('privacy.yourPrivacyTitle')}</h2>
              <p className="text-base leading-relaxed">
                {t('privacy.yourPrivacyDesc')}
              </p>
            </div>

            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>{t('privacy.dataStaysTitle')}</h2>
              <p className="text-base leading-relaxed">
                {t('privacy.dataStaysDesc')}
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
              <h2 className={TYPOGRAPHY.heading.h2}>{t('privacy.sharingTitle')}</h2>
              <p className="text-base leading-relaxed">
                {t('privacy.sharingDesc')}
              </p>
            </div>

            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>{t('privacy.questionsTitle')}</h2>
              <p className="text-base leading-relaxed">
                {t('privacy.questionsDesc')}
                {' '}
                <a href="/#/contacto" className="text-primary hover:underline">{t('privacy.contactLink')}</a>.
              </p>
            </div>
          </section>
        </article>
      </main>
      
      <AppFooter />
    </div>
  );
}
