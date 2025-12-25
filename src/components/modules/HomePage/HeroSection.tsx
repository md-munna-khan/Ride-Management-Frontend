import { Button } from "@/components/ui/button"
import { Car, MapPin, Clock, ShieldCheck } from "lucide-react"
import { useNavigate } from "react-router";

export function HeroSection() {
  const navigate = useNavigate();

  const handleBookRide = () => navigate("/rider/request");
  const handleApplyDriver = () => navigate("/rider/apply");

  return (
    <section className="relative min-h-[78vh] flex items-center justify-center bg-gradient-to-br from-primary/6 to-accent/6 overflow-hidden py-8">
      {/* subtle decorative shapes */}
      <svg className="absolute -left-20 -top-20 opacity-10" width="420" height="420" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="210" cy="210" r="210" fill="url(#g)" />
        <defs>
          <radialGradient id="g" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(210 210) scale(1)">
            <stop stopColor="#7c3aed" stopOpacity="0.45" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0.12" />
          </radialGradient>
        </defs>
      </svg>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-3 mb-6 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
            <Car className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Trusted by 10M+ riders</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
            Iconic Rides. <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Memorable Journeys</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl">
            Seamlessly connect with reliable drivers, enjoy transparent fares, and travel with confidence — every time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start mb-8">
            <Button size="lg" className="text-lg px-6 py-3 shadow-lg" onClick={handleBookRide}>
              Book a Ride
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-6 py-3" onClick={handleApplyDriver}>
              Become a Driver
            </Button>
          
          </div>

          <div className="flex items-center gap-6 text-sm ">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Available in <span className="text-foreground font-medium">50+ cities</span></div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> <span className="text-foreground font-medium">24/7 support</span></div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> <span className="text-foreground font-medium">Top safety standards</span></div>
          </div>
        </div>

        <div className="flex-1 max-w-lg w-full">
          <div className="rounded-2xl bg-gradient-to-br backdrop-blur px-6 py-6 shadow-xl border ">
            <img src="/riding.jpg" alt="Hero Illustration" className="w-full h-64 object-cover rounded-lg shadow-md" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3  rounded-lg flex items-center gap-3">
                <Car className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Avg. wait</div>
                  <div className="font-semibold">3-5 min</div>
                </div>
              </div>
              <div className="p-3  rounded-lg flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Safety Rating</div>
                  <div className="font-semibold">4.9/5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
