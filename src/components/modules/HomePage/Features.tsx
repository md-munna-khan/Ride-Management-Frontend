import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  return (
   <section className="py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Our Features</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="bg-card text-card-foreground shadow-lg text-center">
          <CardHeader>
            <CardTitle>Affordable Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            Get the best rates without compromising on comfort.
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground shadow-lg text-center">
          <CardHeader>
            <CardTitle>Secure Rides</CardTitle>
          </CardHeader>
          <CardContent>
            Safety is our priority with verified drivers and tracking.
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground shadow-lg text-center">
          <CardHeader>
            <CardTitle>24/7 Support</CardTitle>
          </CardHeader>
          <CardContent>
            We’re here to assist you anytime, anywhere.
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Features;
