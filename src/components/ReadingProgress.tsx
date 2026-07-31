import { CSSProperties, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import progressMascot from "../assets/progress-mascot.png";

type ProgressStyle = CSSProperties & {
  "--reading-progress": number;
};

export function ReadingProgress() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

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

    setProgress(0);
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.cancelAnimationFrame(animationFrame);
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
      <img
        className="reading-progress__mascot"
        src={progressMascot}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
