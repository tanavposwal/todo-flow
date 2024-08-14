import { SetStateAction, useEffect, useRef, useState } from "react";
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
  const [inputWidth, setInputWidth] = useState(1);

  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
        const newWidth = spanRef.current.offsetWidth;
        setInputWidth(newWidth > 1 ? newWidth : 1);
    }
  }, [name]);

  const handleKey = (e: any) => {
    if (e.key == "Enter") {
      setEdit(false);
    }
  };

  return (
    <div>
      {edit ? (
        <Button
          variant="ghost"
          size="sm"
          className="focus-within:ring"
        >
          <span
            ref={spanRef}
            style={{
              visibility: "hidden",
            }}
          >
            {name}
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent outline-none"
            style={{ width: `${inputWidth}px` }}
            onKeyDown={(e) => handleKey(e)}
          />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(name)}
          onDoubleClick={() => setEdit(!edit)}
          className={
            "focus-within:ring " +
            (open == name && "bg-neutral-700 hover:bg-neutral-700")
          }
        >
          {name}
        </Button>
      )}
    </div>
  );
};
