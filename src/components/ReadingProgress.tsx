import { CSSProperties, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import progressMascot from "../assets/progress-mascot.png";

type ProgressStyle = CSSProperties & {
  "--reading-progress": number;
};

export function ReadingProgress() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isSwimming, setIsSwimming] = useState(false);

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
        className={`reading-progress__mascot-position${isSwimming ? " is-swimming" : ""}`}
        aria-hidden="true"
      >
        <img
          className="reading-progress__mascot"
          src={progressMascot}
          alt=""
        />
      </span>
    </div>
  );
}
