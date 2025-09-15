"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle, Calendar, BookOpen, Users, AlertCircle, Menu, Settings, LogOut } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { EmergencyButton } from "@/components/emergency-button"

export function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { icon: Heart, label: "Dashboard", href: "/dashboard", active: true },
    { icon: MessageCircle, label: "AI Chat", href: "/chat" },
    { icon: Calendar, label: "Book Counselor", href: "/booking" },
    { icon: BookOpen, label: "Wellness Resources", href: "/resources" },
    { icon: Users, label: "Community", href: "/community" },
  ]

  const Navigation = () => (
    <nav className="space-y-2">
      {navigationItems.map((item, index) => (
        <Button
          key={item.label}
          variant={item.active ? "default" : "ghost"}
          className={`w-full justify-start gap-3 hover-lift animate-fade-in delay-${index * 100}`}
          onClick={() => {
            if (item.href !== "/dashboard") {
              window.location.href = item.href
            }
            setIsMobileMenuOpen(false)
          }}
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </Button>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-accent/15 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-primary rounded-full animate-float"></div>
        <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-secondary rounded-full animate-float delay-500"></div>
      </div>

      <header className="border-b border-border bg-card/80 backdrop-blur-xl animate-fade-in relative z-10">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden hover-lift">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-card/95 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6 animate-fade-in">
                  <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg glow-effect">
                    <Heart className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h1 className="text-xl font-bold text-gradient">MindCare</h1>
                </div>
                <Navigation />
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-3 animate-slide-in-left">
              <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg glow-effect">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-gradient hidden sm:block">MindCare</h1>
            </div>
          </div>

          <div className="flex items-center gap-4 animate-slide-in-right">
            <Button variant="ghost" size="icon" className="hover-lift">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar className="hover-lift">
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">JD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="hover-lift">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex relative z-10">
        <aside className="hidden lg:block w-64 border-r border-border bg-card/80 backdrop-blur-xl p-6 animate-slide-in-left">
          <Navigation />

          <div className="mt-8 p-4 gradient-glow rounded-xl animate-fade-in-up delay-500">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Emergency Support</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">If you're in crisis, immediate help is available</p>
            <Button size="sm" variant="outline" className="w-full bg-transparent hover-lift">
              Get Help Now
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="space-y-2 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-balance text-gradient">Welcome back, John</h2>
              <p className="text-muted-foreground text-lg">
                How are you feeling today? Your mental wellness journey continues here.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: MessageCircle,
                  title: "Start AI Chat",
                  desc: "Get instant support and coping strategies from our AI assistant",
                  href: "/chat",
                  color: "primary",
                },
                {
                  icon: Calendar,
                  title: "Book Counselor",
                  desc: "Schedule a session with a professional counselor",
                  href: "/booking",
                  color: "accent",
                },
                {
                  icon: BookOpen,
                  title: "Wellness Resources",
                  desc: "Access guides, exercises, and educational content",
                  href: "/resources",
                  color: "secondary",
                },
                {
                  icon: Users,
                  title: "Join Community",
                  desc: "Connect with peers in a safe, supportive environment",
                  href: "/community",
                  color: "chart-3",
                },
              ].map((item, index) => (
                <Card
                  key={item.title}
                  className={`cursor-pointer hover-lift gradient-glow transition-all duration-300 animate-fade-in-up delay-${(index + 1) * 100} group`}
                  onClick={() => (window.location.href = item.href)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 bg-${item.color}/10 rounded-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className={`h-5 w-5 text-${item.color}`} />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">{item.desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="gradient-glow animate-fade-in-up delay-500">
                  <CardHeader>
                    <CardTitle className="text-gradient">Your Wellness Journey</CardTitle>
                    <CardDescription>Track your progress and maintain healthy habits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 gradient-glow rounded-xl hover-lift group">
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors duration-300">
                          Daily Check-in
                        </p>
                        <p className="text-sm text-muted-foreground">How are you feeling today?</p>
                      </div>
                      <Button size="sm" className="glow-effect">
                        Complete
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 gradient-glow rounded-xl hover-lift group">
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors duration-300">
                          Mindfulness Exercise
                        </p>
                        <p className="text-sm text-muted-foreground">5-minute breathing exercise</p>
                      </div>
                      <Button size="sm" variant="outline" className="hover-lift bg-transparent">
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-glow animate-fade-in-up delay-600">
                  <CardHeader>
                    <CardTitle className="text-gradient">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 gradient-glow rounded-xl hover-lift">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">AI Chat Session</p>
                        <p className="text-xs text-muted-foreground">Yesterday, 2:30 PM</p>
                      </div>
                      <Badge variant="secondary" className="bg-primary/20 text-primary">
                        Completed
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 p-3 gradient-glow rounded-xl hover-lift">
                      <BookOpen className="h-4 w-4 text-secondary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Stress Management Guide</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                      <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                        Read
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="gradient-glow animate-fade-in-up delay-700">
                  <CardHeader>
                    <CardTitle className="text-gradient">Quick Support</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start gap-3 bg-transparent hover-lift" variant="outline">
                      <AlertCircle className="h-4 w-4" />
                      Crisis Support
                    </Button>
                    <Button className="w-full justify-start gap-3 bg-transparent hover-lift" variant="outline">
                      <MessageCircle className="h-4 w-4" />
                      Anonymous Chat
                    </Button>
                    <Button className="w-full justify-start gap-3 bg-transparent hover-lift" variant="outline">
                      <Heart className="h-4 w-4" />
                      Wellness Check
                    </Button>
                  </CardContent>
                </Card>

                <Card className="gradient-glow animate-fade-in-up delay-800">
                  <CardHeader>
                    <CardTitle className="text-gradient">Upcoming</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4">
                      <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2 animate-float" />
                      <p className="text-sm text-muted-foreground">No upcoming appointments</p>
                      <Button size="sm" className="mt-2 glow-effect hover-lift">
                        Schedule Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Emergency Button */}
      <EmergencyButton />
    </div>
  )
}
