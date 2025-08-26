import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Navigation, BarChart3, Calendar, Shield, Smartphone, Clock, Users, Settings } from "lucide-react"

export function DriverFeatures() {
  const features = [
    {
      icon: DollarSign,
      title: "Flexible Earnings",
      description: "Earn money on your schedule with transparent pricing and instant payouts.",
    },
    {
      icon: Navigation,
      title: "Smart Navigation",
      description: "Built-in GPS navigation with traffic optimization and route suggestions.",
    },
    {
      icon: BarChart3,
      title: "Earnings Analytics",
      description: "Detailed insights into your earnings, trips, and performance metrics.",
    },
    {
      icon: Calendar,
      title: "Schedule Management",
      description: "Set your availability and manage your driving schedule efficiently.",
    },
    {
      icon: Shield,
      title: "Driver Protection",
      description: "Insurance coverage, safety features, and 24/7 driver support.",
    },
    {
      icon: Smartphone,
      title: "Driver App",
      description: "Dedicated driver app with offline mode and battery optimization.",
    },
    {
      icon: Clock,
      title: "Trip History",
      description: "Complete trip records with earnings breakdown and rider feedback.",
    },
    {
      icon: Users,
      title: "Rider Communication",
      description: "Secure in-app messaging and calling with privacy protection.",
    },
    {
      icon: Settings,
      title: "Vehicle Management",
      description: "Register multiple vehicles and manage vehicle-specific settings.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            For Drivers
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Drive and Earn with Confidence</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and features to help you maximize earnings while providing excellent service.
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
