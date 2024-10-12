import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

export const Tab = ({
  title,
  open,
  setOpen,
}: {
  title: string;
  open: string;
  setOpen: any;
}) => {
  const [name, setName] = useState<string>(title);
  const [edit, setEdit] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  // Adjust input width dynamically based on the hidden span
  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${spanWidth+1}px`; // Adjust with some padding
    }
  }, [name, edit]);

  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.select(); // Select all text when editing starts
    }
  }, [edit]);

  const handleKey = (e: any) => {
    if (e.key === "Enter") {
      setEdit(false);
    }
  };

  const handleBlur = () => {
    setEdit(false); // Exit edit mode on blur
  };

  return (
    <div>
      {edit ? (
        <div className="inline-flex relative  h-9 px-4 py-2 rounded-t-xl bg-popover-foreground">
          {/* Hidden span to measure text width */}
          <span
            ref={spanRef}
            className="absolute text-sm"
            style={{ visibility: "hidden", whiteSpace: "pre" }}
          >
            {name || " "}
          </span>

          {/* Input to edit tab name */}
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKey}
            onBlur={handleBlur}
            className="bg-popover-foreground text-background outline-none focus:outline-none text-sm font-medium"
            autoFocus
          />
        </div>
      ) : (
        <Button
          variant="ghost"
          onClick={() => setOpen(name)}
          onDoubleClick={() => setEdit(true)} // Switch to edit mode on double click
          className={`${
            open === name && "bg-popover-foreground text-background hover:bg-popover-foreground hover:text-background"
          } rounded-t-xl rounded-b-none`}
        >
          {name}
        </Button>
      )}
    </div>
  );
};
