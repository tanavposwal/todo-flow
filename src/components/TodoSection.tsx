"use client";

import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons";
import TodoEditor from "./TodoEditor";

export const TodoSection = () => {
  return (
    <section className="w-[55vw] border-x-2 h-screen flex flex-col">
      <div className="flex px-2 py-2 gap-2 overflow-y-auto relative group sm-scroll border-b-2">
        <Button variant="ghost" size="sm">Home</Button>
        <Button variant="ghost"  size="sm">Hustle</Button>
        <Button variant="ghost"  size="sm">Coding</Button>
        <Button variant="ghost"  size="sm">Coding</Button>

        <div className="sticky top-50% right-0 group-hover:opacity-100 opacity-0 transition-all">
          <Button variant="ghost" size="sm" className="bg-neutral-900"><PlusIcon /></Button>
        </div>
      </div>
      <div className="p-3 pl-4">
        <TodoEditor />
      </div>
    </section>
  )
}
