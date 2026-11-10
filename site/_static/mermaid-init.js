/* Lab-controlled Mermaid rendering (v2).
   Material for MkDocs renders ```mermaid fences inside a closed Shadow DOM,
   which page CSS cannot reach. This script renders the diagrams itself
   (fence class "mermaid-lab", so Material ignores them), measures the labels
   in the same page context they are drawn in, trims the SVG canvas to the
   drawn content, and lets the height follow the width. */
(function () {
  var SRC = "https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js";
  var seq = 0;

  function loadMermaid() {
    return new Promise(function (resolve, reject) {
      if (window.mermaid) { return resolve(window.mermaid); }
      var s = document.createElement("script");
      s.src = SRC;
      s.onload = function () { resolve(window.mermaid); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function hardenLabels(svg) {
    /* Any HTML label container may overflow its box instead of clipping,
       with typography pinned inline so no stylesheet can change it later. */
    var fos = svg.querySelectorAll("foreignObject");
    for (var i = 0; i < fos.length; i++) {
      fos[i].setAttribute("overflow", "visible");
      fos[i].style.overflow = "visible";
      var divs = fos[i].querySelectorAll("div, span");
      for (var j = 0; j < divs.length; j++) {
        divs[j].style.lineHeight = "1.25";
        divs[j].style.fontSize = "16px";
      }
    }
  }

  function fitCanvas(svg) {
    try {
      var b = svg.getBBox();
      var pad = 8;
      svg.setAttribute("viewBox", (b.x - pad) + " " + (b.y - pad) + " " + (b.width + 2 * pad) + " " + (b.height + 2 * pad));
      svg.style.maxWidth = (b.width + 2 * pad) + "px";
    } catch (e) { /* keep Mermaid's own viewBox */ }
    svg.removeAttribute("height");
    svg.setAttribute("width", "100%");
    svg.style.height = "auto";
    svg.style.display = "block";
    svg.style.margin = "0 auto";
  }

  async function render() {
    var blocks = document.querySelectorAll(".mermaid-lab:not([data-rendered])");
    if (!blocks.length) { return; }
    var mermaid = await loadMermaid();
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "neutral",
      flowchart: { useMaxWidth: true, htmlLabels: false }
    });
    for (var i = 0; i < blocks.length; i++) {
      var el = blocks[i];
      var code = el.textContent.trim();
      el.setAttribute("data-rendered", "true");
      try {
        /* Third argument: measure inside this element, i.e. in the exact
           styling context the finished diagram will live in. */
        var out = await mermaid.render("lab-mermaid-" + (seq++), code, el);
        el.innerHTML = out.svg;
        var svg = el.querySelector("svg");
        if (svg) { hardenLabels(svg); fitCanvas(svg); }
      } catch (e) {
        el.removeAttribute("data-rendered");
        console.error("Mermaid render failed:", e);
      }
    }
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(function () { render(); });
  } else {
    document.addEventListener("DOMContentLoaded", render);
  }
})();