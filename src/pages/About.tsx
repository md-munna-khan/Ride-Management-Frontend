import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function About() {
  return (
    <section className="py-16 px-6 bg-background text-foreground">
      <div className="container mx-auto space-y-12">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-4xl font-bold">About Our Company</h2>
          <p className="max-w-3xl mx-auto mt-4 text-lg">
            We are committed to revolutionizing urban mobility by connecting riders and drivers through
            a seamless and secure platform. Our mission is to make ride booking efficient, safe, and enjoyable for everyone.
          </p>
        </div>

        {/* Company Mission */}
        <div className="max-w-3xl mx-auto space-y-4 text-center">
          <h3 className="text-2xl font-semibold">Our Mission</h3>
          <p className="text-base">
            To provide a reliable and user-friendly ride booking experience that empowers riders and drivers alike.
            We strive to innovate in transportation while maintaining the highest standards of safety and service.
          </p>
        </div>

        {/* Team Profiles */}
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold text-center">Meet Our Team</h3>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {/* Team Member */}
            <Card className="bg-card text-card-foreground shadow-lg">
              <CardHeader>
                <CardTitle>Md. Munna Khan</CardTitle>
                <CardDescription>Founder & Full Stack Developer</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Passionate about creating seamless web applications. Skilled in React.js, Node.js, and MongoDB.
                  Dedicated to delivering innovative solutions and exceptional user experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card text-card-foreground shadow-lg">
              <CardHeader>
                <CardTitle>Jane Doe</CardTitle>
                <CardDescription>UI/UX Designer</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Expert in crafting intuitive and visually appealing interfaces. Focused on usability and responsive design.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card text-card-foreground shadow-lg">
              <CardHeader>
                <CardTitle>John Smith</CardTitle>
                <CardDescription>Backend Engineer</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Specialist in building secure and scalable backend systems. Experienced in Node.js, Express, and MongoDB.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
