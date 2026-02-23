import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { TYPOGRAPHY } from "@/lib/typography";
import { Target, Shield, Users, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { updateMetaTags, SEO_CONFIGS } from "@/lib/seo";
import { useI18n } from "@/i18n/i18nContext";

export default function About() {
  const { t } = useI18n();
  
  useEffect(() => {
    updateMetaTags(SEO_CONFIGS.about);
  }, []);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showBussola={true} showNewQuiz={true} />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <article className="space-y-12">
          <div>
            <h1 className={TYPOGRAPHY.heading.h1}>{t('about.title')}</h1>
            <p className="text-muted-foreground text-lg mt-4">
              {t('about.subtitle')}
            </p>
          </div>

          <section className="space-y-6">
            <div className="p-6 border border-border rounded-xl">
              <h2 className={TYPOGRAPHY.heading.h2}>{t('about.purposeTitle')}</h2>
              <p className="text-base leading-relaxed mt-4">
                {t('about.purposeDesc')}
              </p>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-border rounded-xl">
              <Target className="w-10 h-10 text-primary mb-4" />
              <h3 className={TYPOGRAPHY.heading.h3}>{t('about.depthTitle')}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {t('about.depthDesc')}
              </p>
            </div>

            <div className="p-6 border border-border rounded-xl">
              <Shield className="w-10 h-10 text-primary mb-4" />
              <h3 className={TYPOGRAPHY.heading.h3}>{t('about.impartialityTitle')}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {t('about.impartialityDesc')}
              </p>
            </div>

            <div className="p-6 border border-border rounded-xl">
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className={TYPOGRAPHY.heading.h3}>{t('about.privacyTitle')}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {t('about.privacyDesc')}
              </p>
            </div>

            <div className="p-6 border border-border rounded-xl">
              <TrendingUp className="w-10 h-10 text-primary mb-4" />
              <h3 className={TYPOGRAPHY.heading.h3}>{t('about.updatedTitle')}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {t('about.updatedDesc')}
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className={TYPOGRAPHY.heading.h2}>{t('about.howItWorksTitle')}</h2>
            <div className="space-y-4">
              <div>
                <h3 className={TYPOGRAPHY.heading.h3}>{t('about.fourDimensionsTitle')}</h3>
                <p className="text-base leading-relaxed">
                  {t('about.fourDimensionsDesc')}
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-base">
                  <li>{t('about.economicAxis')}</li>
                  <li>{t('about.authorityAxis')}</li>
                  <li>{t('about.socialAxis')}</li>
                  <li>{t('about.sovereigntyAxis')}</li>
                </ul>
              </div>

              <div>
                <h3 className={TYPOGRAPHY.heading.h3}>{t('about.methodologyTitle')}</h3>
                <p className="text-base leading-relaxed">
                  {t('about.methodologyDesc')}
                </p>
              </div>

              <div>
                <h3 className={TYPOGRAPHY.heading.h3}>{t('about.comparisonTitle')}</h3>
                <p className="text-base leading-relaxed">
                  {t('about.comparisonDesc')}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className={TYPOGRAPHY.heading.h2}>{t('about.transparencyTitle')}</h2>
            <p className="text-base leading-relaxed">
              {t('about.transparencyDesc')}
            </p>
          </section>

          <section className="space-y-6">
            <h2 className={TYPOGRAPHY.heading.h2}>{t('about.limitationsTitle')}</h2>
            <p className="text-base leading-relaxed">
              {t('about.limitationsDesc')}
            </p>
          </section>

          <section className="space-y-6">
            <h2 className={TYPOGRAPHY.heading.h2}>{t('about.contactTitle')}</h2>
            <p className="text-base leading-relaxed">
              {t('about.contactDesc')}
              {' '}
              <a href="/#/contacto" className="text-primary hover:underline">{t('about.contactLink')}</a>.
            </p>
          </section>
        </article>
      </main>
      
      <AppFooter />
    </div>
  );
}
