const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

function enableBalancedTilt() {
  if (reducedMotion.matches || !finePointer.matches) return;

  const selector = [
    ".ns-command-frame",
    ".ns-slide-card",
    ".ns-challenge-card",
    ".ns-rank-panel",
    ".ns-chart-container",
    ".card",
  ].join(",");

  document.querySelectorAll(selector).forEach(panel => {
    panel.classList.add("ns-tilt-panel");

    panel.addEventListener("pointermove", event => {
      const rect = panel.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      panel.style.setProperty("--tilt-x", `${-py * 3.2}deg`);
      panel.style.setProperty("--tilt-y", `${px * 4.2}deg`);
      panel.style.setProperty("--light-x", `${(px + 0.5) * 100}%`);
      panel.style.setProperty("--light-y", `${(py + 0.5) * 100}%`);
    });

    panel.addEventListener("pointerleave", () => {
      panel.style.setProperty("--tilt-x", "0deg");
      panel.style.setProperty("--tilt-y", "0deg");
      panel.style.setProperty("--light-x", "50%");
      panel.style.setProperty("--light-y", "50%");
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", enableBalancedTilt, { once: true });
} else {
  enableBalancedTilt();
}
