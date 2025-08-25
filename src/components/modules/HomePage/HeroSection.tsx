import { Button } from '@/components/ui/button'
import React from 'react'

export default function HeroSection() {
  return (
   <section className="bg-background text-foreground py-20 px-6 text-center rounded-2xl shadow-lg">
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
    </section>
  )
}
