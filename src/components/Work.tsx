import "./styles/Work.css";
import ProjectArtwork from "./ProjectArtwork";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    name: "Shiksha Vani",
    category: "Google Solution Challenge",
    focus: "AI-powered educational video generation with synchronized interactive simulations.",
    tools: "Generative AI, TypeScript, React",
    artwork: "education" as const,
  },
  {
    name: "Smart Campus Decision Intelligence",
    category: "AMD Slingshot Hackathon · Team Matrix Shot",
    focus: "A campus energy decision intelligence system with backend services and web interaction.",
    tools: "FastAPI, Next.js, REST APIs",
    artwork: "campus" as const,
  },
  {
    name: "TrustHire",
    category: "IIT Mandi Weilliptic Hackathon",
    focus: "An on-chain auditable AI recruitment agent for job matching and resume screening.",
    tools: "LangChain, LangGraph, Weilchain",
    artwork: "trust" as const,
  },
  {
    name: "Project-Praman",
    category: "Hack to Skill · Google AI Hackathon",
    focus: "A functional AI prototype for misinformation analysis using image-processing techniques.",
    tools: "Flask, Pillow, Google Generative AI",
    artwork: "praman" as const,
  },
  {
    name: "Edge AI CCTV Surveillance",
    category: "Concept prototype",
    focus: "Concept for real-time incident detection and tracking to support emergency green-corridor response.",
    tools: "Computer Vision, Edge AI, Video Analysis",
    artwork: "surveillance" as const,
  },
];

const Work = () => {
  const scrollSpaceRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(min-width: 1025px)", () => {
      const section = document.querySelector<HTMLElement>(".work-section");
      const container = document.querySelector<HTMLElement>(".work-container");
      const workFlex = document.querySelector<HTMLElement>(".work-flex");
      const scrollSpace = scrollSpaceRef.current;

      if (!section || !container || !workFlex || !scrollSpace) return;

      const getTravelDistance = () => {
        const lastProject = workFlex.lastElementChild as HTMLElement | null;
        if (!lastProject) return 0;

        const currentX = Number(gsap.getProperty(workFlex, "x")) || 0;
        return Math.max(
          0,
          lastProject.getBoundingClientRect().right -
            container.getBoundingClientRect().right -
            currentX
        );
      };

      const updateScrollSpace = () => {
        const distance = getTravelDistance();
        scrollSpace.style.height = `${distance}px`;
        return distance;
      };

      const refreshScrollSpace = () => {
        updateScrollSpace();
      };

      updateScrollSpace();
      ScrollTrigger.addEventListener("refreshInit", refreshScrollSpace);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${updateScrollSpace()}`,
          scrub: true,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
          id: "work",
        },
      });

      timeline.to(workFlex, {
        x: () => -getTravelDistance(),
        ease: "none",
      });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", refreshScrollSpace);
        timeline.kill();
        scrollSpace.style.height = "0px";
      };
    });

    return () => media.revert();
  }, []);
  return (
    <>
      <div className="work-section" id="work">
        <div className="work-container section-container">
          <h2>
            My <span>Work</span>
          </h2>
          <div className="work-flex">
            {projects.map((project, index) => (
              <div className="work-box" key={index}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>0{index + 1}</h3>

                    <div>
                      <h4>{project.name}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>Project</h4>
                  <p>{project.focus}</p>
                  <h4>Tools and technologies</h4>
                  <p>{project.tools}</p>
                </div>
                <ProjectArtwork kind={project.artwork} title={project.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="work-scroll-space" ref={scrollSpaceRef} aria-hidden="true" />
    </>
  );
};

export default Work;
