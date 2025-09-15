"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  AlertTriangle,
  Heart,
  Shield,
  Users,
  ExternalLink,
  Copy,
  CheckCircle,
  ArrowLeft,
} from "lucide-react"

interface EmergencyContact {
  id: string
  name: string
  description: string
  phone: string
  textNumber?: string
  website?: string
  availability: string
  type: "crisis" | "local" | "campus" | "text" | "chat"
  priority: "high" | "medium" | "low"
}

interface SafetyResource {
  id: string
  title: string
  description: string
  type: "technique" | "location" | "contact" | "app"
  instructions?: string[]
  location?: string
  phone?: string
}

export function EmergencyPage() {
  const [selectedTab, setSelectedTab] = useState("crisis")
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<string | null>(null)

  useEffect(() => {
    // Get user's location for local resources
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode this to get city/state
          setUserLocation("Campus Area")
        },
        (error) => {
          console.log("Location access denied")
        },
      )
    }
  }, [])

  const emergencyContacts: EmergencyContact[] = [
    {
      id: "1",
      name: "National Suicide Prevention Lifeline",
      description: "24/7 crisis support for suicidal thoughts and emotional distress",
      phone: "988",
      availability: "24/7",
      type: "crisis",
      priority: "high",
    },
    {
      id: "2",
      name: "Crisis Text Line",
      description: "Text-based crisis support with trained counselors",
      phone: "741741",
      textNumber: "741741",
      availability: "24/7",
      type: "text",
      priority: "high",
    },
    {
      id: "3",
      name: "Campus Counseling Center",
      description: "On-campus mental health services and crisis intervention",
      phone: "(555) 123-4567",
      availability: "Mon-Fri 8AM-5PM",
      type: "campus",
      priority: "high",
    },
    {
      id: "4",
      name: "Campus Security",
      description: "24/7 campus safety and emergency response",
      phone: "(555) 123-9999",
      availability: "24/7",
      type: "campus",
      priority: "medium",
    },
    {
      id: "5",
      name: "Local Emergency Services",
      description: "Police, fire, and medical emergency services",
      phone: "911",
      availability: "24/7",
      type: "local",
      priority: "high",
    },
    {
      id: "6",
      name: "SAMHSA National Helpline",
      description: "Treatment referral and information service",
      phone: "1-800-662-4357",
      availability: "24/7",
      type: "crisis",
      priority: "medium",
    },
    {
      id: "7",
      name: "National Domestic Violence Hotline",
      description: "Support for domestic violence situations",
      phone: "1-800-799-7233",
      availability: "24/7",
      type: "crisis",
      priority: "medium",
    },
    {
      id: "8",
      name: "LGBT National Hotline",
      description: "Support for LGBTQ+ individuals in crisis",
      phone: "1-888-843-4564",
      availability: "Mon-Fri 4PM-12AM, Sat 12PM-5PM",
      type: "crisis",
      priority: "medium",
    },
  ]

  const safetyResources: SafetyResource[] = [
    {
      id: "1",
      title: "5-4-3-2-1 Grounding Technique",
      description: "Immediate anxiety relief using your senses",
      type: "technique",
      instructions: [
        "Name 5 things you can see around you",
        "Name 4 things you can touch",
        "Name 3 things you can hear",
        "Name 2 things you can smell",
        "Name 1 thing you can taste",
      ],
    },
    {
      id: "2",
      title: "Box Breathing",
      description: "Calm your nervous system with controlled breathing",
      type: "technique",
      instructions: [
        "Breathe in for 4 counts",
        "Hold your breath for 4 counts",
        "Breathe out for 4 counts",
        "Hold empty for 4 counts",
        "Repeat 4-6 times",
      ],
    },
    {
      id: "3",
      title: "Campus Safe Spaces",
      description: "24/7 accessible safe locations on campus",
      type: "location",
      location: "Student Union Building, Library 24/7 Study Areas, Residence Hall Lobbies",
    },
    {
      id: "4",
      title: "Crisis Chat Support",
      description: "Anonymous online crisis counseling",
      type: "contact",
      instructions: ["Visit crisischat.org", "Click 'Chat Now'", "Connect with trained volunteer"],
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedNumber(text)
    setTimeout(() => setCopiedNumber(null), 2000)
  }

  const makeCall = (number: string) => {
    window.open(`tel:${number}`, "_self")
  }

  const sendText = (number: string, message = "HELLO") => {
    window.open(`sms:${number}?body=${encodeURIComponent(message)}`, "_self")
  }

  const getContactTypeColor = (type: EmergencyContact["type"]) => {
    switch (type) {
      case "crisis":
        return "bg-red-100 text-red-800"
      case "campus":
        return "bg-blue-100 text-blue-800"
      case "local":
        return "bg-green-100 text-green-800"
      case "text":
        return "bg-purple-100 text-purple-800"
      case "chat":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority: EmergencyContact["priority"]) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "low":
        return <Shield className="h-4 w-4 text-green-600" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Emergency Header */}
      <header className="bg-red-600 text-white p-4">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => (window.location.href = "/dashboard")}
            className="text-white hover:bg-red-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Emergency Support</h1>
              <p className="text-red-100">Immediate help and crisis resources</p>
            </div>
          </div>
        </div>
      </header>

      {/* Critical Alert */}
      <div className="bg-red-50 border-b border-red-200 p-4">
        <div className="max-w-6xl mx-auto">
          <Alert className="border-red-300 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>If you are in immediate danger or having thoughts of suicide, call 911 or 988 right now.</strong>
              <br />
              You are not alone. Help is available 24/7.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        {/* Quick Action Buttons */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Call 988</h3>
              <p className="text-sm text-muted-foreground mb-4">Suicide & Crisis Lifeline</p>
              <Button onClick={() => makeCall("988")} className="w-full bg-red-600 hover:bg-red-700">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Text HELLO</h3>
              <p className="text-sm text-muted-foreground mb-4">Crisis Text Line: 741741</p>
              <Button onClick={() => sendText("741741", "HELLO")} className="w-full bg-blue-600 hover:bg-blue-700">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Text
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Campus Help</h3>
              <p className="text-sm text-muted-foreground mb-4">Counseling Center</p>
              <Button onClick={() => makeCall("(555) 123-4567")} className="w-full bg-green-600 hover:bg-green-700">
                <Phone className="h-4 w-4 mr-2" />
                Call Campus
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="crisis">Crisis Contacts</TabsTrigger>
            <TabsTrigger value="resources">Safety Resources</TabsTrigger>
            <TabsTrigger value="techniques">Coping Techniques</TabsTrigger>
          </TabsList>

          <TabsContent value="crisis" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {emergencyContacts
                .sort((a, b) => {
                  const priorityOrder = { high: 0, medium: 1, low: 2 }
                  return priorityOrder[a.priority] - priorityOrder[b.priority]
                })
                .map((contact) => (
                  <Card key={contact.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            {getPriorityIcon(contact.priority)}
                            <h3 className="font-bold text-lg">{contact.name}</h3>
                            <Badge className={getContactTypeColor(contact.type)} variant="secondary">
                              {contact.type}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground">{contact.description}</p>

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{contact.availability}</span>
                            </div>
                            {userLocation && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{userLocation}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <div className="flex items-center gap-2">
                            <Button onClick={() => makeCall(contact.phone)} size="sm">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(contact.phone)}>
                              {copiedNumber === contact.phone ? (
                                <CheckCircle className="h-4 w-4 mr-1" />
                              ) : (
                                <Copy className="h-4 w-4 mr-1" />
                              )}
                              {copiedNumber === contact.phone ? "Copied" : contact.phone}
                            </Button>
                          </div>

                          {contact.textNumber && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => sendText(contact.textNumber!, "HELLO")}
                              className="w-full"
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Text
                            </Button>
                          )}

                          {contact.website && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(contact.website, "_blank")}
                              className="w-full"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Website
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {safetyResources.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {resource.type === "technique" && <Heart className="h-5 w-5 text-primary" />}
                      {resource.type === "location" && <MapPin className="h-5 w-5 text-primary" />}
                      {resource.type === "contact" && <Users className="h-5 w-5 text-primary" />}
                      {resource.type === "app" && <Phone className="h-5 w-5 text-primary" />}
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {resource.instructions && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Steps:</h4>
                        <ol className="space-y-1 text-sm">
                          {resource.instructions.map((step, index) => (
                            <li key={index} className="flex gap-2">
                              <span className="font-medium text-primary">{index + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {resource.location && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Locations:</h4>
                        <p className="text-sm text-muted-foreground">{resource.location}</p>
                      </div>
                    )}

                    {resource.phone && (
                      <div className="mt-4">
                        <Button onClick={() => makeCall(resource.phone!)} size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Call {resource.phone}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="techniques" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Immediate Calm Techniques
                  </CardTitle>
                  <CardDescription>Use these when feeling overwhelmed or panicked</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Deep Breathing</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Breathe in slowly through your nose for 4 counts, hold for 4, exhale through your mouth for 6.
                    </p>
                    <Button size="sm" variant="outline">
                      Start Guided Breathing
                    </Button>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Progressive Muscle Relaxation</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Tense and release each muscle group starting from your toes up to your head.
                    </p>
                    <Button size="sm" variant="outline">
                      Start Exercise
                    </Button>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Cold Water Technique</h4>
                    <p className="text-sm text-muted-foreground">
                      Splash cold water on your face or hold ice cubes to activate your body's dive response and calm
                      anxiety.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Safety Planning
                  </CardTitle>
                  <CardDescription>Create your personal crisis response plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm">Warning Signs</h4>
                      <p className="text-xs text-muted-foreground">
                        Identify thoughts, feelings, or behaviors that indicate you might be in crisis
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm">Coping Strategies</h4>
                      <p className="text-xs text-muted-foreground">
                        List activities that help you feel better when you're distressed
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm">Support People</h4>
                      <p className="text-xs text-muted-foreground">
                        Friends, family, or professionals you can contact for help
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm">Professional Contacts</h4>
                      <p className="text-xs text-muted-foreground">
                        Therapist, counselor, or crisis line numbers readily available
                      </p>
                    </div>
                  </div>

                  <Button className="w-full">Create My Safety Plan</Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Remember: You Are Not Alone</CardTitle>
                <CardDescription>Crisis situations are temporary. Help is always available.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-medium">If you're having thoughts of suicide:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Call 988 (Suicide & Crisis Lifeline) immediately</li>
                      <li>• Go to your nearest emergency room</li>
                      <li>• Call 911</li>
                      <li>• Reach out to a trusted friend or family member</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">If you're in immediate physical danger:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Call 911 immediately</li>
                      <li>• Get to a safe location</li>
                      <li>• Contact campus security if on campus</li>
                      <li>• Reach out to the domestic violence hotline if needed</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
