const navLinks = [
  { label: "Intro", href: "#intro" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function SiteNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg-deep/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#intro"
          className="text-sm font-medium tracking-wide text-text-primary transition-colors hover:text-accent"
        >
          Diego
        </a>
        <nav className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
