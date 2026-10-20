import { useEffect, useRef, useState } from "react";
import type { GLViewer, GLModel } from "3dmol";
import "./ProteinViewer.css";

const files = {
  protein: `${import.meta.env.BASE_URL}structures/n23.pdb`,
  ligand: `${import.meta.env.BASE_URL}structures/ligand.pdb`,
};

export default function ProteinViewer() {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<{ viewer: GLViewer; protein: GLModel; ligand: GLModel; initial: number[] } | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState("Loading protein and ligand…");
  const [loaded, setLoaded] = useState(false);
  const [proteinVisible, setProteinVisible] = useState(true);
  const [ligandVisible, setLigandVisible] = useState(true);

  useEffect(() => {
    const container = host.current!;
    const abort = new AbortController();
    let disposed = false;
    let viewer: GLViewer | undefined;
    let resize: ResizeObserver | undefined;
    let theme: MutationObserver | undefined;
    const globalListeners: Array<() => void> = [];
    const text = async (url: string) => {
      const response = await fetch(url, { signal: abort.signal });
      if (!response.ok) throw new Error("The structure files could not load. Please retry.");
      return response.text();
    };
    const updateTheme = () => {
      viewer?.setBackgroundColor(document.documentElement.dataset.theme === "dark" ? "#09162e" : "#f5f8fc", 1);
      viewer?.render();
    };
    const lost = (event: Event) => {
      event.preventDefault();
      setLoaded(false);
      setStatus("The 3D graphics context was lost. Please retry or download the structures below.");
    };
    container.addEventListener("webglcontextlost", lost, true);
    Promise.all([import("3dmol"), text(files.protein), text(files.ligand)])
      .then(([mol, proteinData, ligandData]) => {
        if (disposed) return;
        // 3Dmol 2.5 has no destroy API. Record its synchronous global listeners
        // so repeated route visits do not retain old viewers.
        const add = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(type, listener, options) {
          if ((this === window || this === document.body) && listener) {
            globalListeners.push(() => this.removeEventListener(type, listener, options));
          }
          return add.call(this, type, listener, options);
        };
        try {
          viewer = mol.createViewer(container, { antialias: true });
        } catch {
          throw new Error("3D viewing requires WebGL. Enable hardware acceleration or download the structures below.");
        } finally {
          EventTarget.prototype.addEventListener = add;
        }
        const protein = viewer.addModel(proteinData, "pdb");
        const ligand = viewer.addModel(ligandData, "pdb");
        if (!protein.selectedAtoms({}).length || !ligand.selectedAtoms({}).length) {
          throw new Error("One of the structure files contains no readable atoms.");
        }
        protein.setStyle({}, { cartoon: { color: "#6499c8" } });
        ligand.setStyle({}, { stick: { radius: 0.22, colorscheme: "Jmol" } });
        ligand.setStyle({ elem: "C" }, { stick: { radius: 0.22, color: "#e67d80" } });
        viewer.zoomTo();
        updateTheme();
        scene.current = { viewer, protein, ligand, initial: viewer.getView() };
        resize = new ResizeObserver(() => { viewer?.resize(); });
        resize.observe(container);
        theme = new MutationObserver(updateTheme);
        theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        setLoaded(true);
        setStatus("Protein and ligand ready.");
      })
      .catch((error: unknown) => {
        if (disposed) return;
        setStatus(error instanceof Error && !(error instanceof TypeError) ? error.message : "Unable to load the structures. Check your connection and retry.");
      });
    return () => {
      disposed = true;
      abort.abort();
      resize?.disconnect();
      theme?.disconnect();
      container.removeEventListener("webglcontextlost", lost, true);
      scene.current = null;
      globalListeners.forEach(remove => remove());
      const internal = viewer as unknown as { divwatcher?: ResizeObserver; intwatcher?: IntersectionObserver };
      internal?.divwatcher?.disconnect();
      internal?.intwatcher?.disconnect();
      viewer?.clear();
      container.querySelectorAll("canvas").forEach(canvas => {
        const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
        context?.getExtension("WEBGL_lose_context")?.loseContext();
      });
      container.replaceChildren();
    };
  }, [attempt]);

  const action = (run: (value: NonNullable<typeof scene.current>) => void) => {
    if (!scene.current) return;
    run(scene.current);
    scene.current.viewer.render();
  };
  const toggle = (kind: "protein" | "ligand", visible: boolean) => {
    if (kind === "protein") setProteinVisible(visible);
    else setLigandVisible(visible);
    action(value => { if (visible) value[kind].show(); else value[kind].hide(); });
  };

  return (
    <section className="protein-viewer" aria-labelledby="protein-viewer-title">
      <h2 id="protein-viewer-title">Protein–ligand structure</h2>
      <p>Explore Protein — n23 and Ligand in their supplied coordinates. Drag to rotate; scroll or pinch to zoom.</p>
      <div className="protein-viewer__stage">
        <div ref={host} className="protein-viewer__canvas" aria-label="Interactive protein and ligand structure" />
        {!loaded && <div className="protein-viewer__status" role="status">
          <p>{status}</p>
          {status !== "Loading protein and ligand…" && <button type="button" onClick={() => {
            setLoaded(false); setStatus("Loading protein and ligand…");
            setProteinVisible(true); setLigandVisible(true); setAttempt(value => value + 1);
          }}>Retry</button>}
        </div>}
      </div>
      <fieldset disabled={!loaded} className="protein-viewer__controls">
        <legend>Structure controls</legend>
        <label><input type="checkbox" checked={proteinVisible} onChange={e => toggle("protein", e.target.checked)} /> Protein — n23</label>
        <label><input type="checkbox" checked={ligandVisible} onChange={e => toggle("ligand", e.target.checked)} /> Ligand</label>
        <button type="button" onClick={() => action(({ viewer, initial }) => viewer.setView(initial))}>Reset view</button>
        <button type="button" onClick={() => {
          toggle("ligand", true);
          action(({ viewer, ligand }) => viewer.zoomTo({ model: ligand }));
        }}>Focus ligand</button>
        <button type="button" onClick={() => action(({ viewer }) => viewer.zoom(1.2))}>Zoom in</button>
        <button type="button" onClick={() => action(({ viewer }) => viewer.zoom(0.8))}>Zoom out</button>
        {(["Left", "Right", "Up", "Down"] as const).map(direction => <button key={direction} type="button" onClick={() => action(({ viewer }) =>
          viewer.rotate(direction === "Left" || direction === "Up" ? -15 : 15, direction === "Left" || direction === "Right" ? "y" : "x")
        )}>Rotate {direction.toLowerCase()}</button>)}
      </fieldset>
      <p className="protein-viewer__sources">Source files: <a href={files.protein} download>n23.pdb</a> · <a href={files.ligand} download>ligand.pdb</a>. Coordinates are displayed as supplied.</p>
    </section>
  );
}
