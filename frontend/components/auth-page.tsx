"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Shield, Users, Brain, Sparkles } from "lucide-react"

export function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard after successful auth
      window.location.href = "/dashboard"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/30 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-accent/25 to-primary/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 via-secondary/5 to-transparent rounded-full blur-2xl animate-spin-slow"></div>

        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-secondary rounded-full animate-float delay-500"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-float delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-primary rounded-full animate-float delay-1500"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl glow-effect animate-glow">
              <Heart className="h-10 w-10 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-lg opacity-50 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-5xl font-bold text-gradient mb-2">MindCare</h1>
              <div className="flex items-center gap-2 text-primary/80">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">AI-Powered Mental Wellness</span>
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
          </div>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto text-balance leading-relaxed">
            Your trusted companion for mental wellness and emotional support during your college journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="space-y-6 animate-slide-in-left">
            <div className="group p-6 rounded-2xl gradient-glow hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">AI-Powered Support</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Get instant, personalized mental health guidance available 24/7
                  </p>
                </div>
              </div>
            </div>

            <div className="group p-6 rounded-2xl gradient-glow hover:scale-105 transition-all duration-300 cursor-pointer delay-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Complete Privacy</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Your conversations and data are encrypted and completely confidential
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up delay-200">
            <Card className="gradient-glow shadow-2xl border-0 bg-card/80 backdrop-blur-xl">
              <CardHeader className="space-y-4 text-center pb-6">
                <CardTitle className="text-3xl font-bold text-gradient">Welcome Back</CardTitle>
                <CardDescription className="text-foreground/70 text-base">
                  Sign in to continue your wellness journey
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-muted/30 backdrop-blur-sm p-1 rounded-xl">
                    <TabsTrigger
                      value="signin"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all duration-300"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all duration-300"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin" className="space-y-6 mt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="signin-email" className="text-sm font-medium">
                          Email
                        </Label>
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="your.email@college.edu"
                          required
                          className="bg-input/50 backdrop-blur-sm border-muted/50 h-12 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="signin-password" className="text-sm font-medium">
                          Password
                        </Label>
                        <Input
                          id="signin-password"
                          type="password"
                          required
                          className="bg-input/50 backdrop-blur-sm border-muted/50 h-12 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 glow-effect"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Signing in...
                          </div>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-6 mt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label htmlFor="signup-firstname" className="text-sm font-medium">
                            First Name
                          </Label>
                          <Input
                            id="signup-firstname"
                            placeholder="John"
                            required
                            className="bg-input/50 backdrop-blur-sm border-muted/50 h-12 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="signup-lastname" className="text-sm font-medium">
                            Last Name
                          </Label>
                          <Input
                            id="signup-lastname"
                            placeholder="Doe"
                            required
                            className="bg-input/50 backdrop-blur-sm border-muted/50 h-12 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="signup-email" className="text-sm font-medium">
                          Email
                        </Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your.email@college.edu"
                          required
                          className="bg-input/50 backdrop-blur-sm border-muted/50 h-12 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="signup-password" className="text-sm font-medium">
                          Password
                        </Label>
                        <Input
                          id="signup-password"
                          type="password"
                          required
                          className="bg-input/50 backdrop-blur-sm border-muted/50 h-12 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="signup-confirm" className="text-sm font-medium">
                          Confirm Password
                        </Label>
                        <Input
                          id="signup-confirm"
                          type="password"
                          required
                          className="bg-input/50 backdrop-blur-sm border-muted/50 h-12 rounded-xl focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105 glow-effect"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Creating account...
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 text-center">
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    By continuing, you agree to our privacy policy and terms of service
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 animate-slide-in-right">
            <div className="group p-6 rounded-2xl gradient-glow hover:scale-105 transition-all duration-300 cursor-pointer delay-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Peer Community</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Connect with fellow students in a safe, moderated environment
                  </p>
                </div>
              </div>
            </div>

            <div className="group p-6 rounded-2xl gradient-glow hover:scale-105 transition-all duration-300 cursor-pointer delay-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Professional Care</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    Book sessions with licensed counselors and mental health professionals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
