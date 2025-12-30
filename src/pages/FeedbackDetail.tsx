import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, Clock, User, Phone, MessageSquare, Brain, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

// Mock data for a single feedback
const mockFeedback = {
  id: "1",
  type: "complaint" as const,
  message:
    "The waiting time was extremely long at the counter. I had to wait for over 30 minutes just to place my order. This is unacceptable during peak hours. The staff seemed overwhelmed and there weren't enough people at the registers. I almost left without ordering. Please consider adding more staff during busy times.",
  source: "voice" as const,
  status: "new" as const,
  sentiment: "negative" as const,
  date: "Today, 10:30 AM",
  customerName: "Anonymous",
  customerPhone: null,
  aiSummary:
    "Customer experienced excessive waiting time (30+ minutes) at the counter during peak hours. Main concerns: understaffing and insufficient registers. Suggests adding more staff during busy periods.",
  aiCategories: ["Service - Waiting Time", "Staff - Understaffing"],
  aiSentiment: {
    score: -0.7,
    label: "Negative",
    emotion: "Frustrated",
  },
};

type StatusType = "new" | "in_progress" | "resolved";

export default function FeedbackDetail() {
  const { id } = useParams();
  const [status, setStatus] = useState<StatusType>(mockFeedback.status);
  const [privateNote, setPrivateNote] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStatusChange = (value: string) => {
    setStatus(value as StatusType);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/inbox">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">
              Feedback #{id}
            </h1>
            <Badge variant={mockFeedback.type}>{mockFeedback.type}</Badge>
            <Badge
              variant={
                status === "new"
                  ? "new"
                  : status === "in_progress"
                  ? "inProgress"
                  : "resolved"
              }
            >
              {status.replace("_", " ")}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">
            Submitted {mockFeedback.date}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Message */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Customer Message
              </CardTitle>
              <CardDescription>
                {mockFeedback.source === "voice"
                  ? "Voice message (transcribed)"
                  : "Text message"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mockFeedback.source === "voice" && (
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg mb-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-12 w-12 rounded-full"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-0 rounded-full" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      0:00 / 0:28
                    </p>
                  </div>
                </div>
              )}
              <p className="text-foreground leading-relaxed">
                {mockFeedback.message}
              </p>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Analysis
              </CardTitle>
              <CardDescription>
                Automated insights generated by AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Summary
                </h4>
                <p className="text-sm text-muted-foreground bg-card p-3 rounded-lg border">
                  {mockFeedback.aiSummary}
                </p>
              </div>

              {/* Sentiment */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Sentiment Analysis
                </h4>
                <div className="flex items-center gap-4 bg-card p-3 rounded-lg border">
                  <Badge
                    variant={
                      mockFeedback.aiSentiment.label.toLowerCase() === "positive"
                        ? "positive"
                        : mockFeedback.aiSentiment.label.toLowerCase() === "negative"
                        ? "negative"
                        : "neutral"
                    }
                    className="text-base px-4 py-1"
                  >
                    {mockFeedback.aiSentiment.label}
                  </Badge>
                  <Separator orientation="vertical" className="h-6" />
                  <div className="text-sm">
                    <span className="text-muted-foreground">Emotion: </span>
                    <span className="font-medium">
                      {mockFeedback.aiSentiment.emotion}
                    </span>
                  </div>
                  <Separator orientation="vertical" className="h-6" />
                  <div className="text-sm">
                    <span className="text-muted-foreground">Score: </span>
                    <span className="font-medium">
                      {mockFeedback.aiSentiment.score}
                    </span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {mockFeedback.aiCategories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="gap-1"
                    >
                      <Tag className="h-3 w-3" />
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Private Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Private Notes</CardTitle>
              <CardDescription>
                Internal notes visible only to your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add internal notes about this feedback..."
                value={privateNote}
                onChange={(e) => setPrivateNote(e.target.value)}
                className="min-h-[100px]"
              />
              <Button className="mt-3" size="sm">
                Save Note
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {mockFeedback.customerName || "Anonymous"}
                  </p>
                  <p className="text-sm text-muted-foreground">Customer</p>
                </div>
              </div>

              {mockFeedback.customerPhone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{mockFeedback.customerPhone}</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{mockFeedback.date}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Mark as Resolved
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Export Feedback
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive"
              >
                Archive
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
