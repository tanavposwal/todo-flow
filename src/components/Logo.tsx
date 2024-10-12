import { CheckCircledIcon } from "@radix-ui/react-icons"

export const Logo = () => {
  return (
    <div className="flex gap-2 w-fit h-fit items-center justify-center select-none">
        <CheckCircledIcon className="w-6 h-6 stroke-[4px] text-green-500" />
        <p className="text-3xl font-extrabold">Todo</p>
    </div>
  )
}
