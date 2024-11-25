import { CheckIcon } from "@radix-ui/react-icons"

export const Logo = () => {
  return (
    <div className="flex gap-2 w-fit h-fit items-center justify-center select-none">
        <CheckIcon className="w-10 h-10 text-green-400 stroke-[4px]" />
        <p className="text-4xl font-black">Todo</p>
    </div>
  )
}
