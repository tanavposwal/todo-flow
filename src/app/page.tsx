import { MenuSection } from "@/components/MenuSection";
import { ProfileSection } from "@/components/ProfileSection";
import { TodoSection } from "@/components/TodoSection";

export default function Home() {
  return (
    <main className="flex mx-auto max-w-screen-xl">
      <MenuSection />
      <TodoSection />
      <ProfileSection />
    </main>
  );
}
