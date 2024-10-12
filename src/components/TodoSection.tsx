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
    <section className="flex flex-col">
      <div className="flex px-3 pt-2 gap-1 overflow-x-auto sm-scroll border-popover-foreground border-b-2">
        {tabs.map((val) => (
          <Tab title={val} open={open} setOpen={setOpen} key={val} />
        ))}

        <div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-full"
            onClick={() => addTab()}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="p-3 pl-4 h-fit overflow-y-auto sm-scroll">
        <TodoEditor open={open} />
      </div>
    </section>
  );
};
