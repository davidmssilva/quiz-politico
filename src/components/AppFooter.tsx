import { Link } from "react-router-dom";

export function AppFooter() {
  return (
    <footer className="w-full border-t border-border bg-card/50 py-2 sm:py-2">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-1">
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
                <Link to="/sobre" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre o Projeto
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contactos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xs mb-2">Legal</h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/privacidade" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-muted-foreground hover:text-primary transition-colors">
                  Termos de Serviço
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
