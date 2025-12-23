import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

export function CTASection() {
  const navigate = useNavigate()
  return (
    <section className="py-16 bg-gradient-to-r from-primary/8 to-accent/8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold">Ready to ride?</h3>
          <p className="text-muted-foreground">Book your next trip in seconds. Drivers available now.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" onClick={() => navigate('/rider/request')}>Book a Ride</Button>
          <Button variant="outline" onClick={() => navigate('/rider/apply')}>Become a Driver</Button>
        </div>
      </div>
    </section>
  )
}
