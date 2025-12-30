import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        positive: "border-transparent bg-success/10 text-success",
        negative: "border-transparent bg-destructive/10 text-destructive",
        neutral: "border-transparent bg-warning/10 text-warning",
        new: "border-transparent bg-primary/10 text-primary",
        inProgress: "border-transparent bg-warning/10 text-warning",
        resolved: "border-transparent bg-success/10 text-success",
        service: "border-transparent bg-blue-100 text-blue-700",
        product: "border-transparent bg-purple-100 text-purple-700",
        staff: "border-transparent bg-orange-100 text-orange-700",
        complaint: "border-transparent bg-destructive/10 text-destructive",
        suggestion: "border-transparent bg-primary/10 text-primary",
        feedback: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
