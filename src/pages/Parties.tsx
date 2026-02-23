import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { parties as originalParties, Party } from "@/data/parties";
import { ideologies } from "@/data/ideologies";
import { useI18n } from "@/i18n/i18nContext";
import { useTranslatedParties } from "@/i18n/useContentTranslation";
import { motion, AnimatePresence } from "framer-motion";
import { TYPOGRAPHY } from "@/lib/typography";
import PoliticalCompass from "@/components/PoliticalCompass";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";

export default function Parties() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const parties = useTranslatedParties(originalParties);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [expandedParty, setExpandedParty] = useState<number | null>(null);
  const partyRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  // Check if we came from results page
  const fromResults = location.state?.fromResults;

  // Auto-select party from URL parameter
  useEffect(() => {
    const partyId = searchParams.get('party');
    if (partyId) {
      const party = parties.find(p => p.id === parseInt(partyId));
      if (party) {
        setSelectedParty(party);
        setExpandedParty(party.id);
        
        // Scroll to the party card after a short delay to ensure rendering
        setTimeout(() => {
          const partyElement = partyRefs.current[party.id];
          if (partyElement) {
            partyElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    }
  }, [searchParams, parties]);

  // Find closest ideologies for a party
  const getClosestIdeologies = (party: Party) => {
    const distances = ideologies.map((ideo) => ({
      ideology: ideo,
      distance: Math.sqrt(
        Math.pow(party.x - ideo.x, 2) + Math.pow(party.y - ideo.y, 2)
      ),
    }));
    
    return distances
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .map((d) => d.ideology);
  };

  const getPositionLabel = (x: number, y: number) => {
    const economic = x > 2 ? t('compass.axisRight') : x < -2 ? t('compass.axisLeft') : 'Centro';
    const authority = y > 2 ? t('compass.axisAuth') : y < -2 ? t('compass.axisLib') : 'Centro';
    return `${economic} / ${authority}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Back button when coming from results */}
        {fromResults && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('common.back')}
          </Button>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
            {t('parties.title')}
          </h1>
          <p className="text-muted-foreground mt-1 text-lg font-sans">
            {t('parties.subtitle')}
          </p>
        </motion.div>

        {/* Compass View */}
        {selectedParty && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card p-4 rounded-2xl border border-border shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className={TYPOGRAPHY.body.lg}>
                {selectedParty.name}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedParty(null)}
                className="hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {t('common.close')}
              </Button>
            </div>
            <PoliticalCompass
              parties={parties}
              userResult={{
                economicScore: selectedParty.x,
                authorityScore: selectedParty.y,
                socialScore: selectedParty.z,
                sovereigntyScore: selectedParty.s,
              }}
              pastResults={[]}
            />
          </motion.div>
        )}

        {/* Party List */}
        <div className="grid gap-3">
          {parties.map((party, index) => {
            const closestIdeologies = getClosestIdeologies(party);
            const isExpanded = expandedParty === party.id;

            return (
              <motion.div
                key={party.id}
                ref={(el) => (partyRefs.current[party.id] = el)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedParty(isExpanded ? null : party.id)}
                  className="w-full text-left p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: party.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-lg font-bold text-card-foreground mb-1 leading-snug">
                          {party.shortName}
                        </h3>
                        <p className="font-sans text-xs text-muted-foreground mb-2 font-normal">
                          {party.name}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {closestIdeologies.map((ideo) => (
                            <span
                              key={ideo.name}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                            >
                              {ideo.name.replace('\n', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-medium text-foreground">
                          {getPositionLabel(party.x, party.y)}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-normal">
                          E: {party.x.toFixed(1)} / A: {party.y.toFixed(1)}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="border-t border-border overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 py-4 bg-muted/30">
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-normal">
                          {party.description}
                        </p>
                        <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                          <div>
                            <span className="text-muted-foreground font-normal">{t('compass.axisLeft')}/{t('compass.axisRight')}:</span>
                            <span className="ml-2 font-medium">{party.x.toFixed(1)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground font-normal">{t('compass.axisAuth')}/{t('compass.axisLib')}:</span>
                            <span className="ml-2 font-medium">{party.y.toFixed(1)}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedParty(party);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full sm:w-auto"
                        >
                          {t('parties.viewOnCompass')}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
