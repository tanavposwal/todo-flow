"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import TodoEditor from "./TodoEditor";
import { Tab } from "./Tab";
import { useEffect, useState } from "react";

export const TodoSection = () => {
  const [open, setOpen] = useState<string>("Home");
  const [tabs, setTabs] = useState(["Home"]);

  useEffect(() => {
    if (localStorage.getItem("tabs")) {
      setTabs(JSON.parse(localStorage.getItem("tabs")!));
    } else {
      setTabs(["Home"]);
      localStorage.setItem("tabs", JSON.stringify(tabs));
    }
  }, []);

  const addTab = () => {
    const untitledTabs = tabs.filter((tab) => tab.startsWith("untitled"));
    const highestNumber = untitledTabs.reduce((max, tab) => {
      const number = parseInt(tab.replace("untitled ", "")) || 0;
      return number > max ? number : max;
    }, 0);
    setTabs([...tabs, `untitled ${highestNumber + 1}`]);
    localStorage.setItem("tabs", JSON.stringify(tabs));
  };

  return (
    <section className="w-[60vw] border-x-2 h-screen flex flex-col">
      <div className="flex px-2 py-2 gap-2 overflow-y-auto relative group sm-scroll border-b-2">
        {tabs.map((val) => (
          <Tab title={val} open={open} setOpen={setOpen} />
        ))}

        <div className="sticky top-50% right-0 group-hover:opacity-100 opacity-0 transition-all">
          <Button
            variant="ghost"
            size="icon"
            className="bg-neutral-900 h-full"
            onClick={() => addTab()}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="p-3 pl-4">
        <TodoEditor open={open} />
      </div>
    </section>
  );
};
