import { Link, useNavigate } from "react-router-dom";

export function AppFooter() {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-border bg-card/50 py-3 sm:py-4">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 gap-y-2 text-[10px] sm:text-xs">
          <span className="font-bold text-foreground">Bússola Política Portugal</span>
          <span className="text-muted-foreground">•</span>
          <button 
            onClick={() => handleLinkClick("/sobre")} 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Sobre o Projeto
          </button>
          <span className="text-muted-foreground">•</span>
          <button 
            onClick={() => handleLinkClick("/contacto")} 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Contactos
          </button>
          <span className="text-muted-foreground">•</span>
          <button 
            onClick={() => handleLinkClick("/privacidade")} 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Política de Privacidade
          </button>
          <span className="text-muted-foreground">•</span>
          <button 
            onClick={() => handleLinkClick("/termos")} 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Termos de Serviço
          </button>
        </div>
      </div>
    </footer>
  );
}
