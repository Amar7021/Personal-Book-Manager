import { BookOpen } from "lucide-react";

export default function Loader({ text = "Loading your library..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <BookOpen className="h-12 w-12 animate-pulse text-primary" />

          <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-primary" />
        </div>

        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
