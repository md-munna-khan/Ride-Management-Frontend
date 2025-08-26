import { Card, CardContent } from "@/components/ui/card"
import { Car, Users, Truck, Zap } from "lucide-react"

export function Services() {
  const services = [
    {
      icon: Car,
      title: "Economy",
      description: "Affordable rides for everyday travel",
      price: "Starting at $5",
      features: ["4 seats", "Standard cars", "Everyday low prices"],
    },
    {
      icon: Zap,
      title: "Premium",
      description: "Comfortable rides in high-end vehicles",
      price: "Starting at $12",
      features: ["Luxury cars", "Professional drivers", "Premium experience"],
    },
    {
      icon: Users,
      title: "Group",
      description: "Spacious rides for larger groups",
      price: "Starting at $15",
      features: ["6-8 seats", "SUVs & vans", "Perfect for groups"],
    },
    {
      icon: Truck,
      title: "Delivery",
      description: "Fast and reliable package delivery",
      price: "Starting at $3",
      features: ["Same-day delivery", "Real-time tracking", "Secure handling"],
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of services designed to meet all your transportation needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-3">{service.description}</p>
                <p className="text-primary font-semibold mb-4">{service.price}</p>
                <ul className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
