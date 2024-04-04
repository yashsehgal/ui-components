"use client";
import { useEffect, useState } from "react";

const Languages = ['Javascript', 'Typescript', 'Python', 'HTML', 'CSS', 'Java'];
const Tools = ['Git/GitHub', 'Vercel', 'GitHub Actions', 'Storybook', 'Chromatic'];
const Frameworks = ['React', 'NextJS', 'VueJS', 'Svelte'];

const Skills = [
  {
    id: "languages",
    data: Languages,
  },
  {
    id: "tools",
    data: Tools
  },
  {
    id: "frameworks",
    data: Frameworks
  }
]

export default function SkillPage() {
  const [highlighterID, setHighlighterID] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectHighlightSection = () => {
    console.log("getting inside selectedHighlightSection");
    if (window && typeof window !== "undefined" && highlighterID) {
      console.log("getting inside selectedHighlightSection window condition");
      const elementToHighlight: HTMLElement | null = document.getElementById(highlighterID);
      if (elementToHighlight) {
        console.log("getting inside selectedHighlightSection inside element selection condition");
        window.getSelection()?.selectAllChildren(elementToHighlight);
      }
    }
  }

  useEffect(() => {
    if (window && typeof window !== "undefined") {
      const findHighlighterParams = new URLSearchParams(window.location.search);
      const highlighingID = findHighlighterParams.get('highlight');
      if (highlighingID && highlighingID !== "null" && highlighingID !== "undefined") {
        setHighlighterID(highlighingID as string);
        selectHighlightSection();
      }
    }
  }, [selectHighlightSection]);

  return <div className="skills-page py-24 px-[400px]">
    <h1 className="font-semibold tracking-tighter text-3xl">Skills</h1>
    <div className="skills-container grid grid-cols-3 gap-4 mt-12">
      {Skills.map((skilllList, index) => {
        return <div key={index} id={skilllList.id} className="">
          <h2 className="capitalize font-medium text-xl tracking-tight">{skilllList.id}</h2>
          <ul className="skills-list mt-2">
            {skilllList?.data?.map((skill, skillIndex) => {
              return <p className="font-normal" key={skillIndex}>{skill}</p>
            })}
          </ul>
        </div>
      })}
    </div>
  </div>
}