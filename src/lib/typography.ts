export const TYPOGRAPHY = {
  // Headings - using serif font for visual hierarchy
  heading: {
    h1: "font-serif text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tighter",
    h2: "font-serif text-2xl sm:text-3xl font-bold leading-snug",
    h3: "font-serif text-xl sm:text-2xl font-bold leading-snug",
    h4: "font-serif text-lg font-bold leading-snug",
  },
  
  // Question text - using serif font for emphasis
  question: {
    lg: "font-serif text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-snug text-center sm:text-left",
    base: "font-serif text-base sm:text-lg font-bold text-foreground leading-snug text-center sm:text-left",
  },
  
  // Body text - using sans font for readability
  body: {
    lg: "font-sans text-base font-medium leading-relaxed",
    base: "font-sans text-sm font-medium leading-relaxed",
    sm: "font-sans text-xs font-medium leading-relaxed",
  },
  
  // Labels and tags
  label: {
    lg: "font-sans text-sm font-semibold uppercase tracking-wider",
    base: "font-sans text-xs font-semibold uppercase tracking-widest",
    sm: "font-sans text-[10px] font-bold uppercase tracking-[0.2em]",
  },
  
  // Button text
  button: {
    lg: "font-sans text-base font-bold",
    base: "font-sans text-sm font-bold",
    sm: "font-sans text-xs font-bold",
  },
  
  // Captions and secondary text
  caption: {
    base: "font-sans text-xs font-medium text-muted-foreground",
    sm: "font-sans text-[10px] font-medium text-muted-foreground",
  },
  
  // Meta information and small details
  meta: {
    base: "font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40",
    sm: "font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground",
  },
  
  // Italic text - using serif for emphasis
  italic: {
    base: "font-serif italic text-base",
    sm: "font-serif italic text-sm",
  },
};
