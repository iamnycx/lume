import { ImageIcon } from "lucide-react";

export default function ImagePlaceholder() {
  return (
    <div className="bg-muted w-full h-72 rounded-md flex justify-center items-center text-muted-foreground">
      <ImageIcon size={64} strokeWidth={1}/>
    </div>
  );
}
