import { Smartphone, Users, MapPin } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Smartphone,
      title: "Request a Ride",
      description: "Open the app, enter your destination, and choose your ride type.",
    },
    {
      icon: Users,
      title: "Get Matched",
      description: "We'll connect you with a nearby driver in seconds.",
    },
    {
      icon: MapPin,
      title: "Enjoy Your Trip",
      description: "Track your ride in real-time and arrive safely at your destination.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting a ride is simple — three steps to be on your way.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
          <div className="flex flex-col md:flex-row gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex-1">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-primary shadow-sm">
                      <step.icon className="h-7 w-7" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-primary font-bold mb-1">Step {index + 1}</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

