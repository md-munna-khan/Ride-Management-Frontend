import { Card } from "@/components/ui/card"
import { Shield, Users, Zap, Heart } from "lucide-react"

export function Mission() {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Every ride is protected by comprehensive safety features, background checks, and 24/7 support.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "We build technology that brings people together and creates opportunities for economic growth.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly evolving our platform with cutting-edge technology to improve the ride experience.",
    },
    {
      icon: Heart,
      title: "Reliability",
      description: "Dependable service you can count on, whether it's your daily commute or an important appointment.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Mission & Values</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            To transform urban mobility by connecting communities through safe, reliable, and accessible transportation
            solutions that empower both riders and drivers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-primary/5 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Our Vision for the Future</h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              We envision a world where transportation is seamless, sustainable, and accessible to all. Through
              continuous innovation in autonomous vehicles, electric mobility, and smart city integration, we're
              building the foundation for tomorrow's transportation ecosystem. Our goal is to reduce traffic congestion,
              lower carbon emissions, and create more livable cities for future generations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
