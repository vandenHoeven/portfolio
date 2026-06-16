"use client";

import { useState } from "react";

type CopyEmailButtonProps = {
  email: string;
  primary?: boolean;
  compact?: boolean;
};

export default function CopyEmailButton({
  email,
  primary = false,
  compact = false,
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const padding = compact ? "px-4 py-2" : "px-6 py-3";
  const className = primary
    ? `rounded-lg bg-accent ${padding} text-sm font-semibold text-white transition-opacity hover:opacity-90`
    : `rounded-lg border border-border ${padding} text-sm text-text-muted transition-colors hover:border-accent/50 hover:text-accent`;

  return (
    <button type="button" onClick={handleCopy} className={className}>
      {copied ? "Copied!" : "Copy email"}
    </button>
  );
}
