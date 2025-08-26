import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Car, DollarSign, Shield, Settings, MessageSquare, MapPin, AlertTriangle } from "lucide-react"

export function AdminFeatures() {
  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive dashboards with real-time metrics, revenue tracking, and performance insights.",
    },
    {
      icon: Users,
      title: "User Management",
      description: "Manage riders and drivers with detailed profiles, verification status, and activity monitoring.",
    },
    {
      icon: Car,
      title: "Fleet Management",
      description: "Monitor vehicle registrations, inspections, and compliance across the entire fleet.",
    },
    {
      icon: DollarSign,
      title: "Financial Controls",
      description: "Revenue management, commission settings, payout processing, and financial reporting.",
    },
    {
      icon: Shield,
      title: "Safety & Compliance",
      description: "Background check management, safety incident tracking, and regulatory compliance tools.",
    },
    {
      icon: Settings,
      title: "Platform Configuration",
      description: "Customize pricing models, service areas, and platform-wide settings and policies.",
    },
    {
      icon: MessageSquare,
      title: "Support Management",
      description: "Customer support ticketing system with automated routing and resolution tracking.",
    },
    {
      icon: MapPin,
      title: "Geographic Controls",
      description: "Manage service areas, surge pricing zones, and location-based configurations.",
    },
    {
      icon: AlertTriangle,
      title: "Risk Management",
      description: "Fraud detection, dispute resolution, and automated risk assessment tools.",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            For Administrators
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Complete Platform Control</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful administrative tools to manage operations, ensure safety, and drive business growth.
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
