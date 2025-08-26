import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Commuter",
      content:
        "I use this service daily for work. The drivers are professional, cars are clean, and I always feel safe. Highly recommended!",
      rating: 5,
      avatar: "/professional-woman-smiling.png",
    },
    {
      name: "Mike Chen",
      role: "Business Traveler",
      content:
        "Perfect for airport trips and business meetings. The premium service is worth every penny. Never been late to a meeting!",
      rating: 5,
      avatar: "/professional-man-suit.png",
    },
    {
      name: "Emily Rodriguez",
      role: "Student",
      content:
        "As a student, the economy option is perfect for my budget. Great way to get around the city safely, especially at night.",
      rating: 5,
      avatar: "/young-woman-student.png",
    },
    {
      name: "David Thompson",
      role: "Driver Partner",
      content:
        "Been driving for 2 years now. Great platform, fair earnings, and excellent support team. Love being part of this community!",
      rating: 5,
      avatar: "/friendly-driver-man.png",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what riders and drivers have to say about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <Quote className="h-6 w-6 text-primary/30" />
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
