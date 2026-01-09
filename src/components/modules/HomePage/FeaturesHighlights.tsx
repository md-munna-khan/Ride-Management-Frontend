import { Bolt, ShieldCheck, DollarSign, Clock } from "lucide-react"

export function FeaturesHighlights() {
  const items = [
    { icon: Bolt, title: "Fast Matching", desc: "Find drivers in seconds with optimized routing." },
    { icon: ShieldCheck, title: "Verified Drivers", desc: "Background-checked drivers for safer rides." },
    { icon: DollarSign, title: "Transparent Pricing", desc: "Clear fares with no hidden fees." },
    { icon: Clock, title: "On-demand Service", desc: "24/7 availability whenever you need a ride." },
  ]

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Why choose us</h2>
          <p className=" max-w-2xl mx-auto">Built for speed, safety and simplicity — everything a modern rider needs.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="p-6 border border-primary rounded-xl shadow hover:shadow-xl transition">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
