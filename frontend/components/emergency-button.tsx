"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone } from "lucide-react"

export function EmergencyButton() {
  const [isPressed, setIsPressed] = useState(false)

  const handleEmergencyClick = () => {
    setIsPressed(true)
    // In a real app, this would trigger emergency protocols
    setTimeout(() => {
      window.location.href = "/emergency"
    }, 500)
  }

  return (
    <Button
      onClick={handleEmergencyClick}
      className={`fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg transition-all ${
        isPressed ? "bg-red-700 scale-95" : "bg-red-600 hover:bg-red-700 hover:scale-105"
      }`}
      size="icon"
    >
      {isPressed ? <Phone className="h-6 w-6 text-white" /> : <AlertTriangle className="h-6 w-6 text-white" />}
    </Button>
  )
}
