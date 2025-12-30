import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeedbackTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  color: "complaint" | "suggestion" | "feedback";
}

const colorStyles = {
  complaint: {
    bg: "bg-destructive/5 hover:bg-destructive/10",
    border: "border-destructive/20",
    selectedBg: "bg-destructive/10",
    selectedBorder: "border-destructive",
    icon: "text-destructive",
  },
  suggestion: {
    bg: "bg-primary/5 hover:bg-primary/10",
    border: "border-primary/20",
    selectedBg: "bg-primary/10",
    selectedBorder: "border-primary",
    icon: "text-primary",
  },
  feedback: {
    bg: "bg-muted hover:bg-muted/80",
    border: "border-border",
    selectedBg: "bg-accent",
    selectedBorder: "border-primary",
    icon: "text-muted-foreground",
  },
};

export function FeedbackTypeCard({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
  color,
}: FeedbackTypeCardProps) {
  const styles = colorStyles[color];

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 text-center w-full",
        selected
          ? `${styles.selectedBg} ${styles.selectedBorder} shadow-md`
          : `${styles.bg} ${styles.border}`
      )}
    >
      <div
        className={cn(
          "h-12 w-12 rounded-full flex items-center justify-center",
          selected ? "bg-background shadow-sm" : "bg-background/50"
        )}
      >
        <Icon className={cn("h-6 w-6", styles.icon)} />
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </button>
  );
}
