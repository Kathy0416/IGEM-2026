import { useCallback, useEffect, useRef, useState } from "react";
import { PageSection } from "../components/ContentBlocks";
import { photos } from "./team-photos";

// Team page v2 (org chart + bio modal), per design-specs/team-page-v2.md.
// English-only display per the user's request. Introductions are the full
// self-submitted texts from the team's info-collection docx (only mechanical
// spacing/punctuation artifacts normalized; wording untouched). Assignments
// follow the team's official assignment sheet (primary + secondary role(s);
// up to three chips). Nothing is fabricated: instructor cards are blank
// templates until consent is confirmed.

type CaptainTitle = "Team Captain" | "Wet Lab Captain" | "Dry Lab Captain";

interface Person {
  id: string;
  name: string;
  title?: CaptainTitle;
  assignments: string[];
  bio: string;
}

const teamCaptain: Person = {
  id: "jay",
  name: "Jay",
  title: "Team Captain",
  assignments: ["Theory & Bio-experiments", "Bioinformatics"],
  bio: 'My name is Jay, and I\'m a Grade 10 high school student from Shanghai. In our team, I serve as the Team Captain, responsible for coordinating everyone\'s work. I am also a member of the "Theoretical and Biological Experiments" and "Bioinformatics" sub-teams. In my free time, I enjoy playing chess, playing the violin, swimming, and volleyball — as well as studying biology and physics :)',
};

const captains: Person[] = [
  {
    id: "aurora",
    name: "Aurora",
    title: "Wet Lab Captain",
    assignments: ["Theory & Bio-experiments", "Wet Lab"],
    bio: "Hi, I'm Aurora (Gu Zixiao), a 9th grader from Pudong, Shanghai. As the Wet Lab Captain, I ensure our experiments run safely and smoothly. I also contribute to the Theoretical Analysis and Bio-experiments groups. When I'm not in the lab, you'll find me diving, taking photos, playing table tennis, or designing my own mini bio-experiments.",
  },
  {
    id: "kathy",
    name: "Kathy",
    title: "Dry Lab Captain",
    assignments: ["Theory & Bio-experiments", "Bioinformatics"],
    bio: "Hi! I'm Kathy, a 16-year-old from Ningbo, Zhejiang. I'm a biology enthusiast, a music lover, and a proud member of the wet lab team. Outside the lab, you can usually find me playing the piano, flute, or singing (hopefully not disturbing my neighbors too much). My relationship with biology is a little complicated: I absolutely love exploring life at the molecular level, but when it comes to actual animals, I might need a little more courage. Ironically, a person who loves biology but is afraid of animals found her perfect match in synthetic biology — a field where I can study and engineer living systems without having to chase after creatures in the wild. I'm excited to learn, experiment, and create new possibilities with my teammates!",
  },
];

const members: Person[] = [
  {
    id: "letong-sun",
    name: "Letong Sun",
    assignments: ["Theory & Bio-experiments", "Bioinformatics"],
    bio: "My name is Letong Sun, and I am a Grade 11 student from Nanjing, Jiangsu, China. I currently study at Nanjing Foreign Language School British Columbia Academy. In our team, I am mainly responsible for conducting experiments and taking part in selected outreach activities. I am especially interested in health-related issues, and I hope to use science communication to help more people pay attention to these topics. Through iGEM, I also hope to understand how synthetic biology can be connected with real-world problems and possible solutions. During spare time, I enjoy gaming and its related culture, musical theatre, reading, and drama performances.",
  },
  {
    id: "bella",
    name: "Bella",
    assignments: ["Theory & Bio-experiments", "Bio-device Research"],
    bio: "Hello everyone. My name is Zhou Zhihe, and my English name is Bella. I currently study at Shanghai Foreign Language School Affiliated to SISU Hangzhou. In our team, I take charge of theoretical research and biological experiments. I also take part in other work for the team. I have great passion for biology and chemistry, which is inspired by school courses, and I also enjoy exploring science knowledge and doing experiments carefully. My MBTI is INFJ. I am a little bit introverted, yet good at communication in different situations. In my spare time, I play the guzheng, play badminton, enjoy musicals, music, dramas and games.",
  },
  {
    id: "daisy",
    name: "Daisy",
    assignments: ["Theory & Bio-experiments", "Brand & Communications"],
    bio: "Hi everyone! My name is Daisy (Xinyi) Guo, and I'm from Bellevue, Washington, USA. I'm currently a high school student, and my roles on the team are Biological Theory & Experimentation and Branding & Communications. I enjoy combining science and creativity to present complex ideas in clear and engaging ways. Outside of the team, I enjoy art, graphic design, photography, and learning about biology and medical research. I look forward to learning and working with everyone!",
  },
  {
    id: "wanxin-lu",
    name: "Wanxin Lu",
    assignments: [
      "Theory & Bio-experiments",
      "Business Innovation & Sustainability",
      "Bioinformatics",
    ],
    bio: "My name is Wanxin Lu. I'm from Beijing. In our team, I am primarily responsible for wet lab experiments, and secondarily involved in bioinformatics, business analysis, and Human Practice. Outside the lab, I enjoy singing, listening to music, and doing handicrafts. I work with a variety of crafts, including glass fusing, weaving, Chinese knotting, and embroidery. I wouldn't call myself an expert in any of them, but I know a little bit about each. In my free time, I like to browse the internet, and I occasionally watch popular science videos, especially those related to biology. Lately, I've also developed a strange fascination with farming videos, whether it's planting or harvesting. I guess my inner farmer genes have finally been expressed.",
  },
  {
    id: "xu-yichen",
    name: "Xu Yichen",
    assignments: ["Theory & Bio-experiments", "Business Innovation & Sustainability"],
    bio: "Hello everyone. My name is Xu Yichen, and I am from the IB department of Shanghai Pinghe Bilingual School. Within our team, I take charge of biotechnology-related work, including participating in research, development and testing of the medicine. I also assist with PPT design and presentation delivery to make sure our ideas are presented clearly and logically. I have a wide range of hobbies. First of all, I love reading, especially psychology books and various novels, which allow me to understand people and events from diverse perspectives. Secondly, I am a big fan of sports such as ultimate frisbee and boxing. Frisbee lets me experience the joy of teamwork, while boxing helps me relieve stress and build mental resilience. Besides, I enjoy listening to and singing songs, as music is my best way to unwind and regulate my mood. I'm thrilled to collaborate with all of you. I look forward to learning from each other, making progress together, and successfully finishing all upcoming tasks!",
  },
  {
    id: "terry",
    name: "Terry",
    assignments: [
      "Theory & Bio-experiments",
      "Business Innovation & Sustainability",
      "Brand & Communications",
    ],
    bio: "My name is Terry. I'm from Hefei, Anhui, and I study at the International Department of Hefei No.1 High School. My primary role focuses on theoretical studies and biological experiments, while my secondary responsibilities cover business innovation and brand media. I'm passionate about basketball and fitness, and I also love music and traveling. I take a keen interest in all kinds of sports and enjoy exploring new fields. I excel at teamwork and organization, and I look forward to growing and making progress together with all of you.",
  },
  {
    id: "yang-yifan",
    name: "Yang Yifan",
    assignments: ["Theory & Bio-experiments", "Web Task Group"],
    bio: "I'm Yang Yifan from China Zhejiang Province. My job involves conducting theoretical analyses and biological experiments for projects. Meanwhile, I am in charge of designing the group's website to display our research outcomes. Besides this, I also write fundraising copy. I have a variety of hobbies, such as playing badminton and basketball. I am not particularly skilled at these sports, yet I still really enjoy them. I also have a strong passion for information technology, so I regularly follow developments in fields including game development.",
  },
  {
    // "Tu Tianwai" on the official assignment sheet is Eva.
    id: "eva",
    name: "Eva",
    assignments: ["Theory & Bio-experiments", "Brand & Communications"],
    bio: "My name is Eva, it's pronounced as /eva/, I prefer this over /i:va/. I'm quite a slow-starter and also a good listener. I grew up in Shanghai, China, with my mom and dad. Neither of them works in the biological or medical field but somehow, I chose biology, chemistry and psychology as my subjects. I'm an \"animal person\", with a particular passion for horses. I'm actually a jumper rider currently working toward my Intermediate equestrian examination. My dream job is to be an equine vet, specialized in muscle injury recovery, which is why I'm excited about this program. I'm responsible for uniform design, wet lab experiments, brand and media in the team. In addition, I'm taking part in a Cambridge summer project which is about pharmaceutical development for cardiovascular diseases, and I believe this experience will improve our team's odds of succeeding. I'm eager to acquire collaborative skills with my new teammates by attending the experiments and presentation preparation sessions.",
  },
  {
    id: "jenny",
    name: "Jenny",
    assignments: ["Theory & Bio-experiments", "Human Practices"],
    bio: "Hello everyone! I'm Jenny. My Chinese name is Xiaoqian Zhou, and I'm a high school student from Nanjing, China. I have a strong passion for synthetic biology, a solid foundation in molecular biology and enjoy hands-on wet lab work. Besides lab skills, I'm also interested in playing badminton or traveling. I'm highly motivated, detail-oriented, and a strong team player. I believe iGEM is the perfect platform to apply my knowledge to solve real-world problems. I'm eager to collaborate with this amazing team and contribute to our project's success. Thank you!",
  },
  {
    id: "ling",
    name: "Ling",
    assignments: ["Theory & Bio-experiments", "Bioinformatics"],
    bio: "My name is Zhu Ling, also known as Ling in English, from Ningbo, Zhejiang. I'm part of the theoretical and biological experiment team, a member of the wet lab group. In my free time, I enjoy reading novels, listening to music, and making desserts. I'm friendly and easy to communicate with (depending on the situation), and I'm always willing to cooperate with group arrangements. I'm really happy to join everyone here, and I do my best to fulfill my responsibilities. I also look forward to exchanging ideas with all of you and growing together.",
  },
  {
    id: "jackie",
    name: "Jackie",
    assignments: ["Theory & Bio-experiments", "Brand & Communications"],
    bio: "My name is Ziyi Yun (Jackie), and I am from Inner Mongolia, China. In our team, I contribute to theoretical research, biological experiments, as well as branding and media work. I am fascinated by how synthetic biology can be applied to address real-world challenges and improve people's lives. I enjoy exploring new things and have a wide range of interests, including photography, painting, swimming, and music. These hobbies inspire my creativity and help me maintain curiosity about the world around me. Through iGEM, I hope to broaden my horizons, develop new skills, and work together with my teammates to create meaningful and impactful projects.",
  },
  {
    id: "lu-jiabu",
    name: "Lu Jiabu",
    assignments: [
      "Theory & Bio-experiments",
      "Bioinformatics",
      "Business Innovation & Sustainability (Market Research)",
    ],
    bio: "Hello everyone. My name is Lu Jiabu, I'm a member of the wet team, responsible for theory and experiments in this iGEM competition. I'm really interested in biochemical engineering. In my free time, I study related experiment theories and enjoy exploring knowledge through experiments and calculations. I'm outgoing and humorous, and I'm good at communicating and cooperating with teammates. I can get along well with others quickly. In my spare time, I play go to practice my logical thinking. I also love basketball and follow NBA games. I'm looking forward to discussing problems with all partners in this competition. I hope we can solve experiment challenges together and share different ideas.",
  },
  {
    id: "billy",
    name: "Billy",
    assignments: ["Business Innovation & Sustainability", "Theory & Bio-experiments"],
    bio: "Hello everyone, my name is Billy, a tenth grader from HDSH high school. At the same time, I'm a group member of Business Innovation and Sustainability. Since I was little, I've loved reading books related to Human Biology and Microeconomics which contributes to my continued interest in those subjects. Beyond school, I'm also passionate about outdoor sports including snowboarding, hiking, mountain climbing, mountain biking, and golf. I'm also quite an easy-going and extroverted person. I look forward to getting to know you all and making progress alongside everyone to achieve remarkable outcomes.",
  },
  {
    id: "ding-yejia",
    name: "Ding Yejia",
    assignments: ["Business Innovation & Sustainability", "Brand & Communications"],
    bio: "Hello everyone! I'm Ding Yejia from Yiwu, Zhejiang. In our iGEM team, I take charge of business, alongside short-video operations for brand communication. In my spare time, I love tasting diverse desserts, making handicrafts and hanging out with friends.",
  },
  {
    id: "yue-yu",
    name: "Yue Yu",
    assignments: ["Bio-device Research", "Business Innovation & Sustainability"],
    bio: "Hello everyone, my name is Yue Yu, a 17-year-old student from Nanjing Foreign Language School in Jiangsu Province. As a member of the Business Innovation group, I excel in interpersonal communication and possess qualified engineering skills. With strong hands-on ability, my interests also include comedies, classical music, theater, and 20th-century literature. Looking forward to meeting you all.",
  },
  {
    id: "wang-zimo",
    name: "Wang Zimo",
    assignments: [
      "Bioinformatics",
      "Business Innovation & Sustainability",
      "Brand & Communications",
    ],
    bio: "Hello everyone, I'm Wang Zimo, a high school student from Shanghai who is passionate about biology and computer science. In my daily studies, I have a strong interest in life sciences and data analysis: I've delved into programming and data analysis in both Windows and Red Hat Linux environments, and I have a good understanding of key concepts in biology, having participated in several experiments. Driven by this passion, I've decided to participate in this year's iGEM competition. I hope to put my learning to the test during the competition and gain more interesting experimental experiences. In this iGEM competition, I'm taking on two roles: a member of the business team and an analyst for the bioinformatics team. Although I know I may face many challenges during the competition, I'm really looking forward to this experience. I hope to stay diligent and focused, perform to the best of my ability, and collaborate with my teammates to learn from one another.",
  },
];

// Three blank template cards. No names until consent is confirmed.
const instructorSlots = [1, 2, 3];

type PersonVariant = "top" | "captain" | "member";

const badgeClassName = (title: CaptainTitle) =>
  title === "Team Captain"
    ? "title-badge"
    : "title-badge title-badge--captain";

const ringClassName = (variant: PersonVariant) =>
  variant === "top"
    ? "avatar-ring avatar-ring--top"
    : variant === "captain"
      ? "avatar-ring avatar-ring--captain"
      : "avatar-ring";

interface PersonTriggerProps {
  person: Person;
  variant: PersonVariant;
  onOpen: (id: string, opener: HTMLElement) => void;
}

function PersonTrigger({ person, variant, onOpen }: PersonTriggerProps) {
  const photo = photos[person.id];
  return (
    <button
      type="button"
      className="person-trigger"
      aria-haspopup="dialog"
      onClick={(event) => onOpen(person.id, event.currentTarget)}
    >
      {person.title && (
        <span className={badgeClassName(person.title)}>{person.title}</span>
      )}
      <span
        className={
          photo
            ? `${ringClassName(variant)} avatar-ring--photo`
            : ringClassName(variant)
        }
        role="img"
        aria-label={`Photo of ${person.name}`}
        style={photo ? { backgroundImage: `url(${photo})` } : undefined}
      >
        {person.name.charAt(0)}
      </span>
      <span className="person-name">{person.name}</span>
      <span className="person-chips">
        {person.assignments.map((assignment, index) => (
          <span className="chip" key={`${assignment}-${index}`}>
            {assignment}
          </span>
        ))}
      </span>
    </button>
  );
}

interface BioModalProps {
  person: Person;
  onClose: () => void;
}

function BioModal({ person, onClose }: BioModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="bio-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="bio-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`bio-${person.id}-name`}
      >
        <button
          ref={closeRef}
          type="button"
          className="bio-modal__close"
          aria-label="Close bio"
          onClick={onClose}
        >
          ×
        </button>
        <div className="bio-modal__header">
          <span
            className={
              photos[person.id]
                ? "avatar-ring avatar-ring--modal avatar-ring--photo"
                : "avatar-ring avatar-ring--modal"
            }
            role="img"
            aria-label={`Photo of ${person.name}`}
            style={
              photos[person.id]
                ? { backgroundImage: `url(${photos[person.id]})` }
                : undefined
            }
          >
            {person.name.charAt(0)}
          </span>
          <div className="bio-modal__identity">
            <h3 id={`bio-${person.id}-name`}>{person.name}</h3>
            {person.title && (
              <span className={badgeClassName(person.title)}>
                {person.title}
              </span>
            )}
            <span className="person-chips">
              {person.assignments.map((assignment, index) => (
                <span className="chip" key={`${assignment}-${index}`}>
                  {assignment}
                </span>
              ))}
            </span>
          </div>
        </div>
        <p className="bio-modal__bio">{person.bio}</p>
      </div>
    </div>
  );
}

export function Team() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openBio = useCallback((id: string, opener: HTMLElement) => {
    openerRef.current = opener;
    setActiveId(id);
  }, []);

  const closeBio = useCallback(() => setActiveId(null), []);

  // Restore focus to the opener whenever the modal closes.
  useEffect(() => {
    if (activeId === null) {
      openerRef.current?.focus();
      openerRef.current = null;
    }
  }, [activeId]);

  const activePerson =
    [teamCaptain, ...captains, ...members].find(
      (person) => person.id === activeId,
    ) ?? null;

  return (
    <>
      <PageSection
        eyebrow="Our Team"
        title="Strength comes from people"
        intro="Worldshaper-Nanjing is a student-led team. Click on anyone to read their self introduction."
      >
        <ul className="org-chart">
          <li className="leader-node leader-node--top">
            <PersonTrigger person={teamCaptain} variant="top" onOpen={openBio} />
          </li>
        </ul>
        <svg
          className="team-merge team-merge--split"
          viewBox="0 0 640 72"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M320 0 V26" />
          <path d="M160 72 V52 Q160 26 190 26 H450 Q480 26 480 52 V72" />
        </svg>
        <ul className="captain-row">
          {captains.map((captain) => (
            <li className="leader-node" key={captain.id}>
              <PersonTrigger
                person={captain}
                variant="captain"
                onOpen={openBio}
              />
            </li>
          ))}
        </ul>
        <div className="team-rail" aria-hidden="true">
          <div className="team-rail__bar" />
          <svg className="team-rail__drops" viewBox="0 0 640 30" focusable="false">
            <path d="M160 0 V30" />
            <path d="M480 0 V30" />
          </svg>
        </div>
        <ul className="member-grid--org">
          {members.map((member) => (
            <li className="member-cell" key={member.id}>
              <PersonTrigger
                person={member}
                variant="member"
                onOpen={openBio}
              />
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        eyebrow="Instructors & Advisors"
        title="Guidance pending confirmation"
        tone="tint"
        intro="Instructor and advisor introductions are reserved below and will be published only after each person confirms consent."
      >
        <ul className="instructor-grid">
          {instructorSlots.map((slot) => (
            <li className="instructor-card" key={slot}>
              <span className="instructor-card__frame" aria-hidden="true" />
              <span className="instructor-card__name">To be announced</span>
              <span className="instructor-card__role">Instructor / Advisor</span>
            </li>
          ))}
        </ul>
        <p className="instructor-note">
          No instructor or advisor names are listed yet. Names, roles, and
          photographs will appear here once supervision and publication
          consent are confirmed.
        </p>
      </PageSection>

      <PageSection eyebrow="Attribution" title="Credit must be precise">
        <div className="focus-statement">
          <p>
            Student work, supervision, institutional support, external
            collaboration, and AI-assisted development will each be
            distinguished precisely once the formal Attributions Form is
            published. No attributions, links, or claims are added until they
            are verified.
          </p>
        </div>
      </PageSection>

      {activePerson && <BioModal person={activePerson} onClose={closeBio} />}
    </>
  );
}
