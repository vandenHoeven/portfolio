"use client";

import { useEffect } from "react";

export default function ProjectsRedirect() {
  useEffect(() => {
    window.location.replace("/#projects");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center text-text-muted">
      Redirecting to projects…
    </div>
  );
}
