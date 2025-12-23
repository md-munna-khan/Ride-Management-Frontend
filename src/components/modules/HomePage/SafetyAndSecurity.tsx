import { ShieldCheck, UserCheck, Monitor } from "lucide-react"

export function SafetyAndSecurity() {
  const items = [
    { icon: ShieldCheck, title: "24/7 Safety", desc: "Emergency support and safety checks for every ride." },
    { icon: UserCheck, title: "Verified Profiles", desc: "Driver verification for peace of mind." },
    { icon: Monitor, title: "Real-time Tracking", desc: "Share your trip and track in real time with loved ones." },
  ]

  return (
    <section className="py-14 bg-muted/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold">Safety & Security</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">Your safety is our priority — we invest in features that protect riders and drivers.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {items.map((it, idx) => (
            <div key={idx} className="flex-1 p-6 border border-primary rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-3">
                <it.icon className="h-5 w-5 text-primary" />
              </div>
              <h4 className="font-semibold mb-1">{it.title}</h4>
              <p className="text-sm text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
