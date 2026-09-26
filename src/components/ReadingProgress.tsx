import { CSSProperties, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import navi1 from "../assets/navi1.png";
import navi2 from "../assets/navi2.png";
import navi3 from "../assets/navi3.png";

const MASCOT_FRAMES = [navi1, navi2, navi3];
const FRAME_DURATION = 120;

type ProgressStyle = CSSProperties & {
  "--reading-progress": number;
};

export function ReadingProgress() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isSwimming, setIsSwimming] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    MASCOT_FRAMES.forEach((src) => {
      const image = new Image();
      image.src = src;
    });

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionQuery.matches);
    };

    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);

    return () => {
      motionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (!isSwimming || prefersReducedMotion) {
      setFrameIndex(0);
      return;
    }

    const frameTimer = window.setInterval(() => {
      setFrameIndex((currentFrame) =>
        (currentFrame + 1) % MASCOT_FRAMES.length,
      );
    }, FRAME_DURATION);

    return () => window.clearInterval(frameTimer);
  }, [isSwimming, prefersReducedMotion]);

  useEffect(() => {
    let animationFrame = 0;
    let scrollEndTimer = 0;

    const updateProgress = () => {
      animationFrame = 0;

      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      );
      const scrollableDistance = documentHeight - window.innerHeight;
      const nextProgress =
        scrollableDistance <= 1
          ? 100
          : Math.min(
              100,
              Math.max(0, (window.scrollY / scrollableDistance) * 100),
            );

      setProgress(nextProgress);
    };

    const requestUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateProgress);
      }
    };

    const handleScroll = () => {
      requestUpdate();
      setIsSwimming(true);
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        setIsSwimming(false);
      }, 180);
    };

    setProgress(0);
    setIsSwimming(false);
    requestUpdate();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", requestUpdate);
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(scrollEndTimer);
    };
  }, [location.pathname]);

  const roundedProgress = Math.round(progress);
  const style: ProgressStyle = {
    "--reading-progress": progress / 100,
  };

  return (
    <div
      className="reading-progress"
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={roundedProgress}
      aria-valuetext={`${roundedProgress}% read`}
      style={style}
    >
      <div className="reading-progress__track" aria-hidden="true">
        <span className="reading-progress__fill" />
      </div>
      <span
        className="reading-progress__mascot-position"
        aria-hidden="true"
      >
        <img
          className="reading-progress__mascot"
          src={MASCOT_FRAMES[frameIndex]}
          alt=""
        />
      </span>
    </div>
  );
}
