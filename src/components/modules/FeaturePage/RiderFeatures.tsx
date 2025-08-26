import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, CreditCard, Star, Shield, Smartphone, Users, Calendar, MessageCircle } from "lucide-react"

export function RiderFeatures() {
  const features = [
    {
      icon: MapPin,
      title: "Smart Location Services",
      description: "Precise pickup and drop-off locations with real-time GPS tracking and route optimization.",
    },
    {
      icon: Clock,
      title: "Real-Time Tracking",
      description: "Track your driver's location, estimated arrival time, and trip progress in real-time.",
    },
    {
      icon: CreditCard,
      title: "Multiple Payment Options",
      description: "Pay with credit cards, digital wallets, cash, or ride credits with secure transactions.",
    },
    {
      icon: Star,
      title: "Driver Rating System",
      description: "Rate and review drivers to maintain service quality and help other riders.",
    },
    {
      icon: Shield,
      title: "Safety Features",
      description: "Emergency contacts, trip sharing, and 24/7 safety support for peace of mind.",
    },
    {
      icon: Smartphone,
      title: "Mobile App Experience",
      description: "Intuitive mobile app with offline capabilities and push notifications.",
    },
    {
      icon: Users,
      title: "Ride Sharing Options",
      description: "Share rides with friends or other passengers to split costs and reduce emissions.",
    },
    {
      icon: Calendar,
      title: "Schedule Rides",
      description: "Book rides in advance for important appointments and events.",
    },
    {
      icon: MessageCircle,
      title: "In-App Communication",
      description: "Chat or call your driver directly through the app without sharing personal numbers.",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            For Riders
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Seamless Ride Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for safe, convenient, and affordable transportation at your fingertips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
