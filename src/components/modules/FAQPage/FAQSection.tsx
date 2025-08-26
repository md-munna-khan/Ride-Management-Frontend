"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  id: number
  question: string
  answer: string
  category: "general" | "rider" | "driver" | "payment" | "safety"
}

const faqData: FAQItem[] = [
  // General Questions
  {
    id: 1,
    question: "What is RideFlow and how does it work?",
    answer:
      "RideFlow is a ride-sharing platform that connects passengers with nearby drivers. Simply open the app, enter your destination, choose your ride type, and get matched with a driver in minutes.",
    category: "general",
  },
  {
    id: 2,
    question: "In which cities is RideFlow available?",
    answer:
      "RideFlow is currently available in over 50 cities across the country. We're constantly expanding to new locations. Check our app to see if we're available in your area.",
    category: "general",
  },
  {
    id: 3,
    question: "How do I create an account?",
    answer:
      "Download the RideFlow app from the App Store or Google Play, tap 'Sign Up', and follow the prompts to create your account using your phone number or email address.",
    category: "general",
  },

  // Rider Questions
  {
    id: 4,
    question: "How do I book a ride?",
    answer:
      "Open the app, enter your pickup location and destination, select your preferred ride type, and tap 'Book Ride'. You'll be matched with a nearby driver and can track their arrival in real-time.",
    category: "rider",
  },
  {
    id: 5,
    question: "Can I schedule a ride in advance?",
    answer:
      "Yes! You can schedule rides up to 30 days in advance. Select 'Schedule' when booking and choose your preferred pickup time.",
    category: "rider",
  },
  {
    id: 6,
    question: "What if I need to cancel my ride?",
    answer:
      "You can cancel your ride through the app. Cancellations within 2 minutes of booking are free. After that, a small cancellation fee may apply depending on how close the driver is to your location.",
    category: "rider",
  },
  {
    id: 7,
    question: "Can I add multiple stops to my trip?",
    answer:
      "Yes, you can add up to 3 additional stops during your trip. Each stop has a maximum wait time of 3 minutes, and additional charges may apply.",
    category: "rider",
  },

  // Driver Questions
  {
    id: 8,
    question: "How do I become a RideFlow driver?",
    answer:
      "To become a driver, you must be at least 21 years old, have a valid driver's license, vehicle registration, and insurance. Apply through our driver portal and complete the background check and vehicle inspection.",
    category: "driver",
  },
  {
    id: 9,
    question: "What are the vehicle requirements?",
    answer:
      "Your vehicle must be 2010 or newer, have 4 doors, pass a vehicle inspection, and meet local regulations. Different ride types may have specific requirements.",
    category: "driver",
  },
  {
    id: 10,
    question: "How much can I earn as a driver?",
    answer:
      "Earnings vary based on location, time of day, and demand. Drivers typically earn between $15-25 per hour before expenses. You keep 100% of tips and can earn bonuses during peak hours.",
    category: "driver",
  },
  {
    id: 11,
    question: "When do I get paid?",
    answer:
      "Drivers are paid weekly via direct deposit. You can also cash out your earnings instantly for a small fee using our Instant Pay feature.",
    category: "driver",
  },

  // Payment Questions
  {
    id: 12,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, PayPal, Apple Pay, Google Pay, and digital wallets. Cash payments are available in select cities.",
    category: "payment",
  },
  {
    id: 13,
    question: "How is the fare calculated?",
    answer:
      "Fares are calculated based on time, distance, and demand. You'll see an upfront price estimate before booking, and the final fare will be charged to your selected payment method.",
    category: "payment",
  },
  {
    id: 14,
    question: "Can I get a receipt for my ride?",
    answer:
      "Yes, receipts are automatically sent to your email after each ride. You can also view and download receipts from the 'Trip History' section in your app.",
    category: "payment",
  },
  {
    id: 15,
    question: "What if I'm charged incorrectly?",
    answer:
      "If you believe you were charged incorrectly, contact our support team through the app within 30 days of your trip. We'll review your case and issue refunds when appropriate.",
    category: "payment",
  },

  // Safety Questions
  {
    id: 16,
    question: "How do you ensure rider and driver safety?",
    answer:
      "All drivers undergo comprehensive background checks, vehicle inspections, and identity verification. We provide real-time GPS tracking, emergency assistance, and 24/7 support.",
    category: "safety",
  },
  {
    id: 17,
    question: "What should I do in case of an emergency?",
    answer:
      "Use the emergency button in the app to contact local authorities and share your trip details with emergency contacts. You can also call 911 directly if needed.",
    category: "safety",
  },
  {
    id: 18,
    question: "Can I share my trip details with others?",
    answer:
      "Yes, you can share your live trip status with trusted contacts through the app. They'll be able to track your route and estimated arrival time in real-time.",
    category: "safety",
  },
]

const categoryLabels = {
  general: "General",
  rider: "For Riders",
  driver: "For Drivers",
  payment: "Payment",
  safety: "Safety",
}

const categoryColors = {
  general: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  rider: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  driver: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  payment: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  safety: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleExpanded = (id: number) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const categories = ["all", ...Object.keys(categoryLabels)] as const

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Categories" : categoryLabels[category as keyof typeof categoryLabels]}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  No questions found matching your search. Try different keywords or browse all categories.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFAQs.map((faq) => (
              <Card key={faq.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={categoryColors[faq.category]}>{categoryLabels[faq.category]}</Badge>
                        </div>
                        <h3 className="font-semibold text-foreground">{faq.question}</h3>
                      </div>
                      {expandedItems.includes(faq.id) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </button>

                  {expandedItems.includes(faq.id) && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-border">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">Our support team is here to help you 24/7</p>
              <Button asChild>
                <a href="/contact">Contact Support</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
