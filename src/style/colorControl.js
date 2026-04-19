const colorControl = {
  brand: {
    primary: "#672b2b",
    secondary: "#e38f61",
    accent: "#d1855c",
  },
  surface: {
    page: "#fffaf7",
    base: "#ffffff",
    muted: "rgb(66, 20, 11)",
    soft: "#efe6d1",
  },
  text: {
    primary: "#1f1a17",
    secondary: "#5f5650",
    inverse: "#ffffff",
  },
  border: {
    soft: "rgba(103, 43, 43, 0.12)",
  },
  gradient: {
    headerOverlay:
      "linear-gradient(129deg, rgba(74, 34, 26, 0.9), rgba(54, 23, 11, 0.81), rgba(74, 34, 26, 0.9))",
    pageGlow:
      "linear-gradient(180deg, rgba(255, 250, 247, 1) 0%, rgba(247, 234, 235, 1) 100%)",
    sectionOverlay:
      "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.6))",
    cardOverlay:
      "linear-gradient(rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.61))",
    titleHighlight:
      "linear-gradient(90deg, #d4bea5 0%, #ff005d 100%)",
  },
};

export function applyColorControl() {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;

  root.style.setProperty("--color-primary", colorControl.brand.primary);
  root.style.setProperty("--color-secondary", colorControl.brand.secondary);
  root.style.setProperty("--color-accent", colorControl.brand.accent);

  root.style.setProperty("--color-page", colorControl.surface.page);
  root.style.setProperty("--color-surface", colorControl.surface.base);
  root.style.setProperty("--color-surface-muted", colorControl.surface.muted);
  root.style.setProperty("--color-surface-soft", colorControl.surface.soft);

  root.style.setProperty("--color-text-primary", colorControl.text.primary);
  root.style.setProperty("--color-text-secondary", colorControl.text.secondary);
  root.style.setProperty("--color-text-inverse", colorControl.text.inverse);
  root.style.setProperty("--color-border-soft", colorControl.border.soft);

  root.style.setProperty(
    "--gradient-header-overlay",
    colorControl.gradient.headerOverlay
  );
  root.style.setProperty("--gradient-page-glow", colorControl.gradient.pageGlow);
  root.style.setProperty(
    "--gradient-section-overlay",
    colorControl.gradient.sectionOverlay
  );
  root.style.setProperty(
    "--gradient-card-overlay",
    colorControl.gradient.cardOverlay
  );
  root.style.setProperty(
    "--gradient-title-highlight",
    colorControl.gradient.titleHighlight
  );
}

export default colorControl;
