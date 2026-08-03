import { useCallback, useEffect, useRef, useState } from "react";
import cursorMascot from "../assets/cursor-mascot.png";

const cursorAssets = {
  default: cursorMascot,
  pointer: cursorMascot,
};

const interactiveSelector =
  'a, button, summary, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])';
const nativeCursorSelector =
  'input, textarea, select, option, [contenteditable="true"], [data-native-cursor], p, li, td, th, dd, dt, blockquote, code, pre, h1, h2, h3, h4, h5, h6';

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

    let animationFrame = 0;
    let hasPosition = false;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let currentVariant: keyof typeof cursorAssets = "default";

    const renderPosition = () => {
      follower.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    };

    const animate = () => {
      const deltaX = targetX - currentX;
      const deltaY = targetY - currentY;

      currentX += deltaX * 0.24;
      currentY += deltaY * 0.24;
      renderPosition();

      if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        currentX = targetX;
        currentY = targetY;
        renderPosition();
        animationFrame = 0;
      }
    };

    const requestAnimation = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const getCursorContext = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      const isInteractive = Boolean(element?.closest(interactiveSelector));
      const useNativeCursor =
        !isInteractive && Boolean(element?.closest(nativeCursorSelector));

      return { isInteractive, useNativeCursor };
    };

    const updateContext = (target: EventTarget | null) => {
      const { isInteractive, useNativeCursor } = getCursorContext(target);
      const nextVariant = isInteractive ? "pointer" : "default";

      document.documentElement.classList.toggle(
        "is-native-cursor",
        useNativeCursor,
      );
      follower.classList.toggle("is-native-context", useNativeCursor);

      if (nextVariant !== currentVariant) {
        currentVariant = nextVariant;
        image.src = cursorAssets[currentVariant];
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      updateContext(event.target);

      if (!hasPosition) {
        currentX = targetX;
        currentY = targetY;
        hasPosition = true;
        renderPosition();
        follower.classList.add("is-visible");
        return;
      }

      requestAnimation();
    };

    const handlePointerDown = (event: PointerEvent) => {
      const { useNativeCursor } = getCursorContext(event.target);

      currentX = targetX;
      currentY = targetY;
      renderPosition();
      follower.classList.add("is-pressed");

      if (!useNativeCursor) {
        createSplash(event.clientX, event.clientY);
      }
    };

    const handlePointerUp = () => {
      follower.classList.remove("is-pressed");
    };

    const hideFollower = () => {
      follower.classList.remove("is-visible", "is-pressed");
      document.documentElement.classList.remove("is-native-cursor");
      hasPosition = false;
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
      window.cancelAnimationFrame(animationFrame);
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
