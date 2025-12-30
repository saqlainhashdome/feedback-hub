import { MessageSquare, Mic, AlertTriangle, Lightbulb, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface FeedbackItem {
  id: string;
  type: "complaint" | "suggestion" | "feedback";
  message: string;
  source: "text" | "voice";
  status: "new" | "in_progress" | "resolved";
  sentiment: "positive" | "neutral" | "negative";
  date: string;
  customerName?: string;
}

interface FeedbackTableProps {
  feedbacks: FeedbackItem[];
  onRowClick?: (id: string) => void;
}

const typeIcons = {
  complaint: AlertTriangle,
  suggestion: Lightbulb,
  feedback: MessageCircle,
};

const typeLabels = {
  complaint: "Complaint",
  suggestion: "Suggestion",
  feedback: "Feedback",
};

const statusLabels = {
  new: "New",
  in_progress: "In Progress",
  resolved: "Resolved",
};

export function FeedbackTable({ feedbacks, onRowClick }: FeedbackTableProps) {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[120px]">Type</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="w-[100px]">Source</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[100px]">Sentiment</TableHead>
            <TableHead className="w-[120px]">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.map((feedback) => {
            const TypeIcon = typeIcons[feedback.type];
            return (
              <TableRow
                key={feedback.id}
                className={cn(
                  "cursor-pointer transition-colors hover:bg-muted/50",
                  feedback.status === "new" && "bg-primary/5"
                )}
                onClick={() => onRowClick?.(feedback.id)}
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <TypeIcon className="h-4 w-4 text-muted-foreground" />
                    <Badge variant={feedback.type}>{typeLabels[feedback.type]}</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="truncate max-w-[300px] text-sm">
                    {feedback.message}
                  </p>
                  {feedback.customerName && (
                    <p className="text-xs text-muted-foreground mt-1">
                      from {feedback.customerName}
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {feedback.source === "voice" ? (
                      <Mic className="h-4 w-4 text-primary" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm capitalize">{feedback.source}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      feedback.status === "new"
                        ? "new"
                        : feedback.status === "in_progress"
                        ? "inProgress"
                        : "resolved"
                    }
                  >
                    {statusLabels[feedback.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={feedback.sentiment}>
                    {feedback.sentiment.charAt(0).toUpperCase() +
                      feedback.sentiment.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {feedback.date}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
