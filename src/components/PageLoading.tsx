import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    wikiLoader: { enter(route: string): number; ready(id: number): void };
  }
}

/** Connect committed router destinations to the single bootstrap loader. */
export function PageLoading() {
  const { pathname, search } = useLocation();
  const id = useRef(0);
  useLayoutEffect(() => {
    // Browser pathname includes the wiki basename, matching bootstrap entry.
    id.current = window.wikiLoader.enter(window.location.pathname + search);
  }, [pathname, search]);
  useEffect(() => {
    const navigation = id.current;
    // Run after route effects (including anchor layout), with cancellable work.
    const frame = requestAnimationFrame(() => window.wikiLoader.ready(navigation));
    return () => cancelAnimationFrame(frame);
  }, [pathname, search]);
  return null;
}
