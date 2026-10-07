/* Motor de dicas (tooltips) do design system Papel e Tinta.
   Extraído de saneamento/index.html. Um único balão em position:fixed,
   anexado ao body: nenhum contêiner com overflow consegue recortá-lo,
   e funciona com conteúdo criado depois do carregamento.

   Uso:
     <span class="calc" data-tip-t="Saldo"
           data-tip="Fórmula: dotação − empenhado
                     Dotação: R$ 1.200.000,00
                     Empenhado: R$ 830.000,00">R$ 370.000,00</span>
     <script src="componentes/dicas.js"></script>

   Cada linha do data-tip vira uma linha do balão; um prefixo "Rótulo:" (3 a
   30 caracteres) sai em negrito. data-tip-t é o título opcional. */
(function () {
  let balao = null, alvoAtual = null;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function montar() {
    if (balao) return balao;
    balao = document.createElement("div");
    balao.className = "dica";
    balao.setAttribute("role", "tooltip");
    document.body.appendChild(balao);
    return balao;
  }

  function corpo(texto, titulo) {
    const linhas = String(texto).split("\n").map((l) => l.trim()).filter(Boolean);
    return (titulo ? '<span class="t">' + esc(titulo) + "</span>" : "") +
      linhas.map((l) => '<span class="l">' + esc(l).replace(/^([^:]{3,30}):/, "<b>$1:</b>") + "</span>").join("");
  }

  function posicionar(alvo) {
    const r = alvo.getBoundingClientRect(), d = balao.getBoundingClientRect(), folga = 9;
    let topo = r.top - d.height - folga;
    if (topo < 8) topo = Math.min(window.innerHeight - d.height - 8, r.bottom + folga);
    const esq = Math.max(8, Math.min(r.left + r.width / 2 - d.width / 2, window.innerWidth - d.width - 8));
    balao.style.top = Math.max(8, topo) + "px";
    balao.style.left = esq + "px";
  }

  function mostrar(alvo) {
    const texto = alvo.getAttribute("data-tip");
    if (!texto) return;
    montar();
    alvoAtual = alvo;
    balao.innerHTML = corpo(texto, alvo.getAttribute("data-tip-t"));
    balao.style.maxWidth = Math.min(380, window.innerWidth - 24) + "px";
    balao.classList.add("visivel");
    posicionar(alvo);
  }

  function esconder() {
    if (balao) balao.classList.remove("visivel");
    alvoAtual = null;
  }

  const alvoDe = (ev) => (ev.target.closest ? ev.target.closest("[data-tip]") : null);

  document.addEventListener("mouseover", (ev) => {
    const alvo = alvoDe(ev);
    if (alvo === alvoAtual) return;
    alvo ? mostrar(alvo) : esconder();
  });
  document.addEventListener("focusin", (ev) => { const a = alvoDe(ev); if (a) mostrar(a); });
  document.addEventListener("focusout", esconder);
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") esconder(); });
  window.addEventListener("scroll", esconder, true);
  window.addEventListener("resize", esconder);
})();
