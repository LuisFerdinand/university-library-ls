"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        style: {
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          color: "hsl(var(--card-foreground))",
          fontSize: "14px",
          fontWeight: "500",
        },
        className: "toast",
        unstyled: false,
      }}
      style={
        {
          "--normal-bg": "hsl(var(--card))",
          "--normal-border": "hsl(var(--border))",
          "--normal-text": "hsl(var(--card-foreground))",
          "--success-bg": "hsl(var(--card))",
          "--success-border": "hsl(142.1 76.2% 36.3%)",
          "--success-text": "hsl(var(--card-foreground))",
          "--error-bg": "hsl(var(--card))",
          "--error-border": "hsl(var(--destructive))",
          "--error-text": "hsl(var(--card-foreground))",
          "--info-bg": "hsl(var(--card))",
          "--info-border": "hsl(var(--primary))",
          "--info-text": "hsl(var(--card-foreground))",
        } as React.CSSProperties
      }
      position="top-center"
      expand={true}
      richColors={true}
      closeButton={true}
      {...props}
    />
  );
};

export { Toaster };
