import { CheckCircledIcon } from "@radix-ui/react-icons"

export const Logo = () => {
  return (
    <div className="flex gap-1 w-fit h-fit items-end">
        <CheckCircledIcon className="w-8 h-8 stroke-[4px] text-green-500" />
        <p className="text-4xl font-black">Todo</p>
    </div>
  )
}
