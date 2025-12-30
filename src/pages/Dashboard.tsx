import { MessageSquare, AlertTriangle, Clock, CheckCircle, TrendingUp, ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { name: "Mon", feedback: 12 },
  { name: "Tue", feedback: 19 },
  { name: "Wed", feedback: 15 },
  { name: "Thu", feedback: 22 },
  { name: "Fri", feedback: 28 },
  { name: "Sat", feedback: 18 },
  { name: "Sun", feedback: 14 },
];

const recentFeedbacks = [
  {
    id: "1",
    type: "complaint",
    message: "The waiting time was too long at the counter...",
    time: "5 min ago",
    sentiment: "negative",
  },
  {
    id: "2",
    type: "suggestion",
    message: "Would love to see more vegetarian options on the menu",
    time: "1 hour ago",
    sentiment: "neutral",
  },
  {
    id: "3",
    type: "feedback",
    message: "Amazing service! The staff was incredibly helpful",
    time: "2 hours ago",
    sentiment: "positive",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your feedback.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/inbox">
            View All Feedbacks
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Feedback"
          value="1,284"
          change="+12% from last month"
          changeType="positive"
          icon={MessageSquare}
          iconColor="text-primary"
        />
        <StatCard
          title="New Feedbacks"
          value="48"
          change="23 unread"
          changeType="neutral"
          icon={AlertTriangle}
          iconColor="text-warning"
        />
        <StatCard
          title="In Progress"
          value="12"
          change="Being addressed"
          changeType="neutral"
          icon={Clock}
          iconColor="text-primary"
        />
        <StatCard
          title="Resolved"
          value="1,224"
          change="95% resolution rate"
          changeType="positive"
          icon={CheckCircle}
          iconColor="text-success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Feedback Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Feedback Trend</CardTitle>
                <CardDescription>Daily feedback submissions this week</CardDescription>
              </div>
              <Badge variant="secondary" className="gap-1">
                <TrendingUp className="h-3 w-3" />
                +18%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorFeedback" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="feedback"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorFeedback)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest feedback submissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentFeedbacks.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              >
                <div
                  className={`h-2 w-2 mt-2 rounded-full ${
                    item.sentiment === "positive"
                      ? "bg-success"
                      : item.sentiment === "negative"
                      ? "bg-destructive"
                      : "bg-warning"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={item.type as any} className="text-xs">
                      {item.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-sm text-foreground truncate">
                    {item.message}
                  </p>
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link to="/dashboard/inbox">View all feedback</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card variant="elevated" className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Generated from your recent feedback</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-card border">
              <h4 className="font-medium text-foreground mb-2">Top Issue</h4>
              <p className="text-sm text-muted-foreground">
                Waiting time is mentioned in 34% of complaints this week
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border">
              <h4 className="font-medium text-foreground mb-2">Positive Trend</h4>
              <p className="text-sm text-muted-foreground">
                Staff behavior ratings improved by 15% this month
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border">
              <h4 className="font-medium text-foreground mb-2">Suggestion</h4>
              <p className="text-sm text-muted-foreground">
                Consider adding more menu options based on 12 suggestions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
