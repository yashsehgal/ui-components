'use client';
// import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { MultiSelect } from "@/components/multiselect";
import { Avatar, Button, Headline } from "craftbook";
import { useState } from "react";

const Options = [
  "apple", "banana", "orange", "pineapple", "tomato"
]

const MainView: React.FunctionComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  return (
    <div className="main-view">
      <header className="m-12">
        <h2 className="leading-snug tracking-tight font-semibold text-2xl">
          UI Components
        </h2>
      </header>
      <div className="content-container mx-12 my-6 grid gap-6">
        <MultiSelect
          options={Options}
          setOptions={setSelectedOptions}
        />
      </div>
    </div>
  )
}

export default MainView;