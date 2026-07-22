import { useEffect } from "react";
import "./problem.css";

const iconPath = (name: string) =>
  `${import.meta.env.BASE_URL}assets/icons/${name}`;

export function Problem() {
  useEffect(() => {
    const elements = document.querySelectorAll(".problem-page .reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="problem-page" aria-label="The problem of sarcopenia">
      <h2 className="problem-page__title reveal">The Slow Fade of Strength</h2>
      <p className="problem-page__intro reveal">
        Sarcopenia is a progressive loss of muscle mass and function that
        begins earlier than most realize. By age 30, our muscles are at their
        peak—but by 50, the quiet decline has already begun. Despite affecting
        millions globally, it remains underdiagnosed and undertreated.
      </p>

      <div className="problem-timeline" aria-label="Sarcopenia progression">
        <div className="problem-timeline__line" aria-hidden="true" />

        <TimelinePoint
          age="30"
          title="Peak Mass"
          icon="muscle.svg"
          iconAlt="Muscle peak icon"
        >
          Muscle mass reaches its natural peak. From this point onward, without
          intervention, a gradual decline in both fiber number and
          cross-sectional area begins.
        </TimelinePoint>

        <TimelinePoint
          age="50"
          title="Onset"
          icon="decline-chart.svg"
          iconAlt="Muscle decline icon"
        >
          Gradual decline accelerates. Muscle protein synthesis slows while
          inflammatory signaling may begin to rise.
        </TimelinePoint>

        <TimelinePoint
          age="70"
          title="Debility"
          icon="elder-walk.svg"
          iconAlt="Older adult mobility loss icon"
        >
          Functional impairment can affect daily life. Loss of mobility,
          increased fall risk, and reduced independence become major
          quality-of-life concerns.
        </TimelinePoint>
      </div>

      <div className="problem-stats reveal">
        <Statistic value="1 in 3">
          adults over 60 may be affected by sarcopenia worldwide.
        </Statistic>
        <Statistic value="$40B+">
          estimated annual healthcare burden in the United States.
        </Statistic>
        <Statistic value="67%">
          estimated proportion of patients who remain undiagnosed until
          significant mobility loss has occurred.
        </Statistic>
      </div>

      <p className="problem-page__verification-note">
        Draft migration: the team must verify these scientific and statistical
        claims and add primary-source citations before publication.
      </p>
    </section>
  );
}

interface TimelinePointProps {
  age: string;
  title: string;
  icon: string;
  iconAlt: string;
  children: React.ReactNode;
}

function TimelinePoint({
  age,
  title,
  icon,
  iconAlt,
  children,
}: TimelinePointProps) {
  return (
    <article className="problem-timeline__point reveal">
      <img
        className="problem-timeline__icon"
        src={iconPath(icon)}
        alt={iconAlt}
      />
      <div className="problem-timeline__age" aria-label={`Age ${age}`}>
        {age}
      </div>
      <h3>{title}</h3>
      <p className="problem-timeline__age-label">Age {age}</p>
      <p>{children}</p>
    </article>
  );
}

interface StatisticProps {
  value: string;
  children: React.ReactNode;
}

function Statistic({ value, children }: StatisticProps) {
  return (
    <article className="problem-stat">
      <strong>{value}</strong>
      <p>{children}</p>
    </article>
  );
}
