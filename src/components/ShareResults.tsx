import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Send, Link, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareProps {
  url: string;
  text: string;
}

export function ShareResults({ url, text }: ShareProps) {
  const { toast } = useToast();

  const platforms = [
    {
      name: "Twitter / X",
      icon: <Twitter className="w-4 h-4" />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-4 h-4" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "WhatsApp",
      icon: <MessageSquare className="w-4 h-4" />,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + "\n" + url)}`,
    },
    {
      name: "Telegram",
      icon: <Send className="w-4 h-4" />,
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    },
    {
      name: "Reddit",
      icon: <div className="font-bold text-[10px]">R/</div>,
      href: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent("Bússola Política")}`,
    },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast({ description: "Link copiado com sucesso!" });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-sans text-xl sm:text-2xl font-bold leading-snug">
        Partilhar Resultados
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {platforms.map((p) => (
          <Button
            key={p.name}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 justify-start h-10 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm hover:bg-primary/10 hover:text-primary hover:border-primary/30 dark:hover:bg-primary/20 dark:hover:border-primary/50 transition-all duration-200"
            onClick={() => window.open(p.href, "_blank")}
          >
            {p.icon}
            <span>{p.name}</span>
          </Button>
        ))}
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-2 justify-start h-10 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm bg-primary/10 hover:bg-primary/20 text-primary border-none"
          onClick={copyLink}
        >
          <Link className="w-4 h-4" />
          <span>Copiar Link</span>
        </Button>
      </div>
    </div>
  );
}
