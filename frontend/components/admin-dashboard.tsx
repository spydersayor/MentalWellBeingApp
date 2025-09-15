"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Users,
  MessageCircle,
  Calendar,
  BookOpen,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Shield,
  CheckCircle,
  Eye,
  Settings,
  Download,
} from "lucide-react"

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  totalSessions: number
  avgSessionDuration: string
  crisisInterventions: number
  communityPosts: number
  resourceViews: number
  counselorBookings: number
}

interface UserActivity {
  date: string
  newUsers: number
  activeUsers: number
  sessions: number
}

interface ResourceUsage {
  category: string
  views: number
  color: string
}

interface CrisisAlert {
  id: string
  userId: string
  userName: string
  timestamp: Date
  severity: "high" | "medium" | "low"
  status: "pending" | "resolved" | "escalated"
  description: string
}

export function AdminDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")
  const [selectedTab, setSelectedTab] = useState("overview")

  const analyticsData: AnalyticsData = {
    totalUsers: 1247,
    activeUsers: 892,
    totalSessions: 3456,
    avgSessionDuration: "12m 34s",
    crisisInterventions: 23,
    communityPosts: 156,
    resourceViews: 2891,
    counselorBookings: 89,
  }

  const userActivityData: UserActivity[] = [
    { date: "Mon", newUsers: 12, activeUsers: 145, sessions: 234 },
    { date: "Tue", newUsers: 19, activeUsers: 167, sessions: 289 },
    { date: "Wed", newUsers: 8, activeUsers: 134, sessions: 198 },
    { date: "Thu", newUsers: 15, activeUsers: 178, sessions: 312 },
    { date: "Fri", newUsers: 22, activeUsers: 203, sessions: 356 },
    { date: "Sat", newUsers: 18, activeUsers: 189, sessions: 278 },
    { date: "Sun", newUsers: 14, activeUsers: 156, sessions: 234 },
  ]

  const resourceUsageData: ResourceUsage[] = [
    { category: "Stress Management", views: 456, color: "#059669" },
    { category: "Anxiety Support", views: 389, color: "#10b981" },
    { category: "Sleep & Rest", views: 234, color: "#f59e0b" },
    { category: "Mindfulness", views: 198, color: "#3b82f6" },
    { category: "Academic Success", views: 167, color: "#8b5cf6" },
  ]

  const crisisAlerts: CrisisAlert[] = [
    {
      id: "1",
      userId: "user_123",
      userName: "Anonymous User",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      severity: "high",
      status: "pending",
      description: "User expressed suicidal ideation in AI chat session",
    },
    {
      id: "2",
      userId: "user_456",
      userName: "Anonymous User",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      severity: "medium",
      status: "resolved",
      description: "User reported severe anxiety and panic attacks",
    },
    {
      id: "3",
      userId: "user_789",
      userName: "Anonymous User",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      severity: "low",
      status: "escalated",
      description: "User mentioned feeling overwhelmed with academic pressure",
    },
  ]

  const getSeverityColor = (severity: CrisisAlert["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: CrisisAlert["status"]) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "escalated":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60)
      return `${diffInHours}h ago`
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Mental Health Platform Analytics & Management</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="crisis">Crisis Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +12.5%
                    </span>
                    from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.activeUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +8.2%
                    </span>
                    from last week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Crisis Interventions</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.crisisInterventions}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600 flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      -15.3%
                    </span>
                    from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Counselor Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.counselorBookings}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +23.1%
                    </span>
                    from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity Trends</CardTitle>
                  <CardDescription>Daily active users and session counts</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="activeUsers" stroke="#059669" strokeWidth={2} />
                      <Line type="monotone" dataKey="sessions" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Usage</CardTitle>
                  <CardDescription>Most accessed wellness resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={resourceUsageData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="views"
                        label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                      >
                        {resourceUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>User Engagement Rate</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Crisis Response Time</span>
                      <span>&lt; 5 min</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Community Moderation</span>
                      <span>99.2%</span>
                    </div>
                    <Progress value={99} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Resource Satisfaction</span>
                      <span>4.7/5</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>User Registration Trends</CardTitle>
                    <CardDescription>New user signups over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={userActivityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="newUsers" fill="#059669" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>User Demographics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Undergraduate</span>
                        <span>68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Graduate</span>
                        <span>24%</span>
                      </div>
                      <Progress value={24} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Faculty/Staff</span>
                        <span>8%</span>
                      </div>
                      <Progress value={8} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Usage Patterns</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Peak Usage</span>
                      <Badge variant="secondary">8-10 PM</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Avg. Session</span>
                      <Badge variant="secondary">12m 34s</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Return Rate</span>
                      <Badge variant="secondary">73%</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6 mt-6">
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Community Posts</CardTitle>
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.communityPosts}</div>
                    <p className="text-xs text-muted-foreground">12 pending moderation</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Resource Views</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.resourceViews.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+18% from last week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">AI Chat Sessions</CardTitle>
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.totalSessions.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Avg. 8.2 messages per session</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Content Moderation Queue</CardTitle>
                  <CardDescription>Posts and comments requiring review</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: "1",
                        type: "Post",
                        title: "Struggling with severe depression",
                        author: "Anonymous",
                        timestamp: "2 hours ago",
                        status: "pending",
                      },
                      {
                        id: "2",
                        type: "Comment",
                        title: "Response to anxiety support thread",
                        author: "Student123",
                        timestamp: "4 hours ago",
                        status: "flagged",
                      },
                      {
                        id: "3",
                        type: "Post",
                        title: "Tips for managing academic stress",
                        author: "HelpfulPeer",
                        timestamp: "6 hours ago",
                        status: "approved",
                      },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">{item.type}</Badge>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">
                              by {item.author} • {item.timestamp}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              item.status === "approved"
                                ? "default"
                                : item.status === "flagged"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {item.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="crisis" className="space-y-6 mt-6">
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-red-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      {crisisAlerts.filter((alert) => alert.status === "pending").length}
                    </div>
                    <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {crisisAlerts.filter((alert) => alert.status === "resolved").length}
                    </div>
                    <p className="text-xs text-muted-foreground">Average response: 4.2 minutes</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Escalated</CardTitle>
                    <Shield className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      {crisisAlerts.filter((alert) => alert.status === "escalated").length}
                    </div>
                    <p className="text-xs text-muted-foreground">To professional services</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Crisis Alerts</CardTitle>
                  <CardDescription>Real-time monitoring of high-risk situations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {crisisAlerts.map((alert) => (
                      <div key={alert.id} className={`p-4 border rounded-lg ${getSeverityColor(alert.severity)}`}>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge className={getSeverityColor(alert.severity)} variant="secondary">
                                {alert.severity.toUpperCase()}
                              </Badge>
                              <Badge className={getStatusColor(alert.status)} variant="secondary">
                                {alert.status.toUpperCase()}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{formatTimeAgo(alert.timestamp)}</span>
                            </div>
                            <p className="font-medium">{alert.description}</p>
                            <p className="text-sm text-muted-foreground">User: {alert.userName}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            {alert.status === "pending" && (
                              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                Respond
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
