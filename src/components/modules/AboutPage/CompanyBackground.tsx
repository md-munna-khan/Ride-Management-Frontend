import { Card } from "@/components/ui/card"

export function CompanyBackground() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About RideConnect</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing urban transportation through innovative technology and exceptional service
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2020, RideConnect emerged from a simple vision: to make transportation accessible, reliable,
                and safe for everyone. What started as a small team of passionate engineers has grown into a leading
                ride-sharing platform serving millions of users worldwide.
              </p>
              <p>
                We recognized the challenges faced by both riders and drivers in traditional transportation systems.
                Long wait times, unpredictable pricing, and safety concerns were common pain points that needed
                innovative solutions.
              </p>
              <p>
                Today, RideConnect operates in over 50 cities, connecting riders with professional drivers through our
                cutting-edge mobile platform. We've facilitated over 10 million rides, creating economic opportunities
                for thousands of drivers while providing convenient transportation for our users.
              </p>
            </div>
          </div>

          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10M+</div>
                <div className="text-sm text-muted-foreground">Rides Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Cities Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">25K+</div>
                <div className="text-sm text-muted-foreground">Active Drivers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
