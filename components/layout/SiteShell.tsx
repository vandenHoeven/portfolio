type SiteShellProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SiteShell({ children, className = "" }: SiteShellProps) {
  return (
    <div className={`min-h-screen text-text-primary ${className}`}>
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-10">{children}</div>
    </div>
  );
}
