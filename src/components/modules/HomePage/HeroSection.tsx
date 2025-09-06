import { Button } from "@/components/ui/button"
import { Car, MapPin, Clock } from "lucide-react"
import { useNavigate } from "react-router";

export function HeroSection() {
    const navigate = useNavigate();

  const handleBookRide = () => {
    navigate("/rider/request");
  };
  const handleApplyDriver = () => {
    navigate("/rider/apply");
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="absolute inset-0 bg-[url('/modern-city-skyline-with-cars-and-people.png')] bg-cover bg-center opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
            <Car className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Trusted by 10M+ riders</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Ride with Trust and <span className="text-primary">Safety</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Connecting riders and drivers seamlessly. Experience reliable, safe, and affordable transportation at your
          fingertips.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="text-lg px-8 py-6" onClick={handleBookRide}>
            Book a Ride Now
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" onClick={handleApplyDriver}>
            Become a Driver
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Available in 50+ cities</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5 text-primary" />
            <span>24/7 service</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Car className="h-5 w-5 text-primary" />
            <span>5-star safety rating</span>
          </div>
        </div>
      </div>
    </section>
  )
}
