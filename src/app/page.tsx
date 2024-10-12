import { MenuSection } from "@/components/MenuSection";
import { TodoSection } from "@/components/TodoSection";

export default function Home() {
  return (
    <main className="flex-col border-x-2 mx-auto max-w-screen-md items-center justify-center max-h-screen">
      <MenuSection />
      <TodoSection />
    </main>
  );
}
