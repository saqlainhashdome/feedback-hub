import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeedbackTable, FeedbackItem } from "@/components/dashboard/FeedbackTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const mockFeedbacks: FeedbackItem[] = [
  {
    id: "1",
    type: "complaint",
    message: "The waiting time was extremely long at the counter. I had to wait for over 30 minutes just to place my order.",
    source: "text",
    status: "new",
    sentiment: "negative",
    date: "Today, 10:30 AM",
    customerName: "Anonymous",
  },
  {
    id: "2",
    type: "suggestion",
    message: "Would love to see more vegetarian and vegan options on the menu. The current selection is quite limited.",
    source: "text",
    status: "in_progress",
    sentiment: "neutral",
    date: "Today, 9:15 AM",
    customerName: "Sarah M.",
  },
  {
    id: "3",
    type: "feedback",
    message: "Amazing service! The staff was incredibly helpful and went above and beyond to accommodate our requests.",
    source: "voice",
    status: "resolved",
    sentiment: "positive",
    date: "Yesterday",
    customerName: "John D.",
  },
  {
    id: "4",
    type: "complaint",
    message: "The product quality has declined significantly compared to my last visit. Very disappointed.",
    source: "text",
    status: "new",
    sentiment: "negative",
    date: "Yesterday",
  },
  {
    id: "5",
    type: "suggestion",
    message: "It would be great if you could extend your opening hours on weekends.",
    source: "voice",
    status: "new",
    sentiment: "neutral",
    date: "2 days ago",
    customerName: "Mike R.",
  },
  {
    id: "6",
    type: "feedback",
    message: "Great atmosphere and friendly staff. The new decor looks fantastic!",
    source: "text",
    status: "resolved",
    sentiment: "positive",
    date: "3 days ago",
  },
];

export default function Inbox() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredFeedbacks = mockFeedbacks.filter((feedback) => {
    const matchesSearch = feedback.message
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "new" && feedback.status === "new") ||
      (activeTab === "in_progress" && feedback.status === "in_progress") ||
      (activeTab === "resolved" && feedback.status === "resolved");
    return matchesSearch && matchesTab;
  });

  const handleRowClick = (id: string) => {
    navigate(`/dashboard/inbox/${id}`);
  };

  const counts = {
    all: mockFeedbacks.length,
    new: mockFeedbacks.filter((f) => f.status === "new").length,
    in_progress: mockFeedbacks.filter((f) => f.status === "in_progress").length,
    resolved: mockFeedbacks.filter((f) => f.status === "resolved").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Inbox</h1>
        <p className="text-muted-foreground mt-1">
          Manage and respond to customer feedback
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All Types</DropdownMenuItem>
              <DropdownMenuItem>Complaints</DropdownMenuItem>
              <DropdownMenuItem>Suggestions</DropdownMenuItem>
              <DropdownMenuItem>Feedback</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Sentiment</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>All Sentiments</DropdownMenuItem>
              <DropdownMenuItem>Positive</DropdownMenuItem>
              <DropdownMenuItem>Neutral</DropdownMenuItem>
              <DropdownMenuItem>Negative</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest First</DropdownMenuItem>
              <DropdownMenuItem>Oldest First</DropdownMenuItem>
              <DropdownMenuItem>Most Urgent</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Status Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all" className="gap-2">
            All
            <Badge variant="secondary" className="ml-1">
              {counts.all}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="new" className="gap-2">
            New
            <Badge variant="new" className="ml-1">
              {counts.new}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="in_progress" className="gap-2">
            In Progress
            <Badge variant="inProgress" className="ml-1">
              {counts.in_progress}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="resolved" className="gap-2">
            Resolved
            <Badge variant="resolved" className="ml-1">
              {counts.resolved}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredFeedbacks.length > 0 ? (
            <FeedbackTable
              feedbacks={filteredFeedbacks}
              onRowClick={handleRowClick}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No feedback found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
