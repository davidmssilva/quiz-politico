import { Link, useNavigate } from "react-router-dom";

export function AppFooter() {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-border bg-card/50 py-3 sm:py-3">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-1">
          <div>
            <h3 className="font-bold text-xs mb-2">Bússola Política Portugal</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ferramenta educacional para compreender o espectro político português através de análise imparcial.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-xs mb-2">Links Úteis</h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button 
                  onClick={() => handleLinkClick("/sobre")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  Sobre o Projeto
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/contacto")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  Contactos
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xs mb-2">Legal</h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button 
                  onClick={() => handleLinkClick("/privacidade")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick("/termos")} 
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  Termos de Serviço
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
