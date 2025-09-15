"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CalendarIcon, Clock, Video, Phone, MessageSquare, Star, Award, CheckCircle } from "lucide-react"

interface Counselor {
  id: string
  name: string
  title: string
  specialties: string[]
  rating: number
  experience: string
  bio: string
  avatar?: string
  availability: {
    date: string
    slots: string[]
  }[]
  sessionTypes: ("video" | "phone" | "chat")[]
}

interface TimeSlot {
  time: string
  available: boolean
}

export function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [sessionType, setSessionType] = useState<string>("")
  const [reason, setReason] = useState<string>("")
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)

  const counselors: Counselor[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Academic Stress"],
      rating: 4.9,
      experience: "8 years",
      bio: "Dr. Chen specializes in helping college students navigate academic pressures and mental health challenges. She uses evidence-based approaches including CBT and mindfulness techniques.",
      availability: [
        {
          date: "2024-12-10",
          slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
        },
        {
          date: "2024-12-11",
          slots: ["10:00 AM", "1:00 PM", "3:00 PM"],
        },
      ],
      sessionTypes: ["video", "phone", "chat"],
    },
    {
      id: "2",
      name: "Dr. Michael Rodriguez",
      title: "Licensed Professional Counselor",
      specialties: ["Trauma", "PTSD", "Relationship Issues"],
      rating: 4.8,
      experience: "12 years",
      bio: "Dr. Rodriguez has extensive experience working with young adults and specializes in trauma-informed care. He creates a safe, non-judgmental space for healing and growth.",
      availability: [
        {
          date: "2024-12-10",
          slots: ["10:00 AM", "1:00 PM", "3:00 PM"],
        },
        {
          date: "2024-12-11",
          slots: ["9:00 AM", "11:00 AM", "2:00 PM", "5:00 PM"],
        },
      ],
      sessionTypes: ["video", "phone"],
    },
    {
      id: "3",
      name: "Dr. Emily Johnson",
      title: "Licensed Marriage & Family Therapist",
      specialties: ["Family Issues", "Identity", "LGBTQ+ Support"],
      rating: 4.9,
      experience: "6 years",
      bio: "Dr. Johnson is passionate about supporting students through identity exploration and family dynamics. She provides affirming care for LGBTQ+ students and those from diverse backgrounds.",
      availability: [
        {
          date: "2024-12-10",
          slots: ["11:00 AM", "2:00 PM", "4:00 PM"],
        },
        {
          date: "2024-12-11",
          slots: ["10:00 AM", "12:00 PM", "3:00 PM"],
        },
      ],
      sessionTypes: ["video", "chat"],
    },
  ]

  const getAvailableSlots = (counselor: Counselor, date: Date): string[] => {
    const dateString = date.toISOString().split("T")[0]
    const availability = counselor.availability.find((a) => a.date === dateString)
    return availability?.slots || []
  }

  const handleBookAppointment = () => {
    if (selectedCounselor && selectedTime && sessionType) {
      setIsBookingConfirmed(true)
    }
  }

  const SessionTypeIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      case "chat":
        return <MessageSquare className="h-4 w-4" />
      default:
        return null
    }
  }

  if (isBookingConfirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Appointment Confirmed!</CardTitle>
            <CardDescription>Your session has been successfully scheduled</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg text-left space-y-2">
              <p>
                <strong>Counselor:</strong> {selectedCounselor?.name}
              </p>
              <p>
                <strong>Date:</strong> {selectedDate?.toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {selectedTime}
              </p>
              <p>
                <strong>Session Type:</strong> {sessionType}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                You'll receive a confirmation email with session details and a calendar invite.
              </p>
              <p className="text-sm text-muted-foreground">
                If you need to reschedule, please do so at least 24 hours in advance.
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => (window.location.href = "/dashboard")} className="flex-1">
                Back to Dashboard
              </Button>
              <Button variant="outline" onClick={() => setIsBookingConfirmed(false)} className="flex-1">
                Book Another
              </Button>
            </div>
          </CardContent>
        </Card>
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
            <h1 className="text-2xl font-bold">Book a Counselor</h1>
            <p className="text-muted-foreground">Schedule a confidential session with a licensed professional</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Counselor Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Choose Your Counselor</h2>
              <div className="grid gap-4">
                {counselors.map((counselor) => (
                  <Card
                    key={counselor.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedCounselor?.id === counselor.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedCounselor(counselor)}
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={counselor.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-lg">
                            {counselor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{counselor.name}</h3>
                              <p className="text-muted-foreground">{counselor.title}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{counselor.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Award className="h-4 w-4" />
                            <span>{counselor.experience} experience</span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {counselor.specialties.map((specialty) => (
                              <Badge key={specialty} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2">{counselor.bio}</p>

                          <div className="flex gap-2">
                            {counselor.sessionTypes.map((type) => (
                              <div key={type} className="flex items-center gap-1 text-xs text-muted-foreground">
                                <SessionTypeIcon type={type} />
                                <span className="capitalize">{type}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Schedule Session
                </CardTitle>
                <CardDescription>Select your preferred date and time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCounselor ? (
                  <>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-sm">{selectedCounselor.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedCounselor.title}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                        className="rounded-md border mt-2"
                      />
                    </div>

                    {selectedDate && (
                      <div>
                        <Label className="text-sm font-medium">Available Times</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {getAvailableSlots(selectedCounselor, selectedDate).map((slot) => (
                            <Button
                              key={slot}
                              variant={selectedTime === slot ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(slot)}
                              className="text-xs"
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              {slot}
                            </Button>
                          ))}
                        </div>
                        {getAvailableSlots(selectedCounselor, selectedDate).length === 0 && (
                          <p className="text-sm text-muted-foreground mt-2">No available slots for this date</p>
                        )}
                      </div>
                    )}

                    {selectedTime && (
                      <div>
                        <Label className="text-sm font-medium">Session Type</Label>
                        <Select value={sessionType} onValueChange={setSessionType}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Choose session type" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedCounselor.sessionTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                <div className="flex items-center gap-2">
                                  <SessionTypeIcon type={type} />
                                  <span className="capitalize">{type} Session</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {sessionType && (
                      <div>
                        <Label className="text-sm font-medium">Reason for Session (Optional)</Label>
                        <Textarea
                          placeholder="Briefly describe what you'd like to discuss..."
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          className="mt-2 min-h-[80px]"
                        />
                      </div>
                    )}

                    <Button onClick={handleBookAppointment} disabled={!selectedTime || !sessionType} className="w-full">
                      Confirm Appointment
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Select a counselor to view available times</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Emergency Support */}
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive text-sm">Need Immediate Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  If you're experiencing a mental health crisis, don't wait for an appointment.
                </p>
                <div className="space-y-2">
                  <Button size="sm" variant="destructive" className="w-full">
                    Call Crisis Line: 988
                  </Button>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Campus Emergency: 911
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
