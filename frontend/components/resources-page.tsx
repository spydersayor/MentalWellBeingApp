"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Search,
  Play,
  BookOpen,
  Headphones,
  Video,
  Download,
  Clock,
  Star,
  Heart,
  Brain,
  Zap,
  Moon,
  Users,
  Target,
} from "lucide-react"

interface Resource {
  id: string
  title: string
  description: string
  type: "article" | "video" | "audio" | "exercise" | "guide"
  category: "stress" | "anxiety" | "depression" | "sleep" | "mindfulness" | "relationships" | "academic"
  duration?: string
  rating: number
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
  content?: string
  audioUrl?: string
  videoUrl?: string
}

export function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const resources: Resource[] = [
    {
      id: "1",
      title: "5-Minute Breathing Exercise",
      description: "A quick guided breathing exercise to help reduce anxiety and promote calm",
      type: "audio",
      category: "anxiety",
      duration: "5 min",
      rating: 4.8,
      difficulty: "beginner",
      tags: ["breathing", "quick", "anxiety relief"],
      audioUrl: "/audio/breathing-exercise.mp3",
    },
    {
      id: "2",
      title: "Understanding Academic Stress",
      description: "Learn about the causes of academic stress and effective coping strategies",
      type: "article",
      category: "academic",
      duration: "8 min read",
      rating: 4.6,
      difficulty: "beginner",
      tags: ["stress management", "study tips", "time management"],
      content: "Academic stress is a common experience for college students...",
    },
    {
      id: "3",
      title: "Progressive Muscle Relaxation",
      description: "A comprehensive guide to releasing physical tension and mental stress",
      type: "video",
      category: "stress",
      duration: "15 min",
      rating: 4.9,
      difficulty: "beginner",
      tags: ["relaxation", "physical wellness", "stress relief"],
      videoUrl: "/videos/muscle-relaxation.mp4",
    },
    {
      id: "4",
      title: "Sleep Hygiene Checklist",
      description: "Essential practices for better sleep quality and mental health",
      type: "guide",
      category: "sleep",
      duration: "3 min read",
      rating: 4.7,
      difficulty: "beginner",
      tags: ["sleep", "routine", "wellness"],
    },
    {
      id: "5",
      title: "Mindful Walking Meditation",
      description: "Combine physical activity with mindfulness for mental clarity",
      type: "exercise",
      category: "mindfulness",
      duration: "10 min",
      rating: 4.5,
      difficulty: "intermediate",
      tags: ["meditation", "walking", "mindfulness"],
    },
    {
      id: "6",
      title: "Building Healthy Relationships",
      description: "Navigate social connections and communication in college",
      type: "article",
      category: "relationships",
      duration: "12 min read",
      rating: 4.4,
      difficulty: "intermediate",
      tags: ["communication", "friendship", "boundaries"],
    },
    {
      id: "7",
      title: "Cognitive Behavioral Techniques",
      description: "Learn CBT strategies to challenge negative thought patterns",
      type: "video",
      category: "depression",
      duration: "20 min",
      rating: 4.8,
      difficulty: "advanced",
      tags: ["CBT", "thought patterns", "mental health"],
    },
    {
      id: "8",
      title: "Quick Anxiety Relief Techniques",
      description: "Immediate strategies you can use anywhere to manage anxiety",
      type: "guide",
      category: "anxiety",
      duration: "5 min read",
      rating: 4.9,
      difficulty: "beginner",
      tags: ["anxiety", "quick relief", "coping skills"],
    },
  ]

  const categories = [
    { id: "all", label: "All Resources", icon: BookOpen },
    { id: "stress", label: "Stress Management", icon: Zap },
    { id: "anxiety", label: "Anxiety Support", icon: Heart },
    { id: "depression", label: "Depression Help", icon: Brain },
    { id: "sleep", label: "Sleep & Rest", icon: Moon },
    { id: "mindfulness", label: "Mindfulness", icon: Target },
    { id: "relationships", label: "Relationships", icon: Users },
    { id: "academic", label: "Academic Success", icon: BookOpen },
  ]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getTypeIcon = (type: Resource["type"]) => {
    switch (type) {
      case "article":
        return <BookOpen className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      case "exercise":
        return <Play className="h-4 w-4" />
      case "guide":
        return <BookOpen className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: Resource["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (selectedResource) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card p-4">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <Button variant="ghost" size="icon" onClick={() => setSelectedResource(null)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              {getTypeIcon(selectedResource.type)}
              <div>
                <h1 className="text-xl font-bold">{selectedResource.title}</h1>
                <p className="text-muted-foreground">{selectedResource.description}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  {selectedResource.type === "video" && (
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center">
                        <Video className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Video content would load here</p>
                        <Button className="mt-4">
                          <Play className="h-4 w-4 mr-2" />
                          Play Video
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedResource.type === "audio" && (
                    <div className="bg-muted rounded-lg p-6 text-center mb-6">
                      <Headphones className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Audio Exercise</h3>
                      <p className="text-muted-foreground mb-4">
                        Find a quiet, comfortable space and follow along with this guided exercise.
                      </p>
                      <Button>
                        <Play className="h-4 w-4 mr-2" />
                        Start Audio
                      </Button>
                    </div>
                  )}

                  {selectedResource.type === "exercise" && (
                    <div className="space-y-6">
                      <div className="bg-primary/10 rounded-lg p-6">
                        <h3 className="font-semibold mb-2">Exercise Instructions</h3>
                        <p className="text-muted-foreground mb-4">
                          This mindful walking exercise combines gentle movement with focused attention.
                        </p>
                        <ol className="space-y-2 text-sm">
                          <li>1. Find a quiet path or space where you can walk slowly for 10-15 steps</li>
                          <li>2. Begin walking at a slower pace than usual</li>
                          <li>3. Focus your attention on the sensation of your feet touching the ground</li>
                          <li>4. Notice the movement of your legs and the rhythm of your steps</li>
                          <li>5. When your mind wanders, gently bring attention back to walking</li>
                          <li>6. Continue for the full duration, maintaining mindful awareness</li>
                        </ol>
                      </div>
                    </div>
                  )}

                  {(selectedResource.type === "article" || selectedResource.type === "guide") && (
                    <div className="prose prose-sm max-w-none">
                      <h3 className="text-lg font-semibold mb-4">
                        {selectedResource.type === "guide" ? "Guide Overview" : "Article Content"}
                      </h3>

                      {selectedResource.id === "2" && (
                        <div className="space-y-4">
                          <p>
                            Academic stress is a common experience for college students, affecting both mental health
                            and academic performance. Understanding its causes and developing effective coping
                            strategies is essential for success and well-being.
                          </p>

                          <h4 className="font-semibold">Common Causes of Academic Stress:</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Heavy course loads and demanding schedules</li>
                            <li>Fear of failure or not meeting expectations</li>
                            <li>Financial pressures related to education</li>
                            <li>Competition with peers</li>
                            <li>Uncertainty about future career paths</li>
                          </ul>

                          <h4 className="font-semibold">Effective Coping Strategies:</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li>Break large tasks into smaller, manageable steps</li>
                            <li>Create and stick to a realistic study schedule</li>
                            <li>Practice time management and prioritization</li>
                            <li>Seek support from professors, advisors, or counselors</li>
                            <li>Maintain a healthy work-life balance</li>
                            <li>Use stress-reduction techniques like deep breathing or meditation</li>
                          </ul>

                          <p>
                            Remember, seeking help is a sign of strength, not weakness. Your college likely offers
                            resources like tutoring centers, counseling services, and academic support programs.
                          </p>
                        </div>
                      )}

                      {selectedResource.id === "4" && (
                        <div className="space-y-4">
                          <p>
                            Good sleep hygiene is fundamental to mental health and academic success. These practices can
                            help improve your sleep quality and overall well-being.
                          </p>

                          <div className="bg-muted/50 rounded-lg p-4">
                            <h4 className="font-semibold mb-3">Sleep Hygiene Checklist:</h4>
                            <div className="space-y-2">
                              {[
                                "Maintain a consistent sleep schedule, even on weekends",
                                "Create a relaxing bedtime routine (30-60 minutes before sleep)",
                                "Keep your bedroom cool, dark, and quiet",
                                "Avoid screens (phones, laptops, TV) 1 hour before bedtime",
                                "Limit caffeine intake, especially after 2 PM",
                                "Get natural sunlight exposure during the day",
                                "Exercise regularly, but not close to bedtime",
                                "Avoid large meals and alcohol before sleep",
                                "Use your bed only for sleep and rest",
                                "If you can't fall asleep within 20 minutes, get up and do a quiet activity",
                              ].map((item, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <input type="checkbox" className="mt-1" />
                                  <span className="text-sm">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedResource.id === "8" && (
                        <div className="space-y-4">
                          <p>
                            When anxiety strikes, having immediate coping strategies can make a significant difference.
                            These techniques can be used anywhere, anytime.
                          </p>

                          <div className="grid gap-4">
                            <div className="border rounded-lg p-4">
                              <h4 className="font-semibold mb-2">5-4-3-2-1 Grounding Technique</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                Use your senses to ground yourself in the present moment:
                              </p>
                              <ul className="text-sm space-y-1">
                                <li>• 5 things you can see</li>
                                <li>• 4 things you can touch</li>
                                <li>• 3 things you can hear</li>
                                <li>• 2 things you can smell</li>
                                <li>• 1 thing you can taste</li>
                              </ul>
                            </div>

                            <div className="border rounded-lg p-4">
                              <h4 className="font-semibold mb-2">Box Breathing</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                Breathe in a square pattern to calm your nervous system:
                              </p>
                              <ul className="text-sm space-y-1">
                                <li>• Inhale for 4 counts</li>
                                <li>• Hold for 4 counts</li>
                                <li>• Exhale for 4 counts</li>
                                <li>• Hold for 4 counts</li>
                                <li>• Repeat 4-6 times</li>
                              </ul>
                            </div>

                            <div className="border rounded-lg p-4">
                              <h4 className="font-semibold mb-2">Progressive Muscle Relaxation</h4>
                              <p className="text-sm text-muted-foreground">
                                Tense and release muscle groups starting from your toes and working up to your head.
                                Hold tension for 5 seconds, then release and notice the relaxation.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resource Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <Badge variant="secondary">{selectedResource.duration}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Difficulty</span>
                    <Badge className={getDifficultyColor(selectedResource.difficulty)}>
                      {selectedResource.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{selectedResource.rating}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-muted-foreground mb-2 block">Tags</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedResource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Save to Library
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {resources
                    .filter((r) => r.id !== selectedResource.id && r.category === selectedResource.category)
                    .slice(0, 3)
                    .map((resource) => (
                      <div
                        key={resource.id}
                        className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setSelectedResource(resource)}
                      >
                        <div className="flex items-start gap-2">
                          {getTypeIcon(resource.type)}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{resource.title}</p>
                            <p className="text-xs text-muted-foreground">{resource.duration}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card p-4">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => (window.location.href = "/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Wellness Resources</h1>
            <p className="text-muted-foreground">
              Explore guides, exercises, and educational content for mental wellness
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources, topics, or techniques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  <category.icon className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Resources Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <Card
              key={resource.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedResource(resource)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(resource.type)}
                    <Badge variant="outline" className="text-xs capitalize">
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{resource.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                <CardDescription className="text-sm">{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{resource.duration}</span>
                  </div>
                  <Badge className={getDifficultyColor(resource.difficulty)} variant="secondary">
                    {resource.difficulty}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  {resource.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {resource.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{resource.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or browse different categories</p>
          </div>
        )}
      </div>
    </div>
  )
}
