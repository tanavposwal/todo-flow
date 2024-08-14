"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Cross1Icon, DragHandleDots2Icon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function TodoEditor() {
  const [lines, setLines] = useState([{ id: "1", text: "", checked: false }]);

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newLines = [...lines];
    newLines[index].text = event.target.value;
    setLines(newLines);
  };

  const handleCheckboxChange = (index: number) => {
    const newLines = [...lines];
    newLines[index].checked = !newLines[index].checked;
    setLines(newLines);
  };

  const handleKeyPress = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setLines([...lines, { id: `${Date.now()}`, text: "", checked: false }]);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(lines);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLines(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            className="flex flex-col gap-2"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {lines.map((line, index) => (
              <Draggable
                key={line.id}
                draggableId={line.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className="flex flex-1 justify-center items-center gap-2 transition-opacity"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                      ...provided.draggableProps.style,
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
                      onKeyDown={(event) => handleKeyPress(index, event)}
                      className="px-2 py-1 outline-none rounded-md text-neutral-300 bg-transparent"
                      style={{
                        flex: 1,
                        textDecoration: line.checked ? "line-through" : "none",
                      }}
                    />
                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button>
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
