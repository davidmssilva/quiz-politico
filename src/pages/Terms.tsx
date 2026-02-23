import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { TYPOGRAPHY } from "@/lib/typography";
import { useEffect } from "react";
import { updateMetaTags, SEO_CONFIGS } from "@/lib/seo";
import { useI18n } from "@/i18n/i18nContext";

export default function Terms() {
  const { t } = useI18n();
  
  useEffect(() => {
    updateMetaTags(SEO_CONFIGS.terms);
  }, []);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showBussola={true} showNewQuiz={true} />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-slate max-w-none">
          <h1 className={TYPOGRAPHY.heading.h1}>{t('terms.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('terms.lastUpdated')}</p>
          
          <section className="mt-8 space-y-6">
            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>{t('terms.aboutServiceTitle')}</h2>
              <p className="text-base leading-relaxed">
                {t('terms.aboutServiceDesc')}
              </p>
            </div>

            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>{t('terms.educationalTitle')}</h2>
              <p className="text-base leading-relaxed">
                {t('terms.educationalDesc')}
              </p>
            </div>

            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>{t('terms.impartialityTitle')}</h2>
              <p className="text-base leading-relaxed">
                {t('terms.impartialityDesc')}
                {' '}
                <a href="/#/contacto" className="text-primary hover:underline">{t('terms.contactLink')}</a>.
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
              <h2 className={TYPOGRAPHY.heading.h2}>{t('terms.usageTitle')}</h2>
              <p className="text-base leading-relaxed">
                {t('terms.usageDesc')}
              </p>
            </div>

            <div>
              <h2 className={TYPOGRAPHY.heading.h2}>{t('terms.changesTitle')}</h2>
              <p className="text-base leading-relaxed">
                {t('terms.changesDesc')}
              </p>
            </div>
          </section>
        </article>
      </main>
      
      <AppFooter />
    </div>
  );
}
