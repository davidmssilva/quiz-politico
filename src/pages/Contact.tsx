import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { TYPOGRAPHY } from "@/lib/typography";
import { Github, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { updateMetaTags, SEO_CONFIGS } from "@/lib/seo";
import { useI18n } from "@/i18n/i18nContext";

export default function Contact() {
  const { t } = useI18n();
  
  useEffect(() => {
    updateMetaTags(SEO_CONFIGS.contact);
  }, []);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showBussola={true} showNewQuiz={true} />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div>
            <h1 className={TYPOGRAPHY.heading.h1}>{t('contact.title')}</h1>
            <p className="text-muted-foreground text-lg mt-4">
              {t('contact.subtitle')}
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Github className="w-10 h-10 text-primary mb-4" />
              <h3 className={TYPOGRAPHY.heading.h3}>{t('contact.githubTitle')}</h3>
              <p className="text-base leading-relaxed mt-4">
                {t('contact.githubDesc')}
              </p>
              <a 
                href="https://github.com/davidmssilva/quiz-politico" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium text-lg block mt-4"
              >
                github.com/davidmssilva/quiz-politico
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <MessageSquare className="w-10 h-10 text-primary mb-4" />
              <h3 className={TYPOGRAPHY.heading.h3}>{t('contact.feedbackTitle')}</h3>
              <p className="text-base leading-relaxed mt-4">
                {t('contact.feedbackDesc')}
                {' '}
                <a 
                  href="https://github.com/davidmssilva/quiz-politico/issues" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >{t('contact.feedbackLink')}</a>.
              </p>
              <p className="text-base leading-relaxed mt-4">
                {t('contact.impartialityNote')}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <AppFooter />
    </div>
  );
}
