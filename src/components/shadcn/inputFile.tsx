import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
 
export function InputFile({text = "Upload File", onChange, ref}: {
    text?: string,
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    ref?: React.Ref<HTMLInputElement>
  }) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label className="text-blue-900" htmlFor="picture">{text}</Label>
      {
        ref ?
          <Input id="picture" type="file" ref={ref} onChange={onChange} />
          :
          <Input id="picture" type="file" onChange={onChange} />
      }
    </div>
  )
}