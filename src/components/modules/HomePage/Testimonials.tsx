import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Testimonials = () => {
  return (
 <section className="py-16 px-6 bg-muted text-muted-foreground">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Riders Say</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-card text-card-foreground shadow">
          <CardHeader>
            <CardTitle>Sarah J.</CardTitle>
          </CardHeader>
          <CardContent className="italic">
            "The service was fast, safe, and affordable. Highly recommend!"
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground shadow">
          <CardHeader>
            <CardTitle>Michael K.</CardTitle>
          </CardHeader>
          <CardContent className="italic">
            "Booking a ride was so easy, and the driver was very professional."
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Testimonials;
