import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const feedbackByType = [
  { name: "Complaints", value: 45, color: "hsl(var(--destructive))" },
  { name: "Suggestions", value: 30, color: "hsl(var(--primary))" },
  { name: "Feedback", value: 25, color: "hsl(var(--muted-foreground))" },
];

const sentimentData = [
  { name: "Positive", value: 40, color: "hsl(var(--success))" },
  { name: "Neutral", value: 35, color: "hsl(var(--warning))" },
  { name: "Negative", value: 25, color: "hsl(var(--destructive))" },
];

const categoryData = [
  { category: "Service", complaints: 35, suggestions: 15, feedback: 10 },
  { category: "Product", complaints: 25, suggestions: 20, feedback: 15 },
  { category: "Staff", complaints: 20, suggestions: 10, feedback: 25 },
  { category: "Pricing", complaints: 15, suggestions: 30, feedback: 5 },
  { category: "Ambiance", complaints: 5, suggestions: 25, feedback: 45 },
];

const trendData = [
  { month: "Jan", feedback: 120, resolved: 100 },
  { month: "Feb", feedback: 150, resolved: 130 },
  { month: "Mar", feedback: 180, resolved: 160 },
  { month: "Apr", feedback: 165, resolved: 150 },
  { month: "May", feedback: 200, resolved: 180 },
  { month: "Jun", feedback: 220, resolved: 200 },
];

const topIssues = [
  { issue: "Long waiting times", count: 45, change: "+12%" },
  { issue: "Product quality", count: 32, change: "-5%" },
  { issue: "Staff behavior", count: 28, change: "+3%" },
  { issue: "Pricing concerns", count: 24, change: "-8%" },
  { issue: "Cleanliness", count: 18, change: "-15%" },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Insights and trends from your customer feedback
        </p>
      </div>

      {/* Time Period Tabs */}
      <Tabs defaultValue="monthly">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Feedback by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback by Type</CardTitle>
            <CardDescription>Distribution of feedback categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={feedbackByType}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {feedbackByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
            <CardDescription>Overall customer sentiment breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Feedback by Category</CardTitle>
            <CardDescription>Breakdown of feedback across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="category"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="complaints"
                    fill="hsl(var(--destructive))"
                    radius={[4, 4, 0, 0]}
                    name="Complaints"
                  />
                  <Bar
                    dataKey="suggestions"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    name="Suggestions"
                  />
                  <Bar
                    dataKey="feedback"
                    fill="hsl(var(--muted-foreground))"
                    radius={[4, 4, 0, 0]}
                    name="Feedback"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Trend Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Resolution Trend</CardTitle>
            <CardDescription>Feedback received vs resolved over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="feedback"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                    name="Received"
                  />
                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--success))" }}
                    name="Resolved"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Top Issues</CardTitle>
            <CardDescription>Most reported issues this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topIssues.map((item, index) => (
                <div
                  key={item.issue}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="font-medium text-foreground">
                      {item.issue}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {item.count} mentions
                    </span>
                    <Badge
                      variant={
                        item.change.startsWith("+") ? "negative" : "positive"
                      }
                    >
                      {item.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
