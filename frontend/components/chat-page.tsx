"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, ArrowLeft, Bot, User, AlertTriangle, Phone, MessageCircle, Lightbulb, Clock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "normal" | "assessment" | "crisis" | "suggestion"
}

interface SuggestedResponse {
  id: string
  text: string
  category: "feeling" | "coping" | "support"
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm here to support you through whatever you're experiencing. This is a safe, confidential space where you can share your thoughts and feelings. How are you doing today?",
      sender: "ai",
      timestamp: new Date(),
      type: "normal",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showCrisisAlert, setShowCrisisAlert] = useState(false)
  const [assessmentScore, setAssessmentScore] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const suggestedResponses: SuggestedResponse[] = [
    { id: "1", text: "I'm feeling anxious about exams", category: "feeling" },
    { id: "2", text: "I'm having trouble sleeping", category: "feeling" },
    { id: "3", text: "I feel overwhelmed with coursework", category: "feeling" },
    { id: "4", text: "I need help with stress management", category: "coping" },
    { id: "5", text: "Can you suggest breathing exercises?", category: "coping" },
    { id: "6", text: "I want to talk to someone", category: "support" },
  ]

  const crisisKeywords = ["suicide", "kill myself", "end it all", "hurt myself", "die", "hopeless"]
  const anxietyKeywords = ["anxious", "worried", "panic", "stress", "overwhelmed"]
  const depressionKeywords = ["sad", "depressed", "empty", "worthless", "lonely"]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const analyzeMessage = (content: string): { type: Message["type"]; response: string } => {
    const lowerContent = content.toLowerCase()

    // Crisis detection
    if (crisisKeywords.some((keyword) => lowerContent.includes(keyword))) {
      setShowCrisisAlert(true)
      setAssessmentScore((prev) => prev + 3)
      return {
        type: "crisis",
        response:
          "I'm really concerned about what you're sharing. Your safety is the most important thing right now. Please know that you're not alone and there are people who want to help. Would you like me to connect you with a crisis counselor right away, or would you prefer to call a crisis helpline? You can also text 'HELLO' to 741741 for immediate support.",
      }
    }

    // Anxiety detection
    if (anxietyKeywords.some((keyword) => lowerContent.includes(keyword))) {
      setAssessmentScore((prev) => prev + 1)
      return {
        type: "assessment",
        response:
          "It sounds like you're experiencing some anxiety, which is very common among students. Let's work through this together. Can you tell me more about what's making you feel this way? In the meantime, try this quick breathing exercise: breathe in for 4 counts, hold for 4, then breathe out for 6. This can help calm your nervous system.",
      }
    }

    // Depression indicators
    if (depressionKeywords.some((keyword) => lowerContent.includes(keyword))) {
      setAssessmentScore((prev) => prev + 2)
      return {
        type: "assessment",
        response:
          "Thank you for sharing that with me. It takes courage to talk about difficult feelings. What you're experiencing sounds really challenging. Remember that these feelings, while very real and valid, are temporary. Have you been able to talk to anyone else about how you're feeling? I'm here to listen and support you.",
      }
    }

    // General supportive response
    const supportiveResponses = [
      "I hear you, and I want you to know that your feelings are valid. Can you tell me more about what's been on your mind?",
      "Thank you for sharing that with me. It sounds like you're going through a lot right now. What would be most helpful for you in this moment?",
      "I appreciate you opening up. Sometimes just talking about what we're experiencing can be the first step toward feeling better. How long have you been feeling this way?",
      "That sounds really difficult to deal with. You're not alone in this - many students face similar challenges. What kind of support do you think would help you most right now?",
    ]

    return {
      type: "normal",
      response: supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)],
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI processing time
    setTimeout(
      () => {
        const analysis = analyzeMessage(content)

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: analysis.response,
          sender: "ai",
          timestamp: new Date(),
          type: analysis.type,
        }

        setMessages((prev) => [...prev, aiMessage])
        setIsTyping(false)

        // Add follow-up suggestions for certain types
        if (analysis.type === "assessment") {
          setTimeout(() => {
            const suggestionMessage: Message = {
              id: (Date.now() + 2).toString(),
              content:
                "Here are some immediate coping strategies that might help: 1) Practice deep breathing, 2) Try progressive muscle relaxation, 3) Go for a short walk, 4) Listen to calming music. Would you like me to guide you through any of these?",
              sender: "ai",
              timestamp: new Date(),
              type: "suggestion",
            }
            setMessages((prev) => [...prev, suggestionMessage])
          }, 1500)
        }
      },
      1000 + Math.random() * 2000,
    )
  }

  const handleSuggestedResponse = (response: SuggestedResponse) => {
    handleSendMessage(response.text)
  }

  const handleCrisisSupport = () => {
    window.open("tel:988", "_blank") // National Suicide Prevention Lifeline
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => (window.location.href = "/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold">AI Support Assistant</h1>
                <p className="text-sm text-muted-foreground">Always here to listen</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Clock className="h-3 w-3" />
              24/7 Available
            </Badge>
          </div>
        </div>
      </header>

      {/* Crisis Alert */}
      {showCrisisAlert && (
        <div className="bg-destructive/10 border-b border-destructive/20 p-4">
          <div className="max-w-4xl mx-auto">
            <Alert className="border-destructive/50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>
                  If you're in immediate danger, please call 911 or go to your nearest emergency room. For crisis
                  support, call 988 (Suicide & Crisis Lifeline).
                </span>
                <Button size="sm" onClick={handleCrisisSupport} className="ml-4">
                  <Phone className="h-4 w-4 mr-2" />
                  Call 988
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "ai" && (
                  <div className="p-2 bg-primary/10 rounded-full h-fit">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : message.type === "crisis"
                        ? "bg-destructive/10 border border-destructive/20"
                        : message.type === "assessment"
                          ? "bg-accent/10 border border-accent/20"
                          : message.type === "suggestion"
                            ? "bg-secondary/10 border border-secondary/20"
                            : "bg-card border border-border"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {message.sender === "user" && (
                  <div className="p-2 bg-secondary/10 rounded-full h-fit">
                    <User className="h-5 w-5 text-secondary" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="p-2 bg-primary/10 rounded-full h-fit">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested Responses */}
        {messages.length <= 2 && (
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="mb-3">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Quick responses to get started:</h3>
              <div className="flex flex-wrap gap-2">
                {suggestedResponses.slice(0, 3).map((response) => (
                  <Button
                    key={response.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestedResponse(response)}
                    className="text-xs"
                  >
                    {response.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Share what's on your mind... (This conversation is confidential)"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(inputValue)
                  }
                }}
                className="bg-input"
              />
            </div>
            <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isTyping} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                End-to-end encrypted
              </span>
              <span className="flex items-center gap-1">
                <Lightbulb className="h-3 w-3" />
                AI-powered support
              </span>
            </div>

            {assessmentScore > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => (window.location.href = "/booking")}
                className="text-xs"
              >
                Connect with Counselor
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
