import { cn } from "@/lib/utils"

interface ButtonLoaderProps {
    size? : number
    color?: string 
}

export function ButtonLoader({ size = 20, color = '#ffffff' } : ButtonLoaderProps) {

    const sizeClass = `w-[${size}px] h-${size}px]`
    const colorClass = `border-[#${color}]`

    return (
      <div className={cn("w-[20px] h-[20px] border-t-[2px] border-white border-solid rounded-full animate-spin", sizeClass, colorClass)}></div>
    )
}