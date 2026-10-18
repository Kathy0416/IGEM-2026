import { useCallback, useEffect, useRef, useState } from "react";
import cursorMascot from "../assets/jellyfish-cursor.png";
import typingCursor from "../assets/type-cursor.png";

const cursorAssets = {
  default: cursorMascot,
  pointer: cursorMascot,
  typing: typingCursor,
};

const interactiveSelector =
  'a, button, summary, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])';
const textEntrySelector = [
  "textarea",
  '[contenteditable]:not([contenteditable="false"])',
  "input:not([type])",
  'input[type="email"]',
  'input[type="password"]',
  'input[type="search"]',
  'input[type="tel"]',
  'input[type="text"]',
  'input[type="url"]',
].join(", ");
const nativeCursorSelector =
  'select, option, [data-native-cursor], p, li, td, th, dd, dt, blockquote, code, pre, h1, h2, h3, h4, h5, h6';

type CursorSplash = {
  id: number;
  x: number;
  y: number;
};

function supportsCursorFollower() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function CursorFollower() {
  const followerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const nextSplashIdRef = useRef(0);
  const splashTimersRef = useRef(new Map<number, number>());
  const [enabled, setEnabled] = useState(supportsCursorFollower);
  const [splashes, setSplashes] = useState<CursorSplash[]>([]);

  const createSplash = useCallback((x: number, y: number) => {
    const id = nextSplashIdRef.current++;

    setSplashes((currentSplashes) => [
      ...currentSplashes,
      { id, x, y },
    ]);

    const timer = window.setTimeout(() => {
      setSplashes((currentSplashes) =>
        currentSplashes.filter((splash) => splash.id !== id),
      );
      splashTimersRef.current.delete(id);
    }, 560);

    splashTimersRef.current.set(id, timer);
  }, []);

  useEffect(
    () => () => {
      splashTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      splashTimersRef.current.clear();
    },
    [],
  );

  useEffect(() => {
    Object.values(cursorAssets).forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateEligibility = () => setEnabled(supportsCursorFollower());

    pointerQuery.addEventListener("change", updateEligibility);
    motionQuery.addEventListener("change", updateEligibility);

    return () => {
      pointerQuery.removeEventListener("change", updateEligibility);
      motionQuery.removeEventListener("change", updateEligibility);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove(
        "has-custom-cursor",
        "is-native-cursor",
      );
      return;
    }

    const follower = followerRef.current;
    const image = imageRef.current;

    if (!follower || !image) {
      return;
    }

    let currentVariant: keyof typeof cursorAssets = "default";

    const getCursorContext = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      const isTextEntry = Boolean(element?.closest(textEntrySelector));
      const isInteractive =
        !isTextEntry && Boolean(element?.closest(interactiveSelector));
      const useNativeCursor =
        !isTextEntry &&
        !isInteractive &&
        Boolean(element?.closest(nativeCursorSelector));

      return { isInteractive, isTextEntry, useNativeCursor };
    };

    const updateContext = (target: EventTarget | null) => {
      const { isInteractive, isTextEntry, useNativeCursor } =
        getCursorContext(target);
      const nextVariant = isTextEntry
        ? "typing"
        : isInteractive
          ? "pointer"
          : "default";

      document.documentElement.classList.toggle(
        "is-native-cursor",
        useNativeCursor,
      );
      follower.classList.toggle("is-native-context", useNativeCursor);
      follower.classList.toggle("is-typing", isTextEntry);

      if (nextVariant !== currentVariant) {
        currentVariant = nextVariant;
        image.src = cursorAssets[currentVariant];
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      follower.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      updateContext(event.target);
      follower.classList.add("is-visible");
    };

    const handlePointerDown = (event: PointerEvent) => {
      const { isTextEntry, useNativeCursor } = getCursorContext(event.target);

      follower.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      follower.classList.add("is-pressed");

      if (!useNativeCursor && !isTextEntry) {
        createSplash(event.clientX, event.clientY);
      }
    };

    const handlePointerUp = () => {
      follower.classList.remove("is-pressed");
    };

    const hideFollower = () => {
      follower.classList.remove("is-visible", "is-pressed");
      document.documentElement.classList.remove("is-native-cursor");
    };

    document.documentElement.classList.add("has-custom-cursor");
    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });
    document.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", hideFollower);
    window.addEventListener("blur", hideFollower);

    return () => {
      document.documentElement.classList.remove(
        "has-custom-cursor",
        "is-native-cursor",
      );
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener(
        "pointerleave",
        hideFollower,
      );
      window.removeEventListener("blur", hideFollower);
    };
  }, [createSplash, enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div className="cursor-follower" ref={followerRef} aria-hidden="true">
        <img ref={imageRef} src={cursorAssets.default} alt="" />
      </div>
      <div className="cursor-splash-layer" aria-hidden="true">
        {splashes.map((splash) => (
          <span
            className="cursor-splash"
            key={splash.id}
            style={{ left: splash.x, top: splash.y }}
          >
            <span className="cursor-splash__ripple" />
            {Array.from({ length: 7 }, (_, index) => (
              <span className="cursor-splash__drop" key={index} />
            ))}
          </span>
        ))}
      </div>
    </>
  );
}
