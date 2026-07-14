// ------- Cursor Reactive Card Glow -------
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".bento-grid");
  if (!grid) return;

  let rAF = null;

  grid.addEventListener("mousemove", (e) => {
    const card = e.target.closest(".bento-card");
    if (!card) return;

    if (rAF) {
      cancelAnimationFrame(rAF);
    }

    rAF = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
});
