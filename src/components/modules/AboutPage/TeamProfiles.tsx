import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter } from "lucide-react"

export function TeamProfiles() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      image: "/professional-woman-ceo.png",
      bio: "Former VP of Engineering at a major tech company with 15+ years in transportation technology. Sarah leads our vision for the future of urban mobility.",
      expertise: ["Strategic Leadership", "Product Vision", "Urban Planning"],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      image: "/professional-cto.png",
      bio: "Previously led engineering teams at top-tier startups. Marcus oversees our technology infrastructure and drives innovation in our platform.",
      expertise: ["System Architecture", "AI/ML", "Mobile Development"],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Dr. Aisha Patel",
      role: "Head of Safety & Operations",
      image: "/professional-woman-doctor-safety-executive.png",
      bio: "PhD in Transportation Safety with 12 years experience in ride-sharing operations. Aisha ensures every ride meets our highest safety standards.",
      expertise: ["Safety Protocols", "Risk Management", "Operations"],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "James Thompson",
      role: "VP of Driver Experience",
      image: "/professional-man-vp-executive.png",
      bio: "Former driver turned executive, James brings unique insights into driver needs and leads our driver success initiatives.",
      expertise: ["Driver Relations", "Community Building", "Training"],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Lisa Wang",
      role: "Head of Design",
      image: "/professional-woman-design-executive.png",
      bio: "Award-winning UX designer with expertise in mobile-first experiences. Lisa crafts intuitive interfaces that delight our users.",
      expertise: ["UX/UI Design", "User Research", "Design Systems"],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "David Kim",
      role: "VP of Growth",
      image: "/professional-man-growth-executive.png",
      bio: "Growth marketing expert who scaled multiple startups. David leads our expansion into new markets and user acquisition strategies.",
      expertise: ["Growth Marketing", "Data Analytics", "Market Expansion"],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
  ]

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Meet Our Leadership Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate leaders with diverse backgrounds united by a common goal: revolutionizing transportation for
            everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.expertise.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={member.social.linkedin}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${member.name} Twitter`}
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">Join Our Team</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for transforming transportation.
              Explore opportunities to make a real impact.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              View Open Positions
            </button>
          </Card>
        </div>
      </div>
    </section>
  )
}
