import { Button } from '@/components/ui/button'
import heroBanner from "@/assets/images/hero-banner-dskt-1.jpg";

export default function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat object-cover  py-40 px-6 text-center rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={heroBanner}
        alt="Hero Banner"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay (optional for better readability) */}
      {/* <div className="absolute inset-0 bg-black/50"></div> */}

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Seamless Ride Booking at Your Fingertips
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Book your rides anytime, anywhere with ease and comfort.
        </p>
        <div className="flex justify-center gap-4">
          <Button className="bg-primary text-primary-foreground hover:opacity-90 transition">
            Book a Ride Now
          </Button>
          <Button
            variant="outline"
            className="border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground transition"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
