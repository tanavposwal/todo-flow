import { Logo } from "./Logo"
import { ModeToggle } from "./ThemeToggle"

export const MenuSection = () => {
  return (
    <section className="h-fit pt-3 pb-1 px-3 flex items-center justify-between">
      <Logo />
      <ModeToggle />
    </section>
  )
}
