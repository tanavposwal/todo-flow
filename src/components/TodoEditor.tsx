"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import {
  Cross1Icon,
  DragHandleDots2Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TodoLine {
  id: string;
  text: string;
  checked: boolean;
}

export default function TodoEditor({open}: {open: string}) {
  const [lines, setLines] = useState<TodoLine[]>([])  

  useEffect(() => {
    if (localStorage.getItem(open)) {
      setLines(JSON.parse(localStorage.getItem(open)!))
    } else {
      setLines([])
    }
  }, [open])

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newLines = [...lines];
    newLines[index].text = event.target.value;
    setLines(newLines);
    localStorage.setItem(open, JSON.stringify(lines))
  };

  const handleCheckboxChange = (index: number) => {
    const newLines = [...lines];
    newLines[index].checked = !newLines[index].checked;
    setLines(newLines);
    localStorage.setItem(open, JSON.stringify(lines))
  };

  const handleDelete = (index: number) => {
    const newLines = lines.filter((_, i) => i !== index);
    setLines(newLines);
    localStorage.setItem(open, JSON.stringify(lines))
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setLines([
        ...lines,
        { id: Date.now().toString(), text: "", checked: false },
      ]);
      localStorage.setItem(open, JSON.stringify(lines))
    }
  };

  const addTodo = () => {
    setLines([
      ...lines,
      { id: Date.now().toString(), text: "", checked: false },
    ]);
    localStorage.setItem(open, JSON.stringify(lines))
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        {lines.map((line, index) => (
        <div
          key={line.id}
          className="flex flex-1 justify-center items-center gap-2 transition-opacity"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <button className="cursor-grab text-neutral-600">
            <DragHandleDots2Icon />
          </button>

          <Checkbox
            checked={line.checked}
            onCheckedChange={() => handleCheckboxChange(index)}
          />
          <input
            type="text"
            value={line.text}
            onChange={(event) => handleInputChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            className="px-2 py-1 outline-none rounded-md text-foreground bg-transparent placeholder:text-neutral-500"
            placeholder="todo..."
            style={{
              flex: 1,
              textDecoration: line.checked ? "line-through" : "none",
            }}
            
          />
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => handleDelete(index)}>
                    <Cross1Icon />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      ))}
      </div>
      <Button variant="outline" size="sm" onClick={() => addTodo()}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add
      </Button>
    </div>
  );
}
